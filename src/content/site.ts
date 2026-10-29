/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT
 * ---------------------------------------------------------------------------
 * Everything personal lives in this file. Projects are managed separately from
 * the dashboard (`/dashboard`) and stored in `data/projects.json`.
 *
 * Links (socials, project demos) are only rendered as clickable when a URL is
 * provided. Empty values show a non-interactive placeholder state instead of a
 * broken link.
 * ---------------------------------------------------------------------------
 */

export const siteConfig = {
  /** Shown in the header logo, footer, and page titles. */
  brand: "Samizil Dev",
  name: "Nnaji Samuel",
  role: "Website Developer",
  location: "Port Harcourt, Nigeria",
  email: "9jaflavzmedia@gmail.com",
  phone: "0815 727 3063",
  phoneHref: "tel:+2348157273063",

  /** Used for metadata, sitemap and canonical URLs. Set NEXT_PUBLIC_SITE_URL in production. */
  url: "https://your-domain.com",

  availability: {
    available: true,
    label: "Available for new projects",
    note: "Five years building for the web.",
  },

  /** Update once you're happy with the copy. */
  responseTime: "I usually reply within 1–2 business days.",

  /** Replace public/profile.jpg with your own photo and update this path. */
  avatar: {
    src: "/profile.jpg",
    alt: "Portrait of Nnaji Samuel",
    /** Set to false if you don't want to show an image at all. */
    enabled: true,
  },

  seo: {
    title: "Nnaji Samuel — Website Developer in Port Harcourt",
    description:
      "Portfolio of Nnaji Samuel (Samizil Dev), a website developer in Port Harcourt with five years of experience and currently a student of Software/Web Development in HND. Building responsive websites and web apps with HTML, CSS, JavaScript, React, Django and WordPress.",
    keywords: [
      "website developer",
      "web developer Port Harcourt",
      "React developer",
      "Django developer",
      "WordPress developer",
      "frontend developer Nigeria",
      "freelance website developer",
      "Samizil Dev",
      "Nnaji Samuel",
    ],
  },

  socials: {
    github: { label: "GitHub", handle: "[Your GitHub]", url: "" },
    linkedin: { label: "LinkedIn", handle: "[Your LinkedIn]", url: "" },
    x: { label: "X / Twitter", handle: "[Your X handle]", url: "" },
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                                 NAVIGATION                                 */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Website developer · Port Harcourt",
  headline: {
    before: "I build fast websites",
    highlight: "that feel effortless.",
  },
  intro:
    "I'm Nnaji Samuel — a website developer in Port Harcourt with five years of experience turning ideas into responsive, reliable websites and web apps. I'm currently a student of Software/Web Development in HND. I work with HTML, CSS, JavaScript, React, Django and WordPress.",
  primaryCta: { label: "View my projects", href: "#projects" },
  secondaryCta: { label: "Let's work together", href: "#contact" },
  marquee: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Django",
    "WordPress",
    "Git",
    "GitHub",
  ],
  code: {
    filename: "samizil.js",
    lines: [
      { indent: 0, content: [{ text: "const", tone: "keyword" }, { text: " developer " }, { text: "=", tone: "operator" }, { text: " {" }] },
      { indent: 1, content: [{ text: "name", tone: "property" }, { text: ": " }, { text: '"Nnaji Samuel"', tone: "string" }, { text: "," }] },
      { indent: 1, content: [{ text: "brand", tone: "property" }, { text: ": " }, { text: '"Samizil Dev"', tone: "string" }, { text: "," }] },
      { indent: 1, content: [{ text: "location", tone: "property" }, { text: ": " }, { text: '"Port Harcourt"', tone: "string" }, { text: "," }] },
      { indent: 1, content: [{ text: "frontend", tone: "property" }, { text: ": [" }, { text: '"HTML"', tone: "string" }, { text: ", " }, { text: '"CSS"', tone: "string" }, { text: ", " }, { text: '"JavaScript"', tone: "string" }, { text: ", " }, { text: '"React"', tone: "string" }, { text: "]," }] },
      { indent: 1, content: [{ text: "backend", tone: "property" }, { text: ": " }, { text: '"Django"', tone: "string" }, { text: "," }] },
      { indent: 1, content: [{ text: "tools", tone: "property" }, { text: ": [" }, { text: '"Git"', tone: "string" }, { text: ", " }, { text: '"GitHub"', tone: "string" }, { text: ", " }, { text: '"WordPress"', tone: "string" }, { text: "]," }] },
      { indent: 1, content: [{ text: "experience", tone: "property" }, { text: ": " }, { text: "5", tone: "boolean" }, { text: "," }] },
      { indent: 1, content: [{ text: "available", tone: "property" }, { text: ": " }, { text: "true", tone: "boolean" }, { text: "," }] },
      { indent: 0, content: [{ text: "}" }, { text: " as const", tone: "keyword" }, { text: ";" }] },
    ],
    terminal: { command: "python manage.py runserver", result: "✓ Watching for file changes" },
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                                    ABOUT                                   */
/* -------------------------------------------------------------------------- */

export const about = {
  eyebrow: "About me",
  title: "Five years of turning ideas into working websites.",
  paragraphs: [
    "I'm Nnaji Samuel, the developer behind Samizil Dev. I'm based in Port Harcourt and have spent the last five years building websites and web applications — from clean marketing sites to React interfaces backed by Django. I'm currently a student of Software/Web Development in HND.",
    "My toolkit is deliberately practical: HTML, CSS and JavaScript for the foundation, React for interactive interfaces, Django when a project needs a real backend, and WordPress when a team needs to publish without friction. Git and GitHub keep every change traceable.",
    "I care about the parts visitors feel: pages that load quickly, layouts that hold up on any screen, and interfaces that make the next step obvious. I work directly with the people I build for, from the first conversation through launch.",
  ],
  imageCaption: "Portrait of Nnaji Samuel",
  facts: [
    { label: "Based in", value: "Port Harcourt, Nigeria" },
    { label: "Experience", value: "5 years" },
    { label: "Education", value: "Software/Web Dev — HND (Student)" },
    { label: "Stack", value: "HTML, CSS, JS, React, Django, WordPress" },
  ],
  principles: [
    { icon: "device", title: "Responsive by default", text: "Layouts designed for small screens first, then allowed to breathe on larger ones." },
    { icon: "gauge", title: "Performance budgets", text: "Lean pages, optimised assets, and a build that stays fast as content grows." },
    { icon: "accessibility", title: "Accessibility as standard", text: "Semantic markup, visible focus states, and keyboard paths — not an afterthought." },
    { icon: "sparkles", title: "Considered interaction", text: "Motion and micro-interactions that guide attention without getting in the way." },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*                                   SKILLS                                   */
/* -------------------------------------------------------------------------- */

export type SkillGroup = {
  title: string;
  description: string;
  icon: "monitor" | "server" | "terminal" | "pen";
  skills: readonly string[];
  core: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Frontend",
    description: "The layer people see, touch, and judge. Built with care, down to the last focus ring.",
    icon: "monitor",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    core: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "Backend",
    description: "The data, authentication, and server-side logic that keep the interface honest.",
    icon: "server",
    skills: ["Django", "Python", "REST APIs", "Authentication"],
    core: ["Django"],
  },
  {
    title: "CMS & publishing",
    description: "Sites that non-technical teams can update confidently, without touching code.",
    icon: "pen",
    skills: ["WordPress", "Content structure", "Theme customisation", "SEO basics"],
    core: ["WordPress"],
  },
  {
    title: "Tools & workflow",
    description: "A repeatable process from local development to production, with fewer surprises on release day.",
    icon: "terminal",
    skills: ["Git", "GitHub", "Version control", "Deployment"],
    core: ["Git", "GitHub"],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   SERVICES                                 */
/* -------------------------------------------------------------------------- */

export type Service = {
  title: string;
  description: string;
  icon: "code" | "device" | "rocket" | "server" | "refresh" | "wrench";
  includes: readonly string[];
};

export const services: readonly Service[] = [
  {
    title: "Custom Website Development",
    description:
      "A website shaped around your content and goals — hand-built with HTML, CSS, and JavaScript instead of page-builder bloat.",
    icon: "code",
    includes: ["Semantic HTML & CSS", "JavaScript interaction", "Deployment"],
  },
  {
    title: "React Web Applications",
    description:
      "Interactive interfaces with reusable components, clear state, and the details that make an app feel finished.",
    icon: "rocket",
    includes: ["Component architecture", "Responsive UI", "API integration"],
  },
  {
    title: "Django Development",
    description:
      "A dependable backend for forms, accounts, and content — built with Django and connected to your frontend.",
    icon: "server",
    includes: ["Models & views", "Authentication", "REST endpoints"],
  },
  {
    title: "WordPress Websites",
    description:
      "Editable business sites and blogs that your team can update without calling a developer for every sentence.",
    icon: "device",
    includes: ["Theme setup", "Content migration", "Editor training"],
  },
  {
    title: "Responsive Redesigns",
    description:
      "A measured pass on design, mobile behaviour, speed, and accessibility. Keep what works; rebuild what quietly costs you visitors.",
    icon: "refresh",
    includes: ["UX & UI refresh", "Mobile fixes", "Accessibility pass"],
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing updates, content changes, and small improvements — with a clear scope and a predictable rhythm.",
    icon: "wrench",
    includes: ["Updates & fixes", "Content edits", "Performance checks"],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   PROCESS                                  */
/* -------------------------------------------------------------------------- */

export const processSteps = [
  {
    number: "01",
    icon: "search",
    title: "Discovery",
    description:
      "We start with the goal, the audience, and the constraints. I map the pages, content, and success criteria before any design begins.",
    deliverables: ["Brief", "Sitemap", "Scope"],
  },
  {
    number: "02",
    icon: "pen",
    title: "Design",
    description:
      "Wireframes become a polished, responsive design system — typography, spacing, components, and the states that are easy to forget.",
    deliverables: ["Wireframes", "UI design", "Design system"],
  },
  {
    number: "03",
    icon: "code",
    title: "Development",
    description:
      "I build with semantic HTML, accessible components, and performance budgets from the first commit — using React, Django, or WordPress as the project needs.",
    deliverables: ["Frontend build", "CMS & APIs", "QA pass"],
  },
  {
    number: "04",
    icon: "rocket",
    title: "Launch",
    description:
      "We test across devices, connect analytics and SEO, then deploy. You get handover docs, a walkthrough, and a support window.",
    deliverables: ["Deployment", "Documentation", "Support"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                                TESTIMONIALS                                */
/* -------------------------------------------------------------------------- */

/**
 * PLACEHOLDER TESTIMONIALS — sample copy only.
 * Replace with real feedback once you have it, and set `placeholder` to false.
 * Do not publish invented client quotes.
 */
export const testimonials = [
  {
    quote:
      "The process was calm and transparent from day one. We always knew what was being built, why it mattered, and what came next.",
    name: "[Client Name]",
    title: "[Role, Company]",
    initials: "CN",
    placeholder: true,
  },
  {
    quote:
      "Our old site took forever to update. Now the team can publish a new page in minutes — and it looks sharp on every device.",
    name: "[Client Name]",
    title: "[Role, Company]",
    initials: "CN",
    placeholder: true,
  },
  {
    quote:
      "Rare to find someone who cares equally about the design and the code underneath. The handover documentation alone was worth it.",
    name: "[Client Name]",
    title: "[Role, Company]",
    initials: "CN",
    placeholder: true,
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                                   CONTACT                                  */
/* -------------------------------------------------------------------------- */

export const contact = {
  eyebrow: "Contact",
  title: "Let's build something worth shipping.",
  description:
    "Tell me about the project — the goal, the timeline, and what's getting in the way. I'll reply with honest thoughts on scope, approach, and whether I'm the right fit.",
  formNote:
    "Your details are only used to reply to this enquiry — no lists, no newsletters.",
  nextSteps: [
    "You share the goal and constraints.",
    "I reply with questions and a rough approach.",
    "We agree on scope, timeline, and next steps.",
  ],
} as const;
