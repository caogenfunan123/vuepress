module.exports = {
  title: "VuePress 博客",
  description: "使用 VuePress 搭建的静态博客",
  base: "/",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/posts/hello.html" }
    ],
    sidebar: [
      {
        title: "文章",
        collapsable: false,
        children: ["/posts/hello.md"]
      }
    ]
  }
};
