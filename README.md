# Claude Extension Pack

A collection of browser extensions that improve the Claude.ai experience.

---

## Extensions

### claude-no-esc

Prevents the `Escape` key from accidentally stopping Claude's response generation while it is streaming.

**Problem:** On claude.ai, pressing `Escape` triggers a stop event that halts the current response — easy to do by accident when dismissing a dialog or just reaching for another key.

**Solution:** The extension intercepts `keydown` events in the capture phase (before React/app listeners run) and blocks `Escape` only when Claude is actively generating. Native browser `Escape` behavior (e.g. closing modals) is preserved when Claude is not generating.

#### Install

1. Open Chrome (or any Chromium-based browser) and go to `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select the `claude-no-esc` folder
4. Navigate to [claude.ai](https://claude.ai) — the extension activates automatically

#### How it works

- Runs a content script on `https://claude.ai/*` at `document_start`
- Detects generation state by checking for a visible stop button (`aria-label`, `title`, or button text containing "stop")
- Blocks `Escape` via `stopImmediatePropagation` + `stopPropagation` only while generating

---

## Contributing

Each extension lives in its own subdirectory. To add a new extension, create a folder with a `manifest.json` (Manifest V3) and update this README.
