import { useForm } from "react-hook-form";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import styled, { css } from "styled-components";
import TextArea from "../../UI/TextArea";
import Button from "../../UI/Button";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import SpinnerMini from "../../UI/SpinnerMini";
import { forwardRef, useState } from "react";
import en from "date-fns/locale/en-GB";
import { format, set, subDays } from "date-fns";
import useCreateTask from "./useCreateTask";
import { useSearchParams } from "react-router-dom";
import useUpdateList from "../TaskList/useUpdateList";
registerLocale("en-GB", en);

interface PickerTypes {
  value?: string;
  onClick?: () => void;
}
interface FormData {
  task_name: string;
  date: string;
  description: string;
  category: string;
}

const StyledBox = styled.div`
  display: flex;
  gap: 4rem;
  height: 12.5rem;
`;

const Styledd = css`
  text-align: left;
  border: none;
  background-color: var(--color-grey-700);
  border-radius: var(--border-radius-md);
  padding: 1.4rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-100);
  height: 5.2rem;
  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const StyledInput = styled.button`
  ${Styledd}
  width: 100%;
`;

const StyledPicker = styled(ReactDatePicker)`
  ${Styledd}
  width: 100%;
`;

const StyledForm = styled.form`
  margin-top: 2rem;
`;

function CreateEditTask() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [useParams] = useSearchParams();
  const id = useParams.get("q");
  const { register, formState, reset, handleSubmit } = useForm<FormData>();
  const { errors } = formState;
  const { createTask, isPending: isCreating } = useCreateTask();
  const { updateList } = useUpdateList(Number(id));

  function onSubmitHandler({ task_name, description, category }: FormData) {
    createTask(
      {
        task_name,
        description: description.length === 0 ? null : description,
        category,
        due_date: startDate
          ? set(startDate, {
              hours: 0,
              minutes: 0,
              seconds: 0,
              milliseconds: 0,
            }).toISOString()
          : null,
        edited_at: new Date().toISOString(),
        start_time: startTime ? format(startTime, "HH:mm") : null,
        end_time: endTime ? format(endTime, "HH:mm") : null,
        ListId: Number(id),
      },
      {
        onSettled: () => {
          reset();
          setStartDate(null);
          setStartTime(null);
          setEndTime(null);
        },
      }
    );
    updateList({ id: Number(id) });
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
      <FormRowVertical
        label="Title"
        error={errors?.task_name?.message?.toString()}
      >
        <Input
          type="text"
          id="task_name"
          {...register("task_name", { required: "This field is required" })}
        />
      </FormRowVertical>
      <StyledBox>
        <FormRowVertical label="Start time">
          <StyledPicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            showPopperArrow={false}
            customInput={<ExampleCustomInput />}
          />
        </FormRowVertical>
        <FormRowVertical label="End Time">
          <StyledPicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            showPopperArrow={false}
            customInput={<ExampleCustomInput />}
          />
        </FormRowVertical>
      </StyledBox>

      <FormRowVertical label="Add due date">
        <ReactDatePicker
          dateFormat={"EEEE, MMMM dd yyyy"}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          withPortal
          portalId="root-portal"
          formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
          customInput={<ExampleCustomInput />}
          locale="en-GB"
          minDate={subDays(new Date(), 0)}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Add Category"
        error={errors?.category?.message?.toString()}
      >
        <Input
          type="text"
          id="category"
          {...register("category", { required: "This field is required" })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Description"
        error={errors?.date?.message?.toString()}
      >
        <TextArea id="description" {...register("description")} />
      </FormRowVertical>
      <FormRowVertical>
        <Button primary="form" type="submit" disabled={isCreating}>
          {!isCreating ? "Create a new task" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </StyledForm>
  );
}

export default CreateEditTask;
