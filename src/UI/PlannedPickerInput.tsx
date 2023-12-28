import { forwardRef } from "react";
import styled from "styled-components";
import { InputStyles } from "../styles/InputStyles";
import { HiOutlineChevronDown } from "react-icons/hi2";

interface PickerTypes {
  value?: string;
  onClick?: () => void;
}

const StyledInput = styled.button`
  /* ${InputStyles} */
  text-align: left;
  height: 5.2rem;
  width: 100%;
  position: relative;
`;
const StyledIcon = styled(HiOutlineChevronDown)`
  position: absolute;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  top: 55%;
  transform: translate(50%, -50%);
`;

const PlannedPickerInput = forwardRef<HTMLButtonElement, PickerTypes>(
  ({ value, onClick }, ref) => (
    <StyledInput type="button" onClick={onClick} ref={ref}>
      {value}
      <StyledIcon />
    </StyledInput>
  )
);
export default PlannedPickerInput;
