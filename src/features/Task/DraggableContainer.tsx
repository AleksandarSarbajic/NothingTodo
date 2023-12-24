import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  DndContext,
  closestCenter,
  useSensor,
  TouchSensor,
  useSensors,
  MouseSensor,
  DragEndEvent,
} from "@dnd-kit/core";

import Task from "./Task";

import useDeleteTask from "./useDeleteTask";
import { ADDITION_WIDTH } from "../../utils/constants";
import { useState } from "react";
import { Database } from "../../services/supabase";
import { useCloseMenus } from "../../UI/Menus";
import EmptyTasks from "../../UI/EmptyTasks";
import useLoadSettings from "../settings/useLoadSettings";
import ThreeDotsLoading from "../../UI/ThreeDotsLoading";
import {
  sortByDueDate,
  sortByEditedAt,
  sortByPriority,
  sortByStatus,
} from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { sortByName } from "../../utils/helpers";

interface ItemStyles {
  [itemId: number]: React.CSSProperties;
}

interface PropsTypes {
  tasks: Database["public"]["Tables"]["Tasks"]["Row"][];
  isLoading: boolean;
}

function DraggableContainer({ tasks, isLoading }: PropsTypes) {
  const [searchPararms] = useSearchParams();
  const sortBy = searchPararms.get("sortBy");
  const { settings } = useLoadSettings();
  const { deleteTask, isPending } = useDeleteTask();
  const { close } = useCloseMenus();
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 10,
        distance: 10,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const [draggedItemStyle, setDraggedItemStyle] = useState<ItemStyles>({});
  function handleDragEnd(event: DragEndEvent) {
    if (
      event.delta.x < -(event.active.data.current?.width / 2 + ADDITION_WIDTH)
    ) {
      deleteTask({ id: +event.active.id });

      setDraggedItemStyle((prevStyles) => ({
        ...prevStyles,
        [event.active.id]: {
          transform: `translate3d(${
            -event.active.data.current?.width - ADDITION_WIDTH
          }px, ${0}px, 0)`,
        },
      }));
    }
  }

  const sortTasksSortBy =
    sortBy === "name-asc"
      ? tasks?.slice().sort((a, b) => sortByName(a, b, true))
      : sortBy === "name-desc"
      ? tasks?.slice().sort((a, b) => sortByName(a, b, false))
      : sortBy === "importance-asc"
      ? tasks?.slice().sort((a, b) => sortByPriority(a, b, undefined, true))
      : sortBy === "importance-desc"
      ? tasks?.slice().sort((a, b) => sortByPriority(a, b, undefined, false))
      : sortBy === "dueDate-asc"
      ? tasks?.slice().sort((a, b) => sortByDueDate(a, b, true))
      : sortBy === "dueDate-desc"
      ? tasks?.slice().sort((a, b) => sortByDueDate(a, b, false))
      : tasks?.slice().sort((a, b) => sortByEditedAt(a, b, settings));

  const sortedTasks = !sortBy
    ? tasks
        ?.slice()
        .sort((a, b) => sortByEditedAt(a, b, settings))
        .sort((a, b) => sortByPriority(a, b, settings))
        .sort(sortByStatus)
    : sortTasksSortBy;

  if (isLoading || !tasks) return <ThreeDotsLoading alone={true} />;

  if (tasks.length === 0) return <EmptyTasks />;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={() => close()}
      modifiers={[restrictToHorizontalAxis]}
      autoScroll={false}
    >
      {sortedTasks.map((item) => (
        <Task
          key={item.id}
          item={item}
          disabled={isPending || isLoading}
          draggedItemStyle={draggedItemStyle[item.id] || {}}
        />
      ))}
    </DndContext>
  );
}

export default DraggableContainer;
