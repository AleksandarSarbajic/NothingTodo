import styled from "styled-components";

import ThreeDotsLoading from "./ThreeDotsLoading";
const StyledFullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5rem;
  height: calc(100dvh - 5rem);
  background-color: var(--bg-color);
`;
function SpinnerFullPage() {
  return (
    <StyledFullPage>
      <ThreeDotsLoading />
    </StyledFullPage>
  );
}

export default SpinnerFullPage;
