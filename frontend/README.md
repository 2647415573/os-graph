# 操作系统知识图谱系统

这是一个基于React的操作系统知识图谱展示系统，用于可视化操作系统相关概念及其关系。

## 功能特点

- 用户登录：通过用户名和密码进行身份验证
- 知识图谱：以图形化方式展示操作系统相关概念及关系
- 节点搜索：支持通过搜索框查找特定节点
- 节点详情：点击节点可查看详细信息

## 技术栈

- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- D3.js（知识图谱可视化）
- Font Awesome（图标）

## 项目结构

```
frontend/
  ├── public/                 # 静态资源
  ├── src/
  │   ├── components/         # 组件
  │   │   ├── graph/          # 知识图谱相关组件
  │   │   ├── layout/         # 布局组件
  │   │   └── search/         # 搜索相关组件
  │   ├── pages/              # 页面组件
  │   ├── assets/             # 资源文件
  │   ├── types/              # TypeScript类型定义
  │   ├── App.tsx             # 应用主组件
  │   └── index.tsx           # 入口文件
  ├── tailwind.config.js      # Tailwind配置
  ├── tsconfig.json           # TypeScript配置
  └── package.json            # 项目依赖
```

## 启动项目

1. 安装依赖

```
cd frontend
npm install
```

2. 启动开发服务器

```
npm start
```

应用将在 http://localhost:3000 运行。

## 页面说明

1. 登录页面 (`/login`)
   - 用户可通过用户名和密码登录系统
   - 为简化演示，输入任意非空用户名和密码即可登录

2. 主页面 (`/home`)
   - 左侧：功能导航栏（知识图谱、知识查询、退出系统）
   - 中间：知识图谱可视化区域
   - 右侧：节点详细信息显示区域

## 数据说明

当前版本使用模拟数据展示知识图谱，实际应用中应该通过API从后端获取数据。 