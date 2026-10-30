# 架构与扩展

## 页面与数据

App.tsx 负责共享导航、页脚、错误边界与路由。首页同步加载，目录页经 preloadablePage 共享 import Promise。DirectoryRoute 把标题放在 Suspense 外，正文使用独立加载状态。文章页与正文模块只在打开文章时加载。

Photography 的模块求值不触发图片下载。组件挂载后才导入照片清单，图片本身使用 loading="lazy"。搜索对话框只在打开时加载。公开目录预热不挂载页面。

数据按用途放在 data 和 content。示例文章只包含受信任的 React 节点。若接入外部 Markdown 或 HTML，必须另行处理输入验证、HTML 清洗和资源地址限制。

## 动效与阅读

RouteTransition 记录离开页的 DOM 快照，目标页立即移动；RoutePhase 在异步正文就绪后触发淡入。快照使用 inert 和 aria-hidden，避免重复交互。

ReadingProgress 放在动画路由之外，通过 portal 挂到 body。useActiveHeading 在滚动、布局变化和历史导航后读取标题位置，不依赖标题恰好穿过一个观察区。

主题使用本地 theme 设置和系统颜色偏好。动态效果遵循系统设置，也可用 ?motion=reduce 强制减少。?motion=full 是显式调试覆盖项。

## 扩展原则

新增目录页时，将其加入 navigation-pages，再加入页面模块。不要在模块顶层请求正文、图库或业务 API。新增项目应更新 works.ts，不在页面中手写项目卡片。

服务接入代码建议独立放在 lib/services，服务端实现放在单独目录。模板目前没有服务端；不要把客户端占位 UI 当成已经可用的认证、统计或助手。

## 部署路径与静态入口

Vite 的 SITE_BASE 决定资源前缀，BrowserRouter 使用同一个 BASE_URL 作为 basename。assetUrl 负责公开图片的资源前缀，避免 Fork 后的仓库子路径丢失。

finalize-build.mjs 为公开目录和文章生成静态入口，直接访问这些路径可得到实际 HTML 文件。新增目录时需同步更新路由清单。文章 slug 从 posts.ts 读取，并在生成目录前验证字符范围。

页脚持续展示 LICENSE 附件 B 指定的来源信息，并提供实际部署版本的源码链接。构建输出同时复制许可和运行时依赖声明。
