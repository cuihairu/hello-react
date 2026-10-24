### React Native Introduction and Mobile Development

**React Native** is an open-source framework for building native mobile applications with React and JavaScript. It lets developers use a single codebase to build apps for both Android and iOS, dramatically cutting development time and cost. React Native's main advantage is that it lets you bring React's component-based philosophy and development experience into mobile work while still getting native-app performance and user experience.

#### 23.2.1. React Native Introduction
- **Core ideas**:
  - **Cross-platform development**: Use one codebase to build Android and iOS apps, reducing duplicated work and maintenance cost.
  - **Native components**: React Native renders the UI with native components (such as `View`, `Text`, `Image`), ensuring the app has a native look and native performance.
  - **Hot Reloading**: See the effect of code changes instantly during development without recompiling the whole app.

- **React Native architecture**:
  - **JavaScript thread**: Handles the app's business logic and UI render updates.
  - **Native thread**: Renders native components and handles user interaction.
  - **Bridge mechanism**: The JavaScript thread and native thread communicate through a bridge, passing data and calling methods.

#### 23.2.2. Creating and Configuring a React Native Project
1. **Install the development environment**:
   - Install [Node.js](https://nodejs.org/).
   - For iOS development on macOS, install Xcode and [Watchman](https://facebook.github.io/watchman/docs/install) (used to watch for file changes).

2. **Create a new project** (pick one):
   - **Expo (officially recommended, works out of the box)**:
     ```bash
     npx create-expo-app MyApp
     cd MyApp
     npx expo start
     ```
   - **React Native CLI (when you need native capabilities)**: The older global `react-native-cli` is deprecated; today you invoke the community CLI through `npx`:
     ```bash
     npx @react-native-community/cli@latest init MyApp
     cd MyApp
     ```

3. **Run the dev server**:
   - For Android (RN CLI projects; requires a connected device or a running emulator):
     ```bash
     npm run android
     ```
   - For iOS (requires macOS and Xcode):
     ```bash
     npm run ios
     ```
   - Expo projects use `npx expo run:android` / `npx expo run:ios` directly, or scan a code with Expo Go to preview.

#### 23.2.3. Development Basics
- **Component-based development**:
  - Build UI components using React's component-based philosophy.
  - Core components include `View`, `Text`, `Image`, `ScrollView`, `FlatList`, `Button`, and more.

- **Styles and layout**:
  - Define component styles with inline styles or the StyleSheet API.
  - Styles are written like CSS but differ in a few ways, such as using `dp` (density-independent pixels) as the unit.

- **Routing and navigation**:
  - Use the React Navigation library to handle app navigation and route management.
  - Offers multiple navigation modes: stack navigation, tab navigation, drawer navigation, and so on.

#### 23.2.4. Integrating with Native Code
- **Calling native modules**:
  - Use `NativeModules` to access native functionality from JavaScript, such as the camera, location, and sensors.
  - Build custom native modules so native code can be used inside a React Native app.

- **Native UI components**:
  - If you need native UI components, you can create custom native components through the bridge mechanism.

#### 23.2.5. Deployment and Release
- **Building the APK (Android)**:
  - Use Gradle to build the APK file, producing the installable package for distribution and release.
  - Configure release settings in `android/app/build.gradle`.

- **Building the IPA (iOS)**:
  - Use Xcode to build the IPA file, preparing it for upload to the App Store.
  - Configure the Xcode project to meet Apple's release requirements.

#### 23.2.6. Common Development Tools and Resources
- **Development tools**:
  - **Expo**: Provides a full development toolkit that simplifies the React Native workflow, especially well suited to rapid prototyping.
  - **React Native DevTools**: The new debugger built in from React Native 0.76 (based on the Chrome DevTools protocol and paired with the Hermes engine), supporting breakpoints, Console, and memory inspection. The older Flipper is no longer maintained, so new projects shouldn't adopt it.

- **Learning resources**:
  - [React Native Official Documentation](https://reactnative.dev/docs/getting-started)
  - [React Navigation Official Documentation](https://reactnavigation.org/docs/getting-started)
  - [Expo Documentation](https://docs.expo.dev/)

With React Native, developers can build cross-platform mobile apps efficiently while enjoying native-app performance and user experience.

## References

- [React Official Docs · React Reference](https://react.dev/reference/react)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)