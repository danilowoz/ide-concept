import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Button = styled(motion.button)`
  background: none;
  border: 0;
  outline: 0;

  width: 20px;
  height: 20px;
  border-radius: 20px;
  opacity: 0.4;

  display: flex;

  cursor: pointer;

  svg {
    margin: auto;
  }

  transition: all 0.2s ease;

  &[aria-expanded="true"],
  &:hover {
    color: #fff;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const BarAdd: React.FC = ({ ...props }) => {
  return (
    <Button className="add-button" {...props}>
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
