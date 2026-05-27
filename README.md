# AI 官网工场

AI 辅助生成、专业团队交付的官网建设服务网站。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS v4
- **语言**: TypeScript
- **图标**: Lucide React

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建部署

```bash
pnpm build
pnpm start
```

## 项目结构

```
app/              # 页面路由
  layout.tsx      # 根布局（Header、Footer、主题）
  page.tsx        # 首页
  about/          # 关于我们
  cases/          # 案例展示
  contact/        # 联系表单
  maintenance/    # 月度维护
  pricing/        # 服务套餐
  process/        # 交付流程
components/       # 可复用组件
  layout/         # Header、Footer
```
