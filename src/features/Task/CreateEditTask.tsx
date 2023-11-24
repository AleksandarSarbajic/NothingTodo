import { useForm } from "react-hook-form";
import FormRowVertical from "../../UI/FormRowVertical";

import Input from "../../UI/Input";
import styled from "styled-components";
import TextArea from "../../UI/TextArea";
import Button from "../../UI/Button";
import ReactDatePicker from "react-datepicker";

// import SpinnerMini from "../../UI/SpinnerMini";
import { forwardRef, useState } from "react";

interface PickerTypes {
  value?: string;
  onClick?: () => void;
}

const StyledInput = styled.button`
  text-align: left;
  border: none;
  background-color: var(--color-grey-700);
  border-radius: var(--border-radius-md);
  padding: 1.4rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-100);
  &::placeholder {
    color: var(--color-grey-400);
  }
  width: 100%;
`;

const StyledForm = styled.form`
  margin-top: 2rem;
`;

interface FormData {
  title: string;
  date: string;
  description: string;
}

function CreateEditTask() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const { register, formState, handleSubmit } = useForm<FormData>();
  const { errors } = formState;

  function onSubmitHandler({ title, date, description }: FormData) {
    const dated = new Date(date);
    console.log(title, dated.toISOString(), description);
  }
  const ExampleCustomInput = forwardRef<HTMLButtonElement, PickerTypes>(
    ({ value, onClick }, ref) => (
      <StyledInput type="button" onClick={onClick} ref={ref}>
        {value}
      </StyledInput>
    )
  );
  return (
    <StyledForm onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRowVertical label="Title" error={errors?.title?.message?.toString()}>
        <Input
          type="text"
          id="title"
          {...register("title", { required: "This field is required" })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Add due date"
        error={errors?.date?.message?.toString()}
      >
        <Input
          type="date"
          id="Date"
          {...register("date", {
            required: "This field is required",
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: "Invalid date format (YYYY-MM-DD)",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Add due date"
        error={errors?.date?.message?.toString()}
      >
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          withPortal
          portalId="root-portal"
          formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
          customInput={<ExampleCustomInput />}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Description"
        error={errors?.date?.message?.toString()}
      >
        <TextArea
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button primary="form" type="submit">
          {/* {true ? "Create a new task" : <SpinnerMini />} */}
          Create a new task
        </Button>
      </FormRowVertical>
    </StyledForm>
  );
}

export default CreateEditTask;
