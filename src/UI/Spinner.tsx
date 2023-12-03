import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
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

export default Spinner;
