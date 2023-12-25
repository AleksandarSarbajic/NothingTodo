import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-black-50);
  border: 1px solid var(--color-grey-600);
  border-radius: var(--border-radius-md);
  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;
  & h1 {
    margin-bottom: 2rem;
  }
  & p {
    color: var(--color-grey-550);
  }
`;
function ErrorFallback({
  error,
  resetErrorBoundary = () => window.location.replace("/"),
}: {
  error?: Error;
  resetErrorBoundary?: () => void;
}) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Something went wrong</Heading>
          <p>{error?.message}</p>
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
