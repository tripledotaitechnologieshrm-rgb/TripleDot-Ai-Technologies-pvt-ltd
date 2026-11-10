/**
 * Triple Dot website: enquiry form -> Google Sheet
 *
 * SETUP
 * 1. Create a Google Sheet (e.g. "Website Enquiries").
 * 2. In the Sheet: Extensions > Apps Script. Delete any code there and paste this file.
 * 3. Optional: set NOTIFY_EMAIL below to get an email for every new enquiry.
 * 4. Click Deploy > New deployment > type "Web app":
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    Click Deploy, approve the permissions, and copy the Web app URL (ends in /exec).
 * 5. In the website project, create a file named .env with:
 *      VITE_FORM_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
 *    then rebuild/redeploy the website.
 *
 * After editing this script later, use Deploy > Manage deployments > Edit >
 * Version: "New version" so the same URL keeps working with your changes.
 */

const SHEET_NAME = 'Enquiries'
const NOTIFY_EMAIL = '' // e.g. 'hello@tripledotaitechnologies.in' (leave '' for no email)

// Column order in the sheet. Keys match the fields the website sends.
const COLUMNS = [
  ['timestamp', 'Timestamp'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone number'],
  ['message', 'Message'],
  ['topic', 'Enquiry type'],
  ['role', 'Role applied for'],
  ['page', 'Submitted from'],
  ['status', 'Status'],
]

const MAX_LEN = 2000

// Same rules as the website form, so bad data cannot reach the sheet directly
function validate(d) {
  const name = String(d.name || '').trim()
  const email = String(d.email || '').trim()
  const phone = String(d.phone || '').replace(/[\s\-().]/g, '')
  const message = String(d.message || '').trim()
  if (name.length < 2 || name.length > 60 || !/^[A-Za-zÀ-ɏऀ-෿][A-Za-zÀ-ɏऀ-෿\s.'-]*$/.test(name))
    return 'Invalid name'
  if (email.length > 100 || email.includes('..') ||
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email))
    return 'Invalid email'
  if (!/^(?:\+?91|0)?[6-9]\d{9}$/.test(phone) && !/^\+(?!91)[1-9]\d{7,14}$/.test(phone))
    return 'Invalid phone number'
  if (message.length < 10 || message.length > MAX_LEN) return 'Invalid message'
  return ''
}

function doPost(e) {
  const lock = LockService.getScriptLock()
  try {
    lock.waitLock(10000)

    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}')

    const problem = validate(data)
    if (problem) return json({ ok: false, error: problem })

    const sheet = getSheet()
    const values = { ...data, timestamp: new Date(), status: 'New' }
    const row = COLUMNS.map(([key]) => (key === 'timestamp' ? values[key] : clean(values[key])))
    sheet.appendRow(row)

    if (NOTIFY_EMAIL) notify(values)

    return json({ ok: true })
  } catch (err) {
    console.error(err)
    return json({ ok: false, error: 'Server error' })
  } finally {
    lock.releaseLock()
  }
}

// Visiting the /exec URL in a browser shows this, handy for checking the deployment.
function doGet() {
  return json({ ok: true, message: 'Triple Dot enquiry endpoint is running.' })
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME)

  if (sheet.getLastRow() === 0) {
    const headers = COLUMNS.map(([, label]) => label)
    sheet.appendRow(headers)
    sheet
      .getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#4332b0')
      .setFontColor('#ffffff')
    sheet.setFrozenRows(1)
    sheet.setColumnWidth(COLUMNS.findIndex(([k]) => k === 'message') + 1, 360)
  }
  return sheet
}

function notify(v) {
  const subject = `New website enquiry: ${clean(v.topic) || 'General'}${v.role ? ` (${clean(v.role)})` : ''}`
  const body = COLUMNS.filter(([key]) => key !== 'status')
    .map(([key, label]) => `${label}: ${key === 'timestamp' ? v[key] : clean(v[key]) || '-'}`)
    .join('\n')
  MailApp.sendEmail({ to: NOTIFY_EMAIL, subject, body, replyTo: clean(v.email) })
}

// Trim, cap length, and stop spreadsheet formula injection (=, +, -, @)
function clean(value) {
  let s = String(value == null ? '' : value).trim().slice(0, MAX_LEN)
  if (/^[=+\-@]/.test(s)) s = "'" + s
  return s
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
