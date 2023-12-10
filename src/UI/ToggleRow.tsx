import styled from "styled-components";
import Toggle from "./Toggle";
import { useState } from "react";
import useUpdateSettings from "../features/settings/useUpdateSettings";

interface ToggleState {
  text: string;
  state?: boolean;
  type: string;
  id?: string;
  icon?: React.ReactElement;
}

const StyledRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
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

function ToggleRow({ text, state, type, id, icon }: ToggleState) {
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
        id: id,
      });

      return !prevChecked;
    });
  };

  return (
    <StyledRow>
      <StyledBox>
        {icon}
        <StyledText>{text}</StyledText>
      </StyledBox>
      <Toggle
        checked={isChecked}
        onChange={handleChange}
        disabled={isPending}
      />
    </StyledRow>
  );
}

export default ToggleRow;
