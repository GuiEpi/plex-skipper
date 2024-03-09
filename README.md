<img src='./public/plex-skipper.png' width='100'>

# Plex Skipper
![Version](https://img.shields.io/github/v/tag/GuiEpi/plex-skipper?sort=semver&label=version)
![Deploy](https://github.com/GuiEpi/plex-skipper/actions/workflows/deploy.yml/badge.svg)
[![wxt](https://img.shields.io/badge/wxt-ff0?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8zMDVfNDkwKSI+CjxwYXRoIGQ9Ik0zNDguNjA4IDQ5MkMzODQuOTA1IDQ5MiA0MTQuMzI5IDQ2Mi41NzYgNDE0LjMyOSA0MjYuMjc5VjM2MC41NTdINDI2LjI3OUM0NjIuNTc2IDM2MC41NTcgNDkyIDMzMS4xMzIgNDkyIDI5NC44MzVDNDkyIDI1OC41MzggNDYyLjU3NiAyMjkuMTE0IDQyNi4yNzkgMjI5LjExNEg0MTQuMzI5VjE2My4zOTJDNDE0LjMyOSAxMjcuMDk1IDM4NC45MDUgOTcuNjcwOSAzNDguNjA4IDk3LjY3MDlIMjgyLjg4NlY4NS43MjE1QzI4Mi44ODYgNDkuNDI0NSAyNTMuNDYyIDIwIDIxNy4xNjUgMjBDMTgwLjg2OCAyMCAxNTEuNDQzIDQ5LjQyNDUgMTUxLjQ0MyA4NS43MjE1Vjk3LjY3MDlIODUuNzIxNUM0OS40MjQ1IDk3LjY3MDkgMjAgMTI3LjA5NSAyMCAxNjMuMzkyVjIyOS4xMTRIMzEuOTQ5NEM2OC4yNDY0IDIyOS4xMTQgOTcuNjcwOSAyNTguNTM4IDk3LjY3MDkgMjk0LjgzNUM5Ny42NzA5IDMzMS4xMzIgNjguMjQ2NCAzNjAuNTU3IDMxLjk0OTQgMzYwLjU1N0gyMFY0OTJIMTUxLjQ0M1Y0ODAuMDUxQzE1MS40NDMgNDQzLjc1NCAxODAuODY4IDQxNC4zMjkgMjE3LjE2NSA0MTQuMzI5QzI1My40NjIgNDE0LjMyOSAyODIuODg2IDQ0My43NTQgMjgyLjg4NiA0ODAuMDUxVjQ5MkgzNDguNjA4WiIgc3Ryb2tlPSIjNjdENTVFIiBzdHJva2Utd2lkdGg9IjQwIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMzA1XzQ5MCI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=&labelColor=grey&color=%2367D55E)](https://wxt.dev)

Plex Skipper is a Chrome extension designed to enhance your viewing experience on Plex. It automatically clicks the "Skip Intro", "Skip Credits" and "Play next" buttons, allowing you to seamlessly watch your favorite shows and movies without interruptions.

## Features
* Automatically detects and clicks the "Skip Intro" button when it appears.
* Automatically detects and clicks the "Skip Credits" button at the end of a show or movie.
* Automatically detects and clicks the "Play next" button when your series moves on to the next episode if autoplay is activated.
* Runs quietly in the background with minimal impact on performance.

## Installation
### By installing extension
[link-chrome]: https://chromewebstore.google.com/detail/plex-skipper/ceicccfeikoipigeghddpocceifjelph 'Version published on Chrome Web Store'
[link-firefox]: https://addons.mozilla.org/en-US/firefox/addon/plex-skipper/ 'Version published on Mozilla Add-ons'
[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="48" alt="Chrome" valign="middle">][link-chrome] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/ceicccfeikoipigeghddpocceifjelph.svg?label=%20">][link-chrome] also compatible with [<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/edge/edge.svg" width="24" alt="Edge" valign="middle">][link-chrome] [<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/opera/opera.svg" width="24" alt="Opera" valign="middle">][link-chrome]

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/firefox/firefox.svg" width="48" alt="Firefox" valign="middle">][link-firefox] [<img valign="middle" src="https://img.shields.io/amo/v/plexskipper.svg?label=%20">][link-firefox]

### By downloading .zip
### Google Chrome

1. Download the `plex-skipper-<version>-chrome.zip` file from the [latest release](https://github.com/GuiEpi/plex-skipper/releases).
2. Extract the contents of the `.zip` file.
3. Open Google Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" in the top right corner.
5. Click on "Load unpacked" and select the `dist` folder.
6. Plex Skipper should now appear in your list of Chrome extensions and is ready to use.

### Firefox

1. Download the `plex-skipper-<version>-firefox.zip` file from the [latest release](https://github.com/GuiEpi/plex-skipper/releases).
3. Open Firefox and navigate to `about:addons`.
4. Click on the gear icon and select "Install Add-on From File...".
5. Select the `.zip` file.
6. Plex Skipper should now appear in your list of Firefox extensions and is ready to use.

## Usage
Simply navigate to the Plex website and start watching any video. The extension will work in the background to detect and click the "Skip Intro", "Skip Credits" and "Play next" buttons.

## Support
If you encounter any issues or have suggestions for improvements, please feel free to open an issue in this repository.

## Disclaimer
This extension is not officially affiliated with Plex and was created as a utility to improve the user experience.

## License
This project is licensed under the MIT License - see the LICENSE file for details.