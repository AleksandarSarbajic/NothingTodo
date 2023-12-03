import styled from "styled-components";
import TaskListItem from "../TaskList/TaskListItem";

import { HiOutlineCalendarDays, HiCheck, HiOutlineStar } from "react-icons/hi2";
import useLoadFavorites from "../Favorite/useLoadFavorites";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 4.4rem 0 4rem 0;
  border-bottom: 1px solid rgb(255, 255, 255, 0.1);
`;

function MainImportant() {
  const { tasks = [] } = useLoadFavorites();

  return (
    <StyledContainer>
      <TaskListItem path={""} link={"favorites"}>
        <div>
          <HiOutlineStar />
          <p>Favorite</p>
        </div>
        <span>{tasks.length}</span>
      </TaskListItem>
      <TaskListItem>
        <div>
          <HiOutlineCalendarDays />
          <p>Planned</p>
        </div>
        <span>69</span>
      </TaskListItem>
      <TaskListItem>
        <div>
          <HiCheck />
          <p>TaskList</p>
        </div>
        <span>834</span>
      </TaskListItem>
    </StyledContainer>
  );
}

export default MainImportant;
