import { ANGLE, POS } from "./Type";

const tiltContainer = document.querySelector(
  `[layer="tilt-container"]`
) as HTMLElement;
const tiltInner = document.querySelectorAll(`[layer="tilt-inner"]`);

function limitRange(value: number, min: number, max: number) {
  if (value < min) return min;
  else if (value > max) return max;
  return value;
}

function calcRotationAngle(mouse: POS): ANGLE {
  const centerPosX = window.innerWidth / 2;
  const centerPosY = window.innerHeight / 2;
  const mouseToCenterDistanceX = centerPosX - mouse.x;
  const mouseToCenterDistanceY = centerPosY - mouse.y;

  const result: ANGLE = {
    x: limitRange(-mouseToCenterDistanceX / (window.innerWidth / 20), -30, 30),
    y: limitRange(mouseToCenterDistanceY / (window.innerHeight / 20), -30, 30),
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

function isSmp() {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return true;
  } else {
    return false;
  }
}

export default async function () {
  if (!isSmp()) {
    const movementEvent = (pos: POS) => {
      const angle = calcRotationAngle(pos);
      properties.setRotationStyle(angle);
      properties.setTranslateStyle(angle);
    };
    // window.addEventListener("mousemove", (event: MouseEvent) => {
    //   movementEvent({ x: event.clientX, y: event.clientY });
    // });
  }
}
