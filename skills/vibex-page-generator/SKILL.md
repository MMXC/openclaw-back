# VibeX 页面生成器 Skill

根据 UI 节点树生成完整页面结构。

## 功能

1. 根据页面描述生成完整页面目录结构
2. 每个页面包含：
   - `skeleton.ts` - 骨架配置
   - `controls/` - 控件目录（每个控件独立）
   - `controls/控件名/*.tsx` - 控件代码
   - `controls/控件名/*.css` - 样式
   - `controls/控件名/README.md` - 控件说明 + 修改历史
   - `controls/控件名/index.ts` - 导出
   - `页面名.tsx` - 页面组件
   - `data.ts` - 页面数据
   - `mock.ts` - Mock 数据
   - `页面说明.md` - 页面说明

3. 支持追加修改记录到控件 README

## 使用方法

### 1. 生成新页面

用户提供页面名称和控件列表，Skill 自动生成完整目录结构。

### 2. 更新控件

1. 修改 `controls/控件名/` 下的文件
2. 在 `controls/控件名/README.md` 末尾追加修改记录

### 3. 更新骨架

修改 `skeleton.ts` 记录控件位置和属性

## 输出格式

生成完成后输出目录结构：

```
页面名/
├── skeleton.ts
├── controls/
│   ├── 控件A/
│   │   ├── 控件A.tsx
│   │   ├── 控件A.module.css
│   │   ├── README.md
│   │   └── index.ts
│   └── 控件B/
│       └── ...
├── 页面名.tsx
├── 页面名.module.css
├── data.ts
├── mock.ts
├── index.ts
└── 页面说明.md
```

## 示例 Prompt

"生成登录注册页面，包含 Header、AuthCard、SocialLogin 控件"

## 注意事项

- 控件独立目录，不共享
- 每个控件必须有 README 记录修改历史
- 骨架配置记录控件位置，拖拽后更新
- 完成后及时提交 Git
