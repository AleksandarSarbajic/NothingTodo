import styled from "styled-components";
import Heading from "../UI/Heading";
import FormRowVertical from "../UI/FormRowVertical";
import Input from "../UI/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordEmail, resetUpdatePassword } from "../services/apiAuth";
import toast from "react-hot-toast";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100dvh;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-width: 25%;
`;
const StyledText = styled.p`
  color: var(--color-grey-500);
  opacity: 0.8;
`;
const ButtonRow = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ButtonBack = styled(Link)`
  color: var(--color-red-800);
  font-weight: 500;
  padding: 1.4rem 2rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;
  &:hover {
    background-color: var(--color-red-100);
    color: var(--color-grey-0);
  }
`;
const ButtonConfirm = styled.button`
  background-color: var(--color-red-100);
  color: var(--color-grey-0);
  font-weight: 500;
  padding: 1.4rem 2rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;
  &:hover {
    background-color: var(--color-red-800);
  }
`;

interface ResetPasswordProps {
  id: string;
  text: string;
  label: string;
  buttonText: string;
  message: string;
  error: string;
}

function ResetPassword({
  id,
  text,
  label,
  buttonText,
  message,
  error: errorMsg,
}: ResetPasswordProps) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (id === "password") {
        await resetUpdatePassword(value);
        navigate("/login");
      } else {
        await resetPasswordEmail(value);
      }

      toast.success(message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(errorMsg, error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={onSubmitHandler}>
        <Heading as={"h3"}>Reset your password</Heading>
        <StyledText>{text}</StyledText>
        <FormRowVertical label={label}>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            id={id}
            type={id}
            required={true}
          />
        </FormRowVertical>
        <ButtonRow>
          <ButtonBack to={"/signup"}>Back to sign in</ButtonBack>
          <ButtonConfirm>{buttonText}</ButtonConfirm>
        </ButtonRow>
      </StyledForm>
    </StyledContainer>
  );
}

export default ResetPassword;
