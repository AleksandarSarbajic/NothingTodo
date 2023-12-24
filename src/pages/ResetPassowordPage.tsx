import ResetPassword from "../UI/ResetPassword";

function ResetPassowordPage() {
  return (
    <ResetPassword
      id="password"
      text="Enter the new password you want to use."
      label="Password"
      buttonText="Reset Password"
      message="Password updated successfully"
      error="Error updating password"
    />
  );
}

export default ResetPassowordPage;
