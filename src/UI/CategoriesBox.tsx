import styled, { css } from "styled-components";
import CategoriesItem from "./CategoriesItem";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import useLoadAllTasks from "../features/Task/useLoadAllTasks";

interface Props {
  $layout?: boolean;
}

const StyledBox = styled.div<Props>`
  display: grid;
  grid-template-columns: repeat(2, minmax(0%, 1fr));
  gap: 5rem;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 0 5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  ${(props) =>
    props.$layout &&
    css`
      border-bottom: none;
    `}
`;

const StyledRow = styled.div<Props>`
  padding-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) =>
    props.$layout &&
    css`
      padding: 4rem 0 2rem;
    `}
`;

const StyledLink = styled(Link)`
  color: var(--color-grey-550);
  font-weight: 600;
  opacity: 0.6;
  &:hover,
  &:active {
    opacity: 1;
  }
`;

function CategoriesBox({ layout = false }: { layout?: boolean }) {
  const { tasks = [] } = useLoadAllTasks();
  const uniqueCategories = [...new Set(tasks.map((task) => task.category))];

  const numItems = layout ? uniqueCategories.length : 2;

  if (tasks.length === 0) return null;

  return (
    <>
      <StyledRow $layout={layout}>
        <Heading as={`${layout ? "h1" : "h4"}`}>Categories</Heading>
        {!layout && <StyledLink to={"/categories"}>View All</StyledLink>}
      </StyledRow>
      <StyledBox $layout={layout}>
        {uniqueCategories.slice(0, numItems).map((task) => {
          const numberOfTasks = tasks.filter((com) => com.category === task);
          const completed = numberOfTasks.filter(
            (item) => item.status === "completed"
          );

          return (
            <CategoriesItem
              progress={(completed.length / numberOfTasks.length) * 100}
              number={numberOfTasks.length}
              name={task}
              key={task}
            />
          );
        })}
      </StyledBox>
    </>
  );
}

export default CategoriesBox;
