import styled from "styled-components";
import AddCategoryItem from "./AddCategoryItem";
import useLoadTasks from "../features/Task/useLoadTasksV2";

const StyledContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
`;

function AddCategoryBox({ onClick }: { onClick: (value: string) => void }) {
  const { tasks = [] } = useLoadTasks({
    filterField: "",
    filterValue: "all",
  });

  const uniqueCategories = [
    ...new Set(tasks.map((task) => task.category)),
  ].filter((category): category is string => category !== null);

  if (!tasks.length || !uniqueCategories.length) return null;

  return (
    <StyledContainer>
      {uniqueCategories.map((category) => (
        <AddCategoryItem
          key={category}
          value={category}
          onClick={(value) => onClick(value)}
        />
      ))}
    </StyledContainer>
  );
}

export default AddCategoryBox;
