import { Outlet } from "react-router-dom";

import styled from "styled-components";
import { useShowToastOnSuccess } from "../hooks/useShowToastOnSucsses";

const Main = styled.main`
  background-color: var(--bg-color);
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function AppLayout() {
  useShowToastOnSuccess();

  return (
    <Main>
      <Container>
        <Outlet />
      </Container>
    </Main>
  );
}

export default AppLayout;
