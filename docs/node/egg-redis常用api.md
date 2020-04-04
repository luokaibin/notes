---
title: egg-redis常用api
description: 
lang: zh_CN
---





官方文档：[https://github.com/eggjs/egg-redis](https://github.com/eggjs/egg-redis)

## 功能

### 存单个值

```js
redis.set(key, value, expiryMode, time )
```

#### expiryMode

- `EX` 过期时间单位是秒
- `PX` 过期时间单位是分钟

### 修改过期时间

```
redis.expire('name', 20); // 秒
```

### 设置 key 在指定时间过期

```js
await redis.expireat(key,timestamp); // timestamp 时间戳 秒

await redis.pexpireat(key,timestamp); // timestamp 时间戳 毫秒
```

### 存数组

```
await this.app.redis.sadd('setList', '张三','李四','赵六')

返回值：['张三', '李四', '赵六']
```

### 向数组结尾添加元素

```
await this.app.redis.rpush('userList','张三')

await this.app.redis.rpush('userList','李四')

await this.app.redis.rpush('userList', '王五')

返回一个数组 ['张三','李四', '王五']
```

### 向数组开始位置添加元素

```
await this.app.redis.lpush('userList', '数组左边新增的')
[
    "数组左边新增的",
    "张三",
    "张三",
]
```

### 存对象

```
await this.app.redis.hmset('userInfo','name','张三','age',18,'address','回龙观')
```

### 向对象中添加属性

```
await this.app.redis.hset('loginUser', 'id', 1)
await this.app.redis.hset('loginUser', 'uname', '张三')
await this.app.redis.hset('loginUser', 'phone', '18888888888')
await this.app.redis.hset('loginUser', 'address', '北京市朝阳区')

{
    "id": "1",
    "uname": "张三",
    "phone": "18888888888",
    "address": "北京市朝阳区"
}
```

### 获取普通值

```
// 获取key 为 gender 的数据
await this.app.redis.get('gender')
```

### 获取值得数据类型

```
ctx.body = await this.app.redis.type('name')
返回 string
```

### 获取数组中所有元素

```
// 表示获取数组中所有的值 0 ，-1
ctx.body = await this.app.redis.lrange('userList',0,-1)
[
    "张三",
    "张三",
    "李四",
]
```

### 获取集合中的所有数据

```
await this.app.redis.smembers('setList')
[
    "张三",
    "李四",
    "赵六"
]
```

### 获取对象中的所有数据

```
ctx.body = await this.app.redis.hgetall('loginUser')

{
    "id": "1",
    "uname": "张三",
    "phone": "18888888888",
    "address": "北京市朝阳区"
}
```

### 获取对象中的指定属性

```
await this.app.redis.hget('loginUser', 'address')
```

### 一次性获取对象中的多个属性

```js
await this.app.redis.hmget('userInfo', 'name','age','address')

[
    "张三",
    "18",
    "回龙观"
]
```

### 获取指定 key 的过期时间

```js
await redis.ttl(key); // 单位秒

await redis.pttl(key); // 单位毫秒
```

### 删除指定 key 的过期时间

```js
await redis.persist(key)
```

### 删除指定的key

```js
await this.app.redis.del('name')
```

### 删除redis中所有数据

```js
await this.app.redis.flushall()
```

### 从数组最左边删除一项

```
await this.app.redis.lpop('userList')
```

### 从数组最右边删除一项

```
await this.app.redis.rpop('userList')
```

