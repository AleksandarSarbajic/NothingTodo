import styled, { css } from "styled-components";

const StyledButton = styled.button<{ $highlight: boolean }>`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black-50);
  padding: 0.5rem 3rem;
  border-radius: 5px;
  transition: all 0.3s;
  border: 1px solid var(--color-grey-700);

  ${(props) =>
    props.$highlight &&
    css`
      background-color: var(--color-black-300);
    `}

  &:hover {
    background-color: var(--color-grey-700);
  }
`;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  filter: boolean;
}

function AnalyticsButton({ children, onClick, filter }: ButtonProps) {
  return (
    <StyledButton $highlight={filter} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default AnalyticsButton;
