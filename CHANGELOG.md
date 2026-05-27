# CHANGELOG

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

### 下一步
- 优化 SEO（meta 标签、Open Graph、结构化数据）
- 添加表单验证和错误处理
- 实现案例搜索防抖
