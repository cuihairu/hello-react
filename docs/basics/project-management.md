## Creating and Managing Projects

In Node.js development, creating and managing a project is a critical step. This section covers how to create a new Node.js project, organize its structure, and manage its configuration files.

### 1. Creating a New Project

#### 1.1 Initializing a project with `npm init`

The `npm init` command initializes a new Node.js project. It walks you through creating a `package.json` file containing the project's basic information and dependencies.

```bash
npm init
```

Follow the prompts to enter the project name, version, description, entry point, and so on. When you finish, a `package.json` file is generated with the information you provided and the default configuration.

You can also use the `-y` flag to skip all prompts and generate a default `package.json` file:

```bash
npm init -y
```

#### 1.2 Initializing a project with `yarn init`

If you use Yarn as your package manager, initialize the project with the `yarn init` command:

```bash
yarn init
```

Like `npm init`, Yarn walks you through the project configuration.

### 2. Project Structure

A good project structure improves code maintainability and readability. Here is a common Node.js project layout:

```
my-project/
├── node_modules/          # Project dependencies
├── public/                # Static files (images, styles, etc.)
├── src/                   # Source code
│   ├── controllers/       # Controllers
│   ├── models/            # Data models
│   ├── routes/            # Route definitions
│   ├── services/          # Service layer
│   └── index.js           # Project entry point
├── .gitignore              # Git ignore file
├── package.json           # Project configuration file
├── package-lock.json      # Locks dependency versions
└── README.md              # Project documentation
```

#### 2.1 The `src` folder

- **controllers/**: Holds the logic for handling requests and responses.
- **models/**: Defines data models and database interactions.
- **routes/**: Defines the application's routes and request handling.
- **services/**: Contains business logic and interactions with external services.
- **index.js**: The project entry point, where the app is usually started.

#### 2.2 The `public` folder

- Stores static files such as images, stylesheets, and JavaScript files, served directly to the client.

### 3. Configuration Files

#### 3.1 The `package.json` file

`package.json` is the core configuration file of a Node.js project, recording the project's metadata, dependencies, and scripts. Here are some common fields:

- **name**: Project name
- **version**: Project version
- **description**: Project description
- **main**: Entry point file
- **scripts**: Project scripts (testing, starting, etc.)
- **dependencies**: Production dependencies
- **devDependencies**: Development dependencies
- **engines**: Node.js version requirements

#### 3.2 The `package-lock.json` file

`package-lock.json` records the exact version of every dependency in the project to ensure consistent installs. It updates automatically every time you install or update dependencies.

#### 3.3 The `.gitignore` file

`.gitignore` specifies the files and folders Git should ignore on commit. Common entries include:

```
node_modules/
*.log
.env
```

### 4. Managing Project Dependencies

#### 4.1 Installing new dependencies

Use `npm install` or `yarn add` to install new dependencies. For example, to install the Express framework:

```bash
npm install express
```

Or

```bash
yarn add express
```

#### 4.2 Updating dependencies

Use `npm update` or `yarn upgrade` to update all dependencies to their latest versions:

```bash
npm update
```

Or

```bash
yarn upgrade
```

#### 4.3 Uninstalling dependencies

Use `npm uninstall` or `yarn remove` to remove dependencies you no longer need:

```bash
npm uninstall express
```

Or

```bash
yarn remove express
```

### 5. Version Control with Git

Git is a distributed version control system for tracking file change history and collaborating on development.

#### 5.1 Initializing a Git repository

Run the following command in the project root to initialize a Git repository:

```bash
git init
```

#### 5.2 Adding files to Git

Use `git add` to stage files:

```bash
git add .
```

#### 5.3 Committing changes

Use `git commit` to commit changes:

```bash
git commit -m "Initial commit"
```

#### 5.4 Linking a remote repository

Associate the local repository with a remote one:

```bash
git remote add origin <remote-repository-URL>
```

#### 5.5 Pushing changes

Push local changes to the remote repository:

```bash
git push -u origin main
```

### 6. Summary

Node.js project management involves initialization, file organization, configuration, and version control; when reproducing a project environment I check these settings first.

## References

- [Git official documentation](https://git-scm.com/doc)
- [npm about](https://docs.npmjs.com/about-npm)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [environment-setup](environment-setup.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
