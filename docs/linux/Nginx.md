---
updated: 2021/07/26 19:53:25
date: 2021/07/26 19:53:25
categories: 
  - linux
title: 恰运维一口饭(Nginx实用教程)
comments: 
lang: zh-CN
description: 就是皮一下，靠这些去恰运维的饭，被打你也不能顺着网线找我啊！！！主题：反向代理反向代理（Reverse Proxy）方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器
---

> 就是皮一下，靠这些去恰运维的饭，被打你也不能顺着网线找我啊！！！

## 主题：反向代理

反向代理（Reverse Proxy）方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器

> 以下操作基于 **环境：CentOS7**

## 安装

```sh
# 1，将nginx添加到yum repro库中
[root@izbp1b498epn4trb75oykez ~]# rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
# 2，查看nginx信息
[root@izbp1b498epn4trb75oykez ~]# yum info nginx
# 3，使用yum安装ngnix
[root@izbp1b498epn4trb75oykez ~]# yum -y install nginx
# 4，启动nginx
[root@izbp1b498epn4trb75oykez ~]# systemctl start nginx

```

## 修改配置文件

> 配置文件路径 /etc/nginx/conf.d/default.conf

```sh
[root@izbp1b498epn4trb75oykez ~]# vi /etc/nginx/conf.d/default.conf
```

## 基本配置（前端项目部署：单页面应用）

```js
server {
  listen 80;
  server_name notes.jindll.com; # 这里是你的域名
  location / {
    root	/notes; # 你的项目路径或者说要给客户端返回的资源在那个路径下 “/notes”表示根目录下notes文件夹下
    index	index.html; # 网站的默认初始页，用户直接访问域名无路径返回那个页面，及用户访问 http://notes.jindll.com 给用户返回那个文件
    try_files $uri $uri/ /index.html; # 单文件应用必须有此配置
  }
}
```

### 详细说明

- **listen：** 监听的端口，浏览器通过域名进入的，要监听的端口都是80，https是443端口
- **server_name：** 服务别名，浏览器通过域名请求，服务器收到域名和server_name进行匹配，匹配到就往下走，匹配不到（那就看看浏览器什么反应）
- **location：** 匹配域名后面的路径，`/` 表示匹配根路径
- **root：** 根路径配置，例如用户访问`http://notes.jindll.com/assets/css` ,服务器就会到`/notes/assets/css` 这个位置找资源返回
- **index：** 网站的默认初始页，例如用户访问`http://notes.jindll.com` 没有路径，就会默认返回`/notes/index.html` 资源
- **try_files：** 当用户访问 `http://notes.jindll.com/abc` 时，这里的 `$uri` 就是 `/abc`。 **try_files** 会到服务器里（`/notes/abc`）找这个文件。如果存在就直接把这个文件的内容发送给用户。 如果不存在然后就看 `$uri/`，增加了一个 `/`，也就是看有没有名为 `/notes/abc/` 的目录。 如果还不存在就看下一个选项，将`/notes/index.html` 返回

## 同域名不同路径指向不同项目

```
server {
  listen 80;
  server_name notes.jindll.com; # 这里是你的域名
  location / {
    root	/notes; # 你的项目路径或者说要给客户端返回的资源在那个路径下 “/notes”表示根目录下notes文件夹下
    index	index.html; # 网站的默认初始页，用户直接访问域名无路径返回那个页面，及用户访问 http://notes.jindll.com 给用户返回那个文件
    try_files $uri $uri/ /index.html; # 单文件应用必须有此配置
  }
  location /dev  {
    root	/docs;
    index	index.html;
	}
}
```

### 详细说明

相比于上面的代码我们加了一个`location` 块，即表明当服务器收到 `http://notes.jindll.com/dev` 访问时会走`/dev` 块，然后从`/docs/dev` 去查找资源返回

## https配置

```
server {
  listen 443 ssl;
  server_name notes.jindll.com; # 这里是你的域名
  
  #证书文件名称
  ssl_certificate /ssl/notes/3048277_notes.jindll.com.pem; 
  #私钥文件名称
  ssl_certificate_key /ssl/notes/3048277_notes.jindll.com.key;
  ssl_session_timeout 5m;
  #请按照以下协议配置
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
  #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
  ssl_prefer_server_ciphers on;
     
  location / {
    root	/notes; # 你的项目路径或者说要给客户端返回的资源在那个路径下 “/notes”表示根目录下notes文件夹下
    index	index.html; # 网站的默认初始页，用户直接访问域名无路径返回那个页面，及用户访问http://notes.jindll.com 给用户返回那个文件
    try_files $uri $uri/ /index.html; # 单文件应用必须有此配置
  }
  location /dev  {
    root	/docs;
    index	index.html;
	}
}
```

### 详细说明

https的配置其实是最简单的，无论是你在腾讯云还是阿里云申请的https证书，他们都有详细的https配置说明。

在上面的代码中主要加了`ssl`开头的配置属性，另外监听的端口由80变为了443，因为https访问的端口就是443，我们需要改的就是证书文件和私约文件的位置，这两个文件在你证书申请成功之后，将相关文件下载下来就可以了。

## socket配置

