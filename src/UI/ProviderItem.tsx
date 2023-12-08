import styled from "styled-components";
import { useOuthLogin } from "../features/Auth/useOuthLogin";
import { Provider } from "@supabase/supabase-js";

const StyledProviderItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black-50);
  padding: 1rem 0.5rem;
  border-radius: 5px;
  transition: all 0.3s;
  border: 1px solid var(--color-grey-750);
  &:hover {
    background-color: var(--color-grey-750);
  }
`;
const StyledIconBox = styled.div`
  & svg {
    width: 3rem;
    height: 3rem;
  }
`;
function ProviderItem({
  icon,
  provider,
}: {
  icon: React.ReactElement;
  provider: string;
}) {
  const { login, isPending } = useOuthLogin();

  function onOuthLoginHandler() {
    const convertedProvider: Provider = provider as Provider; // Convert the
    login(convertedProvider);
  }
  return (
    <StyledProviderItem
      type="button"
      onClick={onOuthLoginHandler}
      disabled={isPending}
    >
      <StyledIconBox>{icon}</StyledIconBox>
    </StyledProviderItem>
  );
}

export default ProviderItem;
