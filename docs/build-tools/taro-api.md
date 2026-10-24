Integrating mini program APIs into a Taro project is about combining the mini program's native APIs with Taro's cross-platform code. Taro provides several mechanisms to help you handle these integrations during development. Here are the steps and things to watch out for:

### 1. **Understanding Taro's API Wrapping**

Taro provides a set of wrapped APIs for cross-platform calls. These APIs are built on top of the native APIs of each platform, so you can work through a unified interface.

- **Taro API**: such as `Taro.request` and `Taro.navigateTo` — these APIs automatically call the right platform-specific code depending on the platform they run on.

  ```js
  import Taro from '@tarojs/taro';

  Taro.request({
    url: 'https://example.com',
    method: 'GET',
    success: (res) => {
      console.log(res.data);
    },
    fail: (err) => {
      console.error(err);
    }
  });
  ```

### 2. **Using the Taro API for Specific Tasks**

In Taro, you can use the provided APIs to complete a variety of tasks, and they handle the platform-specific processing for you. Examples include fetching user info and navigating pages.

- **Fetch user info** (`getUserInfo` has been deprecated by WeChat, use `getUserProfile` instead; WeChat tightened things further after 2022 — the avatar/nickname input capability is now recommended):

  ```js
  import Taro from '@tarojs/taro';

  Taro.getUserProfile({
    desc: 'used to display the user avatar and nickname', // required, declares the purpose
    success: (res) => {
      console.log(res.userInfo);
    }
  });
  ```

- **Navigate to a page**:

  ```js
  import Taro from '@tarojs/taro';

  Taro.navigateTo({
    url: '/pages/detail/detail?id=123'
  });
  ```

### 3. **Handling Platform-Specific APIs**

For some platform-specific APIs, you may need conditional compilation to handle the features of different platforms. Taro supports conditional compilation in both config files and code.

- **Conditional compilation example**:

  ```js
  import Taro from '@tarojs/taro';

  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    // WeChat mini program specific API
    Taro.request({
      url: 'https://api.weixin.qq.com',
      // WeChat mini program specific request parameters
    });
  } else if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
    // Alipay mini program specific API
    Taro.request({
      url: 'https://api.alipay.com',
      // Alipay mini program specific request parameters
    });
  }
  ```

### 4. **Using Taro Plugins**

Some platform-specific features can be implemented through Taro plugins. Taro plugins are not imported with import; they are declared in the `plugins` field of the build config `config/index.js` and loaded by Taro at compile time.

- **Using plugins in the config**:

  ```js
  // config/index.js
  module.exports = {
    // ...
    plugins: [
      '@tarojs/plugin-http', // example: gives the mini program async/await network requests
      // other plugins, with arguments: ['@tarojs/plugin-xxx', { option: true }]
    ]
  };
  ```

### 5. **Handling Mini Program APIs**

For native mini program APIs that Taro's API cannot wrap directly, you can use Taro's native API method to call them.

- **Native API calls**:

  ```js
  import Taro from '@tarojs/taro';

  Taro.request({
    url: 'https://example.com/api',
    method: 'POST',
    data: {
      // data required by the native mini program API
    },
    success: (res) => {
      console.log('API Response:', res.data);
    }
  });
  ```

### 6. **Handling Compatibility Issues**

When using mini program APIs in a Taro project, keep the following in mind:

- **API compatibility**: make sure the APIs you use are supported on all target platforms. Check the Taro docs and the mini program docs to confirm compatibility.

- **Error handling**: handle the errors and edge cases that can come up so your app runs stably across platforms.

  ```js
  Taro.request({
    url: 'https://example.com/api',
    method: 'POST',
    data: { /* ... */ },
    success: (res) => {
      console.log('Success:', res.data);
    },
    fail: (err) => {
      console.error('Error:', err);
    }
  });
  ```

### 7. **Debugging and Testing**

- **Debugging tools**: use each platform's developer tools (WeChat DevTools, Alipay DevTools, etc.) to debug and test mini program API calls and their results.

- **Platform testing**: test your app on multiple platforms to make sure mini program API calls work correctly on every target platform.

These configs cover integrating mini program APIs in a Taro project; platform native capabilities still need to be verified per target.

## References

- [Taro official docs](https://docs.taro.zone/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [knowledge](/knowledge.md))
