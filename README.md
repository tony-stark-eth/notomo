# Notomo - Notes App

## Used Technologies

- [Vite](https://vitejs.dev/)
- [SvelteKit](https://svelte.dev/) with [Svelte 5](https://svelte.dev/) (TypeScript)
- [MikroORM](https://mikro-orm.io/)
- [Lucia Auth](https://lucia-auth.com/) with [Arctic](https://arctic.js.org/) for OAuth Sign-In via Github

### Styling

- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

### Infrastructure

- [Docker](https://www.docker.com/)
- [Github CI/CD](https://github.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Code Style

- [ESLint](https://www.npmjs.com/package/eslint)
- [Prettier](https://prettier.io/)
- [Svelte-Check](https://www.npmjs.com/package/svelte-check)

### Testing

- Test Runner: [Vitest](https://vitest.dev/)
- Integration Testing: [Testing Library](https://www.npmjs.com/package/@testing-library/svelte)
- E2E Testing: [Playwright](https://playwright.dev/)

## Requirements

- Docker
- make

## Installation

```sh
make setup
make up
make install
docker compose exec app pnpm run mikro-orm schema:fresh --run
```

## Development

```sh
docker compose exec app pnpm run dev
```

Seed database

```sh
docker compose exec app pnpm run mikro-orm schema:fresh --run --drop-db --seed
```

## Build

```sh
docker compose exec app pnpm run build
```

## Preview

```sh
docker compose exec app pnpm run preview
```

## Test

```sh
docker compose exec app pnpm run test
```

```sh
docker compose exec app pnpm run test:e2e
```

Or with coverage in build directory

```sh
docker compose exec app pnpm run test:coverage
```

## OS specific settings

### Windows + WSL2 + Symlinks + PNPM

In case your running a setup like me,
WSL2 with Ubuntu and have your IDE running on Windows,
your IDE may not be able to use symlinks created by pnpm.
For this scenario you can do the following

```
cp .npmrc.dist .npmrc
make build
make up
make install
```

This will run pnpm without symlinks.

## Git Hooks

This template also supports git hooks to ensure code quality and consistency before commits and pushes.

These can be activated with:

```
make git-enable-hooks
```

Or deactivated with:

```
make git-disable-hooks
```
