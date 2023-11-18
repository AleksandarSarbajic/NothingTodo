import { Form } from "react-router-dom";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

function LoginForm() {
  return (
    <Form>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          // disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          // disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button type="form">
          {/* {!isLoading ? "Log in" : <SpinnerMini />} */}
          Log in
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
