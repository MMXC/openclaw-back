# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

### Vibex 项目

- **领域拆解技能**: `/root/.openclaw/skills/vibex-domain-decomposition/SKILL.md`
- 项目路径: `/root/vibex/`
- 技术栈: Next.js 14 + Fastify + PostgreSQL
- 已实现: 需求看板、需求编辑、领域板、甘特图、预览导出
- 待实现: 流程画布、页面映射、API设计、任务导出

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
