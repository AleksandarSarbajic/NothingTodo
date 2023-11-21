import styled from "styled-components";
import TaskNav from "./TaskNav";
import Modal from "./Modal";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import Menus from "./Menus";
import AddEditList from "../features/TaskList/AddEditList";
import ConfirmDelete from "./ConfrmDelete";
import useDeleteList from "../features/TaskList/useDeleteList";

const StyledTaskLayout = styled.div``;

interface TaskProps {
  children: React.ReactNode;
  id: number;
  name: string;
}

function TaskLayout({ children, id, name }: TaskProps) {
  const { deleteList, isPending: isDeleting } = useDeleteList();

  return (
    <StyledTaskLayout>
      <TaskNav>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Modal.Open opens="rename">
                  <Menus.Button icon={<HiPencil />}>Rename list</Menus.Button>
                </Modal.Open>
                <Menus.Button icon={<HiEye />}>Sort by</Menus.Button>
                <Menus.Button icon={<HiEye />}>Duplicate list</Menus.Button>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete list</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </Menus>
          <Modal.Window name="rename">
            <AddEditList rename={true} inputValue={name} id={id} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={name}
              disabled={isDeleting}
              onConfirm={() => deleteList(id)}
            />
          </Modal.Window>
        </Modal>
      </TaskNav>
      {children}
    </StyledTaskLayout>
  );
}

export default TaskLayout;
