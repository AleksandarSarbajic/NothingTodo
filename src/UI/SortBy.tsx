import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

interface SortByProps {
  onCloseModal?: () => void;
  value: string;
  label: string;
  icon: JSX.Element;
}

const StyledSortBy = styled.li``;
const StyledButton = styled.button<{ $selected?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 4rem;
  gap: 2rem;
  ${(props) =>
    props.$selected &&
    css`
      background-color: var(--color-black-50);
    `}
  svg {
    width: 3rem;
    height: 3rem;
  }
  span {
    font-size: 1.8rem;
  }
  &:hover {
    background-color: var(--color-black-50);
  }
`;
function SortBy({ onCloseModal, value, label, icon }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  function setSortQueryHandler() {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
    onCloseModal?.();
  }

  return (
    <StyledSortBy>
      <StyledButton
        onClick={setSortQueryHandler}
        $selected={searchParams.get("sortBy") === value}
      >
        {icon} <span>{label}</span>
      </StyledButton>
    </StyledSortBy>
  );
}

export default SortBy;
