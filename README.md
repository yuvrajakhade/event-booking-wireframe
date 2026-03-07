# Event Management (React JS + PWA)

Event management dashboard in **React + TypeScript + Vite + PWA** with native iOS and Android support via Capacitor.

## Platform support

- **Web**: Runs in any modern browser
- **Android**: Installable PWA (Add to Home Screen) or native APK via Capacitor
- **iOS**: Installable PWA (Add to Home Screen) or native IPA via Capacitor

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Native Apps (Android & iOS)

To build native Android and iOS apps, see the detailed guide: [CAPACITOR_BUILD_GUIDE.md](./CAPACITOR_BUILD_GUIDE.md)

Quick commands:

```bash
# Build and open Android Studio
npm run android

# Build and open Xcode (macOS only)
npm run ios

# Build web and sync to native platforms
npm run build:native
```

## Automatic Deployments

### Web (Netlify)

✅ **Auto-deploys on push** - Connected to GitHub, deploys automatically

### iOS (GitHub Actions)

✅ **Auto-builds on push** - Requires one-time setup

- See [IOS_DEPLOYMENT_SETUP.md](./IOS_DEPLOYMENT_SETUP.md) for setup instructions
- Builds IPA file on every push to main/master
- Download from GitHub Actions artifacts
- Ready for TestFlight or App Store

### Android (GitHub Actions)

✅ **Auto-builds on push** - Works automatically

- Builds APK on every push to main/master
- Download from GitHub Actions artifacts

## Project Structure

```
web-src/
├── components/      # Reusable UI components
├── pages/          # Screen components
├── layouts/        # Layout wrappers
├── App.tsx         # Main app router
├── main.tsx        # Entry point
└── styles.css      # Global styles

src/
├── data/           # Mock data (legacy)
└── types.ts        # TypeScript types
```

## PWA details

- Service worker and manifest configured via `vite-plugin-pwa`
- App shell entrypoint: `web-src/main.tsx`
- Main UI: `web-src/App.tsx`
- Capacitor config: `capacitor.config.json`

## Data source

- UI uses static mock data from `src/data/mock.ts`
- No backend persistence yet (local-only auth and Muhurt storage)

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run android` - Build and open in Android Studio
- `npm run ios` - Build and open in Xcode
- `npm run build:native` - Build web and sync to native platforms
