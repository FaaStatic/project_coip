# COIP Mobile — Field Inspection Checksheet App

> ⚠️ **Internal project** — built for enterprise field operations. Source should remain private; this README documents the architecture for portfolio discussion purposes.

An **offline-first React Native (Expo) application** for field technicians performing equipment inspections via digital checksheets — replacing paper-based workflows in environments with unreliable connectivity.

## Highlights

- **Offline-first with Realm**: full inspection workflow (jobs, checksheets, equipment, customers) works without network; structured sync layer reconciles with the backend
- **API client codegen with Kubb**: TypeScript types, Zod schemas, and TanStack Query hooks generated directly from the backend's OpenAPI/Swagger spec — no hand-written API types
- **Mobile security hardening**: root/jailbreak detection (jail-monkey), screenshot prevention (react-native-screenguard), app security policies (@bam.tech/react-native-app-security)
- **Complex form flows**: multi-tab checksheets with conditional validation using react-hook-form + Zod resolvers
- Photo capture, annotation (photo editor), resize, and base64 handling for inspection evidence

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React Native 0.74 + Expo SDK 51 (dev client) |
| Local DB | Realm (+ @realm/react) |
| Server state | TanStack Query 5 |
| Client state | Zustand 5 + Immer |
| API codegen | Kubb (OpenAPI → types/Zod/Query hooks) |
| Forms | react-hook-form + Zod |
| Styling | NativeWind 4 (Tailwind) + CVA |
| Navigation | Expo Router + React Navigation |
| Lists | FlashList |
| Testing | Jest + React Native Testing Library |

## Architecture Notes

```
├── schemas/       # Realm object schemas per domain (Jobs, CheckSheets, Equipment, Sync, ...)
├── components/    # Reusable UI (dialogs, pickers, sheets)
├── hooks/         # Data & device hooks
├── types/         # Shared TS types
└── __test__/      # Jest test suites with wrappers/mocks
```

The sync design treats Realm as the source of truth on-device; remote mutations are queued and replayed, with a dedicated `Syncs` schema tracking state per record.
