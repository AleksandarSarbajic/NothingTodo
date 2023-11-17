import { Link } from "react-router-dom";
import styled from "styled-components";
import { ChildrenProps } from "../../types/ChildrenType";

const StyledListItem = styled.li``;
const StyledLink = styled(Link)``;

function TaskListItem({ children }: ChildrenProps) {
  return (
    <StyledListItem>
      <StyledLink to={"/"}>{children}</StyledLink>
    </StyledListItem>
  );
}

export default TaskListItem;
