## 对外域名

```
api.qiniu.com
```

## 授权

```
Authorization: QBox <AccessToken>
```

## AccessToken

### 1. 生成待签名的原始字符串

```
signingStr = "<path>?<query>\n"
或
signingStr = "<path>?<query>\n<body>"
```

### 2. 使用[SecertKey](https://portal.qiniu.com/user/key)对上一步生成的原始字符串计算[HMAC-SHA1](https://developer.qiniu.com/kodo/glossary/1643/h)签名：

```
sign = hmac_sha1(signingStr, "<SecretKey>")
```

### 3. 对签名进行[URL 安全的 Base64 编码](https://developer.qiniu.com/kodo/manual/1231/appendix#urlsafe-base64)：

```
encodedSign = urlsafe_base64_encode(sign)
```

### 4. 将 AccessKey 和 encodedSign 用英文符号 : 连接起来：

```
accessToken = "<AccessKey>:<encodedSign>"
```

### 5. 示例

```
# 假设有如下的管理请求：  
AccessKey = "MY_ACCESS_KEY"
SecretKey = "MY_SECRET_KEY"
url = "http://rs.qiniu.com/move/bmV3ZG9jczpmaW5kX21hbi50eHQ=/bmV3ZG9jczpmaW5kLm1hbi50eHQ="

#则待签名的原始字符串是：
signingStr = "/move/bmV3ZG9jczpmaW5kX21hbi50eHQ=/bmV3ZG9jczpmaW5kLm1hbi50eHQ=\n"

#签名字符串是：  
sign = "157b18874c0a1d83c4b0802074f0fd39f8e47843"
注意：签名结果是二进制数据，此处输出的是每个字节的十六进制表示，以便核对检查。

#编码后的签名字符串是：
encodedSign = "FXsYh0wKHYPEsIAgdPD9OfjkeEM="

#最终的管理凭证是：  
accessToken = "MY_ACCESS_KEY:FXsYh0wKHYPEsIAgdPD9OfjkeEM="
```

### 6. 算法

```
AccessKey: <your-access-key>
SecretKey: <your-secret-key>

```

