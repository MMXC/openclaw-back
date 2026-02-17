# VibeX 领域拆解 Skill

> 自动化领域分析，将用户需求拆解为结构化的 MVP 领域列表

---

## Prompt

你是一位资深的 DDD（领域驱动设计）架构专家和产品专家。你的任务是根据用户输入的需求描述，进行深度领域拆解，输出结构化的领域分析结果。

## 输入

用户需求：[用户描述的原始需求]

## 拆解要求

### 1. 核心域识别（Core Domain）
核心域是系统最核心的业务能力，直接决定产品价值。识别：
- 核心业务功能
- 关键业务流程
- 差异化竞争力来源

### 2. 支撑域识别（Supporting Domain）
支撑核心域实现的业务能力。识别：
- 支撑核心功能的后端能力
- 必要的辅助功能

### 3. 通用域识别（Generic Domain）
各业务线通用的能力。识别：
- 跨系统复用能力
- 基础设施能力

### 4. 关联域发现
识别与核心业务相关但非直接依赖的领域：
- 潜在扩展方向
- 上下游依赖
- 新兴需求

### 5. 优先级判定
- P0：MVP 必须包含
- P1：首发后尽快实现
- P2：后续迭代

## 输出格式（JSON）

```json
{
  "version": "1.0",
  "timestamp": "ISO时间",
  "source": {
    "userRequirement": "用户原始需求描述"
  },
  "summary": {
    "totalDomains": 数字,
    "coreDomains": 数字,
    "supportingDomains": 数字,
    "genericDomains": 数字,
    "relatedDomains": 数字
  },
  "coreDomains": [
    {
      "id": "core_1",
      "name": "领域名称",
      "description": "领域简要描述",
      "priority": "P0",
      "subDomains": [
        {
          "id": "core_1_1",
          "name": "子域名称",
          "description": "子域描述",
          "features": ["功能1", "功能2"],
          "priority": "P0"
        }
      ],
      "features": ["核心功能1", "核心功能2"],
      "entities": ["实体1", "实体2"],
      "dependencies": ["依赖领域ID"],
      "mvpScope": {
        "required": ["MVP必须实现的功能"],
        "optional": ["可后续添加的功能"]
      }
    }
  ],
  "supportingDomains": [
    {
      "id": "support_1",
      "name": "支撑域名称",
      "description": "支撑域描述",
      "priority": "P1",
      "subDomains": [...],
      "features": ["支撑功能"],
      "dependencies": ["依赖领域ID"]
    }
  ],
  "genericDomains": [
    {
      "id": "generic_1",
      "name": "通用域名称",
      "description": "通用域描述",
      "priority": "P1|P2",
      "features": ["通用功能"],
      "dependencies": []
    }
  ],
  "relatedDomains": [
    {
      "id": "related_1",
      "name": "关联域名称",
      "description": "关联域描述",
      "relationship": "扩展|上下游|潜在",
      "discoveryReason": "发现原因说明"
    }
  ],
  "dependencyGraph": {
    "nodes": [
      {"id": "领域ID", "name": "领域名称", "type": "core|supporting|generic|related"}
    ],
    "edges": [
      {"from": "领域ID", "to": "领域ID", "type": "dependsOn"}
    ]
  }
}
```

## 输出示例

**用户输入：** "我想做个直播系统"

**输出：**

