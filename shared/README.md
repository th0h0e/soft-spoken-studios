# Shared Directory

This directory contains code that is shared between the client and server.

## Structure

- `utils/` - Shared utility functions
- `types/` - Shared TypeScript type definitions
- `constants/` - Shared constants and configuration

## Usage

Import from this directory using the `#shared` alias:

```typescript
// Import shared utilities
import { formatDate } from '#shared/utils/date'

// Import shared types
import type { User } from '#shared/types/user'

// Import shared constants
import { API_ENDPOINTS } from '#shared/constants/api'
```

## Note

Files in this directory are automatically available to both client-side and server-side code without explicit imports configuration.
