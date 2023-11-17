import { Outlet } from "react-router-dom";

import styled from "styled-components";

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: 26rem 1fr;
//   grid-template-rows: auto 1fr;
//   height: 100vh;
// `;

const Main = styled.main`
  background-color: #151515ff;
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function AppLayout() {
  return (
    <>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </>
  );
}

export default AppLayout;
