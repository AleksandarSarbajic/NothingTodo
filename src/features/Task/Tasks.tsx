import styled from "styled-components";

import DraggableContainer from "./DraggableContainer";

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
      <DraggableContainer />
    </StyledTasks>
  );
}

export default Tasks;
