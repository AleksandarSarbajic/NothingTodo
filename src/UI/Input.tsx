import styled from "styled-components";

const Input = styled.input`
  border: none;
  background-color: var(--color-grey-750);
  border-radius: var(--border-radius-md);
  padding: 1.4rem;
  box-shadow: var(--shadow-md);
  color: var(--color-grey-100);
  &::placeholder {
    color: var(--color-grey-400);
  }
`;

export default Input;
