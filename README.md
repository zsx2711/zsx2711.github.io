# 我的静态站点

一个简洁美观的静态网页模板，基于纯 HTML / CSS / JavaScript，零依赖、轻量快速，开箱即用。

## ✨ 特性

- 响应式布局，适配手机与桌面端
- 无任何外部依赖，加载速度快
- 语义化 HTML 标签，利于 SEO
- 支持一键部署到 GitHub Pages

## 📁 项目结构

```
├── index.html          # 主页
├── css/
│   └── style.css       # 样式
├── js/
│   └── script.js       # 交互脚本
├── .github/
│   └── workflows/
│       └── pages.yml   # GitHub Pages 自动部署
└── README.md
```

## 🚀 快速开始

### 本地预览

直接用浏览器打开 `index.html`，或使用本地服务器：

```bash
# Python
python -m http.server 8000

# 或 Node.js
npx serve .
```

然后访问 `http://localhost:8000`。

### 部署到 GitHub Pages

推送代码到 GitHub 后，项目中已配置的 `.github/workflows/pages.yml` 会自动将网站部署到 `https://<用户名>.github.io/<仓库名>/`。

## 📄 许可证

本项目基于 [MIT](./LICENSE) 许可证开源。