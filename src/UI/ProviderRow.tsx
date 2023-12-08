import styled from "styled-components";
import ProviderItem from "./ProviderItem";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const StyledProviderRow = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 1rem;
`;

function ProviderRow() {
  return (
    <StyledProviderRow>
      <ProviderItem icon={<FcGoogle />} provider="google" />
      <ProviderItem icon={<FaGithub />} provider="github" />
      <ProviderItem icon={<FaXTwitter />} provider="twitter" />
    </StyledProviderRow>
  );
}

export default ProviderRow;
