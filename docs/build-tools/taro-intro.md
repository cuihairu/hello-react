### What Is Taro: One Codebase, Multiple Platforms

Taro is an open-source framework developed by JD · OTLab, designed to support multi-platform app development from a unified codebase. Its core idea is "**one codebase, multiple platforms**": you write the code once and generate apps for many platforms, including WeChat mini programs, Alipay mini programs, H5, React Native, and more. This can significantly improve development efficiency while lowering maintenance cost and complexity.

#### 1. Taro's Goals and Advantages

- **Cross-platform support**: Taro converts your code into apps for multiple platforms, covering the mainstream mini program platforms (WeChat, Alipay, ByteDance, and so on) as well as H5 and React Native. With Taro, you can develop for multiple platforms from the same codebase.
  
- **Unified development experience**: Taro offers a development experience similar to React and Vue, so you can build with frameworks and tools you already know. This makes cross-platform development simpler and more consistent.

- **Efficient build tooling**: Taro's compilers convert code into the format each platform needs, and support hot reload, component-based development, and more to raise efficiency.

- **Rich plugin support**: Taro provides an extensive plugin system, so you can easily integrate functional modules such as routing, state management, and network requests.

#### 2. How Taro Works

At Taro's core, unified code is converted into each platform's own code through different compilers. The workflow is roughly:

1. **Writing code**: developers use Taro's APIs and components to write the code once. That code can be React- or Vue-based components.

2. **Compilation**: Taro uses its built-in compiler to transform source code into platform-specific code. For example, converting React components into WeChat mini program WXML and WXSS, or Vue components into Alipay mini program code, and so on.

3. **Platform adaptation**: the compiler handles each platform's specific APIs and components, adapting the code to that platform's rules. For WeChat mini programs, Taro handles WeChat's specific APIs and components to make sure the code runs correctly there.

4. **Publishing and deployment**: once compilation is done, the generated code can be deployed directly to each platform. For H5, use traditional web deployment; for mini programs, upload to the corresponding mini program management console for review and publishing.

#### 3. Taro's Main Features

- **Multi-platform compatibility**: supports WeChat mini programs, Alipay mini programs, ByteDance mini programs, H5, React Native, and more.
  
- **Component-based development**: supports component-based development, so you can create reusable components and build faster.

- **Multiple frontend frameworks**: beyond React and Vue, Taro can support other frontend frameworks through custom adapters.

- **Rich ecosystem**: provides a wealth of plugins and tools such as Taro UI and Taro router to help you build apps faster.

- **Open source and community support**: Taro is an open-source project with an active community and continuously updated features.

#### 4. Getting Started with Taro

To get started with Taro, use the Taro CLI to initialize a project and pick a template that fits your needs. Here are the basic steps for creating a new Taro project:

1. **Install the Taro CLI**:

   ```bash
   npm install -g @tarojs/cli
   ```

2. **Initialize the project**:

   ```bash
   taro init my-taro-project
   ```

3. **Install dependencies**:

   Enter the project directory and install the project dependencies:

   ```bash
   cd my-taro-project
   npm install
   ```

4. **Start the dev server**:

   ```bash
   npm run dev:weapp
   ```

   This script is equivalent to `taro build --type weapp --watch` (watch-mode build of the WeChat mini program); other platforms map to `npm run dev:h5` and so on.

5. **Write the code**:

   Start writing multi-platform code, developing with Taro's APIs and components.

6. **Build and publish**:

   After development is done, use Taro's build tooling to generate the code for each platform and publish it.

---

With Taro, you can develop for multiple platforms more efficiently and reach the goal of "write once, adapt everywhere." Whether it is mini programs, H5, or mobile apps, Taro helps you finish the development work from a single codebase.

## References

- [Taro official docs](https://docs.taro.zone/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
