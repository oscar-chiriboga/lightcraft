# LightCraft iOS installable web app (PWA)

This branch adds Home Screen support to the existing LightCraft WebAssembly application. It is **not yet a touch-first editor**; the current `egui` interface still needs iPhone-specific layout work.

## Build

On a machine with Rust 1.90+, install the `wasm32-unknown-unknown` target and the pinned `wasm-bindgen-cli` version described in [docs/web.md](../../docs/web.md).

```sh
cargo xtask web
```

This generates the deployable website at `target/web/`, including the HTML entrypoint, JS, WASM, workers, manifest, icon, and service worker.

## Publish

Upload **the contents of `target/web/`**, not the Rust source folder, to a static HTTPS host. For Vercel or Cloudflare Pages, use a CI build machine that supports the pinned Rust toolchain, then set the static output directory to `target/web`. Serve `.wasm` as `application/wasm`.

For iPhone installation: open the deployed HTTPS URL in Safari, choose Share → Add to Home Screen, and launch the icon.

## Current limitations

- The original desktop egui interface is not yet optimized for narrow touch screens.
- Safari/IndexedDB/OPFS storage may be evicted. Export backups frequently.
- Large RAW photos and WASM worker performance must be tested on actual iPhones.
- The service worker caches only the shell, not the WASM bundle or photo library. A network connection is required to load the editor reliably.
- iOS-specific Photos integration and native camera features are not yet available in the web build.
- The SVG icon is a placeholder until a dedicated PNG Apple touch icon is generated.
- No device testing or hosted deployment is included in this branch.
