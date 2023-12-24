import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled, { keyframes } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { ChildrenProps } from "../types/ChildrenType";

interface Position {
  x: number;
  y: number;
}

interface ListPostion {
  $position: Position | null;
}

interface MenusProps {
  openId: string | number;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string | number>>;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
}

interface IdProps extends ChildrenProps {
  id: string | number;
  icon?: React.ReactElement;
  text?: React.ReactElement;
}

interface ButtonProps extends ChildrenProps {
  icon: React.ReactElement;
  onClick?: () => void;
  disabled?: boolean;
}

const ShowUp = keyframes`
0%{
opacity: 0;
transform: scale(0.95);
}
50%{
  opacity: 1;
  
}
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  & svg {
    width: 3.6rem;
    height: 3.6rem;
    color: var(--color-grey-200);
  }
`;

const StyledList = styled.ul<ListPostion>`
  max-width: 100%;
  position: fixed;

  background-color: var(--color-grey-750);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-sm);
  animation: ${ShowUp} 0.3s;

  right: ${(props) => props.$position?.x ?? 0}px;
  top: ${(props) => props.$position?.y ?? 0}px;
  z-index: 9999999999999999999999999;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;

  padding: 1.4rem 2.4rem;
  font-size: 1.8rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-black-200);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-200);
    transition: all 0.3s;
  }
`;

const CustomIcon = styled.span`
  & svg {
    color: var(--color-grey-600);
  }
`;

const MenusContext = createContext({} as MenusProps);

function Menus({ children }: ChildrenProps) {
  const [openId, setOpenId] = useState<string | number>("");
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, icon, text }: IdProps) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const buttonElement = e.currentTarget as HTMLButtonElement;
    const rect = buttonElement.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + 2,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      {icon ? (
        <CustomIcon>{icon}</CustomIcon>
      ) : text ? (
        ""
      ) : (
        <HiEllipsisVertical />
      )}
      {text}
    </StyledToggle>
  );
}

function List({ id, children }: IdProps) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled = false }: ButtonProps) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

interface CloseMenusHook {
  close: () => void;
}

export function useCloseMenus(): CloseMenusHook {
  const { close } = useContext(MenusContext);

  return { close };
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
