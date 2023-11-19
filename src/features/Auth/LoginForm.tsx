import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

import { useLogin } from "./useLogin";
import SpinnerMini from "../../UI/SpinnerMini";
import Form from "../../UI/Form";
import FormLink from "../../UI/FormLink";
import LineThru from "../../UI/LineThru";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const { register, reset, formState, handleSubmit } = useForm<FormData>();
  const { errors } = formState;

  const { login, isPending } = useLogin();
  function onSubmitHandler({ email, password }: FormData) {
    login(
      { email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRowVertical
        label="Email address"
        error={errors?.email?.message?.toString()}
      >
        <Input
          type="email"
          id="email"
          autoComplete="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Password"
        error={errors?.password?.message?.toString()}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button primary="form" type="submit">
          {!isPending ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FormLink
        type="small"
        text="Can't remember your password?"
        link="/login"
        linkText=" Recover it."
      />
      <LineThru $margin={"form"} />
      <FormLink
        type="medium"
        text="Don't Have an Account?"
        link="/signup"
        linkText=" Create it."
      />
    </Form>
  );
}

export default LoginForm;
