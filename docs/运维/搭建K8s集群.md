---
updated: 2021/11/25 19:26:28
date: 2021/11/28 13:54:30
categories: 
  - 运维
title: 搭建K8s集群
post_title: 搭建K8s集群
comments: true
description: 配置互信所有机器执行关闭防火墙所有机器都执行关闭SELinux所有机器都执行关闭Swap所有机器都执行内核参数修改所有机器都执行这个操作相当于安装 kubelet、kubectl、kubeadm所有机器都执行安装docker所有机器都执行修改docker配置所有机器都执行/etc/docker/daemon.json
---

## 配置互信

> 所有机器执行

```shell
# 所有机器都执行，生成密钥对 一路回车
ssh-keygen
# 所有机器都执行，输入 yes 密码 IP替换成要互信的机器IP
ssh-copy-id ip
```

## 关闭防火墙

> 所有机器都执行

```shell
systemctl stop firewalld; systemctl disable firewalld
```

## 关闭SELinux

> 所有机器都执行

```shell
setenforce 0
```

## 关闭Swap

> 所有机器都执行

```shell
# 关闭
swapoff -a
# 检查是否关闭
free
# 关了的话，Swap 是0
              total        used        free      shared  buff/cache   available
Mem:        3880200      256216     2159544         520     1464440     3361912
Swap:             0           0           0
```

<img src="https://static.jiabanmoyu.com/notes/image-20211124194524583.png" alt="image-20211124194524583" style="zoom:50%;" />

## 内核参数修改

> 所有机器都执行

<img src="https://static.jiabanmoyu.com/notes/image-20211124194718999.png" alt="image-20211124194718999" style="zoom:50%;" />

```shell
# 开启
modprobe br_netfilter
# 写到开机启动脚本
echo "modprobe br_netfilter" >> /etc/profile
# 写配置文件
cat > /etc/sysctl.d/k8s.conf << EOF
> net.bridge.bridge-nf-call-ip6tables = 1
> net.bridge.bridge-nf-call-iptables = 1
> net.ipv4.ip_forward = 1
> EOF
# 加载配置文件
sysctl -p /etc/sysctl.d/k8s.conf
```

> 这个操作相当于
>
> ```shell
> touch /etc/sysctl.d/k8s.conf
> vim /etc/sysctl.d/k8s.conf
> # 然后写入内容
> ```

## 安装 kubelet、kubectl、kubeadm

> 所有机器都执行

```shell
# 添加源
tee /etc/yum.repos.d/kubernetes.repo << EOF
> [kubernetes]
> name=Kubernetes
> baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
> enabled=1
> gpgcheck=0
> EOF
# 安装
yum install -y kubelet-1.20.4 kubectl-1.20.4 kubeadm-1.20.4
# 启动
systemctl enable kubelet && systemctl start kubelet

```

## 安装docker

> 所有机器都执行

```shell
# 安装 docker 之前 先安装这个
yum install -y yum-utils device-mapper-persistent-data lvm2
# 正常安装docker
```

## 修改docker配置

> 所有机器都执行
>
> /etc/docker/daemon.json

```
{
    "registry-mirrors": [
        "https://mirror.ccs.tencentyun.com" # 镜像加速地址
    ],
    "exec-opts": [
        "native.cgroupdriver=systemd" # 文件驱动
    ]
}
```

```shell
# 
systemctl daemon-reload
systemctl restart docker
```

## 初始化集群

```shell
kubeadm init --kubernetes-version=1.20.4 \
--apiserver-advertise-address=150.158.22.49 \
--image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
--service-cidr=10.10.0.0/16 --pod-network-cidr=10.122.0.0/16
```


