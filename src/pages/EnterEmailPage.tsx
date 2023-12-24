import ResetPassword from "../UI/ResetPassword";

function EnterEmailPage() {
  return (
    <ResetPassword
      id="email"
      text="Enter the email address you used to register with."
      label="Email Address"
      buttonText="Send instructions"
      message="Email for reseting your password successfully has been sent! Check your email for further instructions."
      error="Error sending email."
    />
  );
}

export default EnterEmailPage;
