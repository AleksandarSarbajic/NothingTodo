import { Link } from "react-router-dom";
import styled from "styled-components";
import { ChildrenProps } from "../../types/ChildrenType";

const StyledListItem = styled.li``;
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 2.5rem 2rem;
  border-radius: 1.4rem;
  background-color: var(--color-black-100);

  &:hover,
  &:active {
  }

  p {
    font-size: 2rem;
    font-weight: 500;
  }
  span {
    font-family: "ndot", sans-serif;
    font-size: 2.2rem;
  }
  svg {
    width: 3rem;
    height: 3rem;
  }
  div {
    display: flex;
    align-items: center;
    margin-right: auto;
    gap: 1rem;
  }
`;

function TaskListItem({ children }: ChildrenProps) {
  return (
    <StyledListItem>
      <StyledLink to={"/"}>{children}</StyledLink>
    </StyledListItem>
  );
}

export default TaskListItem;
