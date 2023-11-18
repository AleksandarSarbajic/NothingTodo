import styled from "styled-components";
import LoginForm from "../features/Auth/LoginForm";
import Heading from "../UI/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--bg-color);
`;

function LoginPage() {
  return (
    <LoginLayout>
      <Heading as="h4" $caps={true}>
        Log in to your account
      </Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default LoginPage;
