import styled, { css } from "styled-components";

interface Style {
  $primary: string;
  $secondary?: string;
  $cased?: boolean;
}

interface Button {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  secondary?: string;
  disabled?: boolean;
  children: React.ReactNode;
  primary?: string;
  cased?: boolean;
}

const StyledButton = styled.button<Style>`
  ${(props) =>
    props.$primary === "add" &&
    css`
      position: fixed;
      bottom: 4%;
      right: 5.5%;
      background-color: var(--color-red-100);
      padding: 2.4rem;
      border-radius: var(--border-radius-md--2);
      color: var(--color-grey-100);
      svg {
        width: 3.6rem;
        height: 3.6rem;
      }
    `}
  ${(props) =>
    props.$primary === "form" &&
    css`
      font-size: 2rem;
      padding: 2.2rem;
      font-weight: 600;
      background-color: var(--color-red-100);
      border-radius: 3rem;
      color: var(--color-grey-100);
      height: 7.5rem;
      &:hover {
        background-color: var(--color-red-50);
      }
    `}
  ${(props) =>
    props.$primary === "modal" &&
    css`
      font-weight: 600;
      background-color: var(--color-grey-700);
      padding: 1.2rem 1.8rem;
      border-radius: var(--border-radius-md);
      color: var(--color-grey-100);
      border: 1px solid transparent;

      &:hover {
        background-color: var(--color-grey-600);
      }
    `}

  ${(props) =>
    props.$secondary === "modalRed" &&
    css`
      background-color: var(--color-red-100);
      &:hover {
        background-color: var(--color-red-50);
      }
      &:disabled {
        background-color: var(--color-black-200);
        color: var(--color-grey-600);
        border: 1px solid var(--color-grey-700);
      }
    `}
  ${(props) =>
    props.$cased &&
    css`
      text-transform: uppercase;
    `}
`;

function Button({
  children,
  onClick,
  type = "button",
  secondary,
  disabled,
  primary = "add",
  cased = false,
}: Button) {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      $primary={primary}
      $secondary={secondary}
      $cased={cased}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
