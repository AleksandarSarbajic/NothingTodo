import styled, { css } from "styled-components";

const LineThru = styled.div<{ $margin: string }>`
  width: 140%;
  height: 1px;

  text-align: center;
  background: var(--color-grey-300);
  ${(props) =>
    props.$margin === "form" &&
    css`
      margin: 4.4rem 0 2rem 0;
    `}
  margin-left: -10rem;
`;

export default LineThru;
