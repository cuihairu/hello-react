## Managing Node.js Versions with nvm

nvm (Node Version Manager) is a tool for managing and switching between Node.js versions. It makes it easy to change Node.js versions during development, especially when different projects depend on different versions. Here are the details on installing and using nvm to manage Node.js versions.

### 1. Installing nvm

#### 1.1 Installing on Unix systems (Linux/macOS)

1. **Download and install nvm**

   Open a terminal and run the following command to download and install nvm:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
   ```

   Or use `wget`:

   ```bash
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
   ```

2. **Load nvm**

   After installation, reload your shell config or open a new terminal so nvm takes effect:

   ```bash
   source ~/.nvm/nvm.sh
   ```

3. **Verify the nvm installation**

   To confirm nvm installed correctly, run:

   ```bash
   nvm --version
   ```

#### 1.2 Installing on Windows

On Windows, nvm has a specific implementation called nvm-windows.

1. **Download and install nvm-windows**

   Go to the [nvm-windows GitHub releases page](https://github.com/coreybutler/nvm-windows/releases), download the latest installer file `nvm-setup.zip`, and follow the instructions to install it.

2. **After installation, restart your Command Prompt or PowerShell window**, then verify nvm:

   ```bash
   nvm version
   ```

### 2. Managing Node.js Versions with nvm

#### 2.1 Installing Node.js Versions

Use nvm to install different Node.js versions. For example, to install Node.js 14.x:

```bash
nvm install 14
```

To install a specific version (such as 14.17.0):

```bash
nvm install 14.17.0
```

#### 2.2 Switching Node.js Versions

To switch to an installed Node.js version, use the `nvm use` command:

```bash
nvm use 14
```

To switch to a specific version (such as 14.17.0):

```bash
nvm use 14.17.0
```

#### 2.3 Listing Installed Node.js Versions

To see the Node.js versions installed on your system, use:

```bash
nvm ls
```

#### 2.4 Setting the Default Node.js Version

You can set a default Node.js version so it's used automatically each time you open a terminal:

```bash
nvm alias default 14
```

#### 2.5 Uninstalling Node.js Versions

To uninstall a Node.js version you no longer need, use:

```bash
nvm uninstall 14
```

To uninstall a specific version (such as 14.17.0):

```bash
nvm uninstall 14.17.0
```

### 3. Using nvm for Project Management

When developing different Node.js projects, you may need a different Node.js version per project. With nvm, you can switch to and set the right version for each one.

#### 3.1 Setting the Node.js Version for a Project

You can use a `.nvmrc` file to specify the Node.js version a project uses. Create a `.nvmrc` file in the project root, with the required Node.js version as its content:

```
14.17.0
```

Then run the following command in the project directory, and nvm will switch to the specified version automatically:

```bash
nvm use
```

### 4. Summary

nvm is a powerful tool for managing and switching between Node.js versions. When projects require different Node.js versions, I use nvm to switch runtimes and pin the version with `.nvmrc`.

## References

- [nvm repository](https://github.com/nvm-sh/nvm)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [environment-setup](environment-setup.md)
- [knowledge](/knowledge.md))
