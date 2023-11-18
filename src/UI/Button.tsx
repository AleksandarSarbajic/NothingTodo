import styled, { css } from "styled-components";

interface Style {
  $type: string;
}

interface Button {
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
    `}
`;

function Button({ type = "add", children }: Button) {
  return <StyledButton $type={type}>{children}</StyledButton>;
}

export default Button;
