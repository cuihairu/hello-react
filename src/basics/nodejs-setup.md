
## 安装与配置 Node.js

Node.js 是一个基于事件驱动、非阻塞 I/O 模型的 JavaScript 运行时，用于构建高性能的服务器端应用程序。以下是如何安装和配置 Node.js 的详细步骤。

### 1. 什么是 Node.js

Node.js 是一个开源的 JavaScript 运行时环境，基于 Chrome 的 V8 引擎。它允许开发者使用 JavaScript 编写服务器端应用程序，使得前端和后端可以使用相同的编程语言。Node.js 提供了丰富的模块和工具，用于构建现代化的 Web 应用程序和服务。

### 2. 安装 Node.js

根据操作系统的不同，安装 Node.js 的步骤也有所不同。

#### **在 Windows 上安装**

1. **下载 Node.js 安装程序**：
   - 访问 [Node.js 官方网站](https://nodejs.org/)。
   - 下载适用于 Windows 的最新 LTS（长期支持）版本的安装程序。

2. **运行安装程序**：
   - 双击下载的安装程序（.msi 文件）。
   - 按照安装向导的提示进行操作。建议选择默认安装选项，包括 npm（Node.js 的包管理工具）。

3. **验证安装**：
   - 打开命令提示符（CMD）。
   - 输入以下命令检查 Node.js 和 npm 的版本：
     ```bash
     node -v
     npm -v
     ```
   - 如果命令输出了版本号，说明安装成功。

#### **在 macOS 上安装**

1. **使用 Homebrew 安装**：
   - 如果尚未安装 Homebrew，可以通过终端运行以下命令安装 Homebrew：
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - 使用 Homebrew 安装 Node.js：
     ```bash
     brew install node
     ```

2. **验证安装**：
   - 打开终端。
   - 输入以下命令检查 Node.js 和 npm 的版本：
     ```bash
     node -v
     npm -v
     ```

#### **在 Linux 上安装**

1. **使用包管理工具安装**：
   - 对于基于 Debian 的系统（如 Ubuntu），可以运行以下命令：
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```
   - 对于基于 Red Hat 的系统（如 CentOS），可以使用以下命令：
     ```bash
     sudo yum install nodejs npm
     ```

2. **验证安装**：
   - 打开终端。
   - 输入以下命令检查 Node.js 和 npm 的版本：
     ```bash
     node -v
     npm -v
     ```

### 3. 配置环境变量

在某些操作系统上，您可能需要手动配置 Node.js 的环境变量。

#### **在 Windows 上配置**

1. **打开系统属性**：
   - 右键点击“此电脑”或“计算机”，选择“属性”。
   - 点击“高级系统设置”，然后点击“环境变量”。

2. **编辑 PATH 变量**：
   - 在“系统变量”部分，找到并选择 `Path` 变量，然后点击“编辑”。
   - 添加 Node.js 的安装路径（通常是 `C:\Program Files\nodejs\`），确保路径已正确添加到 `Path` 变量中。

#### **在 macOS 和 Linux 上配置**

1. **编辑 shell 配置文件**：
   - 根据您使用的 shell 编辑相应的配置文件（例如 `.bashrc`, `.zshrc`）。
   - 添加 Node.js 的安装路径到 `PATH` 变量。例如：
     ```bash
     export PATH="/usr/local/bin/node:$PATH"
     ```

2. **应用更改**：
   - 保存文件并重新加载配置文件：
     ```bash
     source ~/.bashrc
     ```
     或
     ```bash
     source ~/.zshrc
     ```

### 4. 验证安装

安装和配置完成后，您可以通过以下命令验证 Node.js 和 npm 是否正确安装：

```bash
node -v
npm -v
```

如果这些命令输出了 Node.js 和 npm 的版本号，说明安装和配置成功。

### 5. 升级 Node.js

要升级 Node.js 到最新版本，可以使用 Node Version Manager (nvm) 或直接从 Node.js 官网下载并安装最新版本。

#### **使用 nvm 升级**

1. **安装 nvm**：
   - 运行以下命令安装 nvm（如果尚未安装）：
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
     ```

2. **安装最新版本的 Node.js**：
   - 运行以下命令安装最新版本：
     ```bash
     nvm install node
     ```

3. **切换到最新版本**：
   - 运行以下命令使用最新版本：
     ```bash
     nvm use node
     ```

#### **直接升级**

对于 Windows 和 macOS，您可以从 [Node.js 官方网站](https://nodejs.org/) 下载并安装最新版本的 Node.js。对于 Linux，可以使用包管理工具更新 Node.js。
