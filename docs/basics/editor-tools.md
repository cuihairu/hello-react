## Code Editors and Development Tools

Choosing the right code editor and development tools can significantly improve both productivity and code quality. Here are my notes on some popular code editors and their features, plus a few recommended development tools.

### 1. Code Editors

#### 1.1 Visual Studio Code (VSCode)

- **Overview**: Visual Studio Code is a free, open-source code editor developed by Microsoft, widely used for both frontend and backend development. It is powerful and highly extensible.
- **Key features**:
  - **Strong extension support**: A rich plugin marketplace covering language support, debugging tools, themes, and more.
  - **Built-in Git support**: Version control operations can be done directly inside the editor.
  - **Intelligent code completion**: Syntax hints and autocompletion.
  - **Debugging**: Supports breakpoints, variable inspection, call stacks, and more.
  - **Integrated terminal**: A built-in terminal window for running commands directly.
- **Recommended extensions**:
  - **Prettier**: Code formatter.
  - **ESLint**: Static analysis tool.
  - **Live Server**: Starts a local dev server so you can see changes in real time.

#### 1.2 Sublime Text

- **Overview**: Sublime Text is a lightweight, efficient code editor with fast response times and a clean interface.
- **Key features**:
  - **Fast startup**: Launches and opens files very quickly.
  - **Multi-cursor editing**: Edit in multiple places at once.
  - **Plugin support**: A rich plugin ecosystem; install plugins via Package Control.
- **Recommended plugins**:
  - **Package Control**: Plugin manager.
  - **Emmet**: Quickly generate HTML and CSS.
  - **SublimeLinter**: Static code checking.

#### 1.3 Atom

- **Overview**: Atom is an open-source code editor developed by GitHub, with a high degree of customizability.
- **Note**: Atom was officially archived by GitHub and discontinued in December 2022, so I wouldn't pick it for new projects; existing users can migrate to VSCode or Pulsar (the community continuation fork).
- **Key features**:
  - **Customizability**: Change the UI and behavior by editing config files and installing plugins.
  - **Git integration**: Built-in Git and GitHub support.
  - **Smart autocompletion**: Code completion and syntax highlighting.
- **Recommended plugins**:
  - **atom-beautify**: Code formatter.
  - **linter-eslint**: ESLint plugin for code linting.
  - **file-icons**: Adds file icons for better readability.

### 2. Development Tools

#### 2.1 Git

- **Overview**: Git is a distributed version control system for tracking file changes and collaborating on development.
- **Key features**:
  - **Version management**: Keeps a history of file versions, supporting restore and comparison between versions.
  - **Branching**: Create, merge, and delete branches for parallel development.
  - **Remote repositories**: Sync code with remote repositories such as GitHub or GitLab.
- **Common commands**:
  - **git clone**: Clone a remote repository locally.
  - **git commit**: Commit changes to the local repository.
  - **git push**: Push local changes to the remote repository.
  - **git pull**: Pull the latest changes from the remote repository.

#### 2.2 Node Version Manager (nvm)

- **Overview**: nvm is a Node.js version manager for managing and switching between Node.js versions.
- **Key features**:
  - **Install and switch Node.js versions**: Install, uninstall, and switch between Node.js versions.
  - **Set default versions**: Pin a default Node.js version per project.
- **Common commands**:
  - **nvm install**: Install a specific Node.js version.
  - **nvm use**: Switch to a specific Node.js version.
  - **nvm ls**: List installed Node.js versions.

#### 2.3 Docker

- **Overview**: Docker is an open platform for automating the deployment, scaling, and management of applications.
- **Key features**:
  - **Containerization**: Package an app and its dependencies into containers so it runs consistently across environments.
  - **Virtualization**: Provides a lightweight virtualized environment.
  - **Image management**: Create, share, and distribute application images.
- **Common commands**:
  - **docker run**: Run a Docker container.
  - **docker build**: Build an image from a Dockerfile.
  - **docker-compose**: Tool for managing multi-container applications.

#### 2.4 Postman

- **Overview**: Postman is a tool for API development and testing.
- **Key features**:
  - **Send HTTP requests**: Supports GET, POST, PUT, DELETE, and other methods.
  - **Testing and debugging**: Write test scripts and inspect request responses.
  - **Environment management**: Create and manage different sets of environment variables.
- **Common features**:
  - **Create requests**: Design and send all kinds of HTTP requests.
  - **Test scripts**: Write tests in JavaScript to validate API responses.

### 3. Summary

Picking the right code editor and development tools is key to productivity. Visual Studio Code, Sublime Text, and Atom are all popular editors, each with its own strengths. Git, nvm, Docker, and Postman are recommended tools that help manage versions, environments, and containerized apps more efficiently. Choosing and configuring these tools around your own needs will pay off in day-to-day development.

## References

- [Visual Studio Code documentation](https://code.visualstudio.com/docs)
- [MDN Tools and testing](https://developer.mozilla.org/en-us/docs/Learn/Tools_and_testing)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [environment-setup](environment-setup.md)
- [knowledge](/knowledge.md))
