import LoginForm from "../features/Auth/LoginForm";
import Heading from "../UI/Heading";
import LoginLayout from "../UI/LoginLayout";

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
