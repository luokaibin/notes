---
updated: 2022/07/26 16:32:28
date: 2022/10/21 17:05:03
categories: 
  - 杂记
title: Brew 安装 mongodb
post_title: Brew 安装 mongodb
comments: 
description: 一、安装 brew二三、启动 mongodb四、检查 mongodb 是否正常启动五、连接数据库六、创建超级管理员七、查看当前用户及权限八、启用授权登录添加以下内容九、重新启动 mongodb十、授权登录十一、创建数据库管理员十二项目内连接
---

## 一、安装 brew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 二

```sh
brew tap mongodb/brew 

brew install mongodb-community
```

## 三、启动 mongodb

```sh
brew services start mongodb-community@6.0
```

## 四、检查 mongodb 是否正常启动

```sh
brew services list
```

## 五、连接数据库

```
mongosh
```

## 六、创建超级管理员

```sh
use admin

db.createUser({user: "root", pwd: "Aaaaaaaa1!", roles: ["root"]}) # 创建超级管理员
```

## 七、查看当前用户及权限

```
use admin

db.auth('root', 'Aaaaaaaa1!')

db.system.users.find().pretty()
```

## 八、启用授权登录

```sh
cd /opt/homebrew/etc

vim mongod.conf
```

添加以下内容

```
security:
  authorization: enabled # 启用授权登录
```

## 九、重新启动 mongodb

```sh
brew services restart mongodb-community@6.0
```

## 十、授权登录

```
mongosh

use admin

db.auth('root', 'Aaaaaaaa1!')

db.system.users.find().pretty()
```

## 十一、创建数据库管理员

```
use i18n

db.createUser({user: "admin",pwd: "Aaaaaaaa1!", roles: [{role: "dbOwner", db: "i18n"}]})
```

## 十二

项目内连接

