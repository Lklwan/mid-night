# 🌙 Midnight 网速检测

一个为 **iPhone** 设计的、午夜深色主题的网速 & 延迟检测网页应用。
用 Safari 打开即用，可"添加到主屏幕"像 App 一样运行（PWA）。

## ✨ 功能

- **下载 / 上传带宽测速** — 使用 Cloudflare 公共测速端点，实时显示 Mbps
- **AI 网站延迟检测** — 测到 ChatGPT、Claude、Gemini、Perplexity、Grok 的往返延迟
- **YouTube 延迟 / 可达性** — 专门检测视频站点连接情况
- **基准延迟 (Ping)** — 浏览器到 Cloudflare 边缘的真实 RTT
- **PWA 离线外壳** — 添加到主屏幕后无需联网也能打开界面
- 颜色标注：🟢 <150ms 流畅 · 🟡 <400ms 一般 · 🔴 超时/慢
- 纯前端、零依赖、不收集任何数据

## 📱 在 iPhone 上使用

1. 用 Safari 打开部署后的网址
2. 点击 **开始测速**
3. （可选）点底部「分享」→「添加到主屏幕」，即可像 App 一样使用

## 🚀 部署到 GitHub Pages

1. 把本仓库推送到 GitHub
2. 打开仓库 **Settings → Pages**
3. Source 选择 `Deploy from a branch`，分支选 `main`（或当前分支），目录选 `/ (root)`
4. 几十秒后即可通过 `https://<用户名>.github.io/mid-night/` 访问

> 因为用到 Service Worker 和跨域 fetch，**必须在 HTTPS 下访问**（GitHub Pages 默认就是 HTTPS）。本地直接双击打开 `file://` 会受限。

## 🧪 本地预览

```bash
# 任选其一，在仓库目录下起一个本地 HTTPS/HTTP 服务
python3 -m http.server 8080
# 然后浏览器访问 http://localhost:8080
```

## 📂 文件说明

| 文件 | 作用 |
| --- | --- |
| `index.html` | 应用本体（界面 + 全部测速逻辑） |
| `manifest.webmanifest` | PWA 清单，让其可安装到主屏幕 |
| `sw.js` | Service Worker，缓存界面以支持离线打开 |
| `icon.svg` | 应用图标（午夜月亮 + 信号弧） |

## ⚙️ 测速原理

- **带宽**：向 `speed.cloudflare.com/__down` / `__up` 流式收发数据，按字节/耗时计算 Mbps，并随网速自适应加大样本。
- **延迟**：向各站点的 `favicon.ico` 发起带时间戳的请求并计时，取多次采样的最小值（更接近真实 RTT）。受浏览器跨域限制，延迟为"连接建立的往返耗时（含 TLS）"的近似，仅供横向参考。

---
数据仅供参考，不代表运营商官方测速结果。
