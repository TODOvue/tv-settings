<p align="center"><img width="150" src="https://res.cloudinary.com/dcdfhi8qz/image/upload/v1763663056/uqqtkgp1lg3xdplutpga.png" alt="TODOvue logo">
</p>

# TODOvue Settings (TvSettings)
A flexible Vue 3 component with no framework dependencies for creating sliding settings panels from any direction. Perfect for settings, side menus, or any content that needs to slide out from screen edges. Compatible with SPA applications and server-side rendering (SSR) environments like Nuxt 3.

[![npm](https://img.shields.io/npm/v/@todovue/tv-settings.svg)](https://www.npmjs.com/package/@todovue/tv-settings)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ec2565cf-1f9d-4388-b438-e00b499a915b/deploy-status)](https://app.netlify.com/projects/tv-settings/deploys)
[![npm downloads](https://img.shields.io/npm/dm/@todovue/tv-settings.svg)](https://www.npmjs.com/package/@todovue/tv-settings)
[![npm total downloads](https://img.shields.io/npm/dt/@todovue/tv-settings.svg)](https://www.npmjs.com/package/@todovue/tv-settings)
![License](https://img.shields.io/github/license/TODOvue/tv-settings)
![Release Date](https://img.shields.io/github/release-date/TODOvue/tv-settings)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/@todovue/tv-settings)
![Node Version](https://img.shields.io/node/v/@todovue/tv-settings)
![Last Commit](https://img.shields.io/github/last-commit/TODOvue/tv-settings)
![Stars](https://img.shields.io/github/stars/TODOvue/tv-settings?style=social)

> Demo: https://tv-settings.netlify.app/

---
## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Start (SPA)](#quick-start-spa)
- [Usage in Nuxt 4 / SSR](#usage-in-nuxt-3--ssr)
- [Component Registration Options](#component-registration-options)
- [Props](#props)
- [Events](#events)
- [Slots](#slots)
- [Directions](#directions)
- [State Control](#state-control)
- [Customization (Styles / Themes)](#customization-styles--themes)
- [Accessibility](#accessibility)
- [SSR Notes](#ssr-notes)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---
## Features
- Sliding panels from 4 directions: top, right, bottom, left
- Bidirectional v-model control (controlled mode) or internal state
- Automatic close on outside click (configurable)
- Close with Escape key
- Customizable slots (header and main content)
- Built-in gear SVG icon
- Disabled state
- Smooth transitions
- Compatible with SPA and SSR (Nuxt 3)
- Tree-shake friendly (Vue marked as external in build)
- TypeScript declarations included

---
## Installation
Using npm:
```bash
npm install @todovue/tv-settings
```
Using yarn:
```bash
yarn add @todovue/tv-settings
```
Using pnpm:
```bash
pnpm add @todovue/tv-settings
```

---
## Quick Start (SPA)
Global registration (main.js / main.ts):
```js
import { createApp } from 'vue'
import App from './App.vue'
import TvSettings from '@todovue/tv-settings'

createApp(App)
  .use(TvSettings) // enables <TvSettings /> globally
  .mount('#app')
```
Local import inside a component:
```vue
<script setup>
import { TvSettings } from '@todovue/tv-settings'
import '@todovue/tv-settings/style.css'
</script>

<template>
  <TvSettings direction="right">
    <template #header>
      <h2>Settings</h2>
    </template>
    <template #default="{ close }">
      <p>Custom content</p>
      <button @click="close">Close</button>
    </template>
  </TvSettings>
</template>
```

---
## Usage in Nuxt 4 / SSR
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@todovue/tv-button/nuxt'
  ]
})
```
Use anywhere:
```vue
<TvSettings direction="left">
  <template #default="{ direction }">
    <p>Panel from {{ direction }}</p>
  </template>
</TvSettings>
```
Optional direct import (without plugin):
```vue
<script setup>
import { TvSettings } from '@todovue/tv-settings'
import '@todovue/tv-settings/style.css'
</script>
```

---
## Component Registration Options
| Approach                                                              | When to use                                  |
|-----------------------------------------------------------------------|----------------------------------------------|
| Global via `app.use(TvSettings)`                                      | Multiple uses across the app / design system |
| Named local import `{ TvSettings }`                                   | Isolated contexts / code-split               |
| Default direct import `import TvSettings from '@todovue/tv-settings'` | Single use or manual registration            |

---
## Props
| Prop           | Type    | Default         | Description                                                             |
|----------------|---------|-----------------|-------------------------------------------------------------------------|
| modelValue     | Boolean | undefined       | Bidirectional v-model control. If `undefined`, uses internal state.     |
| direction      | String  | 'right'         | Direction from which the panel slides: 'top', 'right', 'bottom', 'left' |
| disabled       | Boolean | false           | Disables the open button.                                               |
| closeOnOutside | Boolean | true            | If `true`, the panel closes when clicking outside.                      |
| label          | String  | 'Open settings' | ARIA label for the gear button (accessibility).                         |

---
## Events
| Event (kebab)       | Emit (camel)        | Description                             |
|---------------------|---------------------|-----------------------------------------|
| `update:modelValue` | `update:modelValue` | Emitted when open/closed state changes. |
| `open`              | `open`              | Emitted when the panel opens.           |
| `close`             | `close`             | Emitted when the panel closes.          |

Usage:
```vue
<TvSettings 
  v-model="isOpen"
  @open="handleOpen" 
  @close="handleClose" 
/>
```

---
## Slots
| Slot    | Bindings                     | Description                                |
|---------|------------------------------|--------------------------------------------|
| header  | —                            | Panel header content (optional).           |
| default | `{ direction, close, open }` | Main panel content with access to methods. |

### Slot Examples
Header slot:
```vue
<TvSettings>
  <template #header>
    <h2>My Settings</h2>
  </template>
</TvSettings>
```

Default slot with methods:
```vue
<TvSettings>
  <template #default="{ direction, close }">
    <p>Panel from: {{ direction }}</p>
    <button @click="close">Close</button>
  </template>
</TvSettings>
```

---
## Directions
The component supports 4 directions:
- `top` - Panel slides from top
- `right` - Panel slides from right (default)
- `bottom` - Panel slides from bottom
- `left` - Panel slides from left

Examples:
```vue
<TvSettings direction="top" />
<TvSettings direction="right" />
<TvSettings direction="bottom" />
<TvSettings direction="left" />
```

If an invalid direction is provided, the component will show a console warning and use `'right'` as default.

---
## State Control
### Uncontrolled Mode (Internal State)
By default, the component manages its own state:
```vue
<TvSettings direction="left">
  <p>Panel content</p>
</TvSettings>
```

### Controlled Mode (v-model)
Control state externally:
```vue
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <button @click="isOpen = !isOpen">Toggle Settings</button>
  <TvSettings v-model="isOpen" direction="right">
    <p>Controlled panel</p>
  </TvSettings>
</template>
```

### Disable Close on Outside Click
```vue
<TvSettings :close-on-outside="false" direction="left">
  <template #default="{ close }">
    <p>Only closes with button or ESC</p>
    <button @click="close">Close</button>
  </template>
</TvSettings>
```

---
## Customization (Styles / Themes)
The component uses CSS with BEM classes. You can override styles:

```css
/* Customize gear button */
.tv-setting__gear {
  background-color: #your-color;
  color: #your-icon-color;
}

/* Customize panel */
.tv-setting__panel {
  background-color: #your-panel-bg;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

/* Customize by direction */
.tv-setting--top .tv-setting__panel {
  /* specific styles for top panel */
}
```

Inline styles:
```vue
<TvSettings 
  direction="right"
  style="--panel-bg: #f0f0f0; --panel-width: 350px;"
>
  <p>Custom panel</p>
</TvSettings>
```

---
## Accessibility
- The gear button includes `aria-label`, `aria-pressed` and `aria-expanded`.
- You can customize the aria-label text with the `label` prop.
- The panel has `role="dialog"`.
- Supports close with Escape key.
- Proper focus management for screen readers.

Example:
```vue
<TvSettings label="Open settings panel" direction="right">
  <p>Accessible content</p>
</TvSettings>
```

---
## SSR Notes
- No direct DOM access (`window` / `document`) in source code → SSR-safe.
- Styles are automatically applied when importing the library.
- Make sure to import `@todovue/tv-settings/style.css` in an SSR-compatible entry point (plugin or layout).
- Event listeners (outside click, keydown) are registered in `onMounted` to avoid SSR errors.

---
## Development
```bash
git clone https://github.com/TODOvue/tv-settings.git
cd tv-settings
npm install
npm run dev     # run demo playground
npm run build   # build library
```
Local demo is served from Vite using `index.html` + examples in `src/demo`.

---
## Contributing
PRs and issues are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

---
## License
MIT © TODOvue

---
### Attributions
Developed for the TODOvue component ecosystem

