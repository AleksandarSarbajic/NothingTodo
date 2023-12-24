import styled from "styled-components";
import useLoadAllTasks from "../features/Task/useLoadAllTasks";

const StyledProgressBox = styled.div<{ $value: number }>`
  font-family: "NDOT 47 (inspired by NOTHING)", sans-serif;
  font-size: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -1.5rem;
  left: -1.5rem;
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  background: radial-gradient(
      closest-side,
      var(--color-black-100) 92%,
      transparent 80% 100%
    ),
    conic-gradient(
      var(--color-red-100) ${({ $value }) => $value}%,
      var(--color-black-300) 0
    );
  transition: all 0.4s;
  &:hover {
    z-index: 2;
  }
  &:hover div {
    opacity: 1;
  }
`;
const StyledProgress = styled.progress`
  visibility: hidden;
  height: 0;
  width: 0;
`;
const StyledNumber = styled.div`
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

function NavProgressBar() {
  const { tasks = [] } = useLoadAllTasks();
  const completedTasks = tasks.filter(
    (item) => item.status === "completed"
  ).length;
  const progressValue = (completedTasks / tasks.length) * 100;

  return (
    <>
      <StyledProgressBox $value={progressValue}>
        <StyledNumber>
          {isNaN(progressValue) ? 0 : progressValue.toFixed()}%
        </StyledNumber>
      </StyledProgressBox>
      <StyledProgress />
    </>
  );
}

export default NavProgressBar;
