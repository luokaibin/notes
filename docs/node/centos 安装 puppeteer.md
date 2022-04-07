

## 一

### 报错

```
Error: Failed to launch the browser process!
/codeProject/browserAccess/node_modules/.pnpm/puppeteer@13.5.1/node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux/chrome: error while loading shared libraries: libatk-1.0.so.0: cannot open shared object file: No such file or directory
```

### 解决

```shell
yum install atk
```

## 二

### 报错

```
Error: Failed to launch the browser process!
/codeProject/browserAccess/node_modules/.pnpm/puppeteer@13.5.1/node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux/chrome: error while loading shared libraries: libatk-bridge-2.0.so.0: cannot open shared object file: No such file or directory
```

### 解决

```shell
yum install at-spi2-atk
```

## 三

### 报错

```
Error: Failed to launch the browser process!
/codeProject/browserAccess/node_modules/.pnpm/puppeteer@13.5.1/node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux/chrome: error while loading shared libraries: libcups.so.2: cannot open shared object file: No such file or directory
```

### 解决

```shell
yum install cups-libs.x86_64
```

## 四

### 报错

```
Error: Failed to launch the browser process!
/codeProject/browserAccess/node_modules/.pnpm/puppeteer@13.5.1/node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux/chrome: error while loading shared libraries: libxkbcommon.so.0: cannot open shared object file: No such file or directory
```

### 解决

```
yum install libxkbcommon.x86_64
```

## 五

### 报错

```
Error: Failed to launch the browser process!
/codeProject/browserAccess/node_modules/.pnpm/puppeteer@13.5.1/node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux/chrome: error while loading shared libraries: libXcomposite.so.1: cannot open shared object file: No such file or directory
```

### 解决

```shell
yum install libXcomposite
```

## 六

### 报错

```shell
Error: Failed to launch the browser process!
/codeProject/browserAccess/node_modules/.pnpm/puppeteer@13.5.1/node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux/chrome: error while loading shared libraries: libXdamage.so.1: cannot open shared object file: No such file or directory
```

### 解决

```shell
yum install libXdamage.x86_64
```

## 七

### 报错

```
Error: Failed to launch the browser process!
/codeProject/browserAccess/node_modules/.pnpm/puppeteer@13.5.1/node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux/chrome: error while loading shared libraries: libXrandr.so.2: cannot open shared object file: No such file or directory
```

### 解决

```shell
yum install libXrandr
```

## 八

### 报错

```shell
Error: Failed to launch the browser process!
/codeProject/browserAccess/node_modules/.pnpm/puppeteer@13.5.1/node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux/chrome: error while loading shared libraries: libgbm.so.1: cannot open shared object file: No such file or directory
```

### 解决

```shell
yum install mesa-libgbm
```

## 九

### 报错

```shell
Error: Failed to launch the browser process!
/codeProject/browserAccess/node_modules/.pnpm/puppeteer@13.5.1/node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux/chrome: error while loading shared libraries: libpango-1.0.so.0: cannot open shared object file: No such file or directory
```

### 解决

```shell
yum install pango
```

## 十

### 报错

```shell
Error: Failed to launch the browser process!
[0331/111200.818627:ERROR:zygote_host_impl_linux.cc(90)] Running as root without --no-sandbox is not supported. See https://crbug.com/638180.
```

### 解决

```
puppeteer.launch({ args: ['--no-sandbox'] })
```