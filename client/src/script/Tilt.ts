import { ANGLE, POS } from "./Type";

const tiltContainer = document.querySelector(
  `[layer="tilt-container"]`
) as HTMLElement;
const tiltInner = document.querySelectorAll(`[layer="tilt-inner"]`);

function calcRotationAngle(mouse: POS): ANGLE {
  const centerPosX = window.innerWidth / 2;
  const centerPosY = window.innerHeight / 2;
  const mouseToCenterDistanceX = centerPosX - mouse.x;
  const mouseToCenterDistanceY = centerPosY - mouse.y;

  const result: ANGLE = {
    x: -mouseToCenterDistanceX / (window.innerWidth / 20),
    y: mouseToCenterDistanceY / (window.innerHeight / 20),
  };

  return result;
}

const properties = {
  setRotationStyle: function (angle: ANGLE) {
    tiltContainer.style.transform = `rotateY(${angle.x}deg) rotateX(${angle.y}deg)`;
  },
  setTranslateStyle: function (angle: ANGLE) {
    for (let i = 0; i < tiltInner.length; i++) {
      const item = tiltInner[i] as HTMLElement;
      item.style.transform = `translate(${angle.x}px, ${-angle.y}px)`;
    }
  },
};

export default function () {
  window.addEventListener("mousemove", (event: MouseEvent) => {
    const angle = calcRotationAngle({ x: event.clientX, y: event.clientY });

    properties.setRotationStyle(angle);
    properties.setTranslateStyle({
      x: angle.x,
      y: angle.y,
    });
  });
}
