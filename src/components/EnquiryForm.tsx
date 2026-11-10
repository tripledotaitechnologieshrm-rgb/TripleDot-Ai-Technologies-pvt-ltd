import { useState } from 'react'
import type { ChangeEvent, ReactNode, SubmitEvent } from 'react'
import { company } from '../data/site'
import { Icon } from './Icon'
import type { IconName } from './Icon'

/**
 * Enquiry form, submitted to a Google Apps Script web app that writes each
 * submission as a row in a Google Sheet (see google-apps-script/Code.gs).
 *
 * Set VITE_FORM_ENDPOINT in .env to the web app URL (ends in /exec).
 * Until it is set, the form never pretends to have sent anything: it tells the
 * visitor to call and lets them copy their message.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

type Option = { value: string; label: string }
type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'not-connected'
type FieldName = 'name' | 'email' | 'phone' | 'message'
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>

const FIELDS: FieldName[] = ['name', 'email', 'phone', 'message']
// Phone is typed as "98765 43210" (10 digits + 1 space); +91 is fixed in front
const LIMITS: Record<FieldName, number> = { name: 60, email: 100, phone: 11, message: 2000 }

/** Keeps digits only and shows them as "98765 43210" while typing. */
function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, '')
  if (d.length > 10 && d.startsWith('91')) d = d.slice(2)
  if (d.length > 10 && d.startsWith('0')) d = d.slice(1)
  d = d.slice(0, 10)
  return d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d
}

function validate(field: FieldName, raw: string, defaultMessage = ''): string | undefined {
  const v = raw.trim()
  switch (field) {
    case 'name':
      if (!v) return 'Please enter your name.'
      if (v.length < 2) return 'Name must be at least 2 letters.'
      if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(v)) return 'Use letters only (spaces, dots and hyphens are fine).'
      return
    case 'email':
      if (!v) return 'Please enter your email address.'
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(v) || v.includes('..'))
        return 'Enter a valid email, like name@example.com.'
      return
    case 'phone': {
      const d = v.replace(/\D/g, '')
      if (!d) return 'Please enter your mobile number.'
      if (d.length !== 10) return 'Mobile number must be 10 digits.'
      if (!/^[6-9]/.test(d)) return 'Enter a valid Indian mobile number.'
      return
    }
    case 'message':
      if (!v) return 'Please write a message.'
      if (v === defaultMessage.trim()) return 'Please add a few details to your message.'
      if (v.length < 10) return 'Message must be at least 10 characters.'
      return
  }
}

/**
 * Google Sheets treats text starting with + = - @ as a formula, which shows
 * #ERROR! (e.g. the phone "+91 85908 44831"). A leading apostrophe makes the
 * sheet store it as plain text; the apostrophe itself is not displayed.
 */
function forSheet<T extends Record<string, string>>(values: T): T {
  const out = { ...values }
  for (const key in out) {
    const v = out[key]
    if (/^[=+\-@]/.test(v)) out[key] = `'${v}` as T[typeof key]
  }
  return out
}

/**
 * Browsers decide which saved info to suggest partly by reading label text
 * ("Name", "Email", "Phone"). Invisible joiners between the letters keep the
 * label looking and reading the same, but stop that matching.
 */
const unmatchable = (text: string) => text.split('').join('‌')

