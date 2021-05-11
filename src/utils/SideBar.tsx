import React from "react";
import ToolTip from "./ToolTip";
import { BarAdd } from "./BarAdd";
import styled from "styled-components";

export const Bar = styled.div`
  background: #313131;
  width: 20px;
  position: absolute;
  left: -44px;
  top: 0;
  bottom: 0;
  border-radius: 50px;

  opacity: 1;
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
  type?: "empty" | "state" | "effect" | "render";
}> = ({ onSelect, barColor, menuActions, triggerRef, type }) => {
  return (
    <Bar className="handle-bar" style={{ backgroundColor: barColor }}>
      {type !== "empty" && (
        <ToolTip
          items={menuActions}
          backgroundColor={barColor}
          onSelect={onSelect}
          trigger={(props: any) => <BarAdd className="add-button" {...props} />}
          triggerRef={triggerRef}
        />
      )}
    </Bar>
  );
};

export { SideBar };
