## 使用 nvm 管理 Node.js 版本

nvm（Node Version Manager）是一个工具，用于管理和切换 Node.js 的不同版本。它使得在开发过程中能够方便地切换 Node.js 版本，特别是当不同的项目依赖于不同的 Node.js 版本时。以下是如何安装和使用 nvm 来管理 Node.js 版本的详细说明。

### 1. 安装 nvm

#### **1.1 在 Unix 系统（Linux/macOS）上安装**

1. **下载和安装 nvm**

   打开终端，运行以下命令下载和安装 nvm：

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
   ```

   或者使用 `wget`：

   ```bash
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
   ```

2. **加载 nvm**

   安装完成后，需要重新加载 shell 配置文件或重新打开终端，以便使 nvm 生效：

   ```bash
   source ~/.nvm/nvm.sh
   ```

3. **验证 nvm 安装**

   确保 nvm 安装成功，可以运行以下命令：

   ```bash
   nvm --version
   ```

#### **1.2 在 Windows 上安装**

在 Windows 上，nvm 有一个特定的实现版本，称为 nvm-windows。

1. **下载和安装 nvm-windows**

   访问 [nvm-windows 的 GitHub 发布页面](https://github.com/coreybutler/nvm-windows/releases)，下载最新的安装程序 `nvm-setup.zip` 文件，并按照说明进行安装。

2. **安装完成后，重启命令提示符或 PowerShell 窗口**，然后验证 nvm 安装：

   ```bash
   nvm version
   ```

### 2. 使用 nvm 管理 Node.js 版本

#### **2.1 安装 Node.js 版本**

使用 nvm 安装不同版本的 Node.js。例如，要安装 Node.js 14.x 版本：

```bash
nvm install 14
```

要安装特定的版本（如 14.17.0）：

```bash
nvm install 14.17.0
```

#### **2.2 切换 Node.js 版本**

要切换到已安装的某个 Node.js 版本，可以使用 `nvm use` 命令：

```bash
nvm use 14
```

要切换到特定版本（如 14.17.0）：

```bash
nvm use 14.17.0
```

#### **2.3 查看已安装的 Node.js 版本**

要查看当前系统上已安装的 Node.js 版本，可以使用：

```bash
nvm ls
```

#### **2.4 设置默认 Node.js 版本**

可以设置默认的 Node.js 版本，以便每次打开终端时自动使用此版本：

```bash
nvm alias default 14
```

#### **2.5 卸载 Node.js 版本**

要卸载不再需要的 Node.js 版本，可以使用：

```bash
nvm uninstall 14
```

要卸载特定版本（如 14.17.0）：

```bash
nvm uninstall 14.17.0
```

### 3. 使用 nvm 进行项目管理

在开发不同的 Node.js 项目时，可能需要为每个项目使用不同的 Node.js 版本。使用 nvm，您可以为每个项目切换和设置适当的 Node.js 版本。

#### **3.1 为项目设置 Node.js 版本**

可以使用 `.nvmrc` 文件来指定项目使用的 Node.js 版本。在项目根目录下创建一个 `.nvmrc` 文件，文件内容为所需的 Node.js 版本：

```
14.17.0
```

然后，在项目目录中运行以下命令，nvm 将自动切换到指定版本：

```bash
nvm use
```

### 4. 总结

nvm 是一个强大的工具，可以方便地管理和切换不同版本的 Node.js。掌握 nvm 的基本用法将帮助您在多个项目中高效地处理不同的 Node.js 版本需求。
