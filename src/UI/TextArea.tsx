import styled from "styled-components";

const TextArea = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  min-height: 15rem;
  height: 15rem;
  max-height: 20rem;
  border: none;
  background-color: var(--color-grey-700);
  border-radius: var(--border-radius-md);
  padding: 1.4rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-100);
  &::placeholder {
    color: var(--color-grey-400);
  }
`;

export default TextArea;
