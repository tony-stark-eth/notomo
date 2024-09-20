# Vite SvelteKit Docker Template

This template offers the following things, ready to use, in a dockerized environment:

- [Vite](https://vitejs.dev/)
- [SvelteKit](https://kit.svelte.dev/) with [Svelte 5](https://svelte.dev/blog/svelte-5-release-candidate) (TypeScript)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Prettier](https://prettier.io/)
- [Svelte-Check](https://www.npmjs.com/package/svelte-check)
- Testing Svelte with [Vitest](https://vitest.dev/) & [Testing Library](https://www.npmjs.com/package/@testing-library/svelte)
- E2E Testing with [Playwright](https://playwright.dev/)

## Create with it!

Create with Svelte 5 (experimental):

```sh
npx degit bavragor/vite-sveltekit-docker-template app-name
```

## Requirements

- Docker
- make

## Installation

```sh
make setup
make up
make install
```

## Development

```sh
docker compose exec app pnpm run dev
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

Or with coverage in build directory

```sh
docker compose exec app pnpm run test:coverage
```

E2E Testing

```sh
docker compose exec app pnpm run test:e2e
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
