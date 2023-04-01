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
  const inner = element.querySelector(".card-inner") as HTMLHtmlElement;
  const content = element.querySelector(".card-content") as HTMLHtmlElement;
  (element as HTMLElement).addEventListener(
    "mousemove",
    (event: MouseEvent) => {
      const angle = calcRotationAngle({ x: event.clientX, y: event.clientY });
      inner.style.transform = `rotateY(${angle.x}deg) rotateX(${angle.y}deg)`;
      const movePos = calcMoveDirection(angle);
      inner.style.boxShadow = `${movePos.x}px ${-movePos.y}px 24px 2px #555`;
      content.style.transform = `translate(${angle.x}px, ${-angle.y}px)`;
    }
  );
});

document.getElementById("turnOver")?.addEventListener("click", () => {
  (document.querySelector(".card > .front-card") as HTMLElement).classList.add(
    "turn-over-to-back"
  );
  (document.querySelector(".card > .back-card") as HTMLElement).classList.add(
    "turn-over-to-back"
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
