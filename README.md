# 颜色生成器 & 短链接工具

一个简单实用的二合一工具，集成了颜色生成器和短链接功能。使用纯HTML、CSS和JavaScript构建，无需后端服务器即可部署。

[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https%3A%2F%2Fgithub.com%2Fwzt99800%2FEdgeone&project-name=Edgeone&output-directory=.%2F)

## 功能特点

### 颜色生成器
- RGB滑块控制，精确调整颜色
- 随机颜色生成
- 颜色历史记录
- 点击历史颜色可快速应用
- 根据颜色亮度自动调整显示文本颜色

### 短链接工具
- URL有效性验证
- 模拟短链接生成（可替换为实际API）
- 一键复制短链接
- 历史记录管理
- 点击历史记录中的短链接可快速复制

## 技术栈
- HTML5
- CSS3 (响应式设计)
- 原生JavaScript

## 本地开发

克隆仓库后，只需在浏览器中打开index.html文件即可运行项目。无需安装任何依赖或运行构建脚本。

```bash
git clone https://github.com/wzt99800/Edgeone.git
cd Edgeone
# 在浏览器中打开index.html
```

## 自定义开发

### 颜色生成器
颜色生成功能完全在客户端实现，通过修改`js/script.js`中的相关函数可以自定义颜色处理逻辑。

### 短链接工具
短链接生成当前使用模拟实现。在实际应用中，你需要：

1. 替换`generateMockShortUrl`函数，调用实际的短链接API
2. 添加相应的错误处理和状态反馈

```javascript
// 示例：替换为实际API调用
function generateShortUrl(originalUrl) {
    return fetch('https://your-shortener-api.com/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalUrl })
    })
    .then(response => response.json())
    .then(data => data.shortUrl);
}
```

## 部署

点击上方的"使用 EdgeOne Pages 部署"按钮，即可一键部署到EdgeOne Pages平台。

## 许可证
MIT 
