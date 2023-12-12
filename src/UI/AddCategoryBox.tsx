import styled from "styled-components";
import AddCategoryItem from "./AddCategoryItem";
import useLoadAllTasks from "../features/Task/useLoadAllTasks";

const StyledContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
`;

function AddCategoryBox({ onClick }: { onClick: (value: string) => void }) {
  const { tasks = [] } = useLoadAllTasks();

  const uniqueCategories = [...new Set(tasks.map((task) => task.category))];

  if (!tasks.length) return null;
  return (
    <StyledContainer>
      {uniqueCategories.map((task) => (
        <AddCategoryItem
          key={task}
          value={task}
          onClick={(value) => onClick(value)}
        />
      ))}
    </StyledContainer>
  );
}

export default AddCategoryBox;
