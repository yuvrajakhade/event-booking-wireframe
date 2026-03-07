# Capacitor Native Build Guide

This guide explains how to build and deploy EventFlow as native Android and iOS apps using Capacitor.

## Prerequisites

### For Android

- Android Studio (latest version)
- Java Development Kit (JDK) 17 or higher
- Android SDK (API level 22 or higher)

### For iOS

- macOS computer
- Xcode 14 or higher
- CocoaPods installed (`sudo gem install cocoapods`)
- Apple Developer account (for distribution)

## Initial Setup

### 1. Build the Web App

First, build the web application:

```bash
npm run build
```

### 2. Initialize Capacitor (First Time Only)

If this is your first time setting up Capacitor, initialize it:

```bash
npx cap init
```

When prompted:

- App name: `EventFlow`
- App ID: `com.swojuspalace.eventflow`
- Web dir: `dist`

Note: The `capacitor.config.json` is already configured, so you can skip this step.

### 3. Add Platforms

#### Add Android Platform

```bash
npx cap add android
```

#### Add iOS Platform (macOS only)

```bash
npx cap add ios
```

## Building for Production

### Android

#### Step 1: Sync and Open Project

```bash
npm run android
```

This will:

1. Build the web app
2. Sync assets to Android
3. Open Android Studio

#### Step 2: Configure Android Studio

1. Wait for Gradle sync to complete
2. Go to **Build > Generate Signed Bundle / APK**
3. Choose **APK** or **Android App Bundle**
4. Create or select your keystore
5. Build the release version

#### Step 3: Generate APK

For unsigned debug APK (testing only):

```bash
cd android
./gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

For release APK:

```bash
cd android
./gradlew assembleRelease
```

### iOS

#### Step 1: Sync and Open Project

```bash
npm run ios
```

This will:

1. Build the web app
2. Sync assets to iOS
3. Open Xcode

#### Step 2: Configure Xcode

1. Select your development team in **Signing & Capabilities**
2. Update the **Bundle Identifier** if needed
3. Configure provisioning profiles

#### Step 3: Build and Archive

1. Choose **Product > Archive** in Xcode
2. Once archived, click **Distribute App**
3. Follow the wizard to upload to App Store Connect or export for TestFlight

## Development Workflow

### Live Reloading (Android/iOS)

For development with live reload:

1. Start the Vite dev server:

```bash
npm run dev
```

2. Update Capacitor config to point to your local server:

```json
{
  "server": {
    "url": "http://localhost:5173",
    "cleartext": true
  }
}
```

3. Sync and run:

```bash
npx cap sync
npx cap open android
# or
npx cap open ios
```

**Remember**: Remove the `server.url` before building for production!

## Quick Commands Reference

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run build:native` | Build web app and sync to native |
| `npm run android`      | Open Android Studio              |
| `npm run ios`          | Open Xcode                       |
| `npx cap sync`         | Sync web assets to native        |
| `npx cap open android` | Open Android Studio              |
| `npx cap open ios`     | Open Xcode                       |

## Updating Native Apps

When you make changes to the web app:

```bash
npm run build:native
```

Then recompile in Android Studio or Xcode.

## App Icons and Splash Screens

### Android

1. Place your icon assets in: `android/app/src/main/res/`
2. Use Android Studio's **Image Asset Studio** (right-click `res` > New > Image Asset)

### iOS

1. Place your icon in: `ios/App/App/Assets.xcassets/AppIcon.appasset/`
2. Use Xcode's asset catalog to manage icons

### Automated Tool (Recommended)

Use Capacitor Assets:

```bash
npm install -g @capacitor/assets
```

Create an `assets` folder with:

- `icon.png` (1024x1024)
- `splash.png` (2732x2732)

Then run:

```bash
npx capacitor-assets generate
```

## Troubleshooting

### Android Build Fails

- Ensure JDK 17+ is installed
- Clear Gradle cache: `cd android && ./gradlew clean`
- Invalidate Android Studio caches: **File > Invalidate Caches**

### iOS Build Fails

- Run `pod install` in `ios/App` directory
- Clean build folder in Xcode: **Product > Clean Build Folder**
- Update CocoaPods: `pod repo update`

### App doesn't update

- Clear the dist folder: `rm -rf dist`
- Rebuild and sync: `npm run build:native`

## Production Checklist

Before releasing:

- [ ] Remove `server.url` from `capacitor.config.json`
- [ ] Update version in `package.json` and native configs
- [ ] Test on physical devices
- [ ] Configure proper app signing
- [ ] Set up proper content security policies
- [ ] Test offline functionality
- [ ] Review privacy policy and data handling

## Distribution

### Android

- Upload AAB to Google Play Console
- Configure app listing and screenshots
- Submit for review

### iOS

- Upload IPA to App Store Connect
- Configure app metadata
- Submit for App Store review

## Support

For Capacitor-specific issues, see:

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Android Guide](https://capacitorjs.com/docs/android)
- [Capacitor iOS Guide](https://capacitorjs.com/docs/ios)
