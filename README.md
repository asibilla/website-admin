# Website Admin

Local admin application for managing content on my personal website. It can
list, create, edit, and delete articles and upload or remove article images.

This is a personal tool, not a reusable project:

- It runs only on my local machine and is not deployed.
- It depends on my website APIs and an authorized AWS identity.
- It has no application-level authentication because it is not intended to be
  exposed to a network.
- The source repository is public, but credentials and local configuration are
  not.

## How it works

The application uses Next.js App Router, React, TypeScript, and MUI. Public
article and reference data are read from the website services. Mutations pass
through local Next.js route handlers:

- Article writes are signed for API Gateway with AWS Signature Version 4.
- Image uploads and deletes use the AWS SDK for S3.
- AWS credentials are resolved on the server through the standard Node.js
  credential provider chain; they are never sent to the browser.

Important areas:

- `app/` — pages and local API route handlers
- `components/` — article editor and shared UI
- `api/` — client-side API helpers
- `lib/s3.ts` — S3 configuration and operations
- `constants/` — public service endpoints and paths
- `types/` — API and UI data types

## Local setup

Requirements:

- Node.js compatible with the versions in `package.json`
- Yarn Classic
- An AWS profile, SSO session, or other locally configured identity with the
  required API Gateway and S3 permissions

Install dependencies:

```bash
yarn install --frozen-lockfile
```

Create an ignored `.env.local` file:

```dotenv
S3_BUCKET_NAME=<bucket-name>
AWS_REGION=us-east-1
S3_PUBLIC_BASE_URL=https://<public-assets-host>
```

`S3_BUCKET_NAME` is required for image mutations. `AWS_REGION` defaults to
`us-east-1`, and `S3_PUBLIC_BASE_URL` has a website-specific default.

Authenticate the expected AWS identity outside this application, then start
the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
yarn check:types
yarn lint
yarn format:check
```

There is no automated test suite.

## Security

Never commit AWS credentials, profile data, account or role identifiers,
bucket names, tokens, or `.env` files. The application routes can mutate live
website data using the active AWS identity, so the development server should
remain local and must not be exposed to untrusted users.

Before publishing changes, review both the current diff and Git history for
accidentally committed secrets.

## Deployment

Deployment is intentionally unsupported. The application combines local
server route handlers with a static-export configuration, which is suitable
for the current development workflow but not a deployable production
architecture.
