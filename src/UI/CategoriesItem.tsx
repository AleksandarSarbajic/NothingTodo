import styled from "styled-components";
import Heading from "./Heading";

const StyledCategoriesItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.4rem;
  background-color: var(--color-black-100);
  border-radius: var(--border-radius-md--2);
  height: 20rem;
`;
const StyledNumberOfTasks = styled.p`
  margin-top: 0.5rem;
  opacity: 0.7;
`;

const StyledProgressBar = styled.div<{ $progress: number }>`
  height: 8px;
  background-color: var(--color-grey-700);
  width: 100%;
  border-radius: 4px;

  & div {
    height: 100%;
    width: ${(props) => props.$progress || 0}%;
    background-color: var(--color-red-50);
    border-radius: 4px;
  }
`;

const StyledPercentage = styled.span`
  font-family: "NDOT 47 (inspired by NOTHING)";
  font-size: 2rem;
  margin: 0 0 0.5rem 0.2rem;
`;

interface CategoryProps {
  progress: number;
  name?: string;
}

function CategoriesItem({ progress = 10, name = "Web design" }: CategoryProps) {
  return (
    <StyledCategoriesItem>
      <div>
        <Heading as="h6">{name}</Heading>
        <StyledNumberOfTasks>{progress} tasks</StyledNumberOfTasks>
      </div>
      <div>
        <StyledPercentage>{progress}%</StyledPercentage>
        <StyledProgressBar $progress={progress}>
          <div />
        </StyledProgressBar>
      </div>
    </StyledCategoriesItem>
  );
}

export default CategoriesItem;
