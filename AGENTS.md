# Repository Guide

## Purpose

- This is the private admin UI for the owner's personal website.
- It is run only on the owner's local machine and is not deployed or intended
  for other developers.
- The repository is public. Never commit credentials, account identifiers,
  bucket names, role details, tokens, private URLs, `.env` contents, or other
  sensitive data.

## Architecture

- Next.js App Router with strict TypeScript, React 19, and MUI/Emotion.
- `app/list/[articleType]` lists articles; `app/edit` creates and edits them.
- `api/` contains browser-side API helpers.
- `app/api/` contains local server routes for AWS-signed article and S3
  mutations. Keep AWS credentials and SDK usage server-side.
- `lib/s3.ts` owns S3 configuration and operations.
- `constants/index.ts` contains public website and API endpoints.
- `components/AppContext.tsx` manages shared reference data and UI status.

## Local Development

- Use Yarn and preserve `yarn.lock`.
- Install with `yarn install --frozen-lockfile`; start with `yarn dev`.
- AWS access comes from the standard Node credential provider chain. Do not add
  static credentials or credential fallbacks to source code.
- `S3_BUCKET_NAME` is required for image writes. `AWS_REGION` and
  `S3_PUBLIC_BASE_URL` have defaults. Keep local values in ignored `.env*`
  files and document only placeholders.

## Conventions

- Prefer `@/*` imports for repository modules.
- Mark browser components with `'use client'`; otherwise favor server code.
- Follow the existing Prettier settings: single quotes, semicolons, two spaces,
  80 columns, and ES5 trailing commas.
- Preserve existing wire-format field names such as `article-id` at API
  boundaries; use normalized camelCase names inside UI code.
- Sanitize article HTML wherever it is rendered, and validate untrusted request
  bodies and uploads before expanding mutation behavior.

## Validation

- Run `yarn check:types`, `yarn lint`, and `yarn format:check` after changes.
- There is currently no automated test suite.
- Do not treat deployment as a goal. `output: 'export'` and the local mutation
  route handlers are incompatible for production deployment; do not redesign
  this unless explicitly requested.
