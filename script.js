const fallingSpeed = 50;
const imagePath = 'images/snow.svg';
const snowflakesPerDpi = 10;

const html = document.querySelector("html");
const body = document.querySelector("body");
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
const numberOfFlakes = windowWidth / snowflakesPerDpi;
const snowfallDiv = '<div class="snowfall"></div>';
const animation = [];
body.insertAdjacentHTML("afterbegin", snowfallDiv);
const snowfallContainer = document.querySelector(".snowfall");

snowfallContainer.style.height = "100vh";
snowfallContainer.style.overflow = "hidden";

// Создаем стиль и добавляем его к документу
const style = document.createElement("style");
document.head.appendChild(style);

// Получаем объект CSSStyleSheet из созданного стиля
const animationSheet = style.sheet;

const baseSnowflakeClass = `
.snowflake {
  width: 90px;
  height: 86.3px;
  background: url(${ imagePath });
  background-repeat: no-repeat;
  background-size: 300%;
  position: fixed;
  transform: translateX(-100px);
}`;

animationSheet.insertRule(baseSnowflakeClass, animationSheet.cssRules.length);

for (let i = 1; i <= 9; i++) {
  const snowflakeClass = `
    .snowflake${i} {
      background-position: ${calculateBackgroundPosition(i)};
    }`;

  animationSheet.insertRule(snowflakeClass, animationSheet.cssRules.length);
}

function calculateBackgroundPosition(index) {
  const positions = [
    [-3.21, -4.2],
    [49.38, -4.3],
    [101.1, -4.2],
    [-3.21, 49.9],
    [49.38, 49.9],
    [49.38, 49.9],
    [-3.21, 102.9],
    [49.42, 103.27],
    [100.4, 102.9],
  ];
  return positions[index - 1].map(pos => `${pos}%`).join(' ');
}

function createSnowflake(windowWidth, windowHeight) {
  const snowflake = document.createElement("div");
  snowflake.className = `snowflake snowflake${getRandomMinMax(1, 9)}`;
  snowfallContainer.insertAdjacentElement("afterbegin", snowflake);
  const scale = getRandomMinMax(4, 10) / 10;

  const offsetX = getRandomMinMax(-25, windowWidth + 25);
  const animation = `
    @keyframes falling-${snowfallContainer.children.length} {
      0% {
        transform: translate(${offsetX}px, -200px) scale(${scale}) rotate(0deg);
      }
      100% {
        transform: translate(${offsetX + getRandomMinMax(-300, 300)}px, ${
    windowHeight + 200
  }px) scale(${scale}) rotate(${getRandomMinMax(-1080, 1080)}deg);
      }
    }
  `;

  // Добавляем правило @keyframes в CSSStyleSheet
  animationSheet.insertRule(animation, animationSheet.cssRules.length);

  // Добавляем новый класс для снежинки
  const classSnowflake = `
    .snow-${snowfallContainer.children.length} {
      animation: falling-${snowfallContainer.children.length} linear infinite ${getRandomMinMax(
        windowHeight / fallingSpeed * .8,
        windowHeight / fallingSpeed * 1.2
  )}s;
      opacity: ${getRandomMinMax(10, 70) / 100};
      animation-delay: ${getRandomMinMax(0, 600) / 10 }s;
    }
  `;
  animationSheet.insertRule(classSnowflake, animationSheet.cssRules.length);
  snowflake.classList.add(`snow-${snowfallContainer.children.length}`);
}

for (let i = 0; i < numberOfFlakes; i++) {
  createSnowflake(windowWidth, windowHeight);
}

function getRandomMinMax(minVal, maxVal) {
  return Math.round(Math.random() * (maxVal - (minVal - 0.5)) + minVal);
}
