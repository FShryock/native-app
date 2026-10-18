# VolleyHood logo kit

Navy background everywhere: `#0E1322`

## What goes where

| File | Size | Format | Use |
|---|---|---|---|
| `ios/AppIcon-1024.png` | 1024×1024 | PNG, opaque (no alpha) | iOS app icon. Xcode/Expo generate the smaller sizes; iOS rounds the corners itself. |
| `android/adaptive-icon-foreground-1024.png` | 1024×1024 | PNG, transparent | Android adaptive icon foreground (Expo). Mark sits inside the center safe zone. |
| `android/ic_launcher_foreground-432.png` | 432×432 | PNG, transparent | Same foreground for bare React Native (`mipmap-xxxhdpi`, 108dp × 4). |
| `android/adaptive-icon-monochrome-1024.png` | 1024×1024 | PNG, transparent, white | Android 13+ themed icons. |
| *(background layer)* | — | color `#0E1322` | Android adaptive icon background. |
| `android/play-store-icon-512.png` | 512×512 | PNG, opaque | Google Play store listing. |
| `splash/splash-icon-1024.png` | 1024×1024 | PNG, transparent | Splash screen image; set the splash background to `#0E1322`. |
| `react-native/VolleyHoodMark.tsx` | any | SVG component | In-app logo (headers, login, loading). Needs `react-native-svg`. |
| `react-native/assets/volleyhood-mark(@2x,@3x).png` | 160/320/480 | PNG, transparent | Fallback if you'd rather use `<Image>` than SVG. |
| `web/favicon.svg` | vector | SVG | Mobile-web favicon (modern browsers). |
| `web/favicon-32.png`, `favicon-48.png` | 32, 48 | PNG | Favicon fallbacks. |
| `web/apple-touch-icon-180.png` | 180×180 | PNG | "Add to Home Screen" on iPhone. |
| `web/icon-192.png`, `icon-512.png` | 192, 512 | PNG | Web app manifest / PWA icons. |
| `svg/volleyhood-mark.svg` | vector | SVG, transparent | Master mark. Use this for any new size you need. |
| `svg/volleyhood-icon.svg` | vector | SVG | Mark on navy square (source of the app icons). |
| `svg/volleyhood-logo-dark-bg.svg` | vector | SVG | Mark + "VolleyHood" wordmark for dark backgrounds. Text is set in Archivo 900 (free Google Font); install it, or outline the text in Figma/Illustrator before sending to print. |

## Expo `app.json`

```json
{
  "expo": {
    "icon": "./assets/ios/AppIcon-1024.png",
    "ios": { "icon": "./assets/ios/AppIcon-1024.png" },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/android/adaptive-icon-foreground-1024.png",
        "monochromeImage": "./assets/android/adaptive-icon-monochrome-1024.png",
        "backgroundColor": "#0E1322"
      }
    },
    "plugins": [
      ["expo-splash-screen", {
        "image": "./assets/splash/splash-icon-1024.png",
        "imageWidth": 220,
        "backgroundColor": "#0E1322"
      }]
    ]
  }
}
```

## In-app usage

```tsx
import VolleyHoodMark from './VolleyHoodMark';

<VolleyHoodMark width={180} />
```

## Before you ship

The ball was redrawn from a stock-style icon. Check that icon's license allows use in a logo.
