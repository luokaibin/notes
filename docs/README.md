---
updated: 2020/07/26 19:53:25
date: 2020/07/26 19:53:25
categories: 
title: README
comments: 
description: 胖大人笔记TODO树莓派科学上网换博客架构netdata 汉化nas切换nextcloud邮件服务器用docker部署扒取 https //youtube.iiilab.com/ 视频解析接口图库系统nps 配合 Nginx 代理nps 用 docker 部署pip 卸载 ssr邮局
---
# 胖大人笔记



**TODO**

- [x] 树莓派科学上网
- [x] 换博客架构
- [ ] netdata 汉化
- [ ] nas切换nextcloud
- [ ] 邮件服务器用docker部署
- [ ] 扒取 https://youtube.iiilab.com/ 视频解析接口
- [ ] 图库系统
- [x] nps 配合 Nginx 代理
- [x] nps 用 docker 部署
- [x] pip 卸载 ssr

----

## 邮局

- Zimbra
- IRedMail
- Mail-in-a-Box
- Modoboa

- Mailu


# 加密过程

```js
const getBytes = (str) => {
  // TextEncoder 接受代码点流作为输入，并提供 UTF-8 字节流作为输出。
  // encode 方法返回一个 Uint8Array (en-US) 对象。
  const encoder = new TextEncoder('utf8');
  return encoder.encode(str);
}
const byteToStr = (bytes) => {
  // 先对字节流按位非运算 再把字节转为字符串
  // 静态 String.fromCharCode() 方法返回由指定的 UTF-16 代码单元序列创建的字符串。
  return bytes.map(item => ~item).reduce((prev, curr) => `${prev}${String.fromCharCode(curr)}`, '')
}
// base64加密
const base64Encode = (str) => btoa(str)
```

# 解密过程

```js
// base64解密
const base64decode = (str) => atob(str);
const strToByte = (str) => {
  const bytes = [];
  for(let i = 0; i < str.length; i++) {
    // charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
    bytes.push(str.charCodeAt(i))
  }
  // 用创建出来的数组构造一个 Uint8Array 对象
  let bytesBuffer = new Uint8Array(bytes)
  // 对字节流按位非运算 还原
  return bytesBuffer.map(item => ~item)
}
const getStr = (bytes) => {
  // 和加密的第一步是相反的
  const decoder = new TextDecoder();
  return decoder.decode(bytes)
}
```



```
{
    "code": 0,
    "codeDesc": "success",
    "data": {
        "Response": {
            "BatchId": "8169bec3-7f11-4f37-8d96-70852f05a85c",
            "CheckPassed": 1,
            "ClusterId": "test-cluster",
            "ForcedCheckResult": {
                "AffectsNormalRunning": {
                    "EndTime": "2021-12-14T16:36:30+08:00",
                    "Message": "",
                    "StartTime": "2021-12-14T16:36:29+08:00",
                    "Status": 1
                },
                "NodeRunning": {
                    "EndTime": "2021-12-14T16:36:29+08:00",
                    "Message": "",
                    "StartTime": "2021-12-14T16:36:29+08:00",
                    "Status": 1
                }
            },
            "RequestId": "6410ec96-ea20-4d5c-8fb1-954fff9fea34",
            "UpdateConfig": {
                "ControlConfig": {
                    "CurrentVersion": "",
                    "ObserveTime": 0,
                    "TargetVersion": "cluster-tcs2.2.1.t55"
                },
                "MasterConfig": {
                    "CurrentVersion": "",
                    "ObserveTime": 0,
                    "TargetVersion": ""
                },
                "WorkerConfig": {
                    "ConcurrentPercentLimit": 10,
                    "CurrentVersion": "worker-tcs2.2.1.t69-2",
                    "ExcludeNodeEnable": 1,
                    "ObserveTime": 10,
                    "TargetVersion": "worker-tcs2.2.1.t69-3"
                }
            },
            "UserConfirmed": 0,
            "WeakCheckResult": {
                "HAStatus": {
                    "EndTime": "2021-12-14T16:36:30+08:00",
                    "Message": "",
                    "StartTime": "2021-12-14T16:36:30+08:00",
                    "Status": 1
                }
            }
        }
    },
    "message": "success"
}
```

