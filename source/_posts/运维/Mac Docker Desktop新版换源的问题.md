---
updated: 2021/07/26 19:53:25
date: 2021/07/26 19:53:25
categories: 
  - 运维
title: Mac Docker Desktop新版换源的问题
post_title: Mac Docker Desktop新版换源的问题
comments: 
tags: 
  - docker
description: Mac Docker Desktop新版换源的问题一、问题因为官方仓库实在是太慢了，所以一般我们都换个国内的使用，但网上查了下都是老资料了，根本没用，所以查了下官方资料。当前使用的版本2、解决看了下资料，其实也很简单打开 Prefreences 点击Docker Engine ，如图
---
# Mac Docker Desktop新版换源的问题
## 一、问题

因为官方仓库实在是太慢了，所以一般我们都换个国内的使用，但网上查了下都是老资料了，根本没用，所以查了下官方资料。

当前使用的版本

![img](https://static.jiabanmoyu.com/notes/1)

## 2、解决

看了下资料，其实也很简单打开 Prefreences 点击Docker Engine ，如图

![img](https://static.jiabanmoyu.com/notes/1-20210201102237916)

然后将我们国内源加入即可,完整配置如下

```
{
  "debug": true,
  "experimental": false,
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}
```

最后再用docker info查看下，会有如下信息就成功了。

```
Registry Mirrors:
  https://docker.mirrors.ustc.edu.cn/
  https://hub-mirror.c.163.com/
```