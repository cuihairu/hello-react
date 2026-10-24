React Ecosystem
======================

Here I collect Next.js, React Native, testing tools, and CI/CD from the React ecosystem, noting where each sits across the different stages of a project.

### 23.1. Next.js and Server-Side Rendering (SSR)
- **Next.js Introduction**
  - Next.js is a server-side rendering framework for React, supporting Static Site Generation (SSG) and dynamic rendering.
  - Provides automated code splitting, optimization, and routing.

- **Next.js basics**
  - **Creating a Next.js project**: Use the `npx create-next-app` command to create a project.
  - **Pages and routes**: Create files in the `pages` directory and routes are generated automatically.
  - **API routes**: Create API routes in the `pages/api` directory.
  - **Data fetching**: Use `getStaticProps` and `getServerSideProps` to prefetch data.

- **SSR and SEO optimization**
  - **Server-Side Rendering (SSR)**: Generates HTML on the server, improving initial load speed and SEO.
  - **Static Site Generation (SSG)**: Generates static pages, improving performance and security.
  - **SEO best practices**: Use Next.js's Head component to optimize page titles, metadata, and so on.

### 23.2. React Native Introduction and Mobile Development
- **React Native overview**
  - React Native is a framework for building native mobile apps, based on the React library.
  - Lets you develop iOS and Android apps using JavaScript and React components.

- **React Native basics**
  - **Creating a React Native project**: The officially recommended route is `npx create-expo-app` (Expo) or `npx @react-native-community/cli init` (the older global `react-native-cli` is deprecated).
  - **Components and layout**: Use the components provided by React Native, such as `View`, `Text`, and `Image`.
  - **Navigation**: Use `react-navigation` or `react-native-navigation` to implement app navigation.

- **Integrating with native code**
  - **Native modules**: Call native code or integrate with native APIs in a React Native app.
  - **Custom native components**: Create and use custom native UI components.

### 23.3. Testing Tools and Methods
- **Testing tools overview**
  - **Jest**: A JavaScript testing framework supporting unit, integration, and snapshot testing.
  - **Enzyme**: A testing library for React components, supporting render, mount, and querying of components.
  - **React Testing Library**: Focuses on testing component behavior rather than implementation details.

- **Unit testing and integration testing**
  - **Unit testing**: Tests the functionality of a single function or component.
  - **Integration testing**: Tests the interaction between multiple components or modules.

- **Mocking and snapshot testing**
  - **Mocking**: Create mock objects in tests to control the behavior of dependencies.
  - **Snapshot testing**: Records a component's render output and compares it against the snapshot in subsequent tests.

### 23.4. Continuous Integration and Automated Deployment
- **Continuous Integration (CI)**
  - **CI tools**: Use tools such as GitHub Actions, CircleCI, and Travis CI to automatically run tests, builds, and deployments.
  - **CI workflows**: Configure automated test and build pipelines to improve code quality and delivery efficiency.

- **Automated deployment**
  - **Deployment platforms**: Deploy apps to platforms such as Netlify, Vercel, AWS, and Heroku.
  - **Automated deployment workflows**: Configure CI tools to deploy the app automatically on every commit or code merge.

By learning these topics, you'll be better able to leverage the tools and technologies in the React ecosystem, improving both development efficiency and application quality.

## References

- [React Official Docs · React Reference](https://react.dev/reference/react)

## Related Pages

- [ci-cd](ci-cd.md)