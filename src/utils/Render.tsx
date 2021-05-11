import styled from "styled-components";

export const Render = styled.div`
  &:hover {
    .handle-bar {
      opacity: 1;
    }
  }

  .handle-bar {
    transition: all 0.2s ease;
    opacity: 0.6;
  }

  > *:first-child .handle-bar {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  > *:last-child .handle-bar {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;
