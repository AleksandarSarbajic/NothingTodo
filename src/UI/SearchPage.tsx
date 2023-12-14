import DraggableContainer from "../features/Task/DraggableContainer";
import useSearchTasks from "../features/Task/useSearchTasks";
import StyledHeader from "./Header";
import Heading from "./Heading";
import Menus from "./Menus";
import TasksColumn from "./TasksColumn";

function SearchPage({ query }: { query: string | null }) {
  const { searchResults = [], isLoading } = useSearchTasks();

  return (
    <div>
      <StyledHeader $use="list">
        <Heading as="h1">Search for : {query}</Heading>
      </StyledHeader>
      <Menus>
        <TasksColumn>
          <DraggableContainer tasks={searchResults} isLoading={isLoading} />
        </TasksColumn>
      </Menus>
    </div>
  );
}

export default SearchPage;
