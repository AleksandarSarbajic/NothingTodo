import { Link } from "react-router-dom";
import styled from "styled-components";
import { ChildrenProps } from "../../types/ChildrenType";

interface Types extends ChildrenProps {
  link?: string;
  path?: string;
}

const StyledListItem = styled.li``;
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 2.5rem 2rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-black-100);

  &:hover,
  &:active {
  }

  p {
    font-size: 2rem;
    font-weight: 500;
  }
  span {
    font-family: "NDOT 47 (inspired by NOTHING)", sans-serif;
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

function TaskListItem({ children, link, path }: Types) {
  return (
    <StyledListItem>
      <StyledLink to={`/${path}${link}`}>{children}</StyledLink>
    </StyledListItem>
  );
}

export default TaskListItem;
