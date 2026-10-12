# rn-base

Expo (React Native) + Next.js monorepo boilerplate. Mobile and web share the API layer, state and translations; each app keeps its own UI.

Based on [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo), with the tRPC/DB/auth server stripped out for a REST backend.

## Stack

| Concern | Choice |
|---|---|
| Monorepo | pnpm workspaces (catalogs) + Turborepo |
| Mobile | Expo SDK 54, Expo Router 6, New Architecture, NativeWind |
| Web | Next.js 16 (App Router), Tailwind v4, shadcn/ui |
| Server state | TanStack Query |
| Client state | Zustand (persisted) |
| HTTP | ky + zod response validation |
| i18n | i18next + react-i18next (`vi`, `en`) |
| Tests | Vitest for shared packages |
| Lint | ESLint flat config + Prettier |

## Structure

```
apps/
  mobile/            Expo app (iOS + Android)
    src/app/         routes (expo-router): login, (app)/(tabs), (app)/product/[id]
    src/features/    auth, products, settings
    src/components/  mobile UI primitives
    src/core/        env, storage, services, providers
  web/               Next.js app
    src/app/         routes: / (landing), /login, (dashboard)/products, (dashboard)/settings
    src/features/    auth, products, settings, landing
    src/components/  web UI kit (shadcn/ui in components/ui) + shared views
    src/core/        services, providers
packages/
  api/               REST client, error mapping, zod schemas, endpoints, query hooks
  store/             Zustand stores (session, settings) with pluggable storage
  i18n/              i18next setup + locales/*.json
tooling/             shared eslint, prettier, tailwind theme tokens, tsconfig
```

Rules of thumb:

- `packages/` holds only code both apps run: API calls, types, state, translations. Platform UI never goes there.
- UI lives in the app (`apps/web/src/components/ui` for shadcn, `apps/mobile/src/components` for native). Both apps share design tokens through `tooling/tailwind/theme.css`.
- Inside an app, code is grouped by feature. Route files stay thin and re-export a feature screen.
- Server data goes through TanStack Query; Zustand only holds client state (session, preferences).

## Getting started

```bash
pnpm install
pnpm dev:web          # http://localhost:3000
pnpm dev:mobile       # Expo dev server (development flavor)
```

The sample app talks to [DummyJSON](https://dummyjson.com). Demo login: `emilys` / `emilyspass`.

Native builds use a dev client (`expo-dev-client`): run `pnpm -F @rnbase/mobile ios` or `android` once to build it locally, or use `eas build --profile development`.

## Environments / flavors

Three environments: `development`, `staging`, `production`.

**Mobile.** `APP_ENV` picks the flavor. `app.config.ts` reads `apps/mobile/.env.<APP_ENV>`, sets the bundle id / app name / URL scheme, and exposes values through `extra`. `src/core/env.ts` validates them with zod at startup.

| APP_ENV | Bundle id | Name |
|---|---|---|
| development | `com.dungpham.rnbase.dev` | RN Base Dev |
| staging | `com.dungpham.rnbase.stg` | RN Base Stg |
| production | `com.dungpham.rnbase` | RN Base |

```bash
pnpm -F @rnbase/mobile dev            # development
pnpm -F @rnbase/mobile dev:staging
pnpm -F @rnbase/mobile build:staging  # eas build --profile staging
```

EAS profiles in `apps/mobile/eas.json` set `APP_ENV` and an update channel per flavor.

**Web.** Next.js loads `apps/web/.env.development` for `next dev` and `.env.production` for `next build`. Staging builds use `pnpm build:web:staging`. Only `NEXT_PUBLIC_*` values reach the browser; `src/env.ts` validates them.

Env files hold public config only. Everything in them ships inside the app bundle, so never put secrets there.

## Adding a feature

1. Add a zod schema in `packages/api/src/schemas`, an endpoint in `src/endpoints`, a hook in `src/hooks`, and export them from `src/index.ts`.
2. Add strings to both `packages/i18n/src/locales/vi.json` and `en.json` (a test keeps them in sync).
3. Build the screen under `apps/<app>/src/features/<feature>` and add a thin route file.

## Scripts

| Command | What it does |
|---|---|
| `pnpm typecheck` | TypeScript across all workspaces |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:fix` | Prettier |
| `pnpm test` | Vitest in shared packages |
| `pnpm build:web` | Production web build |

## Adding desktop later

Add `apps/desktop` (for example Tauri wrapping the web app). The shared packages need no changes.
