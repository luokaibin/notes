---
updated: 2022/10/16 13:17:21
date: 2022/10/16 14:07:12
categories: 
  - 运维
title: 树莓派挂载webdav
post_title: 树莓派挂载webdav
comments: true
description: 一、安装davfs2二、创建挂载点三、挂载然后输入账号密码即可挂载成功四、实现开机自动挂载第一步、编辑davfs2.conf配置文件，将use_locks的1改为0第二步、修改secrets文件，添加账号信息在底部添加账号信息，如第三步、添加开机挂载命令末尾添加挂载命令
---

## 一、安装davfs2

```
apt-get install davfs2
```

## 二、创建挂载点

```
mkdir aliyun
```

## 三、挂载

```
mount -t davfs http://127.0.0.1:7780/ /home/aliyun
```

然后输入账号密码即可挂载成功

## 四、实现开机自动挂载

**第一步、编辑davfs2.conf配置文件，将use_locks的1改为0**

```
nano /etc/davfs2/davfs2.conf
```

![image-20221015204117137](https://static.jindll.com/notes/image-20221015204117137.png)

**第二步、修改secrets文件，添加账号信息**

```
nano /etc/davfs2/secrets
```

在底部添加账号信息，如

```
http://127.0.0.1:7780/ admin b4qfbgkd1z9LHC
```

![image-20221015204359201](https://static.jindll.com/notes/image-20221015204359201.png)

**第三步、添加开机挂载命令**

```
nano /etc/rc.local
```

末尾添加挂载命令

```
mount -t davfs http://127.0.0.1:7780/ /home/aliyun
```

![image-20221015204610483](https://static.jindll.com/notes/image-20221015204610483.png)

