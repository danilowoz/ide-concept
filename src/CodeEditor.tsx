import React, { useState, useEffect, forwardRef } from "react";
import Prism from "prismjs";
import "./syntax-theme.css";

import { Container, Bar, Textarea, Code } from "./CodeEditorUI";

const CodeEditor: React.FC<{
  data: string;
  barColor?: string;
  innerRef: any;
  onJumpArea: any;
}> = ({ data, innerRef, barColor, onJumpArea }) => {
  const [content, setContent] = useState(data);

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

    const currentPosition = document.activeElement.selectionStart;
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

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <Container>
      {barColor && <Bar style={{ backgroundColor: barColor }} />}
      <Textarea
        ref={innerRef}
        defaultValue={data}
        onChange={(evt) => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Code className="code-output">
        <code className="language-javascript">{content}</code>
      </Code>
    </Container>
  );
};

export default forwardRef<
  any,
  {
    data: string;
    barColor?: string;
    onJumpArea: any;
  }
>(({ data, onJumpArea, ...props }, ref) => (
  <CodeEditor onJumpArea={onJumpArea} data={data} innerRef={ref} {...props} />
));
