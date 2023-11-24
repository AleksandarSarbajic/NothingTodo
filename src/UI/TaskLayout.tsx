import styled from "styled-components";
import TaskNav from "./TaskNav";
import Modal from "./Modal";
import { HiEye, HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Menus from "./Menus";
import AddEditList from "../features/TaskList/AddEditList";
import ConfirmDelete from "./ConfrmDelete";
import useDeleteList from "../features/TaskList/useDeleteList";
import useCreateList from "../features/TaskList/useCreateList";
import { useNavigate } from "react-router-dom";

const StyledTaskLayout = styled.div``;

interface ListProps {
  id: number;
  created_at: string;
  edited_at: string;
  user_id: string;
  list_name: string;
}
interface TaskProps {
  children: React.ReactNode;
  list: ListProps;
}

function TaskLayout({ children, list }: TaskProps) {
  const { deleteList, isPending: isDeleting } = useDeleteList();
  const { createList, isPending: isCreating } = useCreateList();
  const navigate = useNavigate();
  return (
    <StyledTaskLayout>
      <TaskNav center={false}>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={list.id} />
              <Menus.List id={list.id}>
                <Modal.Open opens="rename">
                  <Menus.Button icon={<HiPencil />}>Rename list</Menus.Button>
                </Modal.Open>
                <Menus.Button icon={<HiEye />}>Sort by</Menus.Button>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={() => {
                    createList(`Copy of ${list.list_name}`);
                    navigate(-1);
                  }}
                  disabled={isCreating}
                >
                  Duplicate list
                </Menus.Button>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete list</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </Menus>
          <Modal.Window name="rename">
            <AddEditList
              rename={true}
              inputValue={list.list_name}
              id={list.id}
            />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={list.list_name}
              disabled={isDeleting}
              onConfirm={() => deleteList(list.id)}
            />
          </Modal.Window>
        </Modal>
      </TaskNav>
      {children}
    </StyledTaskLayout>
  );
}

export default TaskLayout;
