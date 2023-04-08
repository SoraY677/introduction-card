const MODE_FRONT = 1;
const MODE_BACK = -1;
let mode: -1 | 1 = MODE_FRONT;

const frontSurface = document.querySelector(
  `[layer="front-turn-over"]`
) as HTMLElement;
const backSurface = document.querySelector(
  `[layer="back-turn-over"]`
) as HTMLElement;

const turnOverButtons = document.querySelectorAll(`[turn-over-trigger]`);

let angle = 0;
function turnOver() {
  angle += 180;
  frontSurface.style.transform = `rotateY(${angle}deg)`;
  frontSurface.style.opacity = `1`;
  backSurface.style.transform = `rotateY(${angle + 180}deg)`;
  backSurface.style.opacity = `1`;
  mode *= -1;
}

export default function () {
  turnOverButtons.forEach((element) => {
    element.addEventListener("click", () => {
      turnOver();
    });
  });
}

window.onload = () => {
  const duration = `1.2s`;
  frontSurface.style.transitionDuration = duration;
  backSurface.style.transitionDuration = duration;

  frontSurface.ontransitionend = () => {
    frontSurface.style.opacity = `${mode}`;
  };
  backSurface.ontransitionend = () => {
    backSurface.style.opacity = `${-mode}`;
  };
};
