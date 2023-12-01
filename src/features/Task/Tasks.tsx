import styled from "styled-components";

import DraggableContainer from "./DraggableContainer";
import Menus from "../../UI/Menus";

const StyledTasks = styled.div`
  overflow: hidden;
  display: flex;
  gap: 3rem;
  flex-direction: column;
  margin: 3rem 0;
`;

function Tasks() {
  return (
    <Menus>
      <StyledTasks>
        <DraggableContainer />
      </StyledTasks>
    </Menus>
  );
}

export default Tasks;
