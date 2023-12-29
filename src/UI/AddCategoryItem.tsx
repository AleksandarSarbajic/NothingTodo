import styled from "styled-components";

const StyledItem = styled.button`
  font-family: "NDOT 47 (inspired by NOTHING)", sans-serif;

  padding: 0.6rem 2.4rem;
  background-color: var(--color-black-50);
  border-radius: 0.5rem;
  &:hover {
    background-color: var(--color-grey-600);
  }
`;

function AddCategoryItem({
  value,
  onClick,
}: {
  onClick: (value: string) => void;
  value: string;
}) {
  return (
    <StyledItem type="button" onClick={() => onClick(value)}>
      {value}
    </StyledItem>
  );
}

export default AddCategoryItem;
