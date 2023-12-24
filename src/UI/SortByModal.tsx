import styled from "styled-components";
import SortBy from "./SortBy";
import Heading from "./Heading";
import {
  HiOutlineCalendarDays,
  HiOutlineStar,
  HiOutlineArrowsUpDown,
  HiCheck,
} from "react-icons/hi2";
import { BsSortNumericDownAlt, BsSortNumericUpAlt } from "react-icons/bs";

const sort_options_tasks = [
  { value: "name-asc", label: "Name (A-Z)", icon: <HiOutlineArrowsUpDown /> },
  { value: "name-desc", label: "Name (Z-A)", icon: <HiOutlineArrowsUpDown /> },
  {
    value: "importance-asc",
    label: "Importance (on top)",
    icon: <HiOutlineStar />,
  },
  {
    value: "importance-desc",
    label: "Importance (on bottom)",
    icon: <HiOutlineStar />,
  },
  {
    value: "dueDate-asc",
    label: "Due Date (closest first)",
    icon: <HiOutlineCalendarDays />,
  },
  {
    value: "dueDate-desc",
    label: "Due Date (furthest first)",
    icon: <HiOutlineCalendarDays />,
  },
];
const sort_options_categories = [
  { value: "name-asc", label: "Name (A-Z)", icon: <HiOutlineArrowsUpDown /> },
  { value: "name-desc", label: "Name (Z-A)", icon: <HiOutlineArrowsUpDown /> },
  {
    value: "number-of-tasks-asc",
    label: "Number of tasks (9-1)",
    icon: <BsSortNumericDownAlt />,
  },
  {
    value: "number-of-tasks-desc",
    label: "Number of tasks (1-9)",
    icon: <BsSortNumericUpAlt />,
  },
  {
    value: "progress-asc",
    label: "Progress (completed first)",
    icon: <HiCheck />,
  },
  {
    value: "progress-desc",
    label: "Progress (uncompleted first)",
    icon: <HiCheck />,
  },
];

const StyledSortByModal = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3.6rem;
`;

function SortByModal({
  onCloseModal,
  option = "tasks",
}: {
  onCloseModal?: () => void;
  option?: string;
}) {
  const sortArray =
    option === "tasks" ? sort_options_tasks : sort_options_categories;

  return (
    <>
      <Heading as={"h5"} style={{ padding: "0 0 0 4rem" }}>
        Sort by
      </Heading>
      <StyledSortByModal>
        {sortArray.map((item) => (
          <SortBy
            onCloseModal={onCloseModal}
            value={item.value}
            label={item.label}
            icon={item.icon}
            key={item.value}
          />
        ))}
      </StyledSortByModal>
    </>
  );
}

export default SortByModal;
