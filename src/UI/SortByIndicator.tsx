import { HiXMark } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSortByIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 0 1.8rem 0;
`;
const StyledSortByName = styled.p`
  text-transform: capitalize;
  font-size: 2rem;
`;
const StyledSortByDelete = styled.button`
  border-radius: var(--border-radius-sm);
  padding: 0.1rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 3.2rem;
    height: 3.2rem;

    color: var(--color-red-100);
  }
`;
function SortByIndicator() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("sortBy");
  function deleteSearchParams() {
    searchParams.delete("sortBy");
    setSearchParams(searchParams);
  }

  if (!query) return null;

  return (
    <StyledSortByIndicator>
      <StyledSortByName>{query}</StyledSortByName>
      <StyledSortByDelete onClick={deleteSearchParams}>
        <HiXMark />
      </StyledSortByDelete>
    </StyledSortByIndicator>
  );
}

export default SortByIndicator;
