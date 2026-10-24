
## Installing and Configuring Node.js

Node.js is a JavaScript runtime built on an event-driven, non-blocking I/O model, used to build high-performance server-side applications. Here are the detailed steps to install and configure Node.js.

### 1. What is Node.js

Node.js is an open-source JavaScript runtime environment built on Chrome's V8 engine. It lets developers write server-side applications in JavaScript, so frontend and backend can share one programming language. Node.js provides a rich set of modules and tools for building modern web applications and services.

### 2. Installing Node.js

The installation steps differ depending on your operating system.

#### Installing on Windows

1. **Download the Node.js installer**:
   - Visit the [Node.js official website](https://nodejs.org/).
   - Download the installer for the latest LTS (Long Term Support) version for Windows.

2. **Run the installer**:
   - Double-click the downloaded installer (.msi file).
   - Follow the installation wizard. The default options are recommended, including npm (Node.js's package manager).

3. **Verify the installation**:
   - Open Command Prompt (CMD).
   - Run the following commands to check the Node.js and npm versions:
     ```bash
     node -v
     npm -v
     ```
   - If the commands print version numbers, the installation succeeded.

#### Installing on macOS

1. **Install with Homebrew**:
   - If Homebrew isn't installed yet, run the following command in a terminal to install it:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Install Node.js with Homebrew:
     ```bash
     brew install node
     ```

2. **Verify the installation**:
   - Open a terminal.
   - Run the following commands to check the Node.js and npm versions:
     ```bash
     node -v
     npm -v
     ```

#### Installing on Linux

1. **Install with a package manager**:
   - On Debian-based systems (such as Ubuntu), run:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```
   - On Red Hat-based systems (such as CentOS), use:
     ```bash
     sudo yum install nodejs npm
     ```

2. **Verify the installation**:
   - Open a terminal.
   - Run the following commands to check the Node.js and npm versions:
     ```bash
     node -v
     npm -v
     ```

### 3. Configuring Environment Variables

On some operating systems, you may need to configure Node.js environment variables manually.

#### Configuring on Windows

1. **Open System Properties**:
   - Right-click "This PC" or "Computer" and select "Properties".
   - Click "Advanced system settings", then click "Environment Variables".

2. **Edit the PATH variable**:
   - Under "System variables", find and select the `Path` variable, then click "Edit".
   - Add the Node.js installation path (usually `C:\Program Files\nodejs\`), making sure it's correctly added to the `Path` variable.

#### Configuring on macOS and Linux

1. **Edit your shell config file**:
   - Edit the config file for the shell you use (for example `.bashrc`, `.zshrc`).
   - Add the Node.js installation path to the `PATH` variable. For example:
     ```bash
     export PATH="/usr/local/bin:$PATH"
     ```

2. **Apply the changes**:
   - Save the file and reload the config:
     ```bash
     source ~/.bashrc
     ```
     or
     ```bash
     source ~/.zshrc
     ```

### 4. Verifying the Installation

Once installation and configuration are done, verify Node.js and npm with:

```bash
node -v
npm -v
```

If these commands print the Node.js and npm version numbers, the installation and configuration succeeded.

### 5. Upgrading Node.js

To upgrade Node.js to the latest version, use Node Version Manager (nvm) or download and install the latest version directly from the official Node.js website.

#### Upgrading with nvm

1. **Install nvm**:
   - Run the following command to install nvm (if it isn't installed yet):
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
     ```

2. **Install the latest Node.js version**:
   - Run the following command to install the latest version:
     ```bash
     nvm install node
     ```

3. **Switch to the latest version**:
   - Run the following command to use the latest version:
     ```bash
     nvm use node
     ```

#### Upgrading directly

On Windows and macOS, you can download and install the latest Node.js from the [Node.js official website](https://nodejs.org/). On Linux, you can update Node.js with a package manager.

## References

- [Node.js documentation](https://nodejs.org/en/docs)
- [Node.js downloads](https://nodejs.org/en/download)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [environment-setup](environment-setup.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
