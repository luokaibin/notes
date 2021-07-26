# 胖大人笔记



**TODO**

- [x] 树莓派科学上网
- [ ] 换博客架构
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



```
https://1258712167.vod2.myqcloud.com/fb8e6c92vodtranscq1258712167/3217d7023701925921114615983/drm/voddrm.token.dWluPTE0NDExNTE5OTYzODE0MDEzMDtza2V5PTtwc2tleT07cGxza2V5PTtleHQ9MjIzMjhlMmVmZWFmZDVlMjJlOWExN2JkM2FlZjg0Yzc5NjY5NGY2YWQ5MDNmZTJmZmU4MTE0MTE3MjJjYTdkY2E0ZjgwYzA4M2M3YzExM2ViMDkyMjA3N2M5YWRhNWRhZDBmMDE2ZTg5ODI1NTA4N2MxNDUzMmRhZTlmNGI0ZmIzNjdmOWNkOWQ2NDIxNGFkO3VpZF90eXBlPTI7dWlkX29yaWdpbl91aWRfdHlwZT0yO2NpZD0zNTE4NTU5O3Rlcm1faWQ9MTAzNzU4NjQ2O3ZvZF90eXBlPTA=.v.f56150.m3u8?exper=0&sign=5d68004ae6f7fa5f99546d4200d95c98&t=611ce459&us=722352800638576870

https://1258712167.vod2.myqcloud.com/fb8e6c92vodtranscq1258712167/3217d7023701925921114615983/drm/voddrm.token.dWluPTE0NDExNTE5OTYzODE0MDEzMDtza2V5PTtwc2tleT07cGxza2V5PTtleHQ9MjIzMjhlMmVmZWFmZDVlMjJlOWExN2JkM2FlZjg0Yzc5NjY5NGY2YWQ5MDNmZTJmZmU4MTE0MTE3MjJjYTdkY2E0ZjgwYzA4M2M3YzExM2ViMDkyMjA3N2M5YWRhNWRhZDBmMDE2ZTg5ODI1NTA4N2MxNDUzMmRhZTlmNGI0ZmIzNjdmOWNkOWQ2NDIxNGFkO3VpZF90eXBlPTI7dWlkX29yaWdpbl91aWRfdHlwZT0yO2NpZD0zNTE4NTU5O3Rlcm1faWQ9MTAzNzU4NjQ2O3ZvZF90eXBlPTA=.v.f30741.m3u8?exper=0&sign=5d68004ae6f7fa5f99546d4200d95c98&t=611ce459&us=722352800638576870

https://1258712167.vod2.myqcloud.com/fb8e6c92vodtranscq1258712167/3217d7023701925921114615983/drm/voddrm.token.dWluPTE0NDExNTE5OTYzODE0MDEzMDtza2V5PTtwc2tleT07cGxza2V5PTtleHQ9MjIzMjhlMmVmZWFmZDVlMjJlOWExN2JkM2FlZjg0Yzc5NjY5NGY2YWQ5MDNmZTJmZmU4MTE0MTE3MjJjYTdkY2E0ZjgwYzA4M2M3YzExM2ViMDkyMjA3N2M5YWRhNWRhZDBmMDE2ZTg5ODI1NTA4N2MxNDUzMmRhZTlmNGI0ZmIzNjdmOWNkOWQ2NDIxNGFkO3VpZF90eXBlPTI7dWlkX29yaWdpbl91aWRfdHlwZT0yO2NpZD0zNTE4NTU5O3Rlcm1faWQ9MTAzNzU4NjQ2O3ZvZF90eXBlPTA=.v.f30740.m3u8?exper=0&sign=5d68004ae6f7fa5f99546d4200d95c98&t=611ce459&us=722352800638576870

```

```
version: '3'
services:
  mail:
    image: palidin/extmail:latest
    hostname: mail.jiabanmoyu.com
    container_name: extmail
    ports:
    - "25:25"
    - "110:110"
    - "143:143"
    - "10080:80"
    privileged: true
    environment:
      EXTMAIL_LANG: zh_CN
    volumes:
    - /data/extmail/vmail:/home/domains
    - /data/extmail/database:/var/lib/mysql/extmail
```

