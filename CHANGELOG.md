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
