import styled from "styled-components";

export const Editor = styled.div`
  background: #1a1d1f;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px 0;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2), 0px 20px 30px rgba(0, 0, 0, 0.3),
    0px 0px 1px rgba(0, 0, 0, 0.7);
  min-width: 600px;
  width: max-content;
  margin: 10em auto 0;
  position: relative;
`;

export const Bar = styled.div`
  background: #313131;
  width: 20px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
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
