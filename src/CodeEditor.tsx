import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "./syntax-theme.css";

import { Container, Bar, Textarea, Code } from "./CodeEditorUI";

const CodeEditor: React.FC<{ data: string; barColor?: string }> = ({
  data,
  barColor
}) => {
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
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <Container>
      {barColor && <Bar style={{ backgroundColor: barColor }} />}
      <Textarea
        className="code-input"
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Code className="code-output">
        <code className="language-javascript">{content}</code>
      </Code>
    </Container>
  );
};

export default CodeEditor;
