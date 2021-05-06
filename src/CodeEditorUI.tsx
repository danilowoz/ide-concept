import styled, { css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const Container = styled.div`
  position: relative;

  margin-left: 44px;
`;

const common = css`
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  line-height: 1.5;
  display: block;

  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;

  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
`;

export const Textarea = styled(TextareaAutosize)`
  ${common};
  width: 100%;
  color: white;
  background: none;
  resize: none;
  -webkit-font-smoothing: antialiased;
  opacity: 0.5;
`;

export const Code = styled.pre`
  ${common};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: none !important;
  pointer-events: none;

  &,
  code {
    margin: 0 !important;
    padding: 0 !important;
  }
`;

export const Bar = styled.div`
  background: #313131;
  width: 20px;
  position: absolute;
  left: -44px;
  top: 0;
  bottom: 0;
  border-radius: 50px;
`;
