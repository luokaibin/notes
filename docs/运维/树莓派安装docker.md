---
updated: 2021/10/29 12:25:23
date: 2021/10/29 12:25:23
categories: 
  - 运维
title: 树莓派安装docker
post_title: 树莓派安装docker
comments: true
tags:
  - docker 安装
  - 树莓派
description: 树莓派安装docker 需要使用  命令，apt-get 命令是 Ubuntu 系统中的包管理工具，可以用来安装、卸载包，也可以用来升级包，还可以用来把系统升级到新的版本。但是 apt-get 默认的软件源是国外的，安装包非常慢，还经常安装失败，所以我们需要修改一下软件源地址更改apt源为阿里源
---


树莓派安装docker 需要使用 **`apt-get`** 命令，**apt-get 命令**是 Ubuntu 系统中的包管理工具，可以用来安装、卸载包，也可以用来升级包，还可以用来把系统升级到新的版本。**但是** apt-get 默认的软件源是国外的，安装包非常慢，还经常安装失败，所以我们需要修改一下软件源地址

## 更改apt源为阿里源

这里我们需要登录上树莓派

#### 1. apt-get 的源配置文件在 `/etc/apt/sources.list` 我们首先备份一下文件

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

#### 2. 修改 sources.list 文件

>  **nano**是一个字符终端的文本编辑器，和 vi/vim 类似，但比 vi/vim 要简单得多，树莓派默认的编辑器也是 nano，但是也带有 vi，这里我们使用 nano 编辑

```shell
sudo nano /etc/apt/sources.list
```

然后修改内容

```
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main non-free contrib
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main non-free contrib
```

> 这里我们使用的是清华的软件源

**更改完成之后，按 `ctrl+o` 保存，会让你修改文件名，如下图，当然你的可能是英文，这里不重要，然后 回车 确认文件名，再按 `ctrl+x` 关闭编辑器**

![image-20211028195404975](https://static.jiabanmoyu.com/notes/image-20211028195404975.png)

#### 3. 修改 raspi.list 文件

```shell
sudo nano /etc/apt/sources.list.d/raspi.list
```

修改内容

```
deb http://mirrors.tuna.tsinghua.edu.cn/raspberrypi/ buster main ui
```

然后保存退出

## 树莓派安装 docker

docker 官方有关于树莓派安装docker的文档，但在实际安装时，会出现错误，这里可以使用以下方法安装

#### 1. 更新软件源索引列表

```shell
sudo apt-get update
```

#### 2. 由于 apt 源使用 HTTPS 以确保软件下载过程中不被篡改。因此，我们首先 需要添加使用 HTTPS 传输的软件包以及 CA 证书

```shell
sudo apt-get install \
     apt-transport-https \
     ca-certificates \
     curl \
     gnupg2 \
     lsb-release \
     software-properties-common
```

#### 3. 为了确认所下载软件包的合法性，需要添加软件源的 GPG 密钥。

```shell
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/raspbian/gpg | sudo apt-key add -
```

> 命令最后的那个 **`-`** 是命令的一部分，不是多敲了

#### 4. 向 sources.list 中添加 Docker 软件源

```shell
sudo add-apt-repository \
    "deb [arch=armhf] https://mirrors.aliyun.com/docker-ce/linux/raspbian \
    $(lsb_release -cs) \
    stable"
```

#### 5. 安装 docker-ce

```shell
sudo apt-get install docker-ce
```

#### 6. 设置docker 开机启动

```shell
sudo systemctl enable docker
```

#### 7. 启动 docker

```shell
sudo systemctl start docker
# https://registry-1.docker.io/v2/: read tcp 192.168.31.161:41188->35.153.88.109:443
```

## 安装Docker-compose

Docker Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，我们可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务，会极大的方便我们管理 docker 容器。

> docker官方并没有发布64位ARM架构的docker-compose安装文件，所以没办法采用官方的安装方法。

#### 1. 更新apt索引

```shell
sudo apt-get update
```

#### 2. 安装 pip3

```shell
sudo apt-get install -y python3-pip
```

#### 3. 安装libffi-dev：

```shell
sudo apt-get install libffi-dev
```

#### 4. 用 pip3 安装docker-compose, 指定临时源为阿里源

```shell
sudo pip3 install -i https://mirrors.aliyun.com/pypi/simple/ docker-compose
```

#### 5. 安装完成 , 查看 compose 版本

```shell
docker-compose version
```

> 至此树莓派安装 docker 也完成了，我们就可以正常使用 docker 了。
