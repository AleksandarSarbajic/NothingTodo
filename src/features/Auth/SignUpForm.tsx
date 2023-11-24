import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

import SpinnerMini from "../../UI/SpinnerMini";
import Form from "../../UI/Form";
import FormLink from "../../UI/FormLink";
import LineThru from "../../UI/LineThru";

import { useForm } from "react-hook-form";
import useSignup from "./useSignup";

interface Cred {
  userName: string;
  email: string;
  password: string;
}

function SignUpForm() {
  const { register, formState, handleSubmit, reset } = useForm<Cred>();
  const { errors } = formState;
  const { signup, isPending } = useSignup();

  function onSubmitHandler({ userName, email, password }: Cred) {
    signup(
      { userName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRowVertical
        label="Username"
        error={errors?.userName?.message?.toString()}
      >
        <Input
          type="text"
          id="userName"
          autoComplete="userName"
          {...register("userName", { required: "This field is required" })}
          disabled={isPending}
        />
      </FormRowVertical>

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
        label="Password (min 8 characters)"
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
        <Button primary="form" type="submit" cased={true}>
          {!isPending ? "Sign up" : <SpinnerMini />}
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
        text="Already have an account?"
        link="/login"
        linkText=" Log in."
      />
    </Form>
  );
}

export default SignUpForm;
