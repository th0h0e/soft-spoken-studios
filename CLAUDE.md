I am using this project to learn about nuxt ui. I would like you to help me by using this project as a template, undertanding it and rebuilding / customizing some of the components. 

Core Concepts of Nuxt UI

  1. Component Architecture

  Slots-Based Structure
  - Components are composed of multiple slots (distinct HTML sections)
  - Example: UCard has root, header, body, and footer slots
  - Simple components may only have a base slot (like UContainer)

  Variants System
  - Props like size, color, variant dynamically control component styling
  - Each variant can affect different slots
  - defaultVariants set the defaults when no prop is provided
  - compoundVariants apply styles when multiple conditions are met

  3. Semantic Color System

  Instead of hardcoded colors, Nuxt UI uses semantic naming:
  - primary - Main CTAs, active states, brand elements
  - secondary - Alternative actions
  - success, info, warning, error - Status-based colors
  - neutral - Text, borders, backgrounds

  These map to actual Tailwind colors (like green, blue, red) configured in app.config.ts

  4. Customization Hierarchy (from lowest to highest priority)

  1. Global theme - Default component styles
  2. Global config (app.config.ts) - Project-wide overrides
  3. ui prop - Per-component slot overrides
  4. class prop - Direct class overrides on root/base slot

  5. Component Categories

  - Layout: App, Container, Header, Footer, Main
  - Element: Button, Badge, Avatar, Card, Icon, etc.
  - Form: Input, Select, Checkbox, Switch, Form, etc.
  - Data: Table, Accordion, Timeline, Tree
  - Navigation: Tabs, Breadcrumb, Pagination, NavigationMenu
  - Overlay: Modal, Drawer, Popover, Tooltip, Toast
  - Page: Pre-built sections (Hero, Feature, CTA, etc.)
  - Dashboard: Sidebar, Navbar, Panel components

  6. Key Features

  - 200,000+ icons via Iconify integration
  - Built-in dark mode via Color Mode integration
  - TypeScript-first with full auto-completion
  - Fully accessible by default
  - Composables: useToast, useOverlay, defineShortcuts, useFormField

  Now that I understand the system, we can start experimenting with components in your test layout! The layout you've built is
  already using some key Nuxt UI components (UPage, UPageAside, UContainer).

  What components would you like to explore first? Some good candidates for learning:
  - Form components (Input, Select, Checkbox with the Form wrapper)
  - Overlay components (Modal, Drawer, Toast)
  - Data display (Table, Accordion, Tabs)
  - Custom styling with the ui prop and variants