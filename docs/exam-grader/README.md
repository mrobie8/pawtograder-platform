# PawtoGrader Exam Grader: Scan & Match redesign

This is our team's final interface project. It redesigns the Scan & Match screen in PawtoGrader's Exam (Scan & OCR) workflow. The repository is a fork of the full PawtoGrader platform, so the [root README](../../README.md) describes the platform as a whole. This file covers only our project.

**Team:** Liam Gilbert, Hairui Li, Maya Robie, Vy Truong, Zhile Wang

**Report:** _add the PDF report link here_

## Project description

PawtoGrader lets instructors upload scanned paper exams. It reads each scan with OCR, suggests a roster student for it, and creates submissions for grading once an instructor confirms the matches. The existing Scan & Match interface is slow to use on hundreds of scans, and it is easy to assign an exam to the wrong student.

Our redesign keeps PawtoGrader's backend unchanged and rebuilds the review screen so instructors can:

- see each scan in one of four categories: Needs Attention, Confident, Validated, or Flagged
- confirm a suggested match, or search the roster by name or student ID and assign a different student
- get a warning before assigning a student who is already matched to another confirmed scan
- flag unreadable scans so they are left out of submission creation
- confirm all confident matches at once after a spot-check dialog
- follow review progress, read a batch summary, and finalize submissions
- do the common actions from the keyboard (arrow keys, Enter, F, R, Esc)

The screen's states are S0 to S8 in the state diagram in the report. The requirements (F1 to F16, D1 to D6, I1 to I10, C1 to C5) are also in the report.

## Technology stack

| Layer      | Choice                                                  |
| ---------- | ------------------------------------------------------- |
| Interface  | Next.js (App Router), React, TypeScript, Chakra UI      |
| Backend    | Supabase (PostgreSQL, auth, storage, Edge Functions)    |
| Tooling    | npm, ESLint, Prettier                                   |
| Unit tests | Jest (`tests/unit/`)                                    |
| E2E tests  | Playwright (`tests/e2e/`), run against a local Supabase |

We use the platform's stack so the work can be merged upstream as a pull request.

## Where the code lives

| Path                                                                    | Role                                                                         |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `app/course/[course_id]/manage/assignments/[assignment_id]/exam/scans/` | Scan & Match page (view hierarchy root)                                      |
| `components/exam/`                                                      | New view components (scan table, dialogs, review summary)                    |
| `hooks/`                                                                | New controller hooks (scan state, selection, open dialog)                    |
| `lib/exam/`                                                             | Model: existing helpers plus new categorize, duplicate, and progress modules |
| `supabase/functions/exam-async-worker/`                                 | Existing OCR, matching, and finalization worker (not modified)               |

## Build and run

You need Node.js v22 (we suggest [nvm](https://github.com/nvm-sh/nvm)).

```bash
git clone https://github.com/mrobie8/pawtograder-platform.git
cd pawtograder-platform
npm install
cp .env.local.staging .env.local   # then fill in your own values
npm run dev
```

The app runs at `https://localhost:3000`. It uses a self-signed certificate, so click through the browser warning.

Signups are disabled on staging, so the staging backend is enough only if you already have an account there. To work on Scan & Match with seeded data, run a local Supabase instead. [AGENTS.md](../../AGENTS.md) has the setup and seeding steps. Seeded users have the password `change-it`, and an email containing "instructor" gets the instructor role.

To reach the screen, sign in as an instructor, open an assignment from the Assignments page, open its Exam (Scan & OCR) page, then open the "2. Scan & Match" step.

Other commands:

```bash
npm run build       # production build
npm run lint        # ESLint and Prettier check
```

## Tests

Unit tests (Jest):

```bash
npm test                                                     # all unit tests
npx jest tests/unit/exam-scan-match-categories.test.ts       # one file
```

End-to-end tests (Playwright) need a local Supabase running and seeded:

```bash
npx playwright test tests/e2e/exam-scan-match-redesign.spec.ts
```

Our new tests are placeholders that map to the requirements in the report. `it.todo` and `test.fixme` entries show up as pending until we implement them.

| File                                            | Covers                                                       |
| ----------------------------------------------- | ------------------------------------------------------------ |
| `tests/unit/exam-scan-match-categories.test.ts` | Review categories, progress counter, confidence (D4, I1, I7) |
| `tests/unit/exam-scan-match-duplicates.test.ts` | Duplicate detection and reassignment logic (F7 to F9)        |
| `tests/e2e/exam-scan-match-redesign.spec.ts`    | Interface flows (F1 to F16, I2 to I10, C4, D2, D5)           |

The platform already has scan-review tests that we reuse as fixtures, such as `tests/e2e/examScanFixture.ts` and `tests/e2e/exam-scan-review-ui.spec.ts`.

## Workflow

We work in this fork and open pull requests against the upstream PawtoGrader repository for review (requirement C5).
