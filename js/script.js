// DOM 元素
const colorDisplay = document.getElementById('colorDisplay');
const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');
const redValue = document.getElementById('redValue');
const greenValue = document.getElementById('greenValue');
const blueValue = document.getElementById('blueValue');
const generateRandomColorBtn = document.getElementById('generateRandomColor');
const colorHistory = document.getElementById('colorHistory');

const originalUrlInput = document.getElementById('originalUrl');
const shortenUrlBtn = document.getElementById('shortenUrl');
const shortenedUrlInput = document.getElementById('shortenedUrl');
const copyUrlBtn = document.getElementById('copyUrl');
const urlHistory = document.getElementById('urlHistory');

// 颜色历史记录数组
const colorHistoryArray = [];
// URL历史记录数组
const urlHistoryArray = [];

// 初始化
function init() {
    // 加载本地存储数据
    loadFromLocalStorage();
    
    // 初始化颜色显示
    updateColorDisplay();
    
    // 事件监听器
    redSlider.addEventListener('input', handleSliderChange);
    greenSlider.addEventListener('input', handleSliderChange);
    blueSlider.addEventListener('input', handleSliderChange);
    generateRandomColorBtn.addEventListener('click', generateRandomColor);
    
    shortenUrlBtn.addEventListener('click', shortenUrl);
    copyUrlBtn.addEventListener('click', copyToClipboard);
    
    // 渲染历史记录
    renderColorHistory();
    renderUrlHistory();
}

// 更新颜色显示
function updateColorDisplay() {
    const r = redSlider.value;
    const g = greenSlider.value;
    const b = blueSlider.value;
    
    // 更新RGB值显示
    redValue.textContent = r;
    greenValue.textContent = g;
    blueValue.textContent = b;
    
    // 更新颜色显示背景
    const hexColor = rgbToHex(r, g, b);
    colorDisplay.style.backgroundColor = hexColor;
    colorDisplay.textContent = hexColor;
    
    // 根据颜色亮度调整文本颜色
    const brightness = calculateBrightness(r, g, b);
    colorDisplay.style.color = brightness > 128 ? '#000' : '#fff';
    colorDisplay.style.textShadow = brightness > 128 ? '0 0 5px rgba(0, 0, 0, 0.3)' : '0 0 5px rgba(255, 255, 255, 0.3)';
}

// 处理滑块变化
function handleSliderChange() {
    updateColorDisplay();
}

// 生成随机颜色
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    redSlider.value = r;
    greenSlider.value = g;
    blueSlider.value = b;
    
    updateColorDisplay();
    
    // 保存到历史记录
    saveColorToHistory(rgbToHex(r, g, b));
}

