const { description } = require("../../package");

module.exports = {
  title: "Dev.ian",
  description: "log for me",
  head: [
    ["meta", { name: "theme-color", content: "#cccccc" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  base: "/",
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: "StudyLog",
        link: "/studylog/",
      },
      {
        text: "Blog",
        link: "/blog/",
      },
      {
        text: "Github",
        link: "https://github.com/Leeks123",
      },
      
    ],
    sidebar: {
      "/blog/":[
        {
          title: 'test1',
          path:'test'
        },
        {
          title: 'test2',
          path:'test2'
        }
      ],
      "/studylog/": [
        {
          title: 'JavaScript',
          children: [
            "/studylog/js/Engine",
            "/studylog/js/EventLoop",
            "/studylog/js/ExecutionContext",
            "/studylog/js/Scope",
            // "/studylog/js/Hoisting",
            // "/studylog/js/Closure",
            // "/studylog/js/FunctionAndThis",
          ]
        }
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top", 
    "@vuepress/plugin-medium-zoom",
    ["sitemap", { hostname: "https://leeks123.github.io/" }],
    '@vuepress/last-updated'
  ],
};
