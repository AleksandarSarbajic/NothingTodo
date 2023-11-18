import styled, { css } from "styled-components";

interface HeadingProps {
  as?: string;
  $caps?: boolean;
}

const Heading = styled.h1<HeadingProps>`
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
      font-size: 3.4rem;

      text-align: center;
    `}
    ${(props) =>
    props.$caps &&
    css`
      text-transform: uppercase;
    `}



  font-family: "NDOT 47 (inspired by NOTHING)", sans-serif;
  line-height: 1.1;
  font-weight: 100;
`;

export default Heading;
