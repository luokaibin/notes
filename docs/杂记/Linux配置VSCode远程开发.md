---
updated: 2022/03/12 17:45:00
date: 2022/03/12 17:45:00
categories: 
  - 杂记
title: Linux配置VSCode远程开发
post_title: Linux配置VSCode远程开发
comments: true
description: Linux配置：2核4G系统：CentOS 7.6服务器安装Git（clone项目用）CentOS7 自带的 Git 版本较低（1.8.31），通过 yum 也更新不上去，所以需要其他方式更新Git一、配置存储库，添加软件源二、导入GPG密钥三、yum 安装 Git四、查看版本本地配置
---

- Linux配置：2核4G
- 系统：CentOS 7.6

## 服务器安装Git（clone项目用）

> CentOS7 自带的 Git 版本较低（1.8.31），通过 yum 也更新不上去，所以需要其他方式更新Git

一、配置存储库，添加软件源

```shell
vim /etc/yum.repos.d/wandisco-git.repo
```

```
# 添加一下内容
[wandisco-git]
name=Wandisco GIT Repository
baseurl=http://opensource.wandisco.com/centos/7/git/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://opensource.wandisco.com/RPM-GPG-KEY-WANdisco
```

二、导入GPG密钥

```shell
rpm --import http://opensource.wandisco.com/RPM-GPG-KEY-WANdisco
```

三、yum 安装 Git

```shell
yum install -y git
```

四、查看版本

```shell
[root@master ~]# git version
git version 2.31.1
```

## 本地配置

一、VS Code 安装 Remote-SSH插件

> 搜到结果较多，只需安装 Remote-SSH 即可

<img src="https://static.jiabanmoyu.com/notes/image-20220312165400062.png" alt="image-20220312165400062" style="zoom:33%;" />

二、配置资源管理

> 1. 安装好之后你的侧栏会多出一个图标，远程资源管理
> 2. 如果你除了 Remote-SSH 插件外，还安装了 `Remote-WSL` 或者 `Remote-Containers` ，那你会多出一个 **`3`** 选择框，然后选择 `SSH Target` ，然后点击 设置图标 **`(2)`** 
> 3. 如果你只安装了 Remote-SSH 插件，那么直接点击设置图标

<img src="https://static.jiabanmoyu.com/notes/image-20220312165726122.png" alt="image-20220312165726122" style="zoom:33%;" />

### 然后进行配置

<img src="https://static.jiabanmoyu.com/notes/image-20220312170705139.png" alt="image-20220312170705139" style="zoom:33%;" /><img src="https://static.jiabanmoyu.com/notes/image-20220312171254640.png" alt="image-20220312171254640" style="zoom:33%;" />

### 在打开的文件里输入以下内容

> Host 名字随便起
>
> HostName 输入你服务器IP
>
> User 输入你服务器账号，默认 root
>
> Port 默认22，可省略，如果修改了SSH端口，这里需要指定

<img src="https://static.jiabanmoyu.com/notes/image-20220312171509469.png" alt="image-20220312171509469" style="zoom:33%;" />

### 远程连接服务器

<img src="https://static.jiabanmoyu.com/notes/image-20220312171819558.png" alt="image-20220312171819558" style="zoom:33%;" />

### 然后会来几个弹窗，让你确认是否连接，一直往下走，等到让你输入密码的时候，输入服务器密码进行连接即可

### 连接成功之后，打开项目，在这里就可以看到你的项目了，下次直接点击，就可以打开到项目了

<img src="https://static.jiabanmoyu.com/notes/image-20220312172311937.png" alt="image-20220312172311937" style="zoom:33%;" />

## 配置免密登录

### 在本地生成密钥对(windows、mac均适用)

```shell
ssh-keygen -t rsa
```

> 没有截到图，用张别人的图

<img src="https://static.jiabanmoyu.com/notes/image-20220312172837463.png" alt="image-20220312172837463" style="zoom:33%;" />

### 将公钥拷贝到服务器

- Window

  ```shell
  # SCP 将 公钥上传到服务器，公钥是面截图，划线的那个 .pub 文件
  # 在window上进行
  # SCP 上传指令：SCP <Window公钥文件> <服务器用户名>@<服务器IP>:~/.ssh/id_rsa_win.pub
  scp C:\Users\s515306902\.ssh\id_rsa.pub root@172.0.158.96:~/.ssh/id_rsa_win.pub
  # 在服务器上执行
  # 将window的公钥拷贝进authorized_keys
  cat ~/.ssh/id_rsa_win.pub >> ~/.ssh/authorized_keys
  ```

- Mac

  ```shell
  ssh-copy-id <服务器用户名>@<服务器IP>
  ```

### 在VS Code配置密钥

> 在服务器连接配置处加上密钥配置(新版的vscode能自动识别id_rsa，不用配置也能免密登录)
>
> `IdentityFile xxx/id_rsa`

<img src="https://static.jiabanmoyu.com/notes/image-20220312174313843.png" alt="image-20220312174313843" style="zoom: 50%;" />

### 重启VS Code，免密生效，完成

