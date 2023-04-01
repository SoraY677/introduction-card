import "./style.scss";

type POS = {
  x: number;
  y: number;
};
type ANGLE = {
  x: number;
  y: number;
};

document.querySelectorAll(".card").forEach((el) => {
  const element = el as HTMLElement;
  const content = element.querySelector(".card-content") as HTMLHtmlElement;
  (element as HTMLElement).addEventListener(
    "mousemove",
    (event: MouseEvent) => {
      const angle = calcRotationAngle({ x: event.clientX, y: event.clientY });
      element.style.transform = `rotateY(${angle.x}deg) rotateX(${angle.y}deg)`;
      const movePos = calcMoveDirection(angle);
      element.style.boxShadow = `${movePos.x}px ${-movePos.y}px 24px 2px #000`;
      content.style.transform = `translate(${angle.x}px, ${-angle.y}px)`;
    }
  );
});

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

function calcMoveDirection(angle: ANGLE): POS {
  const result: POS = {
    x: angle.x,
    y: angle.y,
  };
  return result;
}
