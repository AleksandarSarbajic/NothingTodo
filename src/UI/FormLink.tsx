import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Box = styled.div<{ $type: string }>`
  text-align: center;
  ${(props) =>
    props.$type === "small" &&
    css`
      margin-top: 1.5rem;
      font-size: 1.6rem;
      &:hover {
        color: var(--color-grey-200);
      }
    `}
  ${(props) =>
    props.$type === "medium" &&
    css`
      margin-top: 1.2rem;
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--color-grey-200);
      &:hover {
        color: var(--color-grey-100);
      }
    `}
`;

Box.defaultProps = {
  $type: "small",
};

const StyledLink = styled(Link)`
  text-decoration: underline var(--color-grey-300);
`;
function FormLink({
  text,
  link,
  linkText,
  type,
}: {
  text: string;
  link: string;
  linkText: string;
  type: string;
}) {
  return (
    <Box $type={type}>
      {text} <StyledLink to={link}>{linkText}</StyledLink>
    </Box>
  );
}

export default FormLink;