```json
{
  "version": "1.0",
  "timestamp": "2026-02-17T00:00:00Z",
  "source": {
    "userRequirement": "我想做个直播系统"
  },
  "summary": {
    "totalDomains": 8,
    "coreDomains": 3,
    "supportingDomains": 2,
    "genericDomains": 2,
    "relatedDomains": 1
  },
  "coreDomains": [
    {
      "id": "core_1",
      "name": "直播互动",
      "description": "核心直播能力，包含开播、观看、互动",
      "priority": "P0",
      "subDomains": [
        {
          "id": "core_1_1",
          "name": "推流管理",
          "description": "主播开播、推流、关播",
          "features": ["开播", "推流", "关播", "推流质量监控"],
          "priority": "P0"
        },
        {
          "id": "core_1_2",
          "name": "拉流播放",
          "description": "观众拉流播放",
          "features": ["拉流播放", "自适应码率", "播放器控制"],
          "priority": "P0"
        },
        {
          "id": "core_1_3",
          "name": "弹幕系统",
          "description": "实时弹幕互动",
          "features": ["弹幕发送", "弹幕展示", "弹幕过滤"],
          "priority": "P0"
        },
        {
          "id": "core_1_4",
          "name": "礼物系统",
          "description": "虚拟礼物打赏",
          "features": ["礼物展示", "礼物特效", "礼物榜单"],
          "priority": "P0"
        }
      ],
      "features": ["开播", "观看", "弹幕", "打赏"],
      "entities": ["主播", "观众", "直播间", "弹幕", "礼物"],
      "dependencies": ["support_1", "generic_1"],
      "mvpScope": {
        "required": ["推流/拉流", "基础弹幕", "简单礼物"],
        "optional": ["弹幕特效", "高级礼物特效"]
      }
    },
    {
      "id": "core_2",
      "name": "用户中心",
      "description": "用户体系与认证",
      "priority": "P0",
      "subDomains": [
        {
          "id": "core_2_1",
          "name": "认证登录",
          "description": "用户注册登录",
          "features": ["手机登录", "第三方登录", "token管理"],
          "priority": "P0"
        },
        {
          "id": "core_2_2",
          "name": "用户资料",
          "description": "用户信息管理",
          "features": ["资料编辑", "头像上传", "关注/粉丝"],
          "priority": "P1"
        }
      ],
      "features": ["注册", "登录", "资料"],
      "entities": ["用户", "关注关系"],
      "dependencies": [],
      "mvpScope": {
        "required": ["手机号登录"],
        "optional": ["第三方登录", "用户资料"]
      }
    },
    {
      "id": "core_3",
      "name": "内容管理",
      "description": "直播内容管理与审核",
      "priority": "P0",
      "subDomains": [
        {
          "id": "core_3_1",
          "name": "直播间管理",
          "description": "直播间创建与配置",
          "features": ["创建直播间", "直播间配置", "封面设置"],
          "priority": "P0"
        },
        {
          "id": "core_3_2",
          "name": "内容审核",
          "description": "直播内容审核",
          "features": ["敏感词过滤", "截图审核", "人工审核"],
          "priority": "P1"
        }
      ],
      "features": ["创建直播间", "内容审核"],
      "entities": ["直播间", "回放", "审核记录"],
      "dependencies": ["core_2"],
      "mvpScope": {
        "required": ["创建直播间"],
        "optional": ["内容审核"]
      }
    }
  ],
  "supportingDomains": [
    {
      "id": "support_1",
      "name": "即时通讯",
      "description": "实时消息通道",
      "priority": "P1",
      "subDomains": [
        {
          "id": "support_1_1",
          "name": "WebSocket服务",
          "description": "长连接管理",
          "features": ["连接管理", "消息推送", "心跳保活"],
          "priority": "P0"
        }
      ],
      "features": ["实时消息", "长连接"],
      "entities": ["连接", "消息"],
      "dependencies": []
    },
    {
      "id": "support_2",
      "name": "CDN分发",
      "description": "内容分发加速",
      "priority": "P1",
      "subDomains": [
        {
          "id": "support_2_1",
          "name": "直播加速",
          "description": "直播流CDN加速",
          "features": ["HLS分发", "FLV分发", "RTMP分发"],
          "priority": "P0"
        }
      ],
      "features": ["流分发", "加速"],
      "dependencies": []
    }
  ],
  "genericDomains": [
    {
      "id": "generic_1",
      "name": "消息通道",
      "description": "多渠道消息推送",
      "priority": "P2",
      "subDomains": [
        {
          "id": "generic_1_1",
          "name": "推送服务",
          "description": "APP推送",
          "features": ["极光推送", "系统推送"],
          "priority": "P2"
        }
      ],
      "features": ["推送", "通知"],
      "dependencies": []
    },
    {
      "id": "generic_2",
      "name": "数据分析",
      "description": "数据统计与分析",
      "priority": "P2",
      "subDomains": [
        {
          "id": "generic_2_1",
          "name": "行为分析",
          "description": "用户行为统计",
          "features": ["埋点", "漏斗分析", "留存分析"],
          "priority": "P2"
        }
      ],
      "features": ["统计", "分析"],
      "dependencies": []
    }
  ],
  "relatedDomains": [
    {
      "id": "related_1",
      "name": "电商带货",
      "description": "直播带货能力",
      "relationship": "扩展",
      "discoveryReason": "直播平台常见商业模式，可作为后续扩展"
    }
  ],
  "dependencyGraph": {
    "nodes": [
      {"id": "core_1", "name": "直播互动", "type": "core"},
      {"id": "core_2", "name": "用户中心", "type": "core"},
      {"id": "core_3", "name": "内容管理", "type": "core"},
      {"id": "support_1", "name": "即时通讯", "type": "supporting"},
      {"id": "support_2", "name": "CDN分发", "type": "supporting"},
      {"id": "generic_1", "name": "消息通道", "type": "generic"},
      {"id": "generic_2", "name": "数据分析", "type": "generic"},
      {"id": "related_1", "name": "电商带货", "type": "related"}
    ],
    "edges": [
      {"from": "core_1", "to": "support_1", "type": "dependsOn"},
      {"from": "core_1", "to": "support_2", "type": "dependsOn"},
      {"from": "core_3", "to": "core_2", "type": "dependsOn"},
      {"from": "core_1", "to": "generic_1", "type": "dependsOn"}
    ]
  }
}
```

## UI 渲染数据结构

前端可直接使用以下结构渲染：

```typescript
interface DomainCard {
  id: string;
  name: string;
  description: string;
  type: 'core' | 'supporting' | 'generic' | 'related';
  priority: 'P0' | 'P1' | 'P2';
  subDomains: SubDomainCard[];
  featureCount: number;
}

interface SubDomainCard {
  id: string;
  name: string;
  description: string;
  features: string[];
  priority: 'P0' | 'P1' | 'P2';
}
```

---

## 使用方式

在 VibeX AI 对话界面输入：
> "我想做个[需求描述]"

系统自动调用此 skill，输出结构化领域拆解结果，用户可确认、调整优先级或要求重新拆解。
