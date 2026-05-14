---
description: Project guidance for agents working on this Bun, Fastify, Prisma API.
globs: '*.ts, *.tsx, *.js, *.jsx, package.json, prisma/**/*.prisma, tests/**/*.ts'
alwaysApply: true
---

# Project Guide

This is a Bun-powered TypeScript API using Fastify, Prisma 7, Postgres, Joi, and Vitest.

## Commands

- Install dependencies with `bun install`.
- Start the API with `bun run dev`; it runs `src/index.ts` with Bun hot reload.
- Run tests with `bun run test`.
- Generate Prisma client code with `bun run db:generate`.
- Create/apply development migrations with `bun run db:migrate`.
- Use `bunx --bun <tool>` instead of `npx <tool>`.

## Runtime And Stack

- Use Bun commands instead of Node, npm, yarn, pnpm, or ts-node commands.
- Keep the API on Fastify; do not introduce Express.
- Keep route tests on Vitest and prefer Fastify `server.inject()` for HTTP behavior tests.
- Prisma client output is configured in `prisma/schema.prisma` as `generated/prisma`; imports should follow the existing `src/lib/prisma.ts` pattern.
- Database access goes through the shared `prisma` export from `src/lib/prisma.ts`.
- This project currently loads `dotenv/config` in `src/lib/prisma.ts`; do not remove or duplicate environment loading unless you are intentionally changing configuration behavior.

## Project Structure

- `src/index.ts` creates and starts the Fastify server, registers plugins, routes, error handling, and health checks.
- `src/routes/` contains Fastify route registration. Mount paths are applied from `src/index.ts`.
- `src/controllers/` contains request handlers and business flow.
- `src/schemas/` contains request DTO types and Joi validation schemas.
- `src/mappers/` converts database records to response DTOs.
- `src/helpers/` contains shared errors and validation helpers.
- `src/utils/` contains utility functions such as health checks and Fastify pre-validation wrappers.
- `prisma/schema.prisma` defines the database schema.
- `tests/` contains Vitest tests.

## API Conventions

- Keep request body types explicit on Fastify routes and controllers.
- Validate request payloads with the existing Joi `preValidation` helper when adding endpoints.
- Keep response mapping out of controllers when a mapper already exists or a new DTO shape is needed.
- Prefer existing shared errors from `src/helpers/errors.helper.ts` over ad hoc error payloads.
- Use snake_case fields where the current API and Prisma model already use snake_case, such as `first_name`, `last_name`, `created_at`, and `updated_at`.

## Testing

- Add or update Vitest coverage for route behavior changes.
- Use unique test data for database-backed tests to avoid collisions.
- If a test imports `server` from `src/index.ts`, be aware that importing starts the Fastify server.
- Prefer assertions against public HTTP responses, not implementation internals, for route tests.
- Consider to use it.each to reduce number of tests if the tests are very similar

## Editing Notes

- Keep changes focused and avoid unrelated formatting churn.
- Do not overwrite user edits in tracked or untracked files.
- Before changing Prisma schema or generated client usage, check whether migrations and `bun run db:generate` are needed.
