import styled from "styled-components";
import Toggle from "./Toggle";
import { useState } from "react";
import useUpdateSettings from "../features/settings/useUpdateSettings";

interface ToggleState {
  text: string;
  state?: boolean;
  type: string;

  icon?: React.ReactElement;
}

const StyledBox = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  & svg {
    width: 3rem;
    height: 3rem;
  }
`;

const StyledText = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
`;
const StyledButton = styled.button`
  width: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--border-radius-md);
  &:hover {
    background-color: var(--line-color);
  }
`;

function ToggleRow({ text, state, type, icon }: ToggleState) {
  const [isChecked, setChecked] = useState(state);
  const { updateSetting, isPending } = useUpdateSettings();
  const handleChange = () => {
    setChecked((prevChecked) => {
      const updatedObject = {
        [type]: !prevChecked,
      };

      updateSetting({
        updatedSettings: {
          ...updatedObject,
        },
      });

      return !prevChecked;
    });
  };

  return (
    <>
      <StyledButton onClick={handleChange}>
        <StyledBox>
          {icon}
          <StyledText>{text}</StyledText>
        </StyledBox>
        <Toggle
          checked={isChecked}
          onChange={handleChange}
          disabled={isPending}
        />
      </StyledButton>
    </>
  );
}

export default ToggleRow;
