import { Experience, Project, Skill } from './types';

export const PERSONAL_INFO = {
  name: "李建微",
  title: "高级UI设计",
  about: "• 具备系统的项目管理专业知识，熟悉项目全流程管控、进度与风险管理，擅长跨部门沟通与团队协同。\n• 具备较强的逻辑思维与问题解决能力。工作严谨负责，执行力强，抗压性好。\n• 熟悉 Deepseek、Gemini、Cursor、NanoBanana、即梦 AI、Trae 等常见 AI 产品。\n• 具备产品管理知识与技能，包括需求分析、产品设计等，具备良好的分析能力，熟练使用 Axure、Sketch 等产品设计工具。\n• 大厂荣誉大满贯：在齐心集团及服务华为期间，累计获得 3 次年度优秀个人/团队奖及 1 次数字化创新大赛二等奖。",
  email: "1052314863@qq.com",
  phone: "13728934940",
  wechat: "ljw105231",
  education: "硕士 / 拉蒙尤以大学\n本科 / 艺术设计",
};

export const EXPERIENCES: Experience[] = [
  {
    company: "语音交互数字人项目",
    role: "项目统筹 & UI设计",
    period: "2024.07 - 2025.03",
    description: [
      "独立负责数字人项目从 0 到 1 统筹推进，前期协助商务对接与需求调研，独立完成界面设计、视频输出及拍摄全流程跟进；制定项目排期，协调多方资源保障按期上线。",
      "后期负责运维、问题排查与内容迭代，累计输出设计稿与视频素材若干，高效处理各类问题，保障项目稳定运行，提升使用体验与业务效率。",
    ],
  },
  {
    company: "ERP 系统",
    role: "UI/交互设计",
    period: "2023.03 - 2024.05",
    description: [
      "全程参与 ERP 系统项目跟进与需求梳理，独立负责系统界面设计、交互逻辑规划与视觉输出，确保操作流程简洁易用、页面布局规范合理。同步跟进产品开发落地与体验优化，协助推进项目进度，保障系统顺利交付使用，提升整体使用效率与体验。",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "AI 智能助手",
    description: "基于 Gemini API 开发的智能聊天机器人，支持多模态输入和长文本分析。",
    tags: ["React", "TypeScript", "Tailwind CSS", "Gemini API"],
    image: "https://picsum.photos/seed/ai-app/800/600",
  },
  {
    title: "协作白板工具",
    description: "实时多人协作白板，支持图形绘制、实时聊天和文档导出。",
    tags: ["Socket.io", "Canvas", "Express", "React"],
    image: "https://picsum.photos/seed/whiteboard/800/600",
  },
  {
    title: "数据可视化大屏",
    description: "为企业提供实时业务数据监控，支持多种图表类型和动态数据更新。",
    tags: ["D3.js", "Recharts", "Next.js"],
    image: "https://picsum.photos/seed/dashboard/800/600",
  },
];

export const SKILLS: Skill[] = [
  {
    category: "设计工具",
    items: ["Sketch", "Figma", "Axure", "Adobe XD", "Photoshop"],
  },
  {
    category: "AI 工具",
    items: ["Deepseek", "Gemini", "Cursor", "即梦 AI", "Trae", "Midjourney"],
  },
  {
    category: "专业能力",
    items: ["项目管理", "需求调研", "交互逻辑", "视觉设计", "全流程管控"],
  },
];
