import styled, { css } from "styled-components";
interface Style {
  $use?: string;
}
const StyledHeader = styled.header<Style>`
  ${(props) =>
    props.$use === "list" &&
    css`
      margin: 4rem 0;
    `}
`;

export default StyledHeader;
