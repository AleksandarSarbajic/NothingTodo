import styled, { css } from "styled-components";
import { HiPlus } from "react-icons/hi2";
interface Button {
  $type: string;
}

const StyledButton = styled.button<Button>`
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
`;

function Button() {
  return (
    <StyledButton $type="add">
      <HiPlus />
    </StyledButton>
  );
}

export default Button;