// RGB转HEX
function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// 计算颜色亮度
function calculateBrightness(r, g, b) {
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// 保存颜色到历史记录
function saveColorToHistory(hexColor) {
    // 检查是否已存在于历史记录中
    if (!colorHistoryArray.includes(hexColor)) {
        // 限制历史记录最多20项
        if (colorHistoryArray.length >= 20) {
            colorHistoryArray.shift();
        }
        
        colorHistoryArray.push(hexColor);
        saveToLocalStorage();
        renderColorHistory();
    }
}

// 渲染颜色历史记录
function renderColorHistory() {
    colorHistory.innerHTML = '';
    
    colorHistoryArray.slice().reverse().forEach(color => {
        const colorChip = document.createElement('div');
        colorChip.className = 'color-chip';
        colorChip.style.backgroundColor = color;
        colorChip.setAttribute('data-color', color);
        colorChip.addEventListener('click', () => {
            const hex = color.substring(1);
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            
            redSlider.value = r;
            greenSlider.value = g;
            blueSlider.value = b;
            
            updateColorDisplay();
        });
        
        colorHistory.appendChild(colorChip);
    });
}

// 短链接生成
function shortenUrl() {
    const originalUrl = originalUrlInput.value.trim();
    
    if (!originalUrl) {
        alert('请输入有效的URL');
        return;
    }
    
    // 检查URL格式
    if (!isValidUrl(originalUrl)) {
        alert('请输入有效的URL，包含http://或https://');
        return;
    }
    
    // 在实际项目中，这里应该调用短链接API
    // 由于是演示项目，我们使用模拟的短链接生成
    generateMockShortUrl(originalUrl).then(shortUrl => {
        shortenedUrlInput.value = shortUrl;
        
        // 保存到历史记录
        saveUrlToHistory(originalUrl, shortUrl);
    });
}

// 验证URL格式
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// 模拟生成短链接
// 在实际项目中，应该替换为真实的API调用
function generateMockShortUrl(originalUrl) {
    return new Promise((resolve) => {
        // 简单模拟：使用随机字符串作为短链接
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let shortCode = '';
        
        for (let i = 0; i < 6; i++) {
            shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        // 在真实环境中，这应该是API返回的实际短链接
        const shortUrl = `https://s.link/${shortCode}`;
        
        // 模拟网络延迟
        setTimeout(() => {
            resolve(shortUrl);
        }, 500);
    });
}

// 保存URL到历史记录
function saveUrlToHistory(originalUrl, shortUrl) {
    // 限制历史记录最多10项
    if (urlHistoryArray.length >= 10) {
        urlHistoryArray.shift();
    }
    
    urlHistoryArray.push({
        original: originalUrl,
        short: shortUrl,
        date: new Date().toLocaleString()
    });
    
    saveToLocalStorage();
    renderUrlHistory();
}

// 渲染URL历史记录
function renderUrlHistory() {
    urlHistory.innerHTML = '';
    
    urlHistoryArray.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        
        const originalSpan = document.createElement('span');
        originalSpan.textContent = truncateText(item.original, 30);
        originalSpan.title = item.original;
        
        const shortSpan = document.createElement('span');
        shortSpan.textContent = item.short;
        shortSpan.style.marginLeft = '10px';
        shortSpan.style.cursor = 'pointer';
        shortSpan.title = '点击复制';
        shortSpan.addEventListener('click', () => {
            navigator.clipboard.writeText(item.short)
                .then(() => {
                    shortSpan.textContent = '已复制!';
                    setTimeout(() => {
                        shortSpan.textContent = item.short;
                    }, 1000);
                })
                .catch(err => {
                    console.error('复制失败:', err);
                });
        });
        
        const dateSpan = document.createElement('span');
        dateSpan.textContent = item.date;
        dateSpan.style.fontSize = '0.8rem';
        dateSpan.style.color = '#999';
        
        li.appendChild(originalSpan);
        li.appendChild(shortSpan);
        li.appendChild(dateSpan);
        
        urlHistory.appendChild(li);
    });
}

// 截断文本
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// 复制到剪贴板
function copyToClipboard() {
    const shortUrl = shortenedUrlInput.value;
    
    if (!shortUrl) {
        alert('没有可复制的短链接');
        return;
    }
    
    navigator.clipboard.writeText(shortUrl)
        .then(() => {
            copyUrlBtn.textContent = '已复制!';
            setTimeout(() => {
                copyUrlBtn.textContent = '复制';
            }, 2000);
        })
        .catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制');
        });
}

// 保存到本地存储
function saveToLocalStorage() {
    localStorage.setItem('colorHistory', JSON.stringify(colorHistoryArray));
    localStorage.setItem('urlHistory', JSON.stringify(urlHistoryArray));
}

// 从本地存储加载
function loadFromLocalStorage() {
    const savedColorHistory = localStorage.getItem('colorHistory');
    const savedUrlHistory = localStorage.getItem('urlHistory');
    
    if (savedColorHistory) {
        colorHistoryArray.push(...JSON.parse(savedColorHistory));
    }
    
    if (savedUrlHistory) {
        urlHistoryArray.push(...JSON.parse(savedUrlHistory));
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', init); 