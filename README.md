# TAKE OFF — 个人作品集

一个纯静态的单页作品集网站。深色玻璃质感 + 颗粒纹理 + 金色点缀。

**在线地址:** https://cuiminghao81-spec.github.io/take-off-1-/

---

## 目录结构

```
.
├── index.html        # 页面结构（要改文字就改这里）
├── css/
│   └── styles.css    # 全部样式（配色、字体、间距都在最上面的变量里）
├── js/
│   └── main.js       # 两件小事：导航吸顶 + 元素入场动画
├── .nojekyll         # 告诉 GitHub Pages 不要走 Jekyll 处理
└── README.md
```

没有构建步骤，没有依赖包。改完文件直接刷新浏览器就能看效果。

---

## 本地预览

最简单的方式：直接双击 `index.html`。

如果想让链接、字体等行为跟线上完全一致，起一个本地服务器：

```bash
# 在项目根目录执行，然后访问 http://localhost:8000
python -m http.server 8000
```

---

## 常改的几个地方

### 1. 换成你自己的邮箱

`index.html` 页脚部分：

```html
<a class="footer__mail" href="mailto:hello@example.com">hello@example.com</a>
```

两处 `hello@example.com` 都要改（一处是链接地址，一处是显示文字）。

### 2. 加上社交账号

`index.html` 页脚里有一段被注释掉的社交链接，把 `<!--` 和 `-->` 删掉即可启用：

```html
<ul class="footer__social">
  <li><a href="https://你的主页">站酷</a></li>
  ...
</ul>
```

### 3. 改品牌名

`TAKE OFF` 出现在三个地方：`<title>`、导航栏的 `.nav__brand`、页脚版权。搜索替换即可。

### 4. 改配色

`css/styles.css` 最上面的 `:root` 里：

```css
--bg: #0A0A0C;        /* 背景 */
--text: #EDEDEF;      /* 正文 */
--accent: #E8C268;    /* 金色点缀 */
```

改 `--accent` 一行就能换掉全站的主色。

---

## 部署说明

托管在 GitHub Pages 上，配置为：

- **Source:** `Deploy from a branch`
- **Branch:** `main` / `/ (root)`

也就是说：**往 `main` 分支提交，网站会自动重新发布**，通常几十秒生效。

可以在仓库的 `Settings → Pages` 里查看发布状态和地址。

---

## 技术说明

- 纯 HTML / CSS / JS，无框架、无构建、无第三方依赖
- 字体使用系统字体栈（Windows 用 Segoe UI，macOS 用苹方 / SF），首屏不加载任何外部字体
- 颗粒纹理是内联的 SVG `feTurbulence`，不依赖图片文件
- 动画只使用 `transform` / `opacity`，并遵循系统的「减少动态效果」设置
- 响应式断点：700px（导航展开）、960px（Hero 分栏）
