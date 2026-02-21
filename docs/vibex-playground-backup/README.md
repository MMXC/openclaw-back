# VibeX Playground

UI 原型预览与测试框架

## 快速开始

```bash
# 1. 进入目录
cd docs/vibex-playground

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

## 添加新页面

### 方式 1: 软链接（推荐）

```bash
# 链接页面目录
ln -s ../../vibex-pages/0X-页面名 ./pages/0X-页面名

# 链接控件目录  
ln -s ../vibex-ui-components/components/控件名 ./components/控件名
```

### 方式 2: 直接复制

直接将页面文件复制到对应目录。

## 配置路由

在 `lib/config.ts` 中注册：

```typescript
// 添加页面
{ 
  id: 'page_13', 
  name: '新页面', 
  slug: 'new-page', 
  path: '../vibex-pages/13-新页面', 
  category: 'page' 
}

// 添加控件
{ 
  id: 'comp_03', 
  name: 'Input 输入框', 
  slug: 'input', 
  path: '../vibex-ui-components/components/Input', 
  category: 'component' 
}
```

## 访问预览

| 页面 | URL |
|------|-----|
| 首页 | http://localhost:3000 |
| 落地页 | http://localhost:3000/landing |
| 登录页 | http://localhost:3000/auth |
| 用户中心 | http://localhost:3000/dashboard |
| AI对话页 | http://localhost:3000/chat |
| 流程图编辑 | http://localhost:3000/flow |
| Button 控件 | http://localhost:3000/component/button |
| Card 控件 | http://localhost:3000/component/card |

## 截图方法

1. **浏览器截图**: 打开页面后使用浏览器截图功能
2. **Puppeteer**: 
   ```bash
   npx puppeteer screenshot http://localhost:3000/landing
   ```
3. **OpenClaw Browser**: 使用 browser 工具截取

## 目录结构

```
vibex-playground/
├── app/
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页（导航）
│   ├── page.module.css
│   ├── globals.css          # 全局样式
│   └── [[...slug]]/        # 动态页面路由
│       └── page.tsx
├── lib/
│   ├── config.ts            # 页面/控件配置
│   └── registry.ts         # 动态加载
├── pages/                  # 页面软链接
├── components/             # 控件软链接
├── public/
├── package.json
└── next.config.js
```

## 页面文件要求

每个页面目录需包含：

```
13-新页面/
├── index.ts        # 导出 (必需)
├── PageName.tsx    # 组件 (必需)
├── page.module.css # 样式
├── data.ts         # 数据
├── mock.ts         # Mock数据
└── 页面说明.md     # 说明文档
```

### index.ts 导出格式

```typescript
export { PageName, default } from './PageName';
export { pageData } from './data';
export { pageMock } from './mock';
```

## 截图确认流程

1. 启动服务: `npm run dev`
2. 访问页面: `http://localhost:3000/landing`
3. 截图确认
4. 如需修改，编辑对应文件后刷新即可

## 故障排除

### 模块加载失败

检查 `lib/config.ts` 中的路径是否正确：

```typescript
path: '../vibex-pages/01-落地页'  // 确认路径存在
```

### 样式丢失

确认 CSS Module 文件存在且正确导入。

### 动态导入失败

Next.js 动态导入需要确保模块有 default 导出，或在 registry.ts 中调整加载逻辑。
