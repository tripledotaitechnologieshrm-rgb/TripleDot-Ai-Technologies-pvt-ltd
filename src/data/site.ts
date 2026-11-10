// Single source of truth for company content. Everything here comes from the
// Triple Dot master brief. Update it here and every page follows.
import type { IconName } from '../components/Icon'

export const company = {
  name: 'Triple Dot AI Technologies',
  tagline: 'Real skills. Real projects. Real careers.',
  phoneDisplay: '+91 85908 44831',
  phoneHref: 'tel:+918590844831',
  address: 'De-Burooj, 3rd Floor, Sathyanarayana Nagar, Podanur, Coimbatore, Tamil Nadu 641023',
  linkedinHandle: 'tripledotaitechnologies',
  linkedinUrl: 'https://www.linkedin.com/company/tripledotaitechnologies',
  instagramUrl: 'https://www.instagram.com/_tripledot_ai_technologies/',
}

export const stats = [
  { value: '300+', label: 'Students trained' },
  { value: '6', label: 'Academy programs' },
  { value: '4', label: 'Hubs in India and the UK' },
]

/**
 * Hubs. `address` is shown on the Contact page and `mapQuery` positions its map.
 * Replace mapQuery with the exact address (or "lat,lng") for a precise pin.
 */
export const hubs: { city: string; state: string; address?: string; mapQuery?: string }[] = [
  {
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    address: 'De-Burooj, 3rd Floor, Sathyanarayana Nagar, Podanur, Coimbatore 641023',
    mapQuery: 'De-Burooj, Sathyanarayana Nagar, Podanur, Coimbatore, Tamil Nadu 641023',
  },
  { city: 'Hyderabad', state: 'Telangana', mapQuery: 'Hyderabad, Telangana' },
  { city: 'Chennai', state: 'Tamil Nadu', mapQuery: 'Chennai, Tamil Nadu' },
  { city: 'United Kingdom', state: 'UK', mapQuery: 'United Kingdom' },
]

export type Service = {
  id: string
  title: string
  icon: IconName
  short: string
  intro: string
  items: string[]
  objective: string
  /** Detail-page content */
  tagline: string
  benefits: { icon: IconName; title: string; text: string }[]
  process: { title: string; text: string }[]
  idealFor: string[]
}

