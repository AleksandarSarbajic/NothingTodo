import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerInside = styled.div`
  margin: 4.8rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-red-100) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-red-100));
  mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 10px),
    var(--bg-color) 0
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 10px),
    var(--bg-color) 0
  );
  animation: ${rotate} 1.5s infinite linear;
`;

const SpinnerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5rem;
  height: calc(100dvh - 5rem);
  background-color: var(--bg-color);
`;

function Spinner() {
  return (
    <SpinnerBox>
      <SpinnerInside />
    </SpinnerBox>
  );
}

export default Spinner;
