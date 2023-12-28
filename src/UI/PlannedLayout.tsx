import { useState } from "react";
import StyledHeader from "./Header";
import Heading from "./Heading";
import Menus from "./Menus";
import TaskNav from "./TaskNav";
import ReactDatePicker from "react-datepicker";
import PlannedPickerInput from "./PlannedPickerInput";
import useLoadTasks from "../features/Task/useLoadTasksV2";
import DraggableContainer from "../features/Task/DraggableContainer";
import TasksColumn from "./TasksColumn";
import Modal from "./Modal";
import { HiEye, HiTrash } from "react-icons/hi2";
import SortByModal from "./SortByModal";
import ConfirmDelete from "./ConfrmDelete";
import useDeleteTask from "../features/Task/useDeleteTasks";
import { useNavigate } from "react-router-dom";

function PlannedLayout() {
  const navigate = useNavigate();
  const [searchDate, setSearchDate] = useState<Date | null>(new Date());
  const filter = {
    filterValue: searchDate?.toISOString() || new Date().toISOString(),
    filterField: "due_date",
  };

  const { tasks: filteredTasks = [], isLoading: isLoadingFilteredTasks } =
    useLoadTasks(filter);
  const { tasks: allTasks = [], isLoading: isLoadingTasks } = useLoadTasks({
    filterField: "",
    filterValue: "all",
  });

  const { deleteTasks, isPending } = useDeleteTask();

  return (
    <>
      <Modal>
        <Menus>
          <TaskNav>
            <Menus.Toggle id={"planned"} />
            <Menus.List id={"planned"}>
              <Modal.Open opens="sortBy">
                <Menus.Button icon={<HiEye />}>Sort by</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete All</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </TaskNav>
          <Modal.Window name="sortBy" padding={true}>
            <SortByModal />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isPending}
              resourceName={"Tasks with this date"}
              onConfirm={() => {
                deleteTasks(
                  { filter },
                  { onSuccess: () => navigate("/dashboard") }
                );
              }}
            />
          </Modal.Window>
          <StyledHeader $use="list">
            <Heading as="h2">Planned Tasks</Heading>
          </StyledHeader>
          <ReactDatePicker
            dateFormat={"EEEE, MMMM dd yyyy"}
            selected={searchDate}
            onChange={(date) => setSearchDate(date)}
            withPortal
            portalId="root-portal"
            formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
            customInput={<PlannedPickerInput />}
            dayClassName={(date) => {
              const matchingTasks = allTasks.filter(
                (task) =>
                  task.due_date &&
                  new Date(date.setUTCHours(0, 0, 0, 0))
                    .toISOString()
                    .slice(0, 10) ===
                    new Date(task.due_date).toISOString().slice(0, 10)
              );
              return matchingTasks.length > 0
                ? "react-datepicker__same--day"
                : "";
            }}
          />
          <TasksColumn>
            <DraggableContainer
              tasks={filteredTasks}
              isLoading={isLoadingTasks || isLoadingFilteredTasks}
            />
          </TasksColumn>
        </Menus>
      </Modal>
    </>
  );
}

export default PlannedLayout;
