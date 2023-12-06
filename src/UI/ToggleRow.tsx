import styled from "styled-components";
import Toggle from "./Toggle";
import { useState } from "react";

interface ToggleState {
  text: string;
}

const StyledRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledText = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
`;

function ToggleRow({ text }: ToggleState) {
  const [isChecked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!isChecked);
  };

  return (
    <StyledRow>
      <StyledText>{text}</StyledText>
      <Toggle checked={isChecked} onChange={handleChange} />
    </StyledRow>
  );
}

export default ToggleRow;
