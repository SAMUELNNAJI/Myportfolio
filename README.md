# Samizil Dev Portfolio

Personal portfolio for **Nnaji Samuel** (Samizil Dev) — a website developer in Port Harcourt, Nigeria with five years of experience building responsive websites and web apps.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) · [React](https://react.dev/) 19 · [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- No UI/icon component libraries

## Features

- Red-themed, fast and accessible single-page portfolio
- Dashboard-managed projects (`/dashboard`) with a JSON file store
- Featured projects show **live previews** of sites added from the dashboard, with a **desktop/mobile toggle**
- "Code door" boot animation that plays once per session (skips on `/dashboard`, respects reduced motion, and is skippable)
- Working contact form with validation + graceful 503 fallback
- SEO metadata, JSON-LD, `robots.txt`, `sitemap.xml`, OG image
- `404` page and mobile-responsive layout

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended in prod | Used for metadata, canonical links, sitemap and robots. |
| `ADMIN_PASSWORD` | For the dashboard | Lock the project dashboard with a password. Without it, `/api/admin/login` returns 503 (`NOT_CONFIGURED`). |
| `ADMIN_SESSION_SECRET` | Optional | If unset, `ADMIN_PASSWORD` is used to sign the session cookie. Use a long random string in production. |
| `CONTACT_WEBHOOK_URL` | Optional | Forward form submissions to a webhook. |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | Optional | Send form submissions via [Resend](https://resend.com/). |
| `MAILERSEND_API_KEY` + `MAILERSEND_FROM` + `CONTACT_TO_EMAIL` | Optional | Send form submissions via [MailerSend](https://www.mailersend.com/). |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO_EMAIL` | Optional | Send form submissions via SMTP. |

If none of the delivery options are set, the form validates input but reports that email delivery isn't configured (it never pretends a message was sent).

## Project dashboard

1. Set `ADMIN_PASSWORD` in `.env.local`
2. Run the dev server and open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
3. Sign in, add a project and paste its **live URL**
4. Publish/feature it and it will appear on the homepage with a live preview you can toggle between desktop and mobile

Projects are saved to `data/projects.json`. The API writes to disk using an atomic rename. **For serverless read-only hosts, use a database instead.** Back up `data/projects.json` if you rely on it.

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npm run typecheck # TypeScript check
```

## Content

Personal details live in `src/content/site.ts`. Skills are fixed to HTML, CSS, JavaScript, Django, React, Git, GitHub and WordPress. Dashboard projects are managed in `data/projects.json` and the `/dashboard` UI.

Replace `public/profile.jpg` with a real photo if desired (the avatar is shown on the About section when enabled).
