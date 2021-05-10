import React from "react";
import styled from "styled-components";

const Button = styled.div`
  background: none;
  border: 0;
  outline: 0;

  position: absolute;
  left: 0;
  bottom: 0;

  width: 20px;
  height: 20px;
  border-radius: 20px;

  display: flex;
  cursor: pointer;
  color: #fff;
  transition: all 0.2s ease;

  svg {
    margin: auto;
  }

  &[aria-expanded="true"],
  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
`;

const BarAdd: React.FC = ({ ...props }) => {
  return (
    <Button {...props}>
      <svg width="7" height="7" viewBox="0 0 7 7" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.11111 3.88889V7H4.11111V3.88889H7V2.88889H4.11111V0H3.11111V2.88889H0V3.88889H3.11111Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
};

export { BarAdd };
