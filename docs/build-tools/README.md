# Compiling Systems & Build Tools

Here I gather the front-end build tools I've come across in projects: Webpack, Vite, Taro, plus practices around configuration, optimization, and CI/CD.

## Page Index

### Build Tools & Automation
- [An Overview of Front-End Build Tools: Webpack, Vite, Parcel](build-tools-overview.md) — architectural differences, cold start / hot reload, plugin ecosystems, selection advice
- [Webpack Configuration & Optimization](webpack.md) — Entry/Output/Module/Plugins/Resolve, code splitting, Tree Shaking, caching strategies
- [Transpiling ES6+ Code with Babel](babel.md) — Presets/Plugins, Polyfills, Targets, caching, TypeScript integration
- [Automated Builds & CI/CD Integration](automation-ci-cd.md) — GitHub Actions/GitLab CI, artifact upload, environment variables, deployment strategies
- [Boosting Development Efficiency with Vite](vite.md) — the no-bundle dev server, Rollup production builds, plugin compatibility, library mode

### Taro & Multi-Platform Development
- [What Is Taro: One Codebase, Multi-Platform Support](taro-intro.md) — compile-time transformation, runtime adaptation, mini-programs/H5/RN/QuickApp
- [Initializing & Configuring a Taro Project](taro-setup.md) — CLI, templates, config/index.ts, environment variables, aliases
- [Building Mini-Programs with React.js in Taro](taro-react.md) — component mapping, lifecycle correspondences, restricted JSX, style isolation
- [Handling Compatibility Issues Across Platforms](taro-compatibility.md) — API differences, conditional compilation, environment variables, embedding native components
- [Integrating Taro with Mini-Program APIs](taro-api.md) — the Taro.* namespace, Promise style, cloud development, plugin mechanism
- [Building & Releasing a Taro Project](taro-build.md) — multi-environment builds, code minification, sub-packaging, upload & preview, CI automation

## Content Angles

This page collects the entry points to my personal notes on this topic; each page unfolds from a conceptual, practical, or implementation angle, so feel free to read across them as needed.

## References

- [React Official Docs · Reference](https://react.dev/reference/react)

## Related Pages

- [automation-ci-cd](automation-ci-cd.md)
