# CHANGELOG

## 2026-05-31

### 已完成
- 实现多语言支持（next-intl 4.12.0）：
  - 创建 i18n 基础设施：lib/i18n/config.ts（路由配置）、lib/i18n/request.ts（服务端翻译加载）、lib/i18n/navigation.ts（导航工具）
  - 创建翻译文件：messages/zh.json（中文）、messages/en.json（英文），覆盖 Header、Footer、首页所有文案
  - 创建 middleware.ts 实现 locale 检测与路由重定向
  - 创建 app/[locale]/layout.tsx，使用 NextIntlClientProvider 包裹客户端组件
  - 创建 app/[locale]/page.tsx，首页所有文案改用 getTranslations() 翻译
  - 将所有营销页面（about、cases、contact、maintenance、pricing、process）移入 app/[locale]/ 目录
  - Header.tsx 改用 useTranslations + locale-aware Link/usePathname
  - Footer.tsx 改用 useTranslations + locale-aware Link
  - 根 layout.tsx 精简为最小 shell，locale layout 承载 Header/Footer/Analytics 等
  - 根 page.tsx 改为 redirect 到 /zh（默认语言）
  - next.config.ts 配置 createNextIntlPlugin 指向 lib/i18n/request.ts
- lint 和 build 验证通过

### 下一步
- 添加 PWA 支持

## 2026-05-30

### 已完成
- 优化 Prisma 查询性能：cases/route.ts 和 projects/route.ts 使用 select 子句替代全字段查询，减少数据传输量
- 添加数据库索引：ContactSubmission(@@index([status]))、Project(@@index([status]), @@index([deleted]))、Case(@@index([published]), @@index([industry]), @@index([featured]))
- lint 和 build 验证通过

- 添加单元测试：
  - 配置 Vitest 测试框架（vitest.config.ts，jsdom 环境，@vitejs/plugin-react）
  - 提取联系表单验证逻辑到 lib/validate-contact.ts 纯函数模块
  - 编写 18 个单元测试覆盖 validateContact、isPhone、isEmail、isWechat
  - 修复 isEmail/isWechat 空格处理 bug（含空格输入不应通过验证）
  - 修复 validateContact 中邮箱/微信号校验使用 cleaned 值的 bug
  - lint 和 build 验证通过

- 实现 RSS 订阅：
  - 创建 app/feed.xml/route.ts RSS 2.0 路由处理器
  - 查询已发布案例（select 子句优化），按创建时间倒序，最多 20 条
  - XML 特殊字符转义（escapeXml），Cache-Control 缓存 1 小时
  - lint 和 build 验证通过

- 添加 Google Analytics 集成：
  - 创建 components/GoogleAnalytics.tsx 客户端组件
  - 使用 next/script afterInteractive 策略加载 gtag.js
  - 通过 NEXT_PUBLIC_GA_ID 环境变量配置，未设置时不渲染
  - 集成到 app/layout.tsx（import + JSX 渲染）
  - lint 和 build 验证通过

### 下一步
- 实现多语言支持

## 2026-05-29

### 已完成
- 添加图片懒加载组件：创建 LazyImage 客户端组件，基于 IntersectionObserver + 200px rootMargin 实现视口预加载，pulse 占位动画 + opacity 渐显过渡
- 替换案例详情页 3 处裸 `<img>` 标签为 LazyImage（Hero 背景、画廊主图、画廊网格项）
- 修复 HTMLImgElement → HTMLImageElement 类型拼写错误
- lint 和 build 验证通过

### 下一步
- 优化 Prisma 查询性能

## 2026-05-28

### 已完成
- 添加页面过渡动画：创建 PageTransition 客户端组件，基于 usePathname + CSS @keyframes pageEnter 实现路由切换淡入效果
- 完善移动端响应式适配：案例详情页指标卡片改为单列→三列响应式布局，对比表格最小宽度从680px优化至560px
- 优化首页加载性能：6个非首屏组件动态导入（ServiceValuesSection、PricingSection、ComparisonSection、FeaturedCasesSection、CtaSection、FaqSection）
- 创建 HomeBelowFold.tsx 客户端包装组件，解决 Next.js 16 Server Component 中 ssr:false 限制
- 实现 iconMap 模式：Server Component 传递图标名称字符串，客户端解析为 Lucide 组件引用
- 韶域文化环案例深度改进：43张分类画廊图片、6篇媒体报道真实链接
- 新增 mediaReports 字段到 Prisma Case 模型
- 创建 MediaReportsSection 组件
- 重构 GallerySection 组件支持分类展示
- 修复 seed.ts 中文引号导致的 esbuild 解析错误
- 数据库重新填充，19个案例数据完整
- 添加 typecheck 脚本到 package.json
- 代码推送到 GitHub：https://github.com/Meteorkid/ai-website-factory
- 实现深色模式完整支持：CSS 变量体系 + .dark 选择器覆盖、::selection 修复、平滑过渡 CSS、toggleTheme 含 meta theme-color 管理、matchMedia 监听系统偏好变化、beforeInteractive 脚本防 FOUC
- 优化 SEO：每个页面独立 metadata（title、description、keywords）、Open Graph / Twitter Card、metadataBase、robots 指令、Organization JSON-LD 结构化数据
- 添加表单验证和错误处理：客户端 ContactPageClient.tsx 实现必填校验、手机号/邮箱/微信号格式校验、blur 实时校验、aria-invalid 无障碍属性；服务端 route.ts 同步校验兜底

- 实现案例搜索防抖：CaseFilter 组件搜索框输入 300ms 防抖，使用 useRef + setTimeout/clearTimeout 模式，行业筛选保持立即生效

### 下一步
- 添加图片懒加载组件
- 优化 Prisma 查询性能
