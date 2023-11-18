import styled, { css } from "styled-components";

interface Style {
  type?: string;
}

const Form = styled.form<Style>`
  ${(props) =>
    props.type === "regular" &&
    css`
      justify-self: center;

      width: 100%;
      padding: 2.4rem 4rem;
      max-width: 55rem;
      /* Box */
      background-color: var(--color-black-100);
      /* border: 1px solid var(--color-grey-100); */
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
