# devtool

使用 engine-mobile(或webapp) 目录启动paas开发环境, 切换 config 配置, 不重启 webpackDevMiddleware

### 👌

- [x] --pre yes 启用 engine-mobile 目录下  eslint

### 使用方式


```bash
yarn link engine-mobile // [必要], 

// engine-mobile目录下要执行 yarn link paas-component-basic, 才能使用系统组件

yarn start  // 启动运行时

yarn design  // 启用设计时
```

更改 config/index.json 中 proxyTarget 参数配置,自动重启express 

### 实现方式

`virtualization` 目录

- 适配代码中 __dirname 逻辑
    - 使用`memory-fs`, 将 fs-patch 目录文件按目录结构写入内存文件系统, 用于在 engine-mobile/build 中运行.
    - 使用 fs-monkey patchRequire, 使fs-patch中文件可通过require引入
- 适配 process.cwd()
    - process.chdir

- 自动更新
    - main.js, watcher.js 用于监听config中proxyTarget内容.
    - 通过 delete  require.cache[target] 方法重载配置内容
