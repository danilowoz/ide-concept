import React from "react";
import ToolTip from "./ToolTip";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { BarAdd } from "./buttons/BarAdd";
import styled, { css } from "styled-components";

export const Bar = styled(motion.div)`
  background: #313131;
  width: 20px;
  position: absolute;
  left: -44px;
  top: 0;
  bottom: 0;
  border-radius: 50px;

  opacity: 0.6;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;

    .add-button {
      color: #fff;
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
`;

const SideBar: React.FC<{
  onSelect: any;
  barColor: string;
  triggerRef: any;
  menuActions?: any[];
}> = ({ onSelect, barColor, menuActions, triggerRef }) => {
  const [[width, height], setTouchableSize] = React.useState([0, 0]);
  const measuredRef = React.useCallback((node) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      setTouchableSize([rect.width, rect.height]);
    }
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const moveTop = useTransform(my, [0, height / 2, height], [-3, 0, 3]);
  const moveLeft = useTransform(mx, [0, width / 2, width], [-3, 0, 3]);
  const contentMoveTop = useTransform(
    my,
    [0, height / 2, height],
    [-10, 0, 10]
  );
  const contentMoveLeft = useTransform(mx, [0, width / 2, width], [-1, 0, 1]);

  const contentVariants = {
    blur: { scale: 1 },
    hover: { scale: 1.1 }
  };

  return (
    <Bar
      style={{ backgroundColor: barColor }}
      ref={measuredRef}
      onMouseMove={(e) => {
        const { offsetTop, offsetLeft } = e.currentTarget;
        mx.set(e.clientX - offsetLeft);
        my.set(e.clientY - offsetTop);
      }}
      whileHover={"hover"}
    >
      {/* <ToolTip
        items={menuActions}
        backgroundColor={barColor}
        onSelect={onSelect}
        // trigger={(props: any) => (

        // )}
        triggerRef={triggerRef}
      /> */}

      <BarAdd
        style={{
          translateY: contentMoveTop,
          translateX: contentMoveLeft
        }}
        variants={contentVariants}
        className="add-button"
      />
    </Bar>
  );
};

export { SideBar };
