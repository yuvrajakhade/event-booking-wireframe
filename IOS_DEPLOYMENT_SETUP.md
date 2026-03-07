# iOS Automatic Deployment Setup

This guide explains how to set up automatic iOS builds on every git push using GitHub Actions.

## Overview

When you push code to the `main` or `master` branch, GitHub Actions will:

1. ✅ Build the web app
2. ✅ Sync to iOS platform
3. ✅ Build iOS app (IPA)
4. ✅ Upload artifact to GitHub

## Prerequisites

### 1. Apple Developer Account

- Paid Apple Developer Program membership ($99/year)
- Access to App Store Connect
- Team ID from your Apple Developer account

### 2. Code Signing Requirements

You need:

- **Distribution Certificate** (.p12 file)
- **Provisioning Profile** (.mobileprovision file)
- **P12 Password** (password for the certificate)

## Step-by-Step Setup

### Step 1: Export Your Certificates

#### On your Mac:

1. **Export Distribution Certificate**:

   ```bash
   # Open Keychain Access app
   # Go to: Keychain Access > My Certificates
   # Find: "Apple Distribution: Your Name (TEAM_ID)"
   # Right-click > Export "Apple Distribution..."
   # Save as: certificate.p12
   # Set a password and remember it
   ```

2. **Find Your Provisioning Profile**:

   ```bash
   # Option A: Download from Apple Developer Portal
   # Go to: https://developer.apple.com/account/resources/profiles/list
   # Download your App Store provisioning profile

   # Option B: Find locally
   open ~/Library/MobileDevice/Provisioning\ Profiles/
   # Find the profile matching your app ID
   ```

3. **Get Your Team ID**:

   ```bash
   # Go to: https://developer.apple.com/account
   # Look for "Team ID" in Membership Details
   # Example: ABC123XYZ
   ```

4. **Convert to Base64**:

   ```bash
   # Certificate
   base64 -i certificate.p12 -o certificate.txt

   # Provisioning Profile
   base64 -i profile.mobileprovision -o profile.txt
   ```

### Step 2: Configure GitHub Secrets

Go to your GitHub repository:

```
Settings > Security > Secrets and variables > Actions > New repository secret
```

Add these secrets:

| Secret Name                      | Value                        | Description                         |
| -------------------------------- | ---------------------------- | ----------------------------------- |
| `BUILD_CERTIFICATE_BASE64`       | Content of `certificate.txt` | Base64 encoded .p12 certificate     |
| `P12_PASSWORD`                   | Your certificate password    | Password you set when exporting     |
| `BUILD_PROVISION_PROFILE_BASE64` | Content of `profile.txt`     | Base64 encoded provisioning profile |
| `KEYCHAIN_PASSWORD`              | Any secure password          | Temporary password for CI keychain  |

### Step 3: Update ExportOptions.plist

Edit `ios/App/ExportOptions.plist` and replace:

```xml
<key>teamID</key>
<string>YOUR_TEAM_ID</string>  <!-- Replace with your actual Team ID -->

<key>provisioningProfiles</key>
<dict>
    <key>com.svojuspalace.eventflow</key>
    <string>YOUR_PROVISIONING_PROFILE_NAME</string>  <!-- Replace with profile name -->
</dict>
```

To find your provisioning profile name:

```bash
# Open the .mobileprovision file in a text editor
# Look for <key>Name</key> followed by <string>Profile Name</string>
```

### Step 4: Configure Xcode Project

1. Open Xcode:

   ```bash
   npm run ios
   ```

2. Select the **App** target in Xcode

3. Go to **Signing & Capabilities**:
   - Uncheck "Automatically manage signing"
   - Select your provisioning profile
   - Ensure Bundle Identifier matches: `com.svojuspalace.eventflow`

4. Go to **Build Settings**:
   - Search for "Code Signing Identity"
   - Set Release to: "Apple Distribution"

### Step 5: Test the Workflow

1. **Commit and push**:

   ```bash
   git add .
   git commit -m "Setup iOS CI/CD"
   git push origin main
   ```

2. **Monitor the build**:
   - Go to: `https://github.com/yuvrajakhade/event-booking-wireframe/actions`
   - Watch the "iOS Build" workflow

3. **Download the IPA**:
   - Once complete, click on the workflow run
   - Scroll to "Artifacts" section
   - Download `EventFlow-iOS-{commit-hash}`

