const fs = require("fs");
const path = require("path");

// 自动从 docs/posts/ 目录读取所有 Markdown 文章，生成侧边栏配置
function getPostSidebar() {
  const postsDir = path.resolve(__dirname, "../posts");
  if (!fs.existsSync(postsDir)) {
    return [];
  }
  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .sort()
    .reverse(); // 最新的在前

  return files.map((f) => {
    const content = fs.readFileSync(path.join(postsDir, f), "utf-8");
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    const title = titleMatch
      ? titleMatch[1].replace(/['"]/g, "").trim()
      : f.replace(".md", "");
    // VuePress 侧边栏使用不带扩展名的路径
    return [`/posts/${f.replace(".md", "")}`, title];
  });
}

module.exports = {
  title: "VuePress 博客",
  description: "使用 VuePress 搭建的静态博客",
  base: "/",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/posts/" },
    ],
    sidebar: {
      "/posts/": [
        {
          title: "文章列表",
          collapsable: false,
          children: getPostSidebar(),
        },
      ],
    },
  },
};
