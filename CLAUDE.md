# AI 官网工场 - Claude Code 工作规则

## 项目概述
AI 辅助生成、专业团队交付的官网建设服务网站。包含营销页面、案例展示、管理后台、客户仪表盘。

## 技术栈
- **框架**: Next.js 16 (App Router + Turbopack)
- **样式**: Tailwind CSS v4
- **语言**: TypeScript
- **数据库**: Prisma 7.8.0 + SQLite
- **图标**: Lucide React

## 工作方式
- 每轮只做一个小任务
- 不要重复已完成工作
- 不要大面积重构，除非 TASKS.md 明确要求
- 每轮结束必须更新 TASKS.md 和 CHANGELOG.md
- 每轮结束必须运行 lint 和 build
- 如果存在 typecheck 脚本，也必须运行

## 代码规范
- 中文注释
- 组件使用函数式组件 + hooks
- 样式使用 Tailwind CSS，避免内联样式
- 文件命名：组件 PascalCase，工具函数 camelCase
- 目录结构：pages 按功能分组，components 按功能分组

## 安全限制
- 不要删除用户文件
- 不要修改 .env、密钥、凭据、SSH 文件
- 不要执行 sudo
- 不要执行 rm -rf
- 不要访问系统目录
- 不要安装来源不明的脚本
- 不要引入不可商用素材
- 不要虚构真实企业数据（案例数据已有种子文件）

## 数据库
- 使用 Prisma ORM + SQLite
- 种子数据：`npx tsx prisma/seed.ts`
- 迁移：`npx prisma db push`
- 生成客户端：`npx prisma generate`

## 验证流程
```bash
# 检查依赖
pnpm install

# 运行 lint
pnpm lint

# 运行 build
pnpm build
```

## 禁止事项
- 不要把 `""`（中文引号）写入 TypeScript/JavaScript 文件
- 不要修改 prisma/schema.prisma 中已有的字段
- 不要删除 public/cases/ 目录下的图片文件
