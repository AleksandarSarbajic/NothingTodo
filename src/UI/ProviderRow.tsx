import styled from "styled-components";
import ProviderItem from "./ProviderItem";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
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
      <ProviderItem icon={<FaLinkedin />} provider="linkedin" />
    </StyledProviderRow>
  );
}

export default ProviderRow;
