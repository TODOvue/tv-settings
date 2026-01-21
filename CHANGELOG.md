# Changelog

All notable changes to `@todovue/tv-settings` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Dependencies
- Updated `@todovue/tv-demo` to `^1.4.4`.
- Updated `sass` to `^1.97.2`.
- Updated `vite` to `^7.3.1`.

## [1.0.2] - 2025-12-27

### Added
- Added automatic publishing to the TODOvue cPanel in `release.yml` for each release, simplifying package distribution and updates.
- Added `package-lock.json` to the repository to ensure dependency consistency and facilitate version management across development and production environments.

### Changed
- Changed the `base` option in `vite.config.js` for website deployment in cpanel.

### Fixed
- Fixed repository URL in `package.json` to point to the correct GitHub repository.
- Fixed the token configuration used to generate the package in the GitHub Actions workflow `release.yml`.

### Dependencies
- Updated dependency versions in `package.json` to maintain compatibility and benefit from improvements and bug fixes in the used libraries.

## [1.0.1] - 2025-11-27

### Fixed
- Fixed export styles for better compatibility with different bundlers

## [1.0.0] - 2025-11-27

### Added
- Initial release of TvSettings component
- Sliding panels from 4 directions: top, right, bottom, left
- Bidirectional v-model control (controlled mode) with internal state fallback
- Automatic close on outside click (configurable via `closeOnOutside` prop)
- Close panel with Escape key support
- Two customizable slots: `header` and `default` (main content)
- Built-in gear SVG icon for settings button
- `disabled` prop to disable the open button
- Smooth CSS transitions for panel animations
- Full compatibility with SPA applications
- Full SSR support (tested with Nuxt 3)
- Tree-shake friendly build (Vue marked as external)
- TypeScript declarations included
- Accessibility features:
  - ARIA labels with customizable `label` prop
  - `aria-pressed` and `aria-expanded` attributes
  - `role="dialog"` on panel
  - Proper focus management
- Events: `update:modelValue`, `open`, `close`
- Props: `modelValue`, `direction`, `disabled`, `closeOnOutside`, `label`
- Slot bindings: `direction`, `close`, `open` methods
- BEM CSS classes for easy customization
- Support for global registration via `app.use()`
- Support for local named import
- Compatible with Nuxt 3 plugin system
- Demo playground at https://tv-settings.netlify.app/

[1.0.2]: https://github.com/TODOvue/tv-settings/pull/3/files
[1.0.1]: https://github.com/TODOvue/tv-settings/pull/2/files
[1.0.0]: https://github.com/TODOvue/tv-settings/pull/1/files
