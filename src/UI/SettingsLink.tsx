import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: 500;
  padding: 1rem;
  border-radius: var(--border-radius-md);
  margin-left: -1rem;
  &:hover {
    color: var(--color-red-100);
    background-color: var(--line-color);
  }
`;

function SettingsLink({ link, text }: { link: string; text: string }) {
  return <StyledLink to={link}>{text}</StyledLink>;
}

export default SettingsLink;