export const services: Service[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: 'megaphone',
    short: 'Campaigns, content and social media that grow your brand.',
    intro:
      'Consistent, measured marketing that makes your business easier to find and your brand easier to trust.',
    items: [
      'Social media management',
      'Content development',
      'Digital marketing campaigns',
      'Performance marketing',
      'Online brand growth',
    ],
    objective: 'Increase your online presence and grow your brand.',
    tagline: 'Be found, be trusted, be chosen.',
    benefits: [
      { icon: 'target', title: 'Reach the right people', text: 'Campaigns aimed at the audience most likely to become your customers.' },
      { icon: 'chart', title: 'Measured, not guessed', text: 'Every campaign is tracked so you can see what is working and where to invest.' },
      { icon: 'spark', title: 'A consistent brand', text: 'Content and social presence that look and sound like one business.' },
    ],
    process: [
      { title: 'Understand', text: 'We learn your business, audience and goals, and review where you stand online today.' },
      { title: 'Plan', text: 'We agree the channels, content and campaigns that suit your goals and budget.' },
      { title: 'Execute', text: 'We create the content, run the campaigns and manage your social media.' },
      { title: 'Measure', text: 'We report on results and refine the plan based on what the numbers show.' },
    ],
    idealFor: ['Small and growing businesses', 'New brands building awareness', 'Businesses moving their sales online', 'Institutions and training providers'],
  },
  {
    id: 'software-development',
    title: 'Software Development',
    icon: 'code',
    short: 'Websites, web apps and custom software, from idea to launch.',
    intro:
      'Software shaped around how your business works, taken from the first idea through to product launch.',
    items: [
      'Website development',
      'Web application development',
      'Custom software development',
      'Development from initial idea to product launch',
    ],
    objective: 'Build technology solutions that fit your business requirements.',
    tagline: 'From first idea to a product people use.',
    benefits: [
      { icon: 'puzzle', title: 'Built around your process', text: 'Software shaped to how your business actually works, not the other way round.' },
      { icon: 'layers', title: 'End-to-end delivery', text: 'Frontend, backend, database and APIs handled by one team.' },
      { icon: 'rocket', title: 'Idea to launch', text: 'We take you from an early idea through design and development to a live product.' },
    ],
    process: [
      { title: 'Discover', text: 'We capture your requirements, users and the problem the software must solve.' },
      { title: 'Design', text: 'We plan the features, screens and architecture before writing code.' },
      { title: 'Build', text: 'We develop and test in stages, so you see progress and give feedback early.' },
      { title: 'Launch', text: 'We deploy the product and help you through the first steps after go-live.' },
    ],
    idealFor: ['Businesses that need a website', 'Startups building a first product', 'Teams replacing spreadsheets with an app', 'Organizations with a custom workflow'],
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: 'flow',
    short: 'Workflow and AI-powered automation that removes manual work.',
    intro:
      'Hand the repetitive work to reliable systems, so your team can spend its time where judgement matters.',
    items: [
      'Workflow automation',
      'AI-powered automation',
      'Reducing repetitive manual activities',
      'Improving operational efficiency',
    ],
    objective: 'Save time, reduce manual work and help teams operate more efficiently.',
    tagline: 'Let systems handle the repetitive work.',
    benefits: [
      { icon: 'flow', title: 'Less manual work', text: 'Repetitive tasks run automatically, freeing your team for higher-value work.' },
      { icon: 'nodes', title: 'AI where it helps', text: 'AI-powered steps for tasks like sorting, summarizing and responding.' },
      { icon: 'target', title: 'Fewer errors', text: 'Consistent, rule-based processes reduce the mistakes of manual handling.' },
    ],
    process: [
      { title: 'Map', text: 'We walk through your current workflow and find the repetitive steps.' },
      { title: 'Design', text: 'We decide what to automate and how the new flow should work.' },
      { title: 'Automate', text: 'We build and connect the workflow and AI-powered steps.' },
      { title: 'Improve', text: 'We monitor the results and fine-tune the automation over time.' },
    ],
    idealFor: ['Teams buried in data entry', 'Businesses handling many enquiries', 'Operations with approval chains', 'Anyone repeating the same task daily'],
  },
  {
    id: 'custom-solutions',
    title: 'Custom Technology Services',
    icon: 'puzzle',
    short: 'Other technology work, scoped to your specific requirement.',
    intro:
      'Not every problem fits a category. Bring us the requirement and we will work out the appropriate solution with you.',
    items: [
      'Technology services based on client requirements',
      'A clear understanding of the business need first',
      'A solution built to suit that need',
    ],
    objective: 'Solve the actual business problem, not just follow a technology trend.',
    tagline: 'Your requirement, our solution.',
    benefits: [
      { icon: 'chat', title: 'Requirement first', text: 'We start by understanding the business need before suggesting any technology.' },
      { icon: 'puzzle', title: 'Fit for purpose', text: 'A solution built to suit your situation, not a one-size-fits-all package.' },
      { icon: 'users', title: 'One partner', text: 'A single team that can combine software, automation and marketing as needed.' },
    ],
    process: [
      { title: 'Listen', text: 'You tell us the problem; we ask the questions that uncover the real need.' },
      { title: 'Propose', text: 'We recommend an approach and agree the scope with you.' },
      { title: 'Deliver', text: 'We build the solution and keep you involved along the way.' },
      { title: 'Support', text: 'We stay available to adjust and extend the solution as you grow.' },
    ],
    idealFor: ['Problems that do not fit a category', 'Organizations unsure where to start', 'Projects mixing several services', 'Institutions with specific needs'],
  },
]

export type Program = {
  id: string
  title: string
  track: 'Web Development' | 'Data and AI'
  icon: IconName
  focus: string
  points?: string[]
}

export const programs: Program[] = [
  {
    id: 'full-stack',
    title: 'Full-Stack Web Development',
    track: 'Web Development',
    icon: 'layers',
    focus: 'Complete web application development, from frontend to backend.',
    points: [
      'Frontend development',
      'Backend development',
      'Database integration',
      'API development and integration',
      'Full-stack application development',
      'Practical project development',
    ],
  },
  {
    id: 'python-web',
    title: 'Python Web Development',
    track: 'Web Development',
    icon: 'code',
    focus: 'Building web applications and backend services using Python.',
  },
  {
    id: 'java-web',
    title: 'Java Web Development',
    track: 'Web Development',
    icon: 'server',
    focus: 'Developing web applications and backend services using Java.',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    track: 'Data and AI',
    icon: 'chart',
    focus: 'Working with data to answer business questions.',
    points: [
      'Data cleaning',
      'Data analysis',
      'Data interpretation',
      'Presenting information',
      'Extracting useful insights from datasets',
    ],
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence / Machine Learning',
    track: 'Data and AI',
    icon: 'nodes',
    focus: 'Machine learning fundamentals, and developing models using real-world datasets.',
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    track: 'Data and AI',
    icon: 'spark',
    focus: 'Modern AI tools and techniques, applied to practical problems.',
  },
]

export const journey = [
  {
    step: 'Learning',
    tone: 'blue',
    title: 'Live classes and recorded courses',
    text: 'Instructor-led sessions where you can ask questions, plus self-paced lessons to revisit alongside college or work.',
  },
  {
    step: 'Building',
    tone: 'coral',
    title: 'Real projects with mentors',
    text: 'Portfolio projects, mentor reviews and feedback that turn technical knowledge into work you can show.',
  },
  {
    step: 'Getting hired',
    tone: 'teal',
    title: 'Internship and placement support',
    text: 'Guidance after your projects, help finding internships, career guidance and preparation for your first job.',
  },
] as const

