import styled, { css } from "styled-components";

interface HeadingProps {
  as?: string;
  $caps?: boolean;
  $create?: boolean;
  $margin?: number;
}

const Heading = styled.h1<HeadingProps>`
  font-family: "NDOT 47 (inspired by NOTHING)", sans-serif;
  line-height: 1.1;
  font-weight: 100;
  color: #e6e6e6;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 5.2rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 6rem;
      line-height: 1.2;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 3rem;
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

    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 2.4rem;
    `}
    ${(props) =>
    props.$caps &&
    css`
      text-transform: uppercase;
    `}

    ${(props) =>
    props.$create &&
    css`
      flex: 1 1 0%;
      text-align: center;
    `}

    margin-bottom: ${(props) => props.$margin}rem;
`;

export default Heading;
