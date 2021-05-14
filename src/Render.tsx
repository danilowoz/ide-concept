import React, { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import styled from "styled-components";
import { Bar } from "./AppUI";
import ToolTip from "./utils/ToolTip";
import * as actions from "./actions";

const CustomBar = styled(Bar)`
  user-select: none;
  background-color: #552525;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0;
  border: none;
  padding: 0;

  div {
    background: none;
    border: 0;
    display: flex;

    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);

    transition: all 0.2s ease;
    opacity: 0;
  }

  &[aria-expanded="true"] div,
  &:hover div {
    opacity: 1;
  }

  svg {
    margin: auto;
    color: #fff;
  }
`;

export const SorterBar: React.FC<{ onSelect: any }> = ({
  onSelect,
  ...props
}) => {
  const [command, setCommand] = useState<"drag" | "edit">("drag");

  const timer = useRef<number | undefined>();

  useHotkeys(
    "⌘+*",
    () => {
      setCommand("edit");

      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        setCommand("drag");
      }, 3000);
    },
    [command]
  );

  if (command === "drag") {
    return (
      <CustomBar style={{ cursor: "move" }} {...props}>
        <div>
          <svg height="15" width="15" version="1.1" viewBox="0 0 512 512">
            <g fill="currentColor">
              <path d="M432 354H80V370H432V354Z" fill="white" />
              <path d="M432 248H80V264H432V248Z" fill="white" />
              <path d="M432 142H80V158H432V142Z" fill="white" />
            </g>
          </svg>
        </div>
      </CustomBar>
    );
  }

  return (
    <ToolTip
      items={actions.renderItem}
      backgroundColor={"#552525"}
      onSelect={onSelect}
      trigger={(props: any) => (
        <CustomBar style={{ cursor: "pointer" }} {...props}>
          <div>
            <svg width="12" height="12" viewBox="0 0 9 9" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.681437 8.10576L3.12222 7.45176L1.33544 5.66498L0.681437 8.10576ZM6.61303 0.612791L1.90321 5.32261L3.31743 6.73682L8.02725 2.027L6.61303 0.612791Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </CustomBar>
      )}
    />
  );
};

export const Render = styled.div`
  position: relative;
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
