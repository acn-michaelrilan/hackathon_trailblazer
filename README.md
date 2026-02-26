# Trailblazers Hackathon – Rehab Buddy

## Brief Project Description
Rehab Buddy is an AI-powered rehabilitation assistant that turns a structured intake form into a clinically minded, week-by-week exercise plan. It solves the coordination gap between therapists, clinicians, and patients by combining a guided medical/functional data capture flow with LLM orchestration, Supabase-backed persistence, and an interactive progress dashboard. Core features include secure Supabase auth, adaptive AI plan creation, and immersive progress tracking with modals and motivational overlays.

## Tech Stack Overview
- `Next.js 16` (App Router + React 19 + TypeScript) for the entire app shell and server routes.
- `Tailwind CSS 4` with `@tailwindcss/postcss` for the utility-first visual system, plus custom CSS in `app/globals.css`.
- `Supabase` (`@supabase/auth-helpers-nextjs`, `@supabase/ssr`, `@supabase/supabase-js`) to host Postgres tables, RPCs (`insert_informationinput_data`, `complete_session_exercise`, `upsert_user_exercise_data`) and auth state.
- `OpenAI` (`Responses API` with `gpt-5-mini`) plus `Groq` (`openai/gpt-oss-120b`) orchestrated through `backend/llm/service.ts` for structured exercise plans.
- `Zod` + `zod-to-json-schema` to embed the plan schema (`ai/schema.ts`) in every prompt and validate responses.
- `Lucide React` icons, `react-hot-toast`, and custom `/app/component` utilities for UI polish and notifications.

## Quickstart Guide
### Prerequisites
- Node.js 20+ and npm (or your preferred Node package manager).
- Supabase project with the tables/RPCs referenced in `backend/<*>` (especially `exercise_plans`, `session_exercises`, `insert_informationinput_data`, `complete_session_exercise`, `upsert_user_exercise_data`).
- Valid LLM keys: a Groq-compatible key (used as `NEXT_PUBLIC_LLM_API_KEY`) and an OpenAI key (`OPENAI_API_KEY`).

### Installation
1. Clone the repo and `cd` into `hackathon_trailblazer`.
2. Run `npm install` to populate `node_modules`.

### Environment Variable Setup
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase HTTP endpoint for both client and server helpers.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anon key for front-end auth helpers.
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for secure RPCs (mirrors `lib/defaultData` fallback writes).
- `NEXT_PUBLIC_LLM_API_KEY`: Groq API key used by the chat completions client in `backend/llm/service.ts`.
- `OPENAI_API_KEY`: OpenAI Responses key for reasoning prompts (`gpt-5-mini`).

Store them in a `.env.local` (or equivalent) before running.

### Running the App
- `npm run dev` – start the Next.js dev server (defaults to `http://localhost:3000`).
- `npm run lint` – run ESLint across the TypeScript code.
- `npm run build` – produce a production build.
- `npm run start` – launch the built app (use after `npm run build`).

### Basic Usage Instructions
1. Visit `http://localhost:3000` and click **Generate Your Plan**. If you are not signed in, the landing page exposes the login/signup buttons.
2. Create an account via `/signup` and log in (`/login`), both wired to `app/auth/actions.ts`.
3. Complete the intake form at `/informationinput` (see `app/informationinput/*`), optionally using “Fill With Mock Data”.
4. Tap **Generate Plan** to POST to `/api/generate-plan`, which saves the intake, asks the LLM for a plan, tags progress metadata, and upserts it.
5. You land on `/overview`, where `app/overview/overview_dashboard.tsx` fetches `/api/exercise-plan`, renders sessions, and opens `ExerciseModalContent` with detailed steps.
6. Mark exercises complete via the modal, which calls `/api/exercise-progress` and triggers the success/completion modals.
7. Visit `/userprofile` to view account info, check plan status via `/api/check-plan`, and update your name once a plan exists.
8. Use the nav dropdown (`app/component/userdropdown.tsx`) to log out (via `logoutUser`) or return to the protected sections guarded by `proxy.ts`.

