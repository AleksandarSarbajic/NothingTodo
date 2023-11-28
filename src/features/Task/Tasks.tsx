import styled from "styled-components";
import Tut from "./TUTORIAL";

const StyledTasks = styled.div`
  overflow: hidden;
  display: flex;
  gap: 3rem;
  flex-direction: column;
  margin: 3rem 0;
`;

function Tasks() {
  return (
    <StyledTasks>
      <Tut />
    </StyledTasks>
  );
}

export default Tasks;
