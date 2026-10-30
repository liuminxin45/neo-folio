# 组件说明

这些组件随网站源码分发，尚未发布为独立 npm 组件库。多数使用共享 CSS，部分依赖 React Router；移植时需要同时携带样式和依赖。

| 组件或 Hook | 用途 | 依赖或边界 |
| --- | --- | --- |
| DirectoryRoute | 标题常驻、正文异步加载 | Router、RoutePhase、共享样式 |
| RouteTransition / RoutePhase | 页面移动与正文淡入 | Web Animations API，支持降级 |
| RouteLoading / RouteErrorBoundary | 延迟加载提示与失败恢复 | React，重试会刷新页面 |
| ThemeToggle | 系统主题与手动切换 | localStorage、matchMedia、可选 View Transition |
| BackButton | 只显示左箭头的返回操作 | 必须提供可访问名称 |
| BlogList | 日期与文章标题列表 | Router、Post 元数据 |
| ReadingProgress | 视口顶部阅读进度 | body portal、ResizeObserver |
| useActiveHeading | 按阅读位置跟踪目录 | 浏览器事件与可选 ResizeObserver |
| ImageLightbox | 大图预览与加载状态 | 按需加载，模态对话框 |
| SearchLauncher / SearchDialog | 本地公开元数据搜索 | 原生 dialog，浏览器焦点管理 |
| EmptyState | 纯装饰占位行 | aria-hidden，不替代语义提示 |

所有图标操作使用 site-icon-action。新增操作保留 44px 点击区域和 focus-visible 样式。图片提供具体 alt；装饰图使用空 alt。返回控件提供操作含义明确的 label。
