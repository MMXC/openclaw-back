# VibeX 流程节点生成测试

> 输入：用户系统

---

根据用户系统生成的流程节点：

```json
{
  "version": "1.0",
  "domain": "用户系统",
  "description": "用户注册、登录、认证、管理个人资料",
  "flow": {
    "nodes": [
      {
        "id": "flow_1",
        "name": "进入注册页",
        "description": "用户点击注册按钮，进入注册页面",
        "type": "start",
        "parentDomain": "用户中心",
        "features": ["注册页"],
        "dependencies": [],
        "position": 1
      },
      {
        "id": "flow_2",
        "name": "选择注册方式",
        "description": "选择手机号、邮箱或第三方登录",
        "type": "action",
        "parentDomain": "用户中心",
        "features": ["注册登录"],
        "dependencies": ["flow_1"],
        "position": 2
      },
      {
        "id": "flow_3",
        "name": "是否手机注册",
        "description": "判断用户选择的注册方式",
        "type": "decision",
        "parentDomain": "用户中心",
        "features": ["注册登录"],
        "dependencies": ["flow_2"],
        "position": 3
      },
      {
        "id": "flow_4",
        "name": "输入手机号",
        "description": "用户输入手机号码",
        "type": "branch",
        "parentDomain": "用户中心",
        "features": ["手机登录"],
        "dependencies": ["flow_3"],
        "position": 4
      },
      {
        "id": "flow_5",
        "name": "获取验证码",
        "description": "系统发送短信验证码",
        "type": "action",
        "parentDomain": "用户中心",
        "features": ["手机登录"],
        "dependencies": ["flow_4"],
        "position": 5
      },
      {
        "id": "flow_6",
        "name": "输入验证码",
        "description": "用户输入收到的验证码",
        "type": "action",
        "parentDomain": "用户中心",
        "features": ["手机登录"],
        "dependencies": ["flow_5"],
        "position": 6
      },
      {
        "id": "flow_7",
        "name": "验证成功",
        "description": "系统验证验证码正确",
        "type": "decision",
        "parentDomain": "用户中心",
        "features": ["Token管理"],
        "dependencies": ["flow_6"],
        "position": 7
      },
      {
        "id": "flow_8",
        "name": "设置密码",
        "description": "用户设置登录密码",
        "type": "action",
        "parentDomain": "用户中心",
        "features": ["注册登录"],
        "dependencies": ["flow_7"],
        "position": 8
      },
      {
        "id": "flow_9",
        "name": "完善资料",
        "description": "用户可选填写昵称、头像等",
        "type": "action",
        "parentDomain": "用户中心",
        "features": ["资料编辑"],
        "dependencies": ["flow_8"],
        "position": 9
      },
      {
        "id": "flow_10",
        "name": "注册成功",
        "description": "系统创建用户账号，返回Token",
        "type": "end",
        "parentDomain": "用户中心",
        "features": ["Token管理"],
        "dependencies": ["flow_9"],
        "position": 10
      }
    ],
    "paths": [
      {
        "id": "path_main",
        "name": "手机注册流程",
        "nodeIds": ["flow_1", "flow_2", "flow_3", "flow_4", "flow_5", "flow_6", "flow_7", "flow_8", "flow_9", "flow_10"]
      }
    ]
  }
}
```

---

**节点列表**：

| # | 节点 | 类型 | 描述 |
|---|------|------|------|
| 1 | 进入注册页 | start | 用户点击注册按钮 |
| 2 | 选择注册方式 | action | 手机/邮箱/第三方 |
| 3 | 是否手机注册 | decision | 判断分支 |
| 4 | 输入手机号 | branch | 手机号填写 |
| 5 | 获取验证码 | action | 短信发送 |
| 6 | 输入验证码 | action | 填写验证码 |
| 7 | 验证成功 | decision | 验证码校验 |
| 8 | 设置密码 | action | 设置登录密码 |
| 9 | 完善资料 | action | 可选填资料 |
| 10 | 注册成功 | end | 完成注册 |
