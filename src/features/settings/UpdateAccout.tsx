import styled from "styled-components";

import Avatar from "../../UI/Avatar";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";

import Button from "../../UI/Button";
import ButtonRow from "../../UI/ButtonRow";
import { useUpdateUser } from "../Auth/useUpdateUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface FormData {
  fullName: string;
  password: string;
  confirmPassword: string;
}

const StyledBox = styled.div`
  margin: 2.5rem 0;
  display: flex;
  gap: 3rem;
`;
const StyledBoxed = styled.form`
  width: 70%;
  max-width: 35rem;
`;
interface Account {
  email?: string;
  fullName: string;
  avatar: string;
}
function UpdateAccout({ email, fullName: Name, avatar }: Account) {
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const { updateUser, isUpdating } = useUpdateUser();
  const { register, reset, formState, handleSubmit, watch } = useForm<FormData>(
    { defaultValues: { fullName: Name } }
  );

  const { errors } = formState;
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
    console.log(passwordsMatch);
  }, [password, watch, confirmPassword, passwordsMatch]);

  function onSubmitHandler({ password, fullName }: FormData) {
    if (password.length === 0) {
      updateUser(
        { userName: fullName },
        {
          onSuccess: () => reset({ password: "", confirmPassword: "" }),
        }
      );
    } else {
      if (!passwordsMatch) {
        toast.error("Passwords dont match");
      } else {
        updateUser(
          { password, userName: fullName },
          {
            onSuccess: () => reset({ password: "", confirmPassword: "" }),
          }
        );
      }
    }
  }

  return (
    <>
      <StyledBox>
        <Avatar image={avatar} />
        <StyledBoxed onSubmit={handleSubmit(onSubmitHandler)}>
          <FormRowVertical label="Email Adress">
            <Input
              type="email"
              id="email"
              disabled={true}
              defaultValue={email}
            />
          </FormRowVertical>
          <FormRowVertical
            label="Username"
            error={errors?.fullName?.message?.toString()}
          >
            <Input
              type="text"
              id="fullName"
              autoComplete="fullName"
              {...register("fullName", { required: "This field is required" })}
              disabled={isUpdating}
            />
          </FormRowVertical>

          <FormRowVertical
            label="New password (min 8 chars)"
            error={errors?.password?.message?.toString()}
          >
            <Input
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
              disabled={isUpdating}
            />
          </FormRowVertical>
          <FormRowVertical
            label="Confirm password"
            error={
              !passwordsMatch
                ? "Passwords do not match"
                : errors?.confirmPassword?.message?.toString()
            }
          >
            <Input
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              {...register("confirmPassword", {
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
              disabled={isUpdating}
            />
          </FormRowVertical>

          <ButtonRow>
            <Button
              type="button"
              primary="modal"
              onClick={() => {
                reset({ password: "", confirmPassword: "" });
              }}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              primary="modal"
              secondary="modalRed"
              disabled={isUpdating}
            >
              Update
            </Button>
          </ButtonRow>
        </StyledBoxed>
      </StyledBox>
    </>
  );
}

export default UpdateAccout;
