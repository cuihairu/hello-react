Developing mini programs with React.js in Taro lets you leverage React's power while achieving multi-platform adaptation. Here are the detailed steps for developing mini programs with React.js in a Taro project:

### 1. **Create a Taro Project**

First, make sure you have the Taro CLI installed. If not, install it with the following command:

```bash
npm install -g @tarojs/cli
```

Then use the Taro CLI to create a new project, choosing React as the frontend framework:

```bash
taro init my-taro-project
```

In the initialization wizard, select `React` as the framework and follow the wizard to finish the project setup.

### 2. **Install Dependencies**

Enter the project directory and install all necessary dependencies:

```bash
cd my-taro-project
npm install
```

### 3. **Project Structure**

The directory structure of a Taro project is as follows:

```
my-taro-project
├── config
│   └── index.js
├── src
│   ├── app.config.ts
│   ├── app.tsx
│   ├── pages
│   │   ├── index
│   │   │   └── index.tsx
│   │   └── logs
│   │       └── logs.tsx
│   ├── assets
│   ├── components
│   └── utils
├── dist
├── node_modules
├── .gitignore
├── package.json
└── README.md
```

### 4. **Write React Components**

In the file `src/pages/index/index.tsx`, you can write React components. For example:

```tsx
import React from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

const Index: React.FC = () => {
  return (
    <View className='index'>
      <Text>Hello, Taro with React!</Text>
    </View>
  );
};

export default Index;
```

### 5. **Configure Taro**

#### `config/index.js`

In `config/index.js`, you can configure mini program related settings. Here is a basic example:

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

### 6. **Write Styles**

In `src/pages/index/index.scss`, you can write styles:

```scss
.index {
  text-align: center;
  margin-top: 50px;
  font-size: 24px;
}
```

### 7. **Start the Dev Server**

Use the Taro CLI to start the dev server for local development:

```bash
npm run dev:weapp
```

- `dev:weapp` starts the dev server for the WeChat mini program.
- You can open the `dist` folder in WeChat DevTools to see the result.

### 8. **Build the Project**

After development is done, you can build the project to generate the mini program code:

```bash
npm run build:weapp
```

- `build:weapp` generates code suitable for the WeChat mini program.

### 9. **Debug and Publish**

- **Debugging**: open the `dist` folder in WeChat DevTools and debug there.
- **Publishing**: upload the generated code to the WeChat mini program platform to publish.

### 10. **Common Project Operations**

#### Using the Taro API

You can use Taro's provided APIs inside React components. For example, for page navigation:

```tsx
import Taro from '@tarojs/taro';

const navigateToPage = () => {
  Taro.navigateTo({ url: '/pages/logs/index' });
};
```

#### Integrating Other Libraries

You can integrate state management libraries such as Redux, Zustand, and MobX into a Taro project to build more complex features and state management. Note: **React Router is not available on the Taro mini program side** — routing is taken over by Taro's built-in `@tarojs/router`, which declares pages in `app.config` and navigates with methods such as `Taro.navigateTo` (the H5 side also uses Taro Router).

### Summary

This setup lets a Taro project write mini program pages with React; platform differences are still handled by Taro's adaptation layer and the per-platform config.

## References

- [Taro official docs](https://docs.taro.zone/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [knowledge](/knowledge.md))
