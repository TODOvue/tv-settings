# Changelog

All notable changes to `@todovue/tv-settings` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.1]: https://github.com/TODOvue/tv-settings/pull/2/files
[1.0.0]: https://github.com/TODOvue/tv-settings/pull/1/files
