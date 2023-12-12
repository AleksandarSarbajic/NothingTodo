import { useForm } from "react-hook-form";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import styled, { css, keyframes } from "styled-components";
import TextArea from "../../UI/TextArea";
import Button from "../../UI/Button";
import ReactDatePicker from "react-datepicker";
import SpinnerMini from "../../UI/SpinnerMini";
import { forwardRef, useState, useEffect } from "react";

import { format, set, subDays } from "date-fns";
import useCreateTask from "./useCreateTask";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUpdateList from "../TaskList/useUpdateList";
import useLoadTask from "./useLoadTask";
import { formatTimeToDate } from "../../utils/helpers";
import useUpdateTask from "./useUpdateTask";
import AddCategoryBox from "../../UI/AddCategoryBox";

interface PickerTypes {
  value?: string;
  onClick?: () => void;
}
interface FormData {
  task_name: string;
  description: string;
  category: string;
}

const slideIn = keyframes`
0%{
  opacity:0;
  transform: translateX(15%);
}
100%{
  opacity:1;
  transform: translateX(0%);
}
`;
const StyledForm = styled.form`
  margin-top: 2rem;
  animation: ${slideIn} 0.5s;
`;
const StyledBox = styled.div`
  display: flex;
  gap: 4rem;
  height: 12.5rem;
`;

const StyledProps = css`
  text-align: left;
  border: none;
  background-color: var(--color-grey-750);
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
  ${StyledProps}
  width: 100%;
`;

const StyledPicker = styled(ReactDatePicker)`
  ${StyledProps}
  width: 100%;
`;

function CreateEditTask() {
  //params
  const [useParams] = useSearchParams();
  const id = useParams.get("q");
  const favorite = useParams.get("f");
  const category = useParams.get("ca");
  const status = useParams.get("c");
  const navigate = useNavigate();
  // task
  const { task, isLoading: isLoadingTask } = useLoadTask();
  const { updateTask, isPending: isUpdating } = useUpdateTask();
  const { updateList } = useUpdateList(Number(id));
  const { createTask, isPending: isCreating } = useCreateTask();

  // form
  const { register, formState, reset, handleSubmit } = useForm<FormData>({
    defaultValues: {
      task_name: "",
      category: category || "",
      description: "",
    },
  });

  const { errors } = formState;

  const [startDate, setStartDate] = useState<Date | null | undefined>(
    task?.due_date ? new Date(task?.due_date) : null
  );
  const [startTime, setStartTime] = useState<Date | null | undefined>(
    task?.start_time ? formatTimeToDate(task?.start_time) : null
  );
  const [endTime, setEndTime] = useState<Date | null | undefined>(
    task?.end_time ? formatTimeToDate(task?.end_time) : null
  );

  useEffect(() => {
    if (task) {
      const { task_name, description, category } = task;
      reset({
        task_name: task_name || undefined,
        description: description || undefined,
        category: category || undefined,
      });
      setStartDate(task.due_date ? new Date(task.due_date) : null);
      setStartTime(task.start_time ? formatTimeToDate(task.start_time) : null);
      setEndTime(task.end_time ? formatTimeToDate(task.end_time) : null);
    }
  }, [task, reset]);

  function onSubmitHandler({ task_name, description, category }: FormData) {
    const newTask = {
      task_name,
      description: description.length === 0 ? null : description,
      category,
      due_date: startDate
        ? set(startDate, {
            hours: 23,
            minutes: 59,
            seconds: 59,
            milliseconds: 999,
          }).toISOString()
        : task?.due_date
        ? set(new Date(task?.due_date), {
            hours: 23,
            minutes: 59,
            seconds: 59,
            milliseconds: 999,
          }).toISOString()
        : null,
      edited_at: new Date().toISOString(),
      start_time: startTime ? format(startTime, "HH:mm") : null,
      end_time: endTime ? format(endTime, "HH:mm") : null,
      ListId: Number(id),
      status: task
        ? task.status
        : status === "false"
        ? "incomplete"
        : status === "true"
        ? "completed"
        : "incomplete",
      priority: task
        ? task.priority
        : favorite === "false"
        ? false
        : favorite === "true"
        ? true
        : false,
    };
    if (!task) {
      createTask(
        {
          ...newTask,
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
    } else {
      updateTask(
        {
          newTask: {
            ...newTask,
          },
          id: task.id,
        },
        {
          onSettled: () => {
            navigate(-1);
            reset();
            setStartDate(null);
            setStartTime(null);
            setEndTime(null);
          },
        }
      );
    }
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
      <AddCategoryBox
        onClick={(value) => {
          reset({ category: value });
        }}
      />
      <FormRowVertical
        label="Description"
        error={errors?.description?.message?.toString()}
      >
        <TextArea id="description" {...register("description")} />
      </FormRowVertical>
      <FormRowVertical>
        <Button primary="form" type="submit" disabled={isCreating}>
          {!isCreating || !isUpdating || !isLoadingTask ? (
            "Create a new task"
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRowVertical>
    </StyledForm>
  );
}

export default CreateEditTask;
