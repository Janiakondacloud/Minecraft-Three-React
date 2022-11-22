import { useEffect, useState } from "react";

const actionByKeyCode = (keyCode: string) => {
  if (keyCode === "KeyW") {
    return "moveForward";
  }
  if (keyCode === "KeyD") {
    return "moveRight";
  }
  if (keyCode === "KeyS") {
    return "moveBackward";
  }
  if (keyCode === "KeyA") {
    return "moveLeft";
  }
  if (keyCode === "Space") {
    return "jump";
  }
  if (keyCode === "Digit1") {
    return "glassTexture";
  }
  if (keyCode === "Digit2") {
    return "logTexture";
  }
  if (keyCode === "Digit3") {
    return "woodTexture";
  }
  if (keyCode === "Digit4") {
    return "dirtTexture";
  }
  if (keyCode === "Digit5") {
    return "grassTexture";
  }
  return "";
};
export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveRight: false,
    moveLeft: false,
    jump: false,
    dirtTexture: false,
    glassTexture: false,
    logTexture: false,
    woodTexture: false,
    grassTexture: false,
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    const action = actionByKeyCode(e.code);
    setActions((prevState) => {
      return {
        ...prevState,
        [action]: true,
      };
    });
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    const action = actionByKeyCode(e.code);
    setActions((prevState) => {
      return {
        ...prevState,
        [action]: false,
      };
    });
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    //自动清理函数
    return function cleanup() {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return actions;
};
