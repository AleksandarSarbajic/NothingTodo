import styled, { css, keyframes } from "styled-components";

const glowAnimation = keyframes`
  0% {
    box-shadow: none;
  }
  50% {
    box-shadow: 0 0 10px 5px var(--color-blue-50);
  }
  100% {
    box-shadow: none;
  }
`;

const ToggleLabel = styled.label`
  font-size: 1.7rem;
  position: relative;
  display: inline-block;
  width: 6.5rem;
  height: 3rem;
`;

const ToggleInput = styled.input`
  display: none;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span<{ checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.checked ? "var(--color-blue-50)" : "var(--color-grey-700)"};
  transition: 0.2s;
  border-radius: 30px;

  &:before {
    content: "";
    position: absolute;
    height: 2.3rem;
    width: 2.3rem;
    border-radius: 20px;
    left: 0.5rem;
    bottom: 0.4rem;
    background-color: ${(props) =>
      props.checked ? "var(--color-blue-500)" : "var(--color-grey-550)"};
    transition: 0.4s;
    transform: ${(props) =>
      props.checked ? "translateX(1.9em)" : "translateX(0)"};

    animation: ${(props) =>
      props.checked
        ? css`
            ${glowAnimation} 0.6s ease-in-out 0.05s
          `
        : ""};
  }
`;

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

function Toggle({ checked = true, onChange }: ToggleProps) {
  return (
    <ToggleLabel>
      <ToggleInput type="checkbox" checked={checked} onChange={onChange} />
      <Slider checked={checked} />
    </ToggleLabel>
  );
}

export default Toggle;
