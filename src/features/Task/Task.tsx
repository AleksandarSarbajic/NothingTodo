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
import { compareTimes, isSameAsCurrentDate } from "../../utils/helpers";

import useLoadSingleList from "../TaskList/useLoadSingleList";
import useLoadSettings from "../settings/useLoadSettings";

import useUpdateSettings from "../settings/useUpdateSettings";
interface ItemProps {
  item: Database["public"]["Tables"]["Tasks"]["Row"];
  disabled: boolean;
}
interface TaskProps extends ItemProps {
  draggedItemStyle?: React.CSSProperties;
}

interface Status {
  $status?: string | null;
  $priority?: boolean | null;
  $timeHasPassed?: boolean | null;
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
  background-color: var(--color-black-100);
  z-index: 2;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: var(--task-hover);
  }

  ${(props) =>
    props.$priority &&
    css`
      color: var(--color-grey-100);
      background-color: var(--color-black-250);
      &:hover {
        background-color: var(--color-black-300);
      }
    `}
  ${(props) =>
    props.$timeHasPassed &&
    css`
      color: var(--color-grey-300);
      background-color: rgba(153, 27, 27, 0.3);
      text-decoration: line-through;
      &:hover {
        background-color: rgba(153, 27, 27, 0.5);
      }
    `}
  ${(props) =>
    props.$status === "completed" &&
    css`
      color: var(--color-grey-600);
      background-color: var(--color-black-300);
      text-decoration: line-through;
      animation: ${CloseAnimation} 0.5s;
      &:hover {
        background-color: var(--color-black-100);
        text-decoration: none;
      }
    `}
`;

const StyledCircle = styled.button<Status>`
  min-width: 4rem;
  width: 4rem;
  ${(props) =>
    props.$status === "incomplete" &&
    css`
      min-width: 4rem;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      border: 2px solid var(--color-grey-300);
    `}

  & svg {
    min-width: 4rem;
    width: 4rem;
    height: 4rem;
  }
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  overflow: hidden;
  height: 4rem;
`;

const StyledTitle = styled.p`
  font-size: 1.8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
    min-width: 3rem;
    width: 3rem;
    height: 3rem;
  }
`;

const Box = styled.div`
  position: relative;
`;

const StyledListName = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-weight: 600;
`;

interface SettingsType {
  all_lists: boolean;
  autohide_lists: boolean | null;
  completed_array: string[] | null;

  user_id: string | null;
}

function Task({ item, disabled, draggedItemStyle }: TaskProps) {
  const navigate = useNavigate();
  const { settings = [] } = useLoadSettings();
  const completedArray = (settings as SettingsType)?.completed_array || [];

  const { updateSetting } = useUpdateSettings();
  const { updateTask, isPending } = useUpdateTask();
  const { list, equal } = useLoadSingleList(item.ListId?.toString());

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
    const currentDateWithoutMilliseconds = new Date();
    currentDateWithoutMilliseconds.setMilliseconds(0);
    if (type === "status") {
      updateTask({
        newTask: {
          status: item.status === "completed" ? "incomplete" : "completed",
          completed_at:
            item.status === "completed"
              ? null
              : currentDateWithoutMilliseconds.toISOString(),
        },
        id: item.id,
      });

      if (settings && completedArray !== undefined) {
        if (item.status === "completed" && item.completed_at !== null) {
          const indexOfItem = completedArray.indexOf(item.completed_at);
          if (indexOfItem !== -1) {
            const updatedCompletedArray = [
              ...completedArray.slice(0, indexOfItem),
              ...completedArray.slice(indexOfItem + 1),
            ];
            updateSetting({
              updatedSettings: {
                completed_array: updatedCompletedArray,
              },
            });
          }
        } else {
          updateSetting({
            updatedSettings: {
              completed_array: [
                ...completedArray,
                currentDateWithoutMilliseconds.toISOString(),
              ],
            },
          });
        }
      }
    } else {
      updateTask({
        newTask: {
          priority: !item.priority,
        },
        id: item.id,
      });
    }
  }

  const comparedDates = isSameAsCurrentDate(item.due_date);
  const comparedTimes = compareTimes(item.end_time) === -1 ? true : false;
  return (
    <Box>
      <StyledContainer
        $status={item.status}
        $priority={item.priority}
        $timeHasPassed={
          item.due_date && item.end_time
            ? comparedDates
              ? comparedTimes
              : false
            : false
        }
        ref={(node) => {
          setNodeRef(node);
          ref(node!);
        }}
        style={{
          ...draggerStyle,
          ...draggedItemStyle,
        }}
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
          <div>
            <StyledTitle>{item.task_name}</StyledTitle>
            {equal && list ? (
              <StyledListName>{list.list_name}</StyledListName>
            ) : (
              ""
            )}
          </div>
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
                {!item.priority ? "Favorite" : "Unfavorite"}
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