export const audiences: { title: string; icon: IconName; points: string[] }[] = [
  {
    title: 'College students',
    icon: 'grad',
    points: [
      'Develop job-ready technical skills',
      'Build a practical project portfolio',
      'Learn alongside your degree',
    ],
  },
  {
    title: 'Freshers and graduates',
    icon: 'rocket',
    points: [
      'Move toward internships and jobs',
      'Develop projects you can demonstrate',
      'Prepare for interviews',
    ],
  },
  {
    title: 'Working professionals',
    icon: 'briefcase',
    points: [
      'Upgrade your existing technical skills',
      'Learn new technologies',
      'Explore a career transition',
    ],
  },
  {
    title: 'Schools and colleges',
    icon: 'building',
    points: [
      'Establish educational partnerships',
      'Introduce industry-oriented training',
      'Connect academics with industry expectations',
    ],
  },
]

export const portalFeatures: { title: string; icon: IconName; text: string }[] = [
  {
    title: 'Learning domains',
    icon: 'layers',
    text: 'Structured learning tracks, organized into different domains.',
  },
  {
    title: 'My courses',
    icon: 'book',
    text: 'Access your courses and monitor your learning progress.',
  },
  {
    title: 'Assignments',
    icon: 'check',
    text: 'Complete assignments and practical learning tasks.',
  },
  {
    title: 'Coding editor',
    icon: 'code',
    text: 'Write and execute code in a built-in editor, with results checked against test cases.',
  },
  {
    title: 'Leaderboard',
    icon: 'trophy',
    text: 'Earn points for solved tasks, which encourages consistency and participation.',
  },
  {
    title: 'Placements',
    icon: 'briefcase',
    text: 'A pathway through skill assessments, mock interviews and placement preparation.',
  },
  {
    title: 'Support',
    icon: 'chat',
    text: 'Raise support tickets and receive assistance from the support team.',
  },
  {
    title: 'Login help',
    icon: 'key',
    text: 'College-linked accounts and quick password reset assistance.',
  },
]

export const partners = [
  'Loyola Institute of Technology',
  'DMI College of Engineering',
  'SNS Group of Institutions',
]

export const hiringCompanies = [
  'Tata Consultancy Services',
  'Zoho',
  'Deloitte',
  'Schneider Electric',
  'Hexaware',
  'Sutherland',
  'Tata Electronics',
  'Amphenol',
  'Avantor',
  'Access Healthcare',
  'VKASSA',
  'Mythri',
]

export const values = [
  'Practical learning',
  'Real-world project development',
  'Industry-relevant skills',
  'Affordable education',
  'Mentorship and career guidance',
  'Innovation and problem-solving',
  'Measurable business outcomes',
]

/**
 * Open roles on the Careers page.
 * Location, type and experience are placeholders: confirm them before going live.
 */
export type Job = {
  id: string
  title: string
  team: 'Business' | 'Support'
  location: string
  type: 'Full-time' | 'Internship' | 'Part-time'
  experience: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export const jobs: Job[] = [
  {
    id: 'business-development-executive',
    title: 'Business Development Executive',
    team: 'Business',
    location: 'Coimbatore',
    type: 'Full-time',
    experience: '0–2 years',
    summary:
      'Grow Triple Dot by building relationships with colleges, institutions and businesses for our Academy programs and technology services.',
    responsibilities: [
      'Identify and reach out to colleges, institutions and businesses',
      'Present our Academy programs and business services',
      'Build and maintain long-term partner relationships',
      'Track leads and report on progress',
    ],
    requirements: [
      'Excellent communication and presentation skills',
      'Confident meeting people and building relationships',
      'Interest in education and technology',
      'Freshers with the right attitude are welcome',
    ],
  },
  {
    id: 'client-acquisition-executive',
    title: 'Client Acquisition Executive',
    team: 'Business',
    location: 'Coimbatore',
    type: 'Full-time',
    experience: '0–2 years',
    summary:
      'Bring new clients and learners to Triple Dot by following up on enquiries, understanding their needs and guiding them to the right program or service.',
    responsibilities: [
      'Follow up on enquiries by phone, email and in person',
      'Understand each client’s needs and suggest the right solution',
      'Guide prospects through to enrolment or project start',
      'Maintain accurate records of leads and conversions',
    ],
    requirements: [
      'Strong spoken and written communication',
      'Persuasive, friendly and target-driven',
      'Organised, with good follow-up habits',
      'Experience in sales or counselling is a plus',
    ],
  },
  {
    id: 'support-executive',
    title: 'Support Executive',
    team: 'Support',
    location: 'Coimbatore',
    type: 'Full-time',
    experience: '0–2 years',
    summary:
      'Help our learners, colleges and clients get the most from Triple Dot, including support on our Learning Portal.',
    responsibilities: [
      'Respond to support tickets, calls and messages',
      'Help learners with Learning Portal access and login issues',
      'Coordinate with trainers and the technical team to resolve issues',
      'Keep clear records and follow up until issues are closed',
    ],
    requirements: [
      'Patient, polite and clear communicator',
      'Comfortable using computers and online tools',
      'Good problem-solving and follow-through',
      'Basic technical knowledge is a plus',
    ],
  },
]
