## Quick Setup

### 1. Install

Install the module in your Nuxt application:

```bash
npx nuxi module add nuxt-studio@beta
```

### 2. Dev Mode

🚀 **That's all you need to enable Studio locally!**

Run your Nuxt app and you will see a floating button on bottom left for editing your content. Any file changes will be synchronized in real time with the file system.

> **Note**: The publish system is only available in production mode. Use your classical workflow (IDE, CLI, GitHub Desktop...) to publish your changes locally.

### 3. Configure Production

Add it to your `nuxt.config.ts` and configure your repository:

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    'nuxt-studio'
  ],
  
  studio: {
    // Studio admin route (default: '/_studio')
    route: '/_studio',
    
    // Git repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // 'github' or 'gitlab'
      owner: 'your-username', // your GitHub/GitLab username or organization
      repo: 'your-repo', // your repository name
      branch: 'main', // the branch to commit to (default: main)
    }
  }
})
```

### 4. Production Mode

To enable publishing directly from your production website, you need to configure:

#### Git Provider

Configure where your content is stored (GitHub or GitLab repository). See the [repository configuration](#configuration-options) above.

> [📖 Git Providers Documentation](https://content.nuxt.com/docs/studio/git-providers)

#### Auth Provider

Configure how users authenticate to access Studio. Choose from GitHub, GitLab, Google OAuth, or custom authentication.

```bash
# Example with GitHub OAuth
STUDIO_GITHUB_CLIENT_ID=<your_client_id>
STUDIO_GITHUB_CLIENT_SECRET=<your_client_secret>
```

> [📖 Auth Providers Documentation](https://content.nuxt.com/docs/studio/auth-providers)

#### Deployment

Nuxt Studio requires server-side routes for authentication. Your site must be **deployed on a platform that supports SSR** using `nuxt build`.

#### Open Studio

Once deployed, navigate to your configured route (default: `/_studio`) and authenticate to start editing.

## Configuration Options

```ts
export default defineNuxtConfig({
  studio: {
    // Studio admin login route
    route: '/_studio', // default

    // Git repository configuration
    repository: {
      provider: 'github', // 'github' or 'gitlab' (default: 'github')
      owner: 'your-username', // your GitHub/GitLab owner (required)
      repo: 'your-repo', // your repository name (required)
      branch: 'main', // branch to commit to (default: 'main')
      rootDir: '', // subdirectory for monorepos (default: '')
      private: true, // request access to private repos (default: true)
    },
  }
})
```

## Contributing

You can start contributing by cloning the repository and using the playground in dev mode (set `dev` option to `true`).

> If you want to contribute with production mode you must create a local GitHub OAuth App (pointing to `http://localhost:3000` as callback URL).

### Development Setup

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm dev:prepare

# Build the app and service worker
pnpm prepack

# Terminal 1: Start the playground
pnpm dev

# Terminal 2: Start the app dev server
pnpm dev:app

# Login at http://localhost:3000/admin
```

### Project Structure

```text
studio/
├── src/
│   ├── app/           # Studio editor Vue app
│   └── module/        # Nuxt module
├── playground/        # Development playground
│   ├── docus/         # Docus example
│   └── minimal/       # Minimal example
```

### Testing

You can run a global command to test all needed check at once.

```bash
# Global verify running all needed commands
pnpm verify
```

Or run them one by one.

```bash
# Run tests
pnpm test

# Run type checking
pnpm typecheck

# Run linter
pnpm lint
```

## Links

- 📖 [Documentation](https://content.nuxt.com/studio)
- 🐛 [Report a Bug](https://github.com/nuxt-content/studio/issues/new)
- 💡 [Feature Request](https://github.com/nuxt-content/studio/issues/new)
- 🗨️ [Discussions](https://github.com/nuxt-content/studio/discussions)
