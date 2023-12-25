import { forwardRef } from "react";
import styled from "styled-components";
import { InputStyles } from "../styles/InputStyles";
import ReactDatePicker from "react-datepicker";

interface PickerTypes {
  value?: string;
  onClick?: () => void;
}

const StyledInput = styled.button`
  ${InputStyles}
  text-align: left;
  height: 5.2rem;
  width: 100%;
`;

// eslint-disable-next-line react-refresh/only-export-components
export const StyledPicker = styled(ReactDatePicker)`
  ${InputStyles}
  width: 100%;
  text-align: left;
  height: 5.2rem;
`;

const DatePickerInput = forwardRef<HTMLButtonElement, PickerTypes>(
  ({ value, onClick }, ref) => (
    <StyledInput type="button" onClick={onClick} ref={ref}>
      {value}
    </StyledInput>
  )
);
export default DatePickerInput;
