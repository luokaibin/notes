---
updated: 2021/07/26 19:53:26
date: 2021/07/26 19:53:26
categories: 
  - raspberrypi
title: pip命令详解
comments: 
description: pip 是 Python 的包安装程序。其实，pip 就是 Python 标准库（The Python Standard Library）中的一个包，只是这个包比较特殊，用它可以来管理 Python 标准库（The Python Standard Library）中其他的包。pip 支持从 PyPI，版本控制，本地项目以及直接从分发文件进行安装。pip 是一个命令行程序。 安装 pip 后，会向系统添加一个 pip 命令，该命令可以从命令提示符运行。
---
pip 是 Python 的包安装程序。其实，pip 就是 Python 标准库（The Python Standard Library）中的一个包，只是这个包比较特殊，用它可以来管理 Python 标准库（The Python Standard Library）中其他的包。pip 支持从 PyPI，版本控制，本地项目以及直接从分发文件进行安装。pip 是一个命令行程序。 安装 pip 后，会向系统添加一个 pip 命令，该命令可以从命令提示符运行。

> PyPI（The Python Package Index，Python包索引）是 Python 编程语言的软件存储库。通常，我们就是从这上面安装各种 Python 的包，也可以在上面发布自己的包。
> The Python Packaging Authority (PyPA) is a working group that maintains many of the relevant projects in Python packaging.

# 使用

安装后，在命令行中键入：pip+ 回车，就会出现如下使用说明：

```
Usage:
  pip <command> [options]

Commands:
  install                     Install packages.
  download                    Download packages.
  uninstall                   Uninstall packages.
  freeze                      Output installed packages in requirements format.
  list                        List installed packages.
  show                        Show information about installed packages.
  check                       Verify installed packages have compatible dependencies.
  config                      Manage local and global configuration.
  search                      Search PyPI for packages.
  wheel                       Build wheels from your requirements.
  hash                        Compute hashes of package archives.
  completion                  A helper command used for command completion.
  help                        Show help for commands.

General Options:
  -h, --help                  Show help.
  --isolated                  Run pip in an isolated mode, ignoring environment variables and user configuration.
  -v, --verbose               Give more output. Option is additive, and can be used up to 3 times.
  -V, --version               Show version and exit.
  -q, --quiet                 Give less output. Option is additive, and can be used up to 3 times (corresponding to
                              WARNING, ERROR, and CRITICAL logging levels).
  --log <path>                Path to a verbose appending log.
  --proxy <proxy>             Specify a proxy in the form [user:passwd@]proxy.server:port.
  --retries <retries>         Maximum number of retries each connection should attempt (default 5 times).
  --timeout <sec>             Set the socket timeout (default 15 seconds).
  --exists-action <action>    Default action when a path already exists: (s)witch, (i)gnore, (w)ipe, (b)ackup,
                              (a)bort).
  --trusted-host <hostname>   Mark this host as trusted, even though it does not have valid or any HTTPS.
  --cert <path>               Path to alternate CA bundle.
  --client-cert <path>        Path to SSL client certificate, a single file containing the private key and the
                              certificate in PEM format.
  --cache-dir <dir>           Store the cache data in <dir>.
  --no-cache-dir              Disable the cache.
  --disable-pip-version-check
                              Don't periodically check PyPI to determine whether a new version of pip is available for
                              download. Implied with --no-index.
  --no-color                  Suppress colored output
```

## 查看版本

```shell
pip -V
```

## 升级pip（install）

```shell
pip install --upgrade pip
```

## 查看已安装第三方包列表（list）

```shell
pip list
```

## 搜索包（search）

```shell
pip search <搜索关键字>
```

## 安装升级包（install）

```shell
# 1. 直接安装 默认会安装最新版本的包
pip install 包名
# 2. 安装指定版本的包
pip install 包名==版本号
# 3. 通过.whl安装包安装
# 这种方式通常在直接pip安装出现异常时使用。.whl安装包需在安装前下载好，下面推荐一个常用的.whl包下载网址：https://www.lfd.uci.edu/~gohlke/pythonlibs/
pip install .whl安装包名
# 4. 通过requirements.txt安装
# 这种方式一般用于安装项目依赖。requirements.txt中，通过使用== >= <= > <来指定版本，不写则安装最新版。requirements.txt的内容格式如下：
# Twisted==18.9.0
# SQLAlchemy==1.2.18
# Django==1.5.4
# pandas==0.24.1
# lxml==4.3.1
# 12345
pip install -r requirements.txt
# 5. 升级包
pip install -U 包名
```

## 查看包信息（show）

```shell
pip show 包名
```

## 卸载包（uninstall）

```shell
pip uninstall 包名
```

## 把已安装的python包以requirements参数的格式输出（freeze）

```shell
pip install -r <要输出的文件名>.txt
```

