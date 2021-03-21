/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  // 项目根路径
  root: 'src',
  // 子模块根路径，将会被作为资源文件进行处理
  // workspaceRoot: '',
  // 集成一个基础配置，进行 merge
  // extends: '',
  // 在 snowpack pipeline 中排除一些目录
  exclude: [
    '**/node_modules/**/*'
  ],

  mount: {
    // 静态资源目录
    public: '/',
    // 打包 src 目录输出到 dist 目录
    src: '/dist'
    // 高级写法
    // 1. url 对应目录
    // 2. static 是否打包文件写入输出路径，否则将会直接写入内存供浏览器读取
    // 3. 是否 resolve html/js/css 中的引用，如果 false 的话引用语句将会被视为静态代码处理
    // src: { url: '/dist', static: true, resolve: true }
  },
  env: {
    // 静态变量注入 通过 import.meta.env 注入
    // "API_URL": "api.google.com"
  },
  // 路径解析
  alias: {
    // 1. package import alias
    // "lodash": "lodash-es",
    // 2. local directory import as alias(relative to cwd)
    "@": "./src"
  },
  // 插件（遵循 babel-plugin 语法规则）
  plugins: [
    '@snowpack/plugin-sass',
    ['@snowpack/plugin-react-refresh', {}],
    // '@snowpack/plugin-dotenv'
  ],
  // 根据路由配置多入口
  routes: [
    { "match": "routes", "src": ".*", "dest": "/index.html" }
  ],
  devOptions: {
    // 是否启用 https with http2
    secure: false,
    // hostname & port
    hostname: '0.0.0.0',
    port: 8080,
    // 附加的 pathname 支持 querystring
    openUrl: '',
    // 路由未命中时使用的入口文件
    // fallback: 'index.html',
    // 打开的浏览器 chrome firefox brave none(不自动打开)
    open: '**Default**',
    // 开启 HMR
    hmr: true,
    // HMR 延迟(ms)
    hmrDelay: 0,
    // 错误时开启一个遮罩层
    hmrErrorOverlay: true
  },
  /* 包管理 */
  packageOptions: {
    // 在依赖追踪中忽略的引用，通过外部引用的库
    external: [],
    // 包的引用来源 local -> 本地 node_modules remote -> 远端?
    source: 'local',
    // 已知的外部依赖，但是无法被 sp 的 auto import scanner 扫描到
    knownEntrypoints: [],
    // polyfill node 环境的依赖 例如 fs path url
    polyfillNode: false,
    // 也可以自定义 rollup 配置
    // rollup: { plugins: [require('rollup-plugin-node-polyfills')({crypto: true, ...})] },
  },
  /* 打包配置 */
  buildOptions: {
    // 输出目录
    out: 'dist',
    // 最终打包产物的相对位置，可以是 cdn 地址
    baseUrl: '/',
    // 生成打包中间产物的位置，默认是 [output]/_snowpack
    metaUrlPath: '_snowpack',
    sourcemap: true,
    // 通过一个文件监听器来运行 build pipeline ，通常用于自实现的前端 server(fastify)
    watch: false,
    // 将 html 片段转换成完整的 html 页面（指没有 <!doctype html> 的页面)
    htmlFragments: false,
    // jsx 生成函数
    jsxFactory: 'React.createElement',
    // 自动注入 JSX 依赖（对 .jsx .tsx 文件）
    jsxInject: 'import React from "react"',
  },
};