## Workflow Details

### Workflows Created

1. **`ios-build.yml`** - iOS-only builds
   - Triggers: Push to main/master, Pull Requests
   - Outputs: IPA file (release) or validation (PRs)

2. **`deploy-all.yml`** - Build all platforms
   - Triggers: Push to main/master
   - Builds: Web, Android APK, iOS (debug for validation)

### What Happens on Push

```
Push to main/master
    ↓
GitHub Actions triggered
    ↓
1. Checkout code
2. Install Node.js dependencies
3. Build web app (npm run build)
4. Install CocoaPods
5. Sync Capacitor (npx cap sync ios)
6. Import signing certificates
7. Build iOS app with Xcode
8. Export IPA
9. Upload as artifact
    ↓
IPA ready for download/TestFlight
```

## Deploying to App Store

### Option 1: Manual Upload

```bash
# Download IPA from GitHub Actions artifacts
# Upload to App Store Connect:
# https://appstoreconnect.apple.com
# Go to: My Apps > Your App > TestFlight or App Store
# Upload the IPA
```

### Option 2: Automatic Upload (Advanced)

Add to GitHub secrets:

- `APP_STORE_CONNECT_API_KEY_ID`
- `APP_STORE_CONNECT_ISSUER_ID`
- `APP_STORE_CONNECT_API_KEY_BASE64`

Then add this step to `.github/workflows/ios-build.yml`:

```yaml
- name: Upload to TestFlight
  env:
    API_KEY_ID: ${{ secrets.APP_STORE_CONNECT_API_KEY_ID }}
    API_ISSUER_ID: ${{ secrets.APP_STORE_CONNECT_ISSUER_ID }}
    API_KEY: ${{ secrets.APP_STORE_CONNECT_API_KEY_BASE64 }}
  run: |
    echo "$API_KEY" | base64 --decode > AuthKey.p8
    xcrun altool --upload-app \
      --type ios \
      --file $RUNNER_TEMP/build/*.ipa \
      --apiKey $API_KEY_ID \
      --apiIssuer $API_ISSUER_ID
```

## Testing Locally

Before pushing, test locally:

```bash
# Build web
npm run build

# Sync iOS
npx cap sync ios

# Open Xcode
npm run ios

# In Xcode: Product > Archive
# Follow the export wizard
```

## Troubleshooting

### "No signing certificate found"

- Ensure `BUILD_CERTIFICATE_BASE64` is set correctly in GitHub Secrets
- Verify the certificate is valid (not expired)
- Check the certificate is of type "Apple Distribution"

### "Provisioning profile doesn't match"

- Bundle ID in `ExportOptions.plist` must match your app
- Provisioning profile must include your certificate
- Ensure profile is not expired

### "Pod install fails"

- Check Ruby version (needs 3.0+)
- Clear CocoaPods cache: `pod cache clean --all`
- Update pods: `cd ios/App && pod repo update && pod install`

### "Xcodebuild failed"

- Check Xcode version compatibility
- Ensure scheme name is correct ("App")
- Verify workspace path: `ios/App/App.xcworkspace`

### Workflow doesn't trigger

- Ensure branch name is `main` or `master`
- Check `.github/workflows/` files are committed
- Verify GitHub Actions is enabled in repository settings

## Current Status

✅ GitHub Actions workflows created  
✅ iOS build configuration ready  
⚠️ **Action Required**: Add GitHub Secrets (certificates)  
⚠️ **Action Required**: Update `ExportOptions.plist` with Team ID

## Next Steps

1. Export your Apple certificates (see Step 1)
2. Add secrets to GitHub (see Step 2)
3. Update ExportOptions.plist (see Step 3)
4. Push code and monitor first build
5. Download IPA from Actions artifacts
6. Upload to TestFlight or App Store

## Resources

- [GitHub Actions for iOS](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)
- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [App Store Connect](https://appstoreconnect.apple.com/)
- [Apple Developer Portal](https://developer.apple.com/account/)
- [Fastlane Documentation](https://docs.fastlane.tools/) (for advanced automation)

## Support

For issues:

1. Check workflow logs in GitHub Actions tab
2. Review troubleshooting section above
3. Consult Apple Developer documentation
4. Check Capacitor iOS documentation
