---
name: vibeX-domain-decomposition
description: "VibeX 领域拆解：根据用户需求生成结构化的 MVP 领域列表，包含核心域/支撑域/通用域，输出 JSON 格式便于 UI 渲染"
metadata:
  {
    "openclaw": {
      "emoji": "🎯",
      "requires": {},
      "category": "vibex"
    }
  }
---

# VibeX 领域拆解 Skill

根据用户输入的需求描述，自动进行 DDD 领域拆解，输出结构化的领域列表。

## 输入

用户需求描述，例如：
- "我想做个直播系统"
- "做一个电商平台"

## 输出格式（JSON）

```json
{
  "version": "1.0",
  "source": {
    "userRequirement": "用户原始需求"
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
      "description": "领域描述",
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
      "features": ["核心功能"],
      "entities": ["实体"],
      "mvpScope": {
        "required": ["MVP必须实现"],
        "optional": ["可后续添加"]
      }
    }
  ],
  "supportingDomains": [...],
  "genericDomains": [...],
  "relatedDomains": [...],
  "dependencyGraph": {
    "nodes": [{"id": "领域ID", "name": "名称", "type": "core|supporting|generic|related"}],
    "edges": [{"from": "ID", "to": "ID", "type": "dependsOn"}]
  }
}
```

## 示例

**输入**：直播系统

**核心域输出**：
- 直播互动（核心）：推流管理、拉流播放、弹幕系统、礼物系统
- 用户中心（核心）：认证登录、用户资料
- 内容管理（核心）：直播间管理、内容审核

**支撑域**：
- 即时通讯、WebSocket 服务
- CDN 分发

**通用域**：
- 消息通知、数据分析

## 拆解规则

1. **核心域**：直接决定产品价值的业务能力
2. **支撑域**：支撑核心域实现的业务能力
3. **通用域**：各业务线通用的能力
4. **关联域**：潜在扩展方向

## 优先级规则

- **P0**：MVP 必须包含
- **P1**：首发后尽快实现
- **P2**：后续迭代
