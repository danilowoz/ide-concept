import React, { useState, useEffect, forwardRef, useRef } from "react";
import Prism from "prismjs";
import "./syntax-theme.css";
import { useHotkeys } from "react-hotkeys-hook";

import { useCombinedRefs } from "./utils/helpers";
import { Container, Textarea, Code } from "./CodeEditorUI";
import { SideBar } from "./utils/SideBar";

function CodeEditor({
  data,
  innerRef,
  barColor,
  onJumpArea,
  menuActions,
  type
}: {
  innerRef: any;
  data: string;
  barColor?: string;
  onJumpArea: any;
  menuActions?: any[];
  type: "empty" | "state" | "effect";
}) {
  const textareaRef = useRef(innerRef);
  const buttonRef = useRef<HTMLButtonElement>();
  const [content, setContent] = useState(data);

  const combinedRef = useCombinedRefs(textareaRef, innerRef);

  const keyBingds = {
    state: "ctrl+s",
    effect: "ctrl+e",
    empty: ""
  };

  useHotkeys(keyBingds[type], () => {
    const event = new MouseEvent("mousedown", {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: 0,
      screenY: 0
    });

    buttonRef.current?.dispatchEvent(event);
  });

  const handleKeyDown = (evt: any) => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent(value);
    }

    const ARROW_DOWN = 40;
    const ARROW_UP = 38;

    const currentPosition = document.activeElement?.selectionStart;
    const lastRow = value
      .split(/\n/)
      .filter((e, index, array) => index + 1 !== array.length)
      .join("\n").length;

    if (currentPosition >= lastRow && evt.keyCode === ARROW_DOWN) {
      onJumpArea(evt.keyCode);
    } else if (
      currentPosition <= value.split(/\n/)[0].length &&
      evt.keyCode === ARROW_UP
    ) {
      onJumpArea(evt.keyCode);
    }
  };

  const onSelect = (template: string) => {
    setContent((prev) => {
      const removeLastEmptyRow = prev
        .split(/\n/)
        .filter(
          (e, index, array) => index + 1 !== array.length && e.trim() !== ""
        )
        .join("\n");

      return `${type === "state" ? removeLastEmptyRow : prev}
  ${template}
`;
    });

    combinedRef.current?.focus();
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <Container>
      {barColor && (
        <SideBar
          barColor={barColor}
          menuActions={menuActions}
          triggerRef={buttonRef}
          onSelect={onSelect}
        />
      )}

      <Textarea
        ref={combinedRef}
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Code className="code-output">
        <code className="language-javascript">{content}</code>
      </Code>
    </Container>
  );
}

export default forwardRef<
  any,
  {
    data: string;
    barColor?: string;
    onJumpArea: any;
    menuActions?: any[];
    type: "empty" | "state" | "effect";
  }
>(({ data, onJumpArea, ...props }, ref) => (
  <CodeEditor onJumpArea={onJumpArea} data={data} innerRef={ref} {...props} />
));
