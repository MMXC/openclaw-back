# VibeX Skill 示例

> 领域拆解 skill 测试用例

## 示例列表

| 文件 | 描述 |
|------|------|
| [01-ecommerce.md](./01-ecommerce.md) | 电商系统 |
| [02-education.md](./02-education.md) | 在线教育平台 |
| [03-aichat.md](./03-aichat.md) | AI 聊天机器人 |
| [04-appointment.md](./04-appointment.md) | 预约挂号系统 |

## 测试覆盖

- [x] 电商/交易
- [x] 教育/内容
- [x] AI/对话
- [x] 预约/服务

## 输出格式

示例均采用统一的 JSON 结构，便于 UI 解析渲染。

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 领域唯一标识 |
| name | string | 领域名称 |
| type | enum | core/supporting/generic/related |
| priority | enum | P0/P1/P2 |
| subDomains | array | 子域列表 |
| features | array | 功能列表 |
| entities | array | 实体列表 |
| mvpScope | object | MVP 范围 |
| dependencies | array | 依赖领域 |

## 扩展建议

可继续添加更多行业示例：
- 餐饮外卖系统
- 酒店预订系统
- 智慧社区
- 共享经济平台
