import Heading from "../../UI/Heading";
import TaskNav from "../../UI/TaskNav";
import CreateEditTask from "./CreateEditTask";

interface PropsTypes {
  edit?: boolean;
}

function CreateTaskLayout({ edit = true }: PropsTypes) {
  return (
    <div>
      <TaskNav center={true}>
        <Heading as={"h3"} $create={true}>
          {edit ? "New Task" : "Edit Task"}
        </Heading>
      </TaskNav>
      <CreateEditTask />
    </div>
  );
}

export default CreateTaskLayout;
