import styled, { css } from "styled-components";
import CategoriesItem from "./CategoriesItem";
import Heading from "./Heading";
import { Link, useSearchParams } from "react-router-dom";

import { sortByCategory, sortByProgress } from "../utils/helpers";
import SortByIndicator from "./SortByIndicator";
import useLoadTasks from "../features/Task/useLoadTasksV2";
import { Database } from "../services/supabase";

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
  border-bottom: 1px solid var(--line-color);
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

interface Props {
  $layout?: boolean;
}

interface CategoryInfo {
  progress: number;
  number: number;
}

function calculateCategoryInfo(
  category: string | null,
  tasks: Database["public"]["Tables"]["Tasks"]["Row"][]
): CategoryInfo {
  const numberOfTasks = tasks.filter((task) => task.category === category);
  const completed = numberOfTasks.filter((item) => item.status === "completed");

  return {
    progress: (completed.length / numberOfTasks.length) * 100,
    number: numberOfTasks.length,
  };
}

function CategoriesBox({ layout = false }: { layout?: boolean }) {
  const [searchParams] = useSearchParams();
  const sortQuery = searchParams.get("sortBy");

  const { tasks = [] } = useLoadTasks({
    filterField: "",
    filterValue: "all",
  });

  const uniqueCategories: string[] = Array.from(
    new Set(tasks.map((task) => task.category))
  ).filter((category): category is string => category !== null);

  const numItems: number = layout ? uniqueCategories.length : 2;

  if (tasks.length === 0) return null;

  const sortedTasks =
    sortQuery === "progress-asc"
      ? tasks
          .slice()
          .sort((a, b) => sortByProgress(a, b, tasks, "completed", false))
      : sortQuery === "progress-desc"
      ? tasks
          .slice()
          .sort((a, b) => sortByProgress(a, b, tasks, "completed", true))
      : sortQuery === "name-asc"
      ? tasks.slice().sort((a, b) => sortByCategory(a, b, true))
      : sortQuery === "name-desc"
      ? tasks.slice().sort((a, b) => sortByCategory(a, b, false))
      : sortQuery === "number-of-tasks-desc"
      ? tasks
          .slice()
          .sort(
            (a, b) =>
              calculateCategoryInfo(a.category, tasks).number -
              calculateCategoryInfo(b.category, tasks).number
          )
      : sortQuery === "number-of-tasks-asc"
      ? tasks
          .slice()
          .sort(
            (a, b) =>
              calculateCategoryInfo(b.category, tasks).number -
              calculateCategoryInfo(a.category, tasks).number
          )
      : tasks;

  const sortedCategories: string[] = [
    ...new Set(sortedTasks.map((task) => task.category)),
  ].filter((category): category is string => category !== null);

  return (
    <>
      <StyledRow $layout={layout}>
        <Heading as={`${layout ? "h1" : "h4"}`}>Categories</Heading>
        {!layout && <StyledLink to={"/categories"}>View All</StyledLink>}
      </StyledRow>
      <SortByIndicator />
      <StyledBox $layout={layout}>
        {sortedCategories.slice(0, numItems).map((category) => {
          const { progress, number } = calculateCategoryInfo(
            category,
            sortedTasks
          );

          return (
            <CategoriesItem
              progress={progress}
              number={number}
              name={category}
              key={category}
            />
          );
        })}
      </StyledBox>
    </>
  );
}

export default CategoriesBox;
