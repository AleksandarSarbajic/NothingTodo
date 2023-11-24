import { HiArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { ChildrenProps } from "../types/ChildrenType";

interface NavTypes extends ChildrenProps {
  center?: boolean;
}

const StyledTaskNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
`;

const StyledArrowButton = styled.button<{ $center: boolean }>`
  ${(props) =>
    props.$center &&
    css`
      flex: 1 1 0%;
    `}
  svg {
    width: 3.6rem;
    height: 3.6rem;
    ${(props) =>
      props.$center &&
      css`
        display: flex;
        justify-self: flex-start;
      `}
  }
`;
const InvisibleDiv = styled.div`
  flex: 1 1 0%;
`;

function TaskNav({ children, center = false }: NavTypes) {
  const navigate = useNavigate();

  return (
    <StyledTaskNav>
      <StyledArrowButton $center={center} onClick={() => navigate(-1)}>
        <HiArrowSmallLeft />
      </StyledArrowButton>
      <>{children}</>
      {center ? <InvisibleDiv /> : ""}
    </StyledTaskNav>
  );
}

export default TaskNav;