```
{
    "code": 0,
    "codeDesc": "success",
    "data": {
        "Response": {
            "CanRollback": 0,
            "ConcurrentPercentLimit": 0,
            "ControlComponentDone": 67,
            "ControlComponentList": null,
            "ControlComponentStatus": [
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "etcd",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "kube-apiserver",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cluster-basic",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "prerequisite-crds",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "ssm-spec",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "kube-controller-manager",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "kube-scheduler",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "kube-proxy",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "keepalived-manager",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cert-manager",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "ipam",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cilium",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cilium-router",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "coredns",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "tcs-admission-webhook",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "gpu-admission",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "gpu-manager",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "tcs-events",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "node-operation-controller",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "node-problem-detector",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "csi-driver-localpv",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "provisioner",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "csi-cspfs-plugin",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "tcs-metrics-apiserver",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "tcs-controller-manager",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cron-hpa",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "ingress-nginx",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "vertical-pod-autoscaler",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "statefulsetplus-operator",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cdi-apiserver",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cdi-controller",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cdi-issuer",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cdi-uploadproxy",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "virt-api",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "virt-controller",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "virt-handler",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "virt-monitor",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "virt-images",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "stateset-controller",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "component-apiserver",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "service-vendors",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "ssm-platform",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-scheduling-trait",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-networks-trait",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-controller",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-hpa-trait",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-serviceinit",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-configsetting",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-meta-webhook",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-resource-view",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cargo",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "harbor",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "helm-engine",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "pajero",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "cmdb-keeper",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "non-container",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-dependency-controller",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-gen-trait",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-log-trait",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "oam-middleware",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "reloader",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "tad-atomic-job",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "tcs-marketplace-apps",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "infrastore-log-agent",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "infrastore-metric-kube-state-metrics",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "infrastore-metric-scraper",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Name": "infrastore-node-metric-exporter",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": "DONE"
                }
            ],
            "ControlComponentTotal": 67,
            "ControlObserveTime": 0,
            "ExcludeNodeEnable": 0,
            "MasterComponentList": null,
            "MasterNodeDone": 0,
            "MasterNodeStatus": [
                {
                    "EndTime": "2021-12-14T16:36:38+08:00",
                    "Log": "",
                    "Node": "10.0.4.135",
                    "StartTime": "2021-12-14T16:36:29+08:00",
                    "Status": "FAILED"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Node": "10.0.4.137",
                    "StartTime": "2021-12-14T16:36:29+08:00",
                    "Status": "TODO"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Node": "10.0.4.138",
                    "StartTime": "2021-12-14T16:36:29+08:00",
                    "Status": "TODO"
                }
            ],
            "MasterNodeTotal": 0,
            "MasterObserveTime": 0,
            "ObserveTimeElapsed": 0,
            "ObserveTimeNeeded": 0,
            "Period": "Master",
            "PreCheckStatus": [
                {
                    "EndTime": "2021-12-14T16:36:22+08:00",
                    "Message": "",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": 1
                },
                {
                    "EndTime": "2021-12-14T16:36:22+08:00",
                    "Message": "",
                    "StartTime": "2021-12-14T16:36:22+08:00",
                    "Status": 1
                },
                {
                    "EndTime": "2021-12-14T16:36:22+08:00",
                    "Message": "",
                    "StartTime": "2021-12-14T16:36:29+08:00",
                    "Status": 1
                }
            ],
            "RequestId": "0dfc1269-e717-44f5-b40f-9a8ec63da9ba",
            "Status": "PAUSED",
            "Type": "Upgrade",
            "WorkerComponentList": [
                "tcs-xfs-prog",
                "docker",
                "kubelet"
            ],
            "WorkerCurrentVersion": "",
            "WorkerNodeDone": 0,
            "WorkerNodeStatus": [
                {
                    "EndTime": "2021-12-14T16:36:38+08:00",
                    "Log": "",
                    "Node": "10.0.4.135",
                    "StartTime": "2021-12-14T16:36:29+08:00",
                    "Status": "FAILED"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Node": "10.0.4.137",
                    "StartTime": "2021-12-14T16:36:29+08:00",
                    "Status": "TODO"
                },
                {
                    "EndTime": "",
                    "Log": "",
                    "Node": "10.0.4.138",
                    "StartTime": "2021-12-14T16:36:29+08:00",
                    "Status": "TODO"
                }
            ],
            "WorkerNodeTotal": 3,
            "WorkerObserveTime": 0,
            "WorkerTargetVersion": ""
        }
    },
    "message": "success"
}
```

