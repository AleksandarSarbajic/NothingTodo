import { ChildrenProps } from "../../types/ChildrenType";

function TaskList({ children }: ChildrenProps) {
  return <div>{children}</div>;
}

export default TaskList;
