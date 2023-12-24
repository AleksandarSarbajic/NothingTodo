import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const DotContainer = styled.div<{ $alone: boolean | undefined }>`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  ${(props) =>
    props.$alone &&
    css`
      margin: 12rem 0;
    `}
`;

const Dot = styled.div<{ $isRed: boolean }>`
  width: 3rem;
  height: 3rem;

  border-radius: 50%;
  background-color: ${(props) =>
    props.$isRed ? "var(color-grey-0)" : "rgba(120, 120, 120, 0.2)"};

  ${(props) =>
    props.$isRed
      ? css`
          background-color: var(color-grey-0);
          box-shadow: 0px 0px 10px 3px rgba(255, 255, 255, 0.1);
        `
      : css`
          background-color: rgba(120, 120, 120, 0.2);
        `}
  transition: background-color 0.2s ease-in-out;
`;

function ThreeDotsLoading({ alone }: { alone?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 6);
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DotContainer $alone={alone}>
      {Array.from({ length: 3 }, (_, index) => (
        <Dot
          key={`dot-${index}`}
          $isRed={index >= currentIndex && index < currentIndex + 1}
        />
      ))}
    </DotContainer>
  );
}

export default ThreeDotsLoading;
