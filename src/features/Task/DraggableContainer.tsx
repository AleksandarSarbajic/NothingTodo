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
import useLoadTasks from "./useLoadTasks";
import useDeleteTask from "./useDeleteTask";
import { ADDITION_WIDTH } from "../../utils/constants";
import { useState } from "react";
import { Database } from "../../services/supabase";

interface ItemStyles {
  [itemId: number]: React.CSSProperties;
}

function DraggableContainer() {
  const { tasks, isLoading } = useLoadTasks();
  const { deleteTask, isPending } = useDeleteTask();
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
      console.log(
        event.delta.x,
        -(event.active.data.current?.width / 2 + ADDITION_WIDTH)
      );

      deleteTask(+event.active.id);

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

  if (isLoading || !tasks) return <p>Loading...</p>;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      {tasks
        ?.slice()
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
