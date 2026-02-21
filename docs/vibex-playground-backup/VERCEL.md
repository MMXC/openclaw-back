# Vercel 部署指南

## 方式一：Vercel CLI 部署

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 进入项目目录
cd docs/vibex-playground

# 3. 登录 Vercel
vercel login

# 4. 部署
vercel
```

## 方式二：Git 集成部署

1. 推送代码到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. Import Git Repository
4. 选择 `vibex-playground` 目录
5. 配置：
   - Framework Preset: `Next.js`
   - Build Command: `next build`
   - Output Directory: `.next`

## 部署配置

创建 `vercel.json`：

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

## 环境变量（如需要）

在 Vercel Project Settings 添加：
- `NEXT_PUBLIC_API_URL`
- 其他敏感配置

## 访问

部署后获得 URL，如：`https://vibex-playground.vercel.app`

## 更新部署

```bash
cd docs/vibex-playground
vercel --prod
```

或推送到 GitHub 自动部署