## Folder Structure
```
.
├── app/                     # Next.js App Router UI, auth, guard middleware, and API surface
│   ├── api/                 # Edge routes (generate-plan, exercise-plan/progress, check-plan, user ping)
│   ├── auth/                # Server actions for Supabase sign-in/up/out
│   ├── component/           # Shared UI pieces (modal, user dropdown)
│   ├── login/               # Login experience with terms modal
│   ├── signup/              # Signup experience matching login styles
│   ├── informationinput/    # Intake form, payload builder, mock filler, and supporting fields
│   ├── overview/            # Plan/dashboard view, exercise modal, celebration modals
│   ├── userprofile/         # Profile form, plan re-check, and update action
│   ├── globals.css          # Tailwind CSS import and modal scroll lock helpers
│   ├── layout.tsx           # Global nav, fonts, user session, and toaster
│   └── page.tsx             # REHAB BUDDY landing hero with auth gating logic
├── backend/                 # Server helpers for Supabase and business services
│   ├── llm/                 # `ExerciseService` orchestrating Groq + OpenAI with schema enforcement
│   ├── overview/            # `getExercisePlanData` that flattens plan session/exercise joins
│   ├── informationinput/    # `insertInformationInput` RPC wrapper
│   ├── checkplan/           # Simple Supabase fetch used by profile checks
│   ├── utils/               # Shared constants (e.g., `SESSION_STATUS`)
│   ├── server.ts            # `createClient` wrapper for Supabase SSR + cookies
│   └── supabase-client.ts   # Client-side Supabase helper
├── ai/                      # Prompt, schema, and example payload definitions for the LLM
├── data/                    # JSON examples used in prompts (stroke recovery, active user, etc.)
├── lib/                     # Backup plan fallback (`defaultData`), mock inputs, Supabase helpers
├── public/                  # Static assets (logo, icons)
├── types/                   # Shared domain models (profiles, sessions, exercises, plan metadata)
├── proxy.ts                 # Next.js middleware redirecting guarded routes and auth pages
├── package.json             # Scripts and dependency metadata
├── tsconfig.json            # TypeScript configuration
```

## Feature List
- AI-backed plan generation pipeline with schema validation and retries (`app/api/generate-plan/route.ts`, `backend/llm/service.ts`).
- Guided intake experience capturing personal info, medical conditions, mobility, preferences, environment, and additional notes (`app/informationinput/*` and `payloadBuilder.ts`).
- Overview dashboard with roadmap, session cards, success/confetti modals, and completion percentages (`app/overview/overview_dashboard.tsx`, `exercise_modal_content.tsx`).
- Exercise completion workflow that updates Supabase via RPC and keeps modals in sync (`app/api/exercise-progress/route.ts`).
- Supabase auth/profile journey plus middleware guards for protected routes (`app/login/page.tsx`, `app/signup/page.tsx`, `app/userprofile/*`, `proxy.ts`).
- Mock data and fallback plan support for resilience (`lib/mockData.ts`, `lib/defaultData.ts`, `data/examples`, `FillWithMockDataButton.tsx`).
- Reusable UI primitives and layout glue (global nav in `app/layout.tsx`, `modal.tsx`, `userdropdown.tsx`).

## API or Component Overview
- `/api/generate-plan`: persists intake data, triggers the LLM plan generator, appends progress metadata, and upserts the record using `insertInformationInput`.
- `/api/exercise-plan`: fetches the plan/session tree via `getExercisePlanData` and returns normalized `ExercisePlanData` for the dashboard.
- `/api/exercise-progress`: calls the `complete_session_exercise` RPC so completed exercises update in Supabase.
- `/api/check-plan`: lets `/userprofile` confirm plan existence within the authenticated user’s scope.
- `/api/user`: answers whether the visitor is logged in so the landing hero can gate buttons.
- `app/informationinput/*` and `payloadBuilder.ts`: capture form fields, build the typed `InformationInputData`, and ship it to the API.
- `app/overview/*`: visualize progress, show session cards, drive modals, and gate completion updates with `/api/exercise-progress`.
- `proxy.ts`: middleware that keeps `/informationinput`, `/overview`, `/login`, and `/signup` aligned with auth state and plan presence.

## Deployment Instructions
- **Vercel:** Connect this repo, set the env vars listed above, and Vercel runs `npm run build`/`npm run start` automatically (App Router supported).
- **Netlify:** Use `@netlify/plugin-nextjs`, set `build command = npm run build`, `publish directory = .next`, and add the env vars in site settings.
- **Docker:** Base on `node:20-alpine`, copy files, run `npm ci`, `npm run build`, and `CMD ["npm","run","start"]`. Pass required env vars as secrets and expose port 3000.
- **On-prem:** Install Node 20, run `npm install`, place `.env.local` with Supabase + LLM keys, `npm run build`, and keep `npm run start` running with PM2/systemd.

## Contribution Guide
- Branch naming: use clear prefixes like `feature/`, `fix/`, or `chore/` off `main`.
- Coding style: follow existing TypeScript + Tailwind patterns, keep `use client`/`use server` boundaries explicit, and respect `types/` contracts.
- Commits: prefer conventional styles (`feat:`, `fix:`, `docs:`) with a short description of intent.
- PRs: run `npm run lint`, describe manual verification (intake ➜ generate plan ➜ overview), and request review noting any open questions.

## License
TBD – please insert the preferred license text here (e.g., MIT).
