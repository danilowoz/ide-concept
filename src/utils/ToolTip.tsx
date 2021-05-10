import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const showUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-5px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const StyledContent = styled(DropdownMenu.Content)`
  min-width: 130px;
  border-radius: 16px;
  padding: 6px;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2), 0px 20px 30px rgba(0, 0, 0, 0.3),
    0px 0px 1px rgba(0, 0, 0, 0.7);

  animation: ${showUp} 0.3s ease;
`;

const StyledItem = styled(DropdownMenu.Item)`
  cursor: default;
  letter-spacing: 0.1px;
  font-family: sans-serif;
  border: 0;
  outline: 0;
  background: none;
  text-align: left;
  cursor: pointer;

  font-size: 13px;
  transition: all 0.2s ease;
  display: flex;

  &:focus .box:first-child {
    color: rgba(255, 255, 255, 1);
    outline: none;
    background: rgba(0, 0, 0, 0.1);
  }

  .box {
    transition: all 0.2s ease;
    color: rgba(255, 255, 255, 0.5);
    padding: 10px 10px;
    border-radius: 10px;
    display: inline-block;
    flex: 1;

    &:hover {
      color: rgba(255, 255, 255, 1);
      outline: none;
      background: rgba(0, 0, 0, 0.1);
    }

    &:last-child {
      padding-left: 0;
      padding-right: 0;
      text-align: center;
      min-width: 35px;
      max-width: 35px;
      margin-left: 3px;
    }
  }
`;

const StyledArrow = styled(DropdownMenu.Arrow)`
  left: -25px;
  position: relative;
`;

const ToolTip: React.FC<{
  trigger: any;
  backgroundColor: string;
  items?: { title: string; documentation: string; template: string }[];
  onSelect: (template: string) => void;
  triggerRef: any;
}> = ({ trigger, triggerRef, backgroundColor, items = [], onSelect }) => {
  const Trigger = trigger;
  const [localClick, setLocalClick] = useState("main");

  return (
    <DropdownMenu.Root>
      <Trigger
        as={(asProps: any) => (
          <DropdownMenu.Trigger
            className="add-button"
            ref={triggerRef}
            {...asProps}
          />
        )}
      />
      <StyledContent
        align={"start"}
        alignOffset={-19}
        style={{ backgroundColor }}
      >
        {items.map((item) => {
          const handle = () => {
            if (localClick === "doc") {
              return window.open(item.documentation);
            }

            onSelect(item.template);
          };

          return (
            <StyledItem key={item.title} onSelect={handle}>
              <span onMouseEnter={() => setLocalClick("main")} className="box">
                {item.title}
              </span>

              {item.documentation && (
                <span
                  onMouseEnter={() => setLocalClick("doc")}
                  onMouseLeave={() => setLocalClick("main")}
                  className="box"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path
                      d="M6.75 5H6.25C6.1837 5 6.12011 5.02634 6.07322 5.07322C6.02634 5.12011 6 5.1837 6 5.25V7H1V2H3.25C3.3163 2 3.37989 1.97366 3.42678 1.92678C3.47366 1.87989 3.5 1.8163 3.5 1.75V1.25C3.5 1.1837 3.47366 1.12011 3.42678 1.07322C3.37989 1.02634 3.3163 1 3.25 1H0.75C0.551088 1 0.360322 1.07902 0.21967 1.21967C0.0790176 1.36032 0 1.55109 0 1.75L0 7.25C0 7.44891 0.0790176 7.63968 0.21967 7.78033C0.360322 7.92098 0.551088 8 0.75 8H6.25C6.44891 8 6.63968 7.92098 6.78033 7.78033C6.92098 7.63968 7 7.44891 7 7.25V5.25C7 5.1837 6.97366 5.12011 6.92678 5.07322C6.87989 5.02634 6.8163 5 6.75 5ZM7.625 0H5.625C5.29109 0 5.12422 0.404844 5.35938 0.640625L5.91766 1.19891L2.10938 5.00578C2.07441 5.04062 2.04668 5.08202 2.02775 5.1276C2.00882 5.17318 1.99908 5.22205 1.99908 5.27141C1.99908 5.32076 2.00882 5.36963 2.02775 5.41521C2.04668 5.46079 2.07441 5.50219 2.10938 5.53703L2.46359 5.89062C2.49843 5.92558 2.53983 5.95332 2.58541 5.97225C2.63099 5.99118 2.67986 6.00092 2.72922 6.00092C2.77857 6.00092 2.82744 5.99118 2.87303 5.97225C2.91861 5.95332 2.96 5.92558 2.99484 5.89062L6.80125 2.08313L7.35938 2.64062C7.59375 2.875 8 2.71094 8 2.375V0.375C8 0.275544 7.96049 0.180161 7.89016 0.109835C7.81984 0.0395088 7.72446 0 7.625 0V0Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              )}
            </StyledItem>
          );
        })}
        <StyledArrow style={{ fill: backgroundColor }} />
      </StyledContent>
    </DropdownMenu.Root>
  );
};

export default ToolTip;