export function EnquiryForm({
  topics,
  defaultTopic = '',
  messageLabel = 'Message',
  submitLabel = 'Send message',
  defaultMessage = '',
  role = '',
}: {
  topics: Option[]
  /** Enquiry type from the page URL (?topic=); sent with the message, not shown */
  defaultTopic?: string
  messageLabel?: string
  submitLabel?: string
  /** Pre-filled message text, e.g. the role someone is applying for */
  defaultMessage?: string
  /** Job title when applying from the Careers page; sent as its own column */
  role?: string
}) {
  const empty: Values = { name: '', email: '', phone: '', message: defaultMessage }
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sentTo, setSentTo] = useState({ name: '', email: '', phone: '' })
  const [summary, setSummary] = useState('')
  const [copied, setCopied] = useState(false)

  // Random field names/ids per page load. Browsers match saved info (name,
  // email, phone) by these, so random ones stop the saved-info suggestions.
  const [uid] = useState(() => Math.random().toString(36).slice(2, 8))
  const fieldName = (f: FieldName) => `${uid}_${FIELDS.indexOf(f)}`
  const fieldId = (f: FieldName) => `fx-${uid}-${FIELDS.indexOf(f)}`

  const sending = status === 'sending'

  function onChange(field: FieldName) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = field === 'phone' ? formatPhone(e.target.value) : e.target.value
      setValues((prev) => ({ ...prev, [field]: value }))
      // Once a field has been checked, re-check it live as the visitor fixes it
      if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validate(field, value, defaultMessage) }))
      if (status === 'failed') setStatus('idle')
    }
  }

  function onBlur(field: FieldName) {
    return () => {
      if (!values[field].trim() && !touched[field]) return // don't nag on a quick tab-through
      setTouched((prev) => ({ ...prev, [field]: true }))
      setErrors((prev) => ({ ...prev, [field]: validate(field, values[field], defaultMessage) }))
    }
  }

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    // Spam trap: real visitors never see or fill this field
    if (new FormData(form).get('company_website')) {
      setStatus('sent')
      return
    }

    const next: Errors = {}
    for (const f of FIELDS) {
      const msg = validate(f, values[f], defaultMessage)
      if (msg) next[f] = msg
    }
    setErrors(next)
    setTouched({ name: true, email: true, phone: true, message: true })

    const firstInvalid = FIELDS.find((f) => next[f])
    if (firstInvalid) {
      setStatus('idle')
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }

    // One clean object per submission; keys match the Apps Script columns
    const payload = {
      name: values.name.trim().replace(/\s+/g, ' '),
      email: values.email.trim().toLowerCase(),
      phone: `+91 ${values.phone}`,
      topic: topics.find((t) => t.value === defaultTopic)?.label ?? '',
      role,
      organisation: '',
      hub: '',
      contactMethod: '',
      link: '',
      message: values.message.trim(),
      consent: '',
      page: window.location.pathname + window.location.search,
    }

    if (!ENDPOINT) {
      setSummary(
        [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          payload.topic && `Topic: ${payload.topic}`,
          payload.role && `Role: ${payload.role}`,
          `Message: ${payload.message}`,
        ]
          .filter(Boolean)
          .join('\n'),
      )
      setCopied(false)
      setStatus('not-connected')
      return
    }

    setStatus('sending')
    try {
      // text/plain keeps this a "simple" request: Apps Script web apps cannot
      // answer the CORS preflight that a JSON content type would trigger.
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(forSheet(payload)),
      })
      // Accept either reply style: { ok: true } or { success: true }
      const result = (await res.json().catch(() => null)) as
        | { ok?: boolean; success?: boolean }
        | null
      if (!res.ok || !(result?.ok || result?.success)) throw new Error('Not saved')
      setSentTo({ name: payload.name, email: payload.email, phone: payload.phone })
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  function startOver() {
    setValues({ ...empty, message: '' })
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (status === 'sent') {
    const firstName = sentTo.name.split(' ')[0]
    return (
      <div className="ef-success" role="status" aria-live="polite">
        <svg className="ef-success-mark" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27.5l7 7 15-16" />
        </svg>
        <h3>{firstName ? `Thank you, ${firstName}!` : 'Thank you!'}</h3>
        <p>Your message has been sent. Our team will get back to you shortly.</p>
        {sentTo.email && (
          <dl className="ef-success-recap">
            <div>
              <dt>We will reply to</dt>
              <dd>{sentTo.email}</dd>
            </div>
            <div>
              <dt>Or call you on</dt>
              <dd>{sentTo.phone}</dd>
            </div>
          </dl>
        )}
        <div className="ef-success-actions">
          <button type="button" className="btn btn-primary" onClick={startOver}>
            Send another message
          </button>
          <a className="ef-success-call" href={company.phoneHref}>
            <Icon name="phone" size={16} /> {company.phoneDisplay}
          </a>
        </div>
      </div>
    )
  }

  const stateOf = (f: FieldName) =>
    errors[f] ? 'invalid' : touched[f] && values[f].trim() ? 'valid' : undefined

  const inputProps = (f: FieldName) => ({
    id: fieldId(f),
    name: fieldName(f),
    value: values[f],
    onChange: onChange(f),
    onBlur: onBlur(f),
    maxLength: LIMITS[f],
    autoComplete: `off-${uid}`,
    autoCorrect: 'off',
    spellCheck: f === 'message',
    'data-lpignore': 'true',
    'data-1p-ignore': true,
    'data-form-type': 'other',
    'aria-required': true,
    'aria-invalid': Boolean(errors[f]),
    'aria-describedby': errors[f] ? `e-${uid}-${f}` : undefined,
  })

  const errorText = (f: FieldName) =>
    errors[f] && (
      <span className="ef-error" id={`e-${uid}-${f}`}>
        <AlertIcon />
        {errors[f]}
      </span>
    )

  const messageLength = values.message.length

  return (
    <form
      className="enquiry-form ef"
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
      data-form-type="other"
      aria-busy={sending}
    >
      {/* Spam trap, hidden from people and screen readers */}
      <div className="ef-trap" aria-hidden="true">
        <label htmlFor={`trap-${uid}`}>Leave this empty</label>
        <input id={`trap-${uid}`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="ef-fields" disabled={sending}>
        <div className="ef-grid">
          <Field id={fieldId('name')} label="Full name" icon="users" state={stateOf('name')} wide error={errorText('name')}>
            <input {...inputProps('name')} type="text" placeholder={unmatchable('Enter your full name')} />
          </Field>

          <Field id={fieldId('email')} label="Email address" icon="globe" state={stateOf('email')} error={errorText('email')}>
            <input
              {...inputProps('email')}
              type="text"
              inputMode="email"
              autoCapitalize="none"
              placeholder={unmatchable('Enter your email address')}
            />
          </Field>

          <Field
            id={fieldId('phone')}
            label="Mobile number"
            prefix="+91"
            state={stateOf('phone')}
            error={errorText('phone')}
          >
            <input {...inputProps('phone')} type="text" inputMode="numeric" placeholder={unmatchable('Enter number')} />
          </Field>

          <div className={`field ef-field ef-wide${stateOf('message') ? ` is-${stateOf('message')}` : ''}`}>
            <div className="ef-label-row">
              <label htmlFor={fieldId('message')}>{messageLabel}</label>
              <span className={`ef-count${messageLength > LIMITS.message * 0.9 ? ' is-near' : ''}`} aria-hidden="true">
                {messageLength} / {LIMITS.message}
              </span>
            </div>
            <textarea
              {...inputProps('message')}
              rows={5}
              placeholder="Write your message here"
            />
            {errorText('message')}
          </div>
        </div>
      </fieldset>

      {status === 'failed' && (
        <div className="ef-alert" role="alert">
          <AlertIcon />
          <p>
            <strong>Your message could not be sent.</strong> Please check your connection and try
            again, or call us on <a href={company.phoneHref}>{company.phoneDisplay}</a>.
          </p>
        </div>
      )}

      {status === 'not-connected' && (
        <div className="ef-alert" role="alert">
          <AlertIcon />
          <div>
            <p>
              <strong>Your message has not been sent.</strong> Online submissions are not available
              yet, so please call <a href={company.phoneHref}>{company.phoneDisplay}</a>.
            </p>
            <button type="button" className="text-link as-button" onClick={copySummary}>
              {copied ? 'Copied' : 'Copy my details'}
            </button>
          </div>
        </div>
      )}

      <div className="ef-submit">
        <button className="btn btn-primary ef-send" type="submit" disabled={sending}>
          {sending ? (
            <>
              <span className="ef-spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              {status === 'failed' ? 'Try again' : submitLabel}
              <Icon name="arrow" size={18} />
            </>
          )}
        </button>
        <p className="ef-privacy">
          <LockIcon />
          Your details are only used to reply to you.
        </p>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  icon,
  prefix,
  state,
  wide,
  error,
  children,
}: {
  id: string
  label: string
  icon?: IconName
  /** Fixed text shown inside the box before the input, e.g. "+91" */
  prefix?: string
  state?: 'valid' | 'invalid'
  wide?: boolean
  error?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={`field ef-field${wide ? ' ef-wide' : ''}${state ? ` is-${state}` : ''}`}>
      <label htmlFor={id}>{unmatchable(label)}</label>
      <div className={`ef-control${prefix ? ' has-prefix' : ''}`}>
        {prefix ? (
          <span className="ef-prefix" aria-hidden="true">
            {prefix}
          </span>
        ) : (
          icon && (
            <span className="ef-icon" aria-hidden="true">
              <Icon name={icon} size={17} />
            </span>
          )
        )}
        {children}
        {state === 'valid' && (
          <span className="ef-ok" aria-hidden="true">
            <Icon name="check" size={14} />
          </span>
        )}
      </div>
      {error}
    </div>
  )
}

function AlertIcon() {
  return (
    <svg className="ef-alert-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7.5v5.5M12 16.2v.3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
