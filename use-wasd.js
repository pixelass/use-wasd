import { useState, useEffect } from "react";

export default function useWASD(initialValue) {
  const [keyboard, setKeyboard] = useState(initialValue ? initialValue : {});

  useEffect(() => {
    function handleKeyUp(event) {
      handleKey(event, false);
    }

    function handleKeyDown(event) {
      handleKey(event, true);
    }

    function handleKey(event, bool) {
      const pressedKey = event.key.toLowerCase();
      if (event.keyCode === 32) {
        setKeyboard({ ...keyboard, space: bool });
      } else {
        setKeyboard({ ...keyboard, [pressedKey]: bool });
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyboard]);

  return keyboard;
}
