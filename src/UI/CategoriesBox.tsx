import styled from "styled-components";
import CategoriesItem from "./CategoriesItem";

const StyledBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5rem;
  align-items: center;
  justify-content: space-between;
  padding: 6rem 0 5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

function CategoriesBox() {
  return (
    <StyledBox>
      <CategoriesItem progress={15} />
      <CategoriesItem progress={20} name="Fortnite" />
    </StyledBox>
  );
}

export default CategoriesBox;
