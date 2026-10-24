### Using Vite to Boost Development Efficiency

Vite is a modern frontend build tool built for a faster development experience and a more efficient build process. Compared with traditional build tools, Vite has faster hot updates in dev mode and more optimized build output in production mode. Here is a detailed guide to using Vite to boost development efficiency.

---

#### 1. Install Vite

First, install Vite in your project. You can install it with the following command:

```bash
npm install --save-dev vite
```

Or use `yarn`:

```bash
yarn add --dev vite
```

---

#### 2. Configure Vite

Vite's configuration usually goes in the `vite.config.js` file in the project root. Follow these steps to create and configure that file:

1. **Create the Vite config file**:

Create `vite.config.js` in the project root and add the basic config:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  // basic configuration
  root: './src', // entry directory
  build: {
    outDir: '../dist', // build output directory
  },
  server: {
    port: 3000, // dev server port
  },
});
```

2. **Use the React plugin** (if you are using React):

Install Vite's React plugin:

```bash
npm install --save-dev @vitejs/plugin-react
```

Then configure it in `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './src',
  build: {
    outDir: '../dist',
  },
  server: {
    port: 3000,
  },
});
```

---

#### 3. Adjust the Project Structure

Vite uses the **project root** as `root` by default, and `index.html` usually sits in the project root. The config above moves the entry into the `src` directory via `root: './src'`, so the code files and `index.html` need to go inside `src`. For example:

```
project-root/
  ├── src/
  │   ├── main.js
  │   ├── App.jsx
  │   └── index.html
  ├── vite.config.js
  └── package.json
```

A basic example of the `src/index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vite App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/main.js"></script>
</body>
</html>
```

---

#### 4. Run the Dev Server

Start the Vite dev server with the following command:

```bash
npx vite
```

Or:

```bash
yarn vite
```

Vite starts a dev server; with the config above, visit `http://localhost:3000` (when `server.port` is not configured, Vite's default port is `5173`).

---

#### 5. Build the Production Version

Build the production version with the following command:

```bash
npx vite build
```

Or:

```bash
yarn vite build
```

Vite generates optimized production files and puts them in the `dist` directory.

---

#### 6. Optimize the Development Experience

Vite provides a few features that improve the development experience:

1. **Fast hot reload**: Vite uses native ES modules to deliver fast hot module replacement (HMR), so hot updates stay quick even in large projects.

2. **Optimized build speed**: Vite uses Rollup for production builds, producing efficient, optimized output files and cutting build time.

3. **Modern framework support**: Vite natively supports Vue and React, and plugins can extend support to other frameworks and libraries.

4. **On-demand loading**: Vite supports loading modules on demand, which improves the app's load speed and performance.

---

#### 7. Configure Plugins

Vite supports a rich plugin system that you configure through the `vite.config.js` file. For example, use the `@vitejs/plugin-vue` plugin to support Vue:

```bash
npm install --save-dev @vitejs/plugin-vue
```

Configure the plugin in `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
});
```

---

### Summary

Through an optimized dev server, faster builds, and modern framework support, Vite meaningfully improves frontend development efficiency. With fast hot updates and an efficient production build, Vite helps teams develop and maintain apps more efficiently. Using Vite's plugin system, you can also extend functionality to fit the project and push the development experience further.

## References

- [Vite official docs](https://vite.dev/guide/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
