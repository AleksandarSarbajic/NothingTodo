import styled, { css } from "styled-components";

interface HeadingProps {
  as?: string;
}

const StyledHeading = styled.h1<HeadingProps>`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 5.2rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
    `}
    
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;

      text-align: center;
    `}
  font-family: "ndot-47-inspired-by-nothing", sans-serif;
  line-height: 1.1;
  font-weight: 100;
`;

export default StyledHeading;
