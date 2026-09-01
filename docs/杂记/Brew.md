## 查看 Homebrew 当前版本

```
brew --version
```

### 将 Brew 更新到最新版

```shell
# 第一步：更新 Homebrew 自身和软件包列表
brew update
# 第二步：升级所有已安装的软件包
brew upgrade
# 如果只想升级某一个软件包，例如nginx
brew upgrade nginx
```

## 查看已安装的软件包列表

### 查看所有软件包名称 (最常用)

```shell
brew list
# 或者
brew ls
```

### 查看软件包及其版本号

```shell
brew list --versions
```

### 查看顶层软件包 (您手动安装的)

有时候，您安装一个软件（比如 `nginx`），它会自动安装一堆其他软件作为依赖（比如 `pcre2`, `openssl`）。如果您只想看那些**由您自己明确执行 `brew install` 安装的软件**，而不是它们的依赖项，可以使用：

```shell
brew leaves
```

### 查看顶层软件包和其版本
利用了 xargs 工具，该工具能将一个命令的输出作为另一个命令的参数

```
brew leaves | xargs brew list --versions
```

这个命令是如何工作的？

1. brew leaves: 首先运行，生成一个您手动安装的软件包的名称列表。
2. | (管道符): 将这个名称列表（例如 nginx, git, node）“传送”给下一个命令。
3. xargs brew list --versions: xargs 接收到这个列表，然后执行 brew list --versions nginx git node。brew list --versions 命令可以接受软件包名称作为参数，只显示这些特定包的版本信息。
最终，您就得到了一个只包含手动安装的软件包及其版本号的干净列表。

## 软件包升级之后清理旧版本

默认情况下，`brew upgrade` 升级之后，不会清理旧版本

```shell
brew cleanup
```

brew cleanup 会做什么？

- 删除所有已安装软件包的旧版本。
- 删除 Homebrew 下载的旧的安装包缓存。
- 清理其他一些临时的日志和文件。

### 只清理某一个特定软件的旧版本

```shell
brew cleanup nginx
```

## brew 常用命令(安装卸载启动停止开机自启等)

| 需求             | 对应的命令                    | 说明                                     |
| :--------------- | :---------------------------- | :--------------------------------------- |
| **安装软件包**   | `brew install nginx`          | 安装 Nginx                               |
| **卸载软件包**   | `brew uninstall nginx`        | 卸载 Nginx                               |
| **启动服务**     | `brew services start nginx`   | 立即启动，并设置为开机自启               |
| **设置开机自启** | `brew services start nginx`   | 同上                                     |
| **停止服务**     | `brew services stop nginx`    | 立即停止，并取消开机自启                 |
| **查看所有服务** | `brew services list`          | 列出所有服务的状态                       |
| **重启服务**     | `brew services restart nginx` | 停止后立即再次启动，通常用于让新配置生效 |

## brew 启动的服务，默认的日志位置

- 基础目录: `/opt/homebrew/var/` 是存放所有可变数据（如日志、数据库文件等）的根目录。
- 日志根目录: `/opt/homebrew/var/log/` 是存放日志文件的标准位置。
- 服务子目录: 大多数设计良好的软件包（我们称之为 Formula）会在这里创建一个以自己名字命名的子目录，以避免日志文件混乱。

### 查看日志的命令

```shell
tail -f /opt/homebrew/var/log/nginx/error.log
```

## mac 通过 brew 管理 nginx

配置文件默认地址：`/opt/homebrew/etc/nginx/nginx.conf` 

## pm2 查看管理的服务详情

```shell
pm2 show <name_or_id>
```

## pm2 查看服务的日志

```
pm2 logs <name_or_id>
```

## mac pm2 管理的服务开机自启动

```shell
pm2 save
# 每次你更新了需要自启的应用列表（比如新增或删除了应用），都应该重新执行一次 pm2 save
pm2 startup
```

**`pm2 startup`** 这个命令**不会直接完成设置**。相反，它会分析你的操作系统（macOS），然后**在终端里输出另一条你需要手动执行的命令**。

你将会看到类似下面这样的输出：

> [PM2] Init System found: [launchd]
> [PM2] To setup the Startup Script, copy/paste the following command:
> sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup launchd -u your_username --hp /Users/your_username

**第 3 步：执行生成的命令**

现在，复制 `pm2 startup` 命令输出的那一行 `sudo ...` 命令，并粘贴到终端里执行。

它会要求你输入你的 Mac 登录密码，因为 sudo 需要管理员权限来在 `/Library/LaunchDaemons` 目录下创建一个 `.plist` 服务文件。
这个 .plist 文件会告诉 launchd 在系统启动时运行 pm2。
执行成功后，pm2 就会在每次你的 Mac 开机时自动启动，并加载你之前用 pm2 save 保存的应用列表。

### 如何撤销开机自启

如果你以后不希望 pm2 开机自启了，可以运行 unstartup 命令。

```
pm2 unstartup
```

同样，它也会生成一条 `sudo` 命令让你去执行，用于移除之前创建的 `launchd` 服务。



