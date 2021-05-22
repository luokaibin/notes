---
title: mysql 常用命令
lang: zh-CN
description: 
---

## 1. 查看有哪些数据库

```shell
] SHOW DATABASES;

+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| notesdb            |
| performance_schema |
| sys                |
+--------------------+
```

## 2. 切换数据库

```shell
] use mysql;
```

## 3. 查看当前库下面有哪些表

```shell
] SHOW TABLES;
+---------------------------+
| Tables_in_mysql           |
+---------------------------+
| columns_priv              |
| component                 |
| db                        |
| default_roles             |
| engine_cost               |
| user                      |
+---------------------------+
```

## 4. mysql登录命令详解

[https://blog.csdn.net/smart_isan/article/details/74526547](https://blog.csdn.net/smart_isan/article/details/74526547)

## 5. Mysql 添加用户给予授权

[https://blog.csdn.net/qq_39331713/article/details/81747188](https://blog.csdn.net/qq_39331713/article/details/81747188)

## 6. 查看当前在那个数据库

```shell
] select database();
```

## 7. 常见问题：加密错误

解决方法：[https://www.jianshu.com/p/939eb5157e83](https://www.jianshu.com/p/939eb5157e83)

## 8. 查看当前数据库存在哪些用户

```shell
] SELECT User, Host FROM mysql.user;
```

## 9. 创建数据库(8.x)

```
CREATE DATABASE dbName;
```

