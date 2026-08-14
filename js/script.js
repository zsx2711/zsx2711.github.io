// 平滑锚点滚动已由 CSS `scroll-behavior` 处理，这里补充简单的交互示例。

// 显示当前时间
const btn = document.getElementById("btn-time");
const display = document.getElementById("time-display");

btn.addEventListener("click", () => {
  const now = new Date().toLocaleString("zh-CN", {
    hour12: false,
    dateStyle: "full",
    timeStyle: "medium",
  });
  display.textContent = `当前时间：${now}`;
});

// 页脚年份自动更新
document.getElementById("year").textContent = new Date().getFullYear();