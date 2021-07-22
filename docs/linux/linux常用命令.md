---
title: Linux 常用命令
lang: zh-CN
description: 
---

## 启动一个服务

```
[root@pangdaren]# systemctl start [serverName].service
```

## 关闭一个服务

```
[root@pangdaren]# systemctl stop [serverName].service
```

## 重启一个服务

```
[root@pangdaren]# systemctl restart [serverName].service
```

## 显示一个服务的状态

```
[root@pangdaren]# systemctl status [serverName].service
```

## 在开机时启用一个服务

```
[root@pangdaren]# systemctl enable [serverName].service
```

## 在开机时禁用一个服务

```
[root@pangdaren]# systemctl disable [serverName].service
```

## 查看服务器开放的端口

```shell
firewall-cmd --list-ports
```

## 开启一个端口

```shell
firewall-cmd --zone=public --add-port=2000/tcp --permanent
```

## 关闭一个端口

```shell
firewall-cmd --permanent --zone=public --remove-port=8080/tcp
```

## 查看占用端口的进程

```
[root@pangdaren]# netstat -tunpl | grep 端口号
```
`# lsof命令,即ls open files`

```
[root@pangdaren]# lsof -i:端口号
```

## FirewallD is not running 防火墙未启动

> 启动防火墙

```
[root@pangdaren]# systemctl start firewalld
```

## Failed to start firewalld.service: Unit is masked. 防火墙服务被锁

> 取消服务的锁定

```
[root@pangdaren]# systemctl unmask firewalld
```

## 锁定一个服务

```
[root@pangdaren]# systemctl mask firewalld
```

## 查找某个命令在系统的什么位置

```shell
whereis nps
```



  

