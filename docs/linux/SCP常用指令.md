---
updated: 2021/07/26 19:53:25
date: 2021/07/26 19:53:25
categories: 
  - linux
title: SCP常用命令
comments: 
lang: zh-CN
description: 1. 从服务器下载文件2. 上传本地文件到服务器3. 从服务器下载整个目录4. 上传目录到服务器5. 在两个远程主机之间复制文件
---

## 1. 从服务器下载文件

```shell
scp root@139.129.37.238:/var/www/test/test.html test.html
```

## 2. 上传本地文件到服务器

```shell
scp /Users/wing/files/test.html  root@139.129.37.238:/var/www/test/        
#ssh非常规的22端口则使用以下命令
scp -P 22222 -r /Users/wing/files/ root@139.129.37.238:/home/wing/files 
```

## 3. 从服务器下载整个目录

```shell
scp -r root@139.129.37.238:/var/www/test .
```

## 4. 上传目录到服务器

```shell
scp  -r ./test root@139.129.37.238:/var/www/
```

## 5. 在两个远程主机之间复制文件

```shell
scp root@192.168.1.104:/usr/local/nginx/html/webs/xx.txt root@192.168.1.105:/usr/local/nginx/html/webs/
```

