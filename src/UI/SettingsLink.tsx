import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: 500;
`;

function SettingsLink({ link, text }: { link: string; text: string }) {
  return <StyledLink to={link}>{text}</StyledLink>;
}

export default SettingsLink;
