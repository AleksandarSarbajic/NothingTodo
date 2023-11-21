import { HiArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ChildrenProps } from "../types/ChildrenType";

const StyledTaskNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
`;

const StyledArrowButton = styled.button`
  svg {
    width: 3.6rem;
    height: 3.6rem;
  }
`;

function TaskNav({ children }: ChildrenProps) {
  const navigate = useNavigate();

  return (
    <StyledTaskNav>
      <StyledArrowButton onClick={() => navigate(-1)}>
        <HiArrowSmallLeft />
      </StyledArrowButton>
      <>{children}</>
    </StyledTaskNav>
  );
}

export default TaskNav;
