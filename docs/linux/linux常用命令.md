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



```
server {
  server_name nps.kaibinluo.com;
  listen 80;
  
  # 证书文件名称
  # ssl_certificate /ssl/notes/3048277_notes.jindll.com.pem; 
  # 私钥文件名称
  # ssl_certificate_key /ssl/notes/3048277_notes.jindll.com.key;
  # ssl_session_timeout 5m;
  # 请按照以下协议配置
  # ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
  # 请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
  # ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
  # ssl_prefer_server_ciphers on;
     
  location / {
  	proxy_pass_header Server;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X_Forward_For $proxy_add_x_forwarded_for;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
		
    proxy_pass http://127.0.0.1:10000; # 配置转发；将https://notes.jindll.com转发到本机http://127.0.0.1:3939
  }
}
```

```

  
```

