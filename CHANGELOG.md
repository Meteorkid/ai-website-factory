# CHANGELOG

## 2026-05-29 (案例页优化与 Bug 修复)

### 已完成
- 案例页布局优化：Hero 区域间距 pb-20→pb-8，筛选区域 py-20→py-8，CaseFilter 标签缩小
- 案例卡片区域添加 sr-only H2 标题，修复 H1→H3 标题层级跳跃
- Header LocaleToggle 使用 usePathname() 替代 window.location，修复 React hydration error #418
- 4 个英文案例标题改为中文（MetricFlow、Bright Smile Dental、Meridian Advisory、Soulflow Yoga）
- 同步更新 dev.db 数据库中的标题
- 优化脚本完成 23 个案例的独立设计、图片和商业叙事
- 页面重写：首页、定价、流程、关于、联系、服务、行业方案
- 新增组件：CaseCard（浏览器模拟+标签+指标）、CaseFilter（行业筛选+搜索+排序+视图切换）
- 管理后台增强：案例管理、线索批量操作、统计数据
- i18n 完善：修复 5 处硬编码文本，新增 socialProof/packages/notFound 翻译

## 2026-05-29 (i18n 完善)

### 已完成
- 修复 5 处硬编码文本 i18n 问题：
  - 根 layout metadata 改为英文 fallback，locale layout 增加 generateMetadata 生成语言相关的 title/description/keywords/openGraph/twitter
  - 首页社会证明标题和行业列表改用 t() 翻译（home.socialProof.*）
  - Footer 套餐名（Starter/Pro/Premium）改用 t() 翻译（footer.packages.*）
  - 新增 notFound 命名空间（title/description/backHome）
  - 新增 LocaleHtmlAttr 组件动态设置 `<html lang>` 属性
- 翻译文件更新：zh.json / en.json 新增 socialProof、packages、notFound 键
- Lint: 0 errors, 7 warnings（Unsplash `<img>` 预期 warning）
- Build: 通过（37 路由，26 静态页面）

## 2026-05-29 (下午)

### 已完成
- 23 Agent 企业级优化 - Batch 2 & 3 后续 agent 完成：
  - Agent 07 响应式优化：clamp() fluid headings（7 个页面）、StickyMobileCTA padding 修复、timeline 移动端间距
  - Agent 09 产品服务模块：创建 /services 页面（服务层级卡片+对比矩阵+流程+CTA）
  - Agent 10 行业解决方案：创建 /solutions 页面（6 个行业卡片+How It Works+CTA）
  - Agent 13 SEO metadata：JSON-LD 结构化数据 + generateMetadata
  - Agent 14 性能优化：img width/height CLS 防护
  - Agent 15 无障碍：aria-label、aria-hidden、aria-expanded、sr-only labels（20+ 图标）
  - Agent 20 内容合规：example.com 全部替换为 NEXT_PUBLIC_BASE_URL 环境变量（6 个文件）
  - Agent 21 测试质量：lint 验证通过
- Header 导航新增"服务"和"行业方案"入口
- Agent 04 营销文案重写：8 个 section 文案优化（hero/cta/serviceValues/packages/pricing/process/about/contact）
- Agent 16 组件库：Button/Badge/SectionHeader 3 个可复用组件 + CtaSection/FeaturedCasesSection/CaseCard/InsightsSection 集成
- Agent 18 表单优化：未完成（API 连接中断，i18n keys 部分添加）
- Sitemap 更新：新增 /services 和 /solutions 路由
- Header 导航新增"服务"和"行业方案"入口
- Lint: 0 errors, 7 warnings（Unsplash `<img>` 预期 warning）
- Build: 通过

## 2026-05-29

### 已完成
- 23 Agent 企业级优化 - Batch 1 & 2 & 3 执行：
  - 首页 Hero 重写：渐变背景装饰、信任指标卡片、行业社会证明、Unsplash 背景图
  - About 页面重写：6 段企业级布局（Hero/团队/时间线/价值观/CTA）+ Unsplash 图片
  - Pricing 页面重写：5 段高端 SaaS 风格（Hero/定价卡/对比表/FAQ/CTA）
  - Contact 页面重写：分栏表单+联系信息卡片，字段精简至 6 个
  - Process 页面重写：7 步垂直时间线+验收标准
  - 英文案例数据新增 4 条（共 23 条）
  - 首页新增"行业洞察"Insights 区块（6 篇文章卡片）
  - 滚动动画：FadeIn 组件 + 全站 section 包裹
  - SEO：JSON-LD 结构化数据（Service/Product/FAQPage/BreadcrumbList）
  - 转化路径：移动端底部 Sticky CTA 栏
  - 图片素材：Unsplash 可商用图片（Hero/About/Cases）
  - 品牌视觉：修复硬编码颜色（LazyImage gray → surface-2）
- Lint 错误修复（22 errors → 0）
- Lint: 0 errors, 5 warnings（`<img>` Unsplash 外部图片）
- Build: 通过

## 2026-06-02

### 已完成
- 添加 hreflang 标签（多语言 SEO）：
  - locale layout 添加 generateMetadata，为每个页面生成 alternates.languages（zh、en、x-default）
  - 更新 sitemap.ts：为每个页面生成 zh/en 两个 URL 条目，每个条目包含 alternates.languages 映射
  - 添加 canonical 指向当前 locale 路径
- lint 和 build 验证通过

## 2026-06-01

### 已完成
- 添加 PWA 支持：
  - 创建 public/manifest.json（应用名称、图标、主题色、显示模式）
  - 创建 public/icon-192.svg 和 public/icon-512.svg 应用图标
  - 创建 public/sw.js Service Worker（静态资源缓存 + 离线回退）
  - locale layout 添加 manifest 链接和 themeColor（通过 viewport 导出）
  - 添加 Service Worker 注册脚本（afterInteractive 策略）
- lint 和 build 验证通过

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
