# Quick Start: Enable iOS Auto-Deployment

Follow these steps to activate automatic iOS builds on every git push.

## What You'll Need (One-Time Setup)

1. **Apple Developer Account** ($99/year subscription)
2. **Distribution Certificate** (.p12 file)
3. **Provisioning Profile** (.mobileprovision file)
4. **10 minutes** for setup

## Quick Setup (3 Steps)

### Step 1: Export Your Certificates (5 minutes)

**On your Mac:**

1. Open **Keychain Access** app
2. Find **Apple Distribution** certificate
3. Right-click → **Export** → Save as `certificate.p12` (set a password)
4. Get provisioning profile from: https://developer.apple.com/account/resources/profiles/list

**Convert to Base64:**

```bash
base64 -i certificate.p12 | pbcopy
# Now paste this into GitHub Secrets as BUILD_CERTIFICATE_BASE64

base64 -i profile.mobileprovision | pbcopy
# Paste this as BUILD_PROVISION_PROFILE_BASE64
```

### Step 2: Add to GitHub Secrets (2 minutes)

Go to: https://github.com/yuvrajakhade/event-booking-wireframe/settings/secrets/actions/new

Add 4 secrets:

| Secret Name                      | What to paste                                    |
| -------------------------------- | ------------------------------------------------ |
| `BUILD_CERTIFICATE_BASE64`       | Output from: `base64 -i certificate.p12`         |
| `P12_PASSWORD`                   | The password you set when exporting certificate  |
| `BUILD_PROVISION_PROFILE_BASE64` | Output from: `base64 -i profile.mobileprovision` |
| `KEYCHAIN_PASSWORD`              | Any secure password (e.g., `MySecurePass123!`)   |

### Step 3: Update Team ID (1 minute)

1. Find your Team ID: https://developer.apple.com/account (look for "Team ID")
2. Edit `ios/App/ExportOptions.plist`:
   ```xml
   <key>teamID</key>
   <string>ABC123XYZ</string>  <!-- Replace with YOUR Team ID -->
   ```

## That's It! 🎉

Now every time you push to `main` or `master`:

```bash
git add .
git commit -m "Your changes"
git push
```

GitHub Actions will:

1. ✅ Build your web app
2. ✅ Build iOS app
3. ✅ Create IPA file
4. ✅ Upload to GitHub (download from Actions artifacts)

## View Your Builds

Go to: https://github.com/yuvrajakhade/event-booking-wireframe/actions

Click on any workflow run → Scroll to "Artifacts" → Download the IPA

## What Now?

### Option A: Test on Device (TestFlight)

1. Download IPA from GitHub Actions
2. Upload to App Store Connect: https://appstoreconnect.apple.com
3. Go to TestFlight
4. Invite testers

### Option B: Submit to App Store

1. Download IPA from GitHub Actions
2. Upload to App Store Connect
3. Fill in app details
4. Submit for review

## Need Help?

See detailed guide: [IOS_DEPLOYMENT_SETUP.md](./IOS_DEPLOYMENT_SETUP.md)

## Current Files Status

✅ `.github/workflows/ios-build.yml` - iOS build workflow  
✅ `.github/workflows/deploy-all.yml` - All platforms workflow  
✅ `ios/App/ExportOptions.plist` - Export configuration (needs Team ID)  
⚠️ **GitHub Secrets** - Need to be added (see Step 2)

---

**Time to activate:** ~10 minutes  
**Runs on:** Every push to main/master  
**Cost:** Free (GitHub Actions included for public repos)
