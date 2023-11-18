import React, { useEffect, useState } from "react";
import styled from "styled-components";

const DotContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.3rem;
`;

const Dot = styled.div<{ $isRed: boolean }>`
  width: 1.8rem;
  height: 1.8rem;

  border-radius: 50%;
  background-color: ${(props) =>
    props.$isRed ? "#C3322Fff" : "rgba(120, 120, 120, 0.1)"};
  transition: background-color 0.2s ease-in-out;
`;

const Dots: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 24);
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DotContainer>
      {Array.from({ length: 22 }, (_, index) => (
        <Dot
          key={`dot-${index}`}
          $isRed={index >= currentIndex && index < currentIndex + 3}
        />
      ))}
    </DotContainer>
  );
};

const DottedLoading: React.FC = () => {
  return <Dots />;
};

export default DottedLoading;
