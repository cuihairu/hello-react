### Initializing and Configuring a Taro Project

Taro is an open-source cross-platform development framework that lets you write an application with one codebase and run it on multiple platforms at the same time. To get started with Taro, you need to initialize a project and make the necessary configuration. Here are the detailed steps:

#### 1. Install the Taro CLI

The Taro CLI is the command-line tool for creating and managing Taro projects. You can install it globally via npm:

```bash
npm install -g @tarojs/cli
```

#### 2. Initialize a Taro Project

Use the Taro CLI to initialize a new Taro project. Run the following command in the terminal:

```bash
taro init my-taro-project
```

- `my-taro-project` is your project name; replace it with another name as needed.
- The command launches a wizard that asks for a few basic settings, such as template, language (JavaScript or TypeScript), UI framework, and so on.

**Example wizard steps**:

- **Choose the project template**: you can pick the default template or another one. For example, `taro-template-react` (React), `taro-template-vue` (Vue).
- **Choose the language**: select JavaScript or TypeScript.
- **Choose the UI library**: for example Taro UI, NutUI, and so on, or choose not to use a UI library.

#### 3. Install Dependencies

Enter the project directory and install all of the project's dependencies:

```bash
cd my-taro-project
npm install
```

#### 4. Configure the Project

The main config files in a Taro project include:

- **`config/index.js`**: used to configure build settings for different platforms. You can set mini program config items (page paths, window styles, etc.) as well as H5 and React Native settings.

- **`src/app.config.ts`**: used to configure global settings for the Taro app, such as routing and navigation.

**Example config (`config/index.js`)**:

```javascript
module.exports = {
  projectName: 'my-taro-project',
  date: '2024-08-12',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 1,
    '750': 1,
    '828': 1.81 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {},
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'react',
  mini: {
    compile: {
      excludes: ['@tarojs/plugin-platform-weapp']
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static'
  }
}
```

- `designWidth`: the design draft width, used for responsive layout.
- `deviceRatio`: the ratios for different devices.
- `sourceRoot` and `outputRoot`: the source and output directories.
- `framework`: the chosen frontend framework (React, Vue, etc.).

**Example config (`src/app.config.ts`)**:

```typescript
export default {
  pages: [
    'pages/index/index',
    'pages/logs/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro App',
    navigationBarTextStyle: 'black'
  }
}
```

- `pages`: defines the app's page paths.
- `window`: defines the window's global styles, such as background color and title.

#### 5. Start the Dev Server

Start the dev server for local development and debugging:

```bash
npm run dev:weapp
```

- `dev:weapp` starts the dev server for the WeChat mini program.
- As needed, you can start the dev servers for other platforms, for example `dev:h5` for H5 development and `dev:rn` for React Native development.

#### 6. Build the Project

After development is done, you can build the project to generate code suitable for the different platforms:

```bash
npm run build:weapp
```

- `build:weapp` builds the WeChat mini program code.
- For other platforms, use the corresponding build commands, such as `build:h5`.

#### 7. Publish the Project

- For mini programs: upload the built code to the corresponding mini program platform (for example via WeChat DevTools) to publish it.
- For H5: deploy the generated code to a web server.
- For React Native: use the appropriate tools to package and publish it.

### Summary

Once initialization is done, fill in the per-platform config and start developing; API and style behavior still needs to be verified separately on each platform.

## References

- [Taro official docs](https://docs.taro.zone/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
