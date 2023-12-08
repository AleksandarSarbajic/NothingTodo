import {
  DndContext,
  closestCenter,
  useSensor,
  TouchSensor,
  useSensors,
  MouseSensor,
  DragEndEvent,
} from "@dnd-kit/core";

import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import Task from "./Task";

import useDeleteTask from "./useDeleteTask";
import { ADDITION_WIDTH } from "../../utils/constants";
import { useState } from "react";
import { Database } from "../../services/supabase";
import { useCloseMenus } from "../../UI/Menus";
import EmptyTasks from "../../UI/EmptyTasks";
import useLoadSettings from "../settings/useLoadSettings";

interface ItemStyles {
  [itemId: number]: React.CSSProperties;
}

interface PropsTypes {
  tasks: Database["public"]["Tables"]["Tasks"]["Row"][];
  isLoading: boolean;
}

function DraggableContainer({ tasks, isLoading }: PropsTypes) {
  const { settings } = useLoadSettings();
  const { deleteTask, isPending } = useDeleteTask();
  const { close } = useCloseMenus();
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
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

  function handleDragStart() {
    close();
  }

  function sortByStatus(
    a: Database["public"]["Tables"]["Tasks"]["Row"],
    b: Database["public"]["Tables"]["Tasks"]["Row"]
  ) {
    if (a.status === "completed" && b.status === "incomplete") {
      return 1;
    } else if (a.status === "incomplete" && b.status === "completed") {
      return -1;
    } else {
      return 0;
    }
  }

  function sortByEditedAt(
    a: Database["public"]["Tables"]["Tasks"]["Row"],
    b: Database["public"]["Tables"]["Tasks"]["Row"]
  ) {
    const dateA = a.edited_at ? new Date(a.edited_at).getTime() : 0;
    const dateB = b.edited_at ? new Date(b.edited_at).getTime() : 0;
    if (settings?.newTaskOnTop) return dateB - dateA;

    return dateA - dateB;
  }

  function sortByPriority(
    a: Database["public"]["Tables"]["Tasks"]["Row"],
    b: Database["public"]["Tables"]["Tasks"]["Row"]
  ) {
    if (settings?.primaryTaskOnTop)
      return a.priority === b.priority ? 0 : a.priority ? -1 : 1;

    return a.priority === b.priority ? 0 : a.priority ? 1 : -1;
  }

  if (isLoading || !tasks) return <p>Loading...</p>;

  if (tasks.length === 0) return <EmptyTasks />;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      modifiers={[restrictToHorizontalAxis]}
    >
      {tasks
        ?.slice()
        .sort(sortByEditedAt)
        .sort(sortByPriority)
        .sort(sortByStatus)

        .map((item) => (
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
