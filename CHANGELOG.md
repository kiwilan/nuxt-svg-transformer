## 0.0.4

- Remove `cacheDir` and `cacheFile` options, merged into `assetsDir` options: now, cached files are generated in `assetsDir/cache` directory and SVG are stored in `assetsDir/svg` directory.
- Index file will be stored into `assets` directory without option path because component have to refer to it (type has removed from this file).
- New type file will be stored into `.nuxt` without option path because it's only type file.
- All paths rebuilt with `nuxt.options`.
- API more stable.

## 0.0.31

- Fix: relative paths

## 0.0.3

- Refactoring to fix production bug
  - Cached files are stored into `cacheDir` with `cacheFile` file at the root of app (added to `.gitignore`)

## 0.0.25

- Add `clearSize` option to remove native size attributes from SVGs

## 0.0.24

- Add global options `classDefault`, `clearClasses`, `clearStyles`, `sizeInherit`, `styleDefault` to manage default classes and styles and `tagName` to change tag name of SVGs.
- Refactoring `icons`, add `svg` class
  - Inject paths into `icons`
- Some improvement to playground
