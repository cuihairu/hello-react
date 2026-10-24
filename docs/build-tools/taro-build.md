In a Taro project, building and publishing is the stage where your app moves from the development environment to something that runs on the target platforms (WeChat mini program, Alipay mini program, etc.). Here are the detailed steps for building and publishing a Taro project:

### 1. **Building the Project**

#### 1.1 Install the Taro CLI

If you have not installed the Taro CLI yet, install it with the following command:

```bash
npm install -g @tarojs/cli
```

#### 1.2 Configure the Project

Make sure your project contains the correct config files, such as `config/index.ts`, to set up per-platform configuration. Taro supports multi-platform builds, and each platform's config can be set in this file.

```ts
// config/index.ts
export default {
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
  // config for other platforms
  weapp: {
    miniCssExtractPluginOption: {
      ignoreOrder: true
    }
  },
  // ...
};
```

#### 1.3 Run the Build Commands

Run the following commands in the project root to build the project:

- **Build the WeChat mini program**

  ```bash
  taro build --type weapp
  ```

- **Build the Alipay mini program**

  ```bash
  taro build --type alipay
  ```

- **Build the Baidu mini program** (`swan`; ByteDance mini program maps to `tt`, H5 maps to `h5`)

  ```bash
  taro build --type swan
  ```

- **Build all platforms**

  ```bash
  taro build --type all
  ```

These commands generate the build output for each platform under the `dist` directory.

### 2. **Publishing the Project**

The publishing process depends mainly on the platform you are publishing to. Here are the steps for some common platforms:

#### 2.1 Publishing the WeChat Mini Program

1. **Upload the code**: use WeChat DevTools to upload the built code. In DevTools, choose the "Upload" option under the "Project" menu.

2. **Submit for review**: log in to the WeChat Official Platform ([mp.weixin.qq.com](https://mp.weixin.qq.com/)), enter the mini program management console, and submit your app code for review.

3. **Publish**: once review passes, you can publish your app on the WeChat Official Platform.

#### 2.2 Publishing the Alipay Mini Program

1. **Upload the code**: use Alipay DevTools ([opensupport.alipay.com](https://opensupport.alipay.com/)) to upload the built code.

2. **Submit for review**: log in to the Alipay Open Platform ([open.alipay.com](https://open.alipay.com/)), enter the mini program management console, and submit for review.

3. **Publish**: once review passes, you can publish your app on the Alipay Open Platform.

#### 2.3 Publishing to Other Platforms

- **Baidu mini program**, **ByteDance mini program**, and so on: use each platform's developer tools to upload the built code, submit for review, and publish.

### 3. **Automated Publishing (Optional)**

To make publishing more efficient, you can set up an automated publishing flow. Use a CI/CD tool (GitHub Actions, GitLab CI, CircleCI, etc.) to automate the build and publish steps.

#### 3.1 Configure CI/CD

1. **Write the config file**: create a CI/CD config file, for example `.github/workflows/main.yml` (GitHub Actions) or `.gitlab-ci.yml` (GitLab CI).

2. **Set up the build steps**:

   ```yaml
   name: Build and Deploy

   on:
     push:
       branches:
         - main

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v4
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '20'
         - name: Install dependencies
           run: npm ci
         - name: Build project
           run: npm run build
         - name: Deploy to WeChat
           run: ./deploy-wechat.sh
   ```

3. **Create the deploy script**: write a `deploy-wechat.sh` script to upload the built code. WeChat officially supports two options: the `cli` command bundled with WeChat DevTools, or the recommended `miniprogram-ci` package (you need to generate an upload key on the WeChat Official Platform under "Development Management → Development Settings → Mini Program Code Upload").

   ```bash
   #!/bin/bash
   # Option 1: WeChat DevTools CLI (requires enabling the service port in settings)
   # "<path to WeChat DevTools>/cli" upload --project ./dist/weapp --version 1.0.0 --desc "CI build"

   # Option 2: official miniprogram-ci package (recommended for CI environments)
   npx miniprogram-ci upload \
     --project ./dist/weapp \
     --key-path ./private.wx.key \
     --version 1.0.0 \
     --desc "CI build"
   ```

Build artifacts can be published per target platform; once CI/CD is wired in, the build and publish flow runs automatically too.

## References

- [Taro official docs](https://docs.taro.zone/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [knowledge](/knowledge.md))
