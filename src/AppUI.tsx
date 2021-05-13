import styled from "styled-components";

export const Body = styled.div`
  margin: auto;
`;

export const Editor = styled.div`
  background: #1a1d1f;
  border-radius: 10px;
  padding: 20px 0;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2), 0px 20px 30px rgba(0, 0, 0, 0.3),
    0px 0px 1px rgba(0, 0, 0, 0.7);
  min-width: 600px;
  width: max-content;
  margin: auto;
  position: relative;
`;

export const Bar = styled.div.attrs({ className: "handle-bar" })`
  background: #313131;
  width: 20px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const LineCounter = styled.div`
  position: absolute;
  left: 26px;
  top: 20px;
  bottom: 20px;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  overflow: hidden;

  span {
    line-height: 24.8px;
    display: block;
  }
`;

export const Filename = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 7px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 8px;
  letter-spacing: 0.2px;
`;
