### Taro and Multi-Platform Development

Taro is a multi-platform development framework aimed at supporting multiple platforms (WeChat mini programs, Alipay mini programs, H5, React Native, and so on) from a unified codebase. It lets developers write cross-platform apps in one language, which improves development efficiency and reduces maintenance cost. Here I record Taro's basic concepts, project initialization, configuration, and compatibility handling.

---

#### 1. What Is Taro

Taro is an open-source framework developed by JD · OTLab for building multi-platform apps. You write the code once and its compilation tools convert it into app code for each platform. The platforms Taro supports include:

- WeChat mini program
- Alipay mini program
- H5
- React Native
- Quick App

---

#### 2. Initializing and Configuring a Taro Project

##### 2.1 Initialize a Taro Project

First, install the Taro CLI on your system. Install it globally with the following command:

```bash
npm install -g @tarojs/cli
```

Or use `yarn`:

```bash
yarn global add @tarojs/cli
```

Once installed, use the `taro init` command to initialize a new Taro project:

```bash
taro init my-taro-project
```

During initialization, you can choose the project template, such as a blank template or one with examples.

##### 2.2 Project Structure

The basic structure of a Taro project is:

```
my-taro-project/
  ├── config/             # config file directory
  │   └── index.js        # Taro build config (index.ts for TS projects)
  ├── src/                # source code
  │   ├── pages/          # pages directory
  │   ├── components/     # components directory
  │   ├── app.js          # app entry file
  │   └── app.config.js   # app global config (routes, window, etc.)
  ├── dist/               # build output directory
  └── package.json        # project dependencies and config
```

##### 2.3 Configure Taro

Taro 3's build config file lives at `config/index.js` (or `config/index.ts` for TypeScript projects). In that file you can configure compilation options, plugins, path aliases, and so on for each platform. For example:

```javascript
module.exports = {
  projectName: 'my-taro-project',
  date: '2022-05-25',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 1,
    '750': 1,
    '828': 1.81 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    'taro-plugin-xxx': {
      // plugin configuration
    }
  },
  weapp: {
    // WeChat mini program specific config
  },
  h5: {
    // H5 config
  },
  rn: {
    // React Native config
  }
};
```

---

#### 3. Developing Mini Programs with React.js in Taro

Taro supports developing mini programs with React.js. You can create React components under `src/pages` and reference them from pages. For example:

1. **Create a React component**:

   ```jsx
   // src/components/MyComponent.jsx
   import React from 'react';

   const MyComponent = () => {
     return (
       <div>
         <h1>Hello from React Component!</h1>
       </div>
     );
   };

   export default MyComponent;
   ```

2. **Use that component in a page**:

   ```jsx
   // src/pages/index/index.jsx
   import React from 'react';
   import MyComponent from '../../components/MyComponent';

   const Index = () => {
     return (
       <div>
         <h1>Welcome to Taro with React!</h1>
         <MyComponent />
       </div>
     );
   };

   export default Index;
   ```

3. **Configure page routes**:

   Configure page routes in the `src/app.config.js` file (Taro 3 splits routes and global window config into a separate `app.config` file; `app.js` only handles entry logic):

   ```javascript
   // src/app.config.js
   export default {
     pages: [
       'pages/index/index',
       // other pages
     ],
     window: {
       backgroundTextStyle: 'light',
       navigationBarBackgroundColor: '#fff',
       navigationBarTitleText: 'Taro App',
       navigationBarTextStyle: 'black'
     }
   };
   ```

   Write the entry logic in `src/app.js` (the compiler reads the sibling `app.config.js` automatically, no manual import needed):

   ```javascript
   // src/app.js
   import { Component } from 'react';
   import './app.css';

   class App extends Component {
     render() {
       return this.props.children;
     }
   }

   export default App;
   ```

---

#### 4. Handling Cross-Platform Compatibility Issues

Taro provides a unified API layer that absorbs platform differences, but some platform-specific adjustments may still be needed. Here are some common compatibility issues and their solutions:

##### 4.1 CSS Style Compatibility

In a Taro project, CSS styles can behave differently across platforms. You can use Taro's `taro-sass` plugin to write compatible styles. Configure it as follows:

```bash
npm install --save-dev sass
```

Then configure it in `taro.config.js`:

```javascript
const path = require('path');

module.exports = {
  // other configuration
  h5: {
    cssLoaderOption: {
      modules: {
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }
  },
};
```

##### 4.2 Handling Platform-Specific Features

For platform-specific features (such as mini program APIs), use the APIs Taro provides. For example, the WeChat mini program's `wx.request` can be called through Taro's `Taro.request`.

```javascript
Taro.request({
  url: 'https://api.example.com/data',
  success: (res) => {
    console.log(res.data);
  }
});
```

---

#### 5. Building and Publishing a Taro Project

Build with the following commands:

```bash
npx taro build --type weapp  # build the WeChat mini program
npx taro build --type h5     # build the H5 app
npx taro build --type rn     # build the React Native app
```

After the build, the generated files land in the `dist` directory. You can upload those files to the corresponding platform to publish.

---

### Summary

Taro lets you build for multiple platforms from a single codebase. Project initialization, platform compatibility, and the publishing flow still need to be checked per platform — code reuse does not mean behavior is identical.

## References

- [Taro official docs](https://docs.taro.zone/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
