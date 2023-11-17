import styled from "styled-components";
import TaskListItem from "../TaskList/TaskListItem";
import { FaBeer } from "react-icons/fa";
const StyledContainer = styled.div``;

function MainImportant() {
  return (
    <StyledContainer>
      <TaskListItem>
        <p>dsd</p>
        <h1>dasds</h1>
      </TaskListItem>
      <FaBeer />
    </StyledContainer>
  );
}

export default MainImportant;
