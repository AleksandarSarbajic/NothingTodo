import styled from "styled-components";

import Avatar from "../../UI/Avatar";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";

import Button from "../../UI/Button";
import ButtonRow from "../../UI/ButtonRow";
import { useUpdateUser } from "../Auth/useUpdateUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
interface FormData {
  name: string;
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
  const [fullName, setFullName] = useState(Name);

  const { updateUser, isUpdating } = useUpdateUser();
  const { register, reset, formState, handleSubmit, watch } =
    useForm<FormData>();

  const { errors } = formState;
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, watch, confirmPassword, passwordsMatch]);

  function onSubmitHandler({ password }: FormData) {
    if (password.length === 0) {
      updateUser(
        { userName: fullName },
        {
          onSuccess: () => reset(),
        }
      );
    } else {
      updateUser(
        { password, userName: fullName },
        { onSuccess: () => reset() }
      );
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
          <FormRowVertical label="Full name">
            <Input
              type="text"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
            />
          </FormRowVertical>

          <ButtonRow>
            <Button
              type="button"
              primary="modal"
              onClick={() => {
                reset();
                setFullName(Name);
              }}
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
