import { useRef } from "react";

const ARROW_DOWN = 40;
const ARROW_UP = 38;

const useNavRef = () => {
  const refs = useRef(new Map());

  const setRef = ({
    index,
    ref
  }: {
    index: number;
    ref: HTMLTextAreaElement;
  }) => {
    refs.current.set(index, ref);
  };

  const onJumpArea = (index: number) => (event: number) => {
    if (event === ARROW_DOWN) {
      refs.current.get(index + 1)?.focus();
    } else if (event === ARROW_UP) {
      refs.current.get(index - 1)?.focus();
    }
  };

  return { setRef, onJumpArea };
};

export { useNavRef };
