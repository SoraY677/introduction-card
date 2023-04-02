import { container } from "./Container";
import { ANGLE, POS } from "./Type";

const tiltContainer = document.querySelector(
  `[layer="tilt-container"]`
) as HTMLElement;
const tiltInner = document.querySelector(`[layer="tilt-inner"]`) as HTMLElement;

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
  setShadowStyle: function (pos: POS) {
    tiltContainer.style.boxShadow = `${pos.x}px ${pos.y}px 24px 2px #555`;
  },
  setTranslateStyle: function (angle: ANGLE) {
    tiltInner.style.transform = `translate(${angle.x}px, ${-angle.y}px)`;
  },
};

export default function () {
  container.addEventListener("mousemove", (event: MouseEvent) => {
    const angle = calcRotationAngle({ x: event.clientX, y: event.clientY });

    properties.setRotationStyle(angle);
    properties.setShadowStyle({
      x: angle.x,
      y: -angle.y,
    });
    properties.setTranslateStyle({
      x: angle.x,
      y: -angle.y,
    });
  });
}

properties.setShadowStyle({
  x: 0,
  y: 0,
});
