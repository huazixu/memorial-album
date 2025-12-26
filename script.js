// 获取元素
const cover = document.getElementById("cover");
const gallery = document.getElementById("gallery");
const bgm = document.getElementById("bgm");
const fullscreen = document.getElementById("fullscreen");
const fullscreenImg = fullscreen.querySelector("img");
const caption = fullscreen.querySelector(".photo-caption");
const existingImages = gallery.querySelectorAll("img");

// 点击封面进入相册
cover.addEventListener("click", () => {
  cover.style.transition = "opacity 0.8s";
  cover.style.opacity = 0;
  setTimeout(() => {
    cover.style.display = "none";      // 隐藏封面
    gallery.style.display = "grid";     // 显示相册
    if (bgm) bgm.play().catch(() => {}); // 播放背景音乐
  }, 800);
});

existingImages.forEach(img => {
  img.addEventListener("click", () => {
    fullscreen.style.display = "flex";
    fullscreenImg.src = img.src;
    caption.textContent = '';
  });
});

// 点击全屏任意位置关闭全屏
fullscreen.addEventListener("click", () => {
  fullscreen.style.display = "none";
});

// 可选：键盘 ESC 键关闭全屏
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && fullscreen.style.display === "flex") {
    fullscreen.style.display = "none";
  }
});


/* 插入位置：script.js 全屏功能相关代码之后 */
let touchStartX = 0;
fullscreen.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
});

fullscreen.addEventListener("touchend", e => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchEndX - touchStartX;
  const images = Array.from(gallery.querySelectorAll("img"));
  let currentIndex = images.findIndex(img => img.src === fullscreenImg.src);

  if (diff > 50) { // 向右滑，上一张
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    fullscreenImg.src = images[currentIndex].src;
  } else if (diff < -50) { // 向左滑，下一张
    currentIndex = (currentIndex + 1) % images.length;
    fullscreenImg.src = images[currentIndex].src;
  }
});


