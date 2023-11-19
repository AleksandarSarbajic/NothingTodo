import styled, { css } from "styled-components";

interface Style {
  $type: string;
}

interface Button {
  onClick?: () => void;
  type?: string;
  children: React.ReactNode;
}

const StyledButton = styled.button<Style>`
  ${(props) =>
    props.$type === "add" &&
    css`
      position: fixed;
      bottom: 4%;
      right: 5.5%;
      background-color: var(--color-red-100);
      padding: 2.4rem;
      border-radius: var(--border-radius-md--2);
      color: #fff;
      ,
      svg {
        width: 3.6rem;
        height: 3.6rem;
      }
    `}
  ${(props) =>
    props.$type === "form" &&
    css`
      font-size: 2rem;
      text-transform: uppercase;
      padding: 2.2rem;
      font-weight: 600;
      background-color: var(--color-red-100);
      border-radius: 3rem;
      color: #fff;
      height: 7.5rem;

      &:hover {
        background-color: var(--color-red-50);
      }
    `}
`;

function Button({ onClick, type = "add", children }: Button) {
  return (
    <StyledButton onClick={onClick} $type={type}>
      {children}
    </StyledButton>
  );
}

export default Button;
