---
description: Project guidance for agents working on this Bun, Fastify, Prisma API.
globs: '*.ts, *.tsx, *.js, *.jsx, package.json, prisma/**/*.prisma, tests/**/*.ts'
alwaysApply: true
---

# Project Guide

This is a Bun-powered TypeScript API using Fastify, Prisma 7, Postgres, TypeBox, and Vitest.

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
- Prisma client output is configured in `prisma/schema.prisma` as `generated/prisma`; imports should follow the existing `src/shared/db/prisma.ts` pattern.
- Database access goes through the shared `prisma` export from `src/shared/db/prisma.ts`.
- This project currently loads `dotenv/config` in `src/shared/db/prisma.ts`; do not remove or duplicate environment loading unless you are intentionally changing configuration behavior.

## Project Structure

- `src/app.ts` builds the Fastify app, registers plugins, routes, error handling, and health checks without listening on a port.
- `src/index.ts` starts the Fastify server and owns process-level shutdown/error handling.
- `src/features/` contains feature modules. Each feature keeps its routes, controllers, services, repositories, schemas, mappers, types, and feature errors together.
- `src/plugins/` contains Fastify plugin registration helpers.
- `src/shared/` contains cross-feature infrastructure such as Prisma, app errors, HTTP validation helpers, and health checks.
- `prisma/schema.prisma` defines the database schema.
- `tests/features/` contains Vitest tests aligned to feature modules.

## API Conventions

- Keep request body types explicit on Fastify routes and controllers.
- Validate request payloads with Fastify schemas and the existing TypeBox pattern when adding endpoints.
- Keep response mapping out of controllers when a mapper already exists or a new DTO shape is needed.
- Prefer feature-specific errors or shared `AppError` from `src/shared/errors/app-error.ts` over ad hoc error payloads.
- Use snake_case fields where the current API and Prisma model already use snake_case, such as `first_name`, `last_name`, `created_at`, and `updated_at`.

## Testing

- Add or update Vitest coverage for route behavior changes.
- Use unique test data for database-backed tests to avoid collisions.
- Route tests should import `buildApp` from `src/app.ts`; avoid importing `server` from `src/index.ts` because it starts the listener.
- Prefer assertions against public HTTP responses, not implementation internals, for route tests.
- Consider to use it.each to reduce number of tests if the tests are very similar

## Editing Notes

- Keep changes focused and avoid unrelated formatting churn.
- Do not overwrite user edits in tracked or untracked files.
- Before changing Prisma schema or generated client usage, check whether migrations and `bun run db:generate` are needed.