```

server {
  listen 443 ssl;
  server_name notes.jindll.com; # 这里是你的域名
  
  #证书文件名称
  ssl_certificate /ssl/notes/3048277_notes.jindll.com.pem; 
  #私钥文件名称
  ssl_certificate_key /ssl/notes/3048277_notes.jindll.com.key;
  ssl_session_timeout 5m;
  #请按照以下协议配置
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
  #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
  ssl_prefer_server_ciphers on;
     
  location / {
  	proxy_pass_header Server;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X_Forward_For $proxy_add_x_forwarded_for;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
		
    proxy_pass http://127.0.0.1:3939; # 配置转发；将https://notes.jindll.com转发到本机http://127.0.0.1:3939
  }
}
```

### 详细说明

`websocket` 的所有配置都在在`location` 块中（除**proxy_pass**），如果你需要配置`websocket` 可以直接将以上代码复制过去。核心代码其实是`proxy_set_header Upgrade $http_upgrade;` 和`proxy_set_header Connection 'upgrade';` ，这两行的作用就是将`http` 协议升级为`websocket` 协议。

## 协商缓存

```
server {
  listen 80;
  server_name notes.jindll.com; # 这里是你的域名
  location / {
    root	/notes; # 你的项目路径或者说要给客户端返回的资源在那个路径下 “/notes”表示根目录下notes文件夹下
    index	index.html; # 网站的默认初始页，用户直接访问域名无路径返回那个页面，及用户访问 http://notes.jindll.com 给用户返回那个文件
    try_files $uri $uri/ /index.html; # 单文件应用必须有此配置
  }
  location /dev  {
    root	/docs;
    index	index.html;
    add_header Cache-Control no-cache;
	}
}
```

### 详细说明

协商缓存是一个与前端性能优化有关的东西，当用户在浏览器输入地址后，服务器需要将对应文件返回给浏览器，这是需要时间的。

如果用户第一次在浏览器输入一个地址后，服务器将文件返回给浏览器，此时浏览器将文件缓存起来，下次用户再进这个地址，浏览器直接从缓存中取对应文件，那速度就比请求服务器快，这是**强缓存**。

强缓存的缺点就是服务器文件更新，但浏览器并不会及时更新，而是继续读本地缓存，当然可以设置缓存时间，但终究不是非常及时的。

协商缓存就是地址输入后，浏览器将上次缓存文件的`MD5` 和文件更新时间发给服务器，服务器来确认这个文件有没有更新，有更新，服务器就去找文件，返回给浏览器，没更新就返回302状态码，浏览器直接读缓存。

低版本的`nginx` 配置协商缓存还需要做其他配置，如果你是根据我的`nginx`安装教程来的，那就只需要在`location` 块中再添加一行`add_header Cache-Control no-cache;` 就可以。

另外，协商缓存或者强缓存其实更多的是针对静态资源文件，例如图片、音频、字体等，这些资源不会经常改变，所以采用缓存，让浏览器直接读本地缓存会有非常明显的性能提升。

## 启用GZIP压缩

```
server {
  listen 80;
  server_name notes.jindll.com; # 这里是你的域名
  location / {
    root	/notes; # 你的项目路径或者说要给客户端返回的资源在那个路径下 “/notes”表示根目录下notes文件夹下
    index	index.html; # 网站的默认初始页，用户直接访问域名无路径返回那个页面，及用户访问 http://notes.jindll.com 给用户返回那个文件
    try_files $uri $uri/ /index.html; # 单文件应用必须有此配置
  }
  location /dev  {
    root	/docs;
    index	index.html;
    add_header Cache-Control no-cache;
    
    # 以下代码是开启GZip的
    gzip  on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_comp_level 4;
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
    gzip_disable "MSIE [1-6]\.";
	}
}
```

### 详细说明

- `gzip  on;` 开启GZip压缩
- `gzip_min_length 1k;` 小于1k的文件不进行压缩
- `gzip_buffers 4 16k;` 4 16k 代表以16k为单位，按照原始数据大小以16k为单位的4倍申请内存; 如果没有设置，默认值是申请跟原始数据相同大小的内存空间去存储gzip压缩结果。
- `gzip_comp_level 4;` 压缩级别 1-9; 1 压缩比最小处理速度最快，9 压缩比最大但处理最慢
- `gzip_types` 对那些类型进行压缩; 我这里只压缩了 **JS** **CSS** **XML** , 如果没有 **XML** 类型文件,完全可以去掉`text/xml` ; 我这里压缩类型没有写 **HTML** ,是因为无论是否指定"text/html"类型总是会被压缩; 另外不建议对图片,音乐等资源压缩,因为压缩效果不明显,并且对这些类型文件进行压缩,会消耗服务器大量资源, 得不偿失。
- `gzip_disable "MSIE [1-6]\.";` 对IE6以下的浏览器不进行压缩，IE6不支持，会乱码；（现在还用IE6的也是神仙）

- 更多的关于GZip的介绍，可以看这个中文文档，地址：[https://www.nginx.cn/doc/standard/httpgzip.html](https://www.nginx.cn/doc/standard/httpgzip.html)

### 开启GZip与未开速度对比

**未开启**

![image-20200217173519190](https://static.jindll.com/notes/image-20200217173519190.png)

**开启后**

![image-20200217173642958](https://static.jindll.com/notes/image-20200217173642958.png)