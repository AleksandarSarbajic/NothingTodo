import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styled, { css, keyframes } from "styled-components";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import {
  HiOutlineCheckCircle,
  HiOutlineStar,
  HiPencil,
  HiStar,
  HiTrash,
} from "react-icons/hi2";
import { Database } from "../../services/supabase";
import { ADDITION_WIDTH } from "../../utils/constants";

import { useMeasure } from "react-use";
import useUpdateTask from "./useUpdateTask";
import Menus from "../../UI/Menus";
import { useNavigate } from "react-router-dom";
interface ItemProps {
  item: Database["public"]["Tables"]["Tasks"]["Row"];
  disabled: boolean;
}
interface TaskProps extends ItemProps {
  draggedItemStyle?: React.CSSProperties;
}

interface Status {
  $status?: string | null;
}

const CloseAnimation = keyframes`
0%{
  opacity: 0;
 transform: translate3d(-5px,0,0) ;
}
100%{
  opacity: 1;
  transform: translate3d(0,0,0);
}
`;

const StyledContainer = styled.div<Status>`
  height: 9.6rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 3rem 2.5rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-black-200);
  z-index: 2;

  ${(props) =>
    props.$status === "completed" &&
    css`
      color: var(--color-grey-600);
      background-color: var(--color-black-300);
      text-decoration: line-through;
      animation: ${CloseAnimation} 0.5s;
    `}
`;

const StyledCircle = styled.button<Status>`
  width: 4rem;
  ${(props) =>
    props.$status === "incomplete" &&
    css`
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      border: 2px solid var(--color-grey-300);
    `}

  & svg {
    width: 4rem;
    height: 4rem;
  }
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledTitle = styled.p`
  font-size: 1.8rem;
`;

const DeleteContainer = styled.div`
  position: absolute;
  background-color: var(--color-red-100);
  width: 200%;
  top: 0;
  left: 0;
  height: 100%;
  content: " ";
  transform: translateX(100%);
  padding: 3rem 2.5rem;
  border-radius: 2rem;
  & svg {
    width: 3rem;
    height: 3rem;
  }
`;

const Box = styled.div`
  position: relative;
`;
function Task({ item, disabled, draggedItemStyle }: TaskProps) {
  const navigate = useNavigate();
  const { updateTask, isPending } = useUpdateTask();

  const [ref, { width }] = useMeasure();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    disabled: disabled || isPending,
    data: {
      ListId: item.ListId,
      width: width,
    },
  });

  const draggerStyle = {
    transform: CSS.Transform.toString(transform),
    transition: "transform 0.1s ",
  };
  const deleteStyle = transform
    ? {
        transform: `translate3d(${transform.x + width + ADDITION_WIDTH}px, ${
          transform.y
        }px, 0)`,
        transition: "transform 0.1s ",
      }
    : undefined;

  function handleChecked(type: string = "status") {
    if (type === "status") {
      updateTask({
        newTask: {
          status: item.status === "completed" ? "incomplete" : "completed",
        },
        id: item.id,
      });
    } else {
      updateTask({
        newTask: {
          priority: !item.priority,
        },
        id: item.id,
      });
    }
  }

  return (
    <Box>
      <StyledContainer
        $status={item.status}
        ref={(node) => {
          setNodeRef(node);
          ref(node!);
        }}
        style={{ ...draggerStyle, ...draggedItemStyle }}
        {...attributes}
        {...listeners}
      >
        <StyledBox>
          <StyledCircle
            onClick={() => handleChecked("status")}
            $status={item.status}
          >
            {item.status !== "incomplete" && <HiOutlineCheckCircle />}
          </StyledCircle>
          <StyledTitle>{item.task_name}</StyledTitle>
        </StyledBox>
        {item.status === "incomplete" && (
          <Menus.Menu>
            <Menus.Toggle id={item.id} icon={<PiDotsSixVerticalBold />} />
            <Menus.List id={item.id}>
              <Menus.Button
                icon={<HiPencil />}
                onClick={() => {
                  navigate(`createEditTask?q=${item.ListId}&task=${item.id}`);
                }}
              >
                Edit
              </Menus.Button>
              <Menus.Button
                icon={!item.priority ? <HiOutlineStar /> : <HiStar />}
                onClick={() => handleChecked("priority")}
              >
                Favorite
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        )}
      </StyledContainer>
      <DeleteContainer style={{ ...draggedItemStyle, ...deleteStyle }}>
        <HiTrash />
      </DeleteContainer>
    </Box>
  );
}

export default Task;
