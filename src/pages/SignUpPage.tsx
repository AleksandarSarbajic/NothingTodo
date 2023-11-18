import Heading from "../UI/Heading";
import LoginLayout from "../UI/LoginLayout";
import SignUpForm from "../features/Auth/SignUpForm";

function SignUpPage() {
  return (
    <LoginLayout>
      <Heading as="h4">Create Account</Heading>
      <SignUpForm />
    </LoginLayout>
  );
}

export default SignUpPage;
