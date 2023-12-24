import { HiChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface HistoryItemProps {
  title?: string;
  numOfCompleted?: number;
  query: string;
}

const StledItem = styled.li``;
const StledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-left: -1rem;
  border-radius: var(--border-radius-md);
  &:hover {
    background-color: var(--line-color);
  }
  & span {
    font-size: 2.4rem !important;
    font-weight: 500;
    color: var(--color-red-50) !important;
  }
  & p {
    font-size: 2rem;
  }
  & svg {
    width: 2.8rem;
    height: 2.8rem;
  }
`;

function AnalyticsHistoryItem({
  title = "wed",
  numOfCompleted = 2,
  query,
}: HistoryItemProps) {
  if (numOfCompleted === 0) return null;

  return (
    <StledItem>
      <StledLink to={`${title.replace(/\s/g, "")}?date=${query}`}>
        <span>{title}</span>
        <p>
          {numOfCompleted} {numOfCompleted === 1 ? "task" : "tasks"} completed
        </p>
        <HiChevronRight />
      </StledLink>
    </StledItem>
  );
}

export default AnalyticsHistoryItem;
