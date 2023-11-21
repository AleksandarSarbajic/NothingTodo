import styled from "styled-components";
import MainImportant from "./MainImportant";
import TaskList from "../TaskList/TaskList";
import MainNav from "./MainNav";
import StyledHeader from "../../UI/Header";
import Heading from "../../UI/Heading";
import Button from "../../UI/Button";
import { HiPlus } from "react-icons/hi2";
import { useUser } from "../Auth/useUser";

import Modal from "../../UI/Modal";
import AddEditList from "../TaskList/AddEditList";

const StledAppLayout = styled.div`
  max-height: 100dvh;
`;

function MainLayout() {
  const { user } = useUser();

  return (
    <StledAppLayout>
      <MainNav />
      <StyledHeader>
        <Heading as={"h1"}>What's up, {user?.user_metadata.userName}!</Heading>
      </StyledHeader>
      <MainImportant />
      <TaskList />
      <Modal>
        <Modal.Open opens="delete">
          <Button>
            <HiPlus />
          </Button>
        </Modal.Open>
        <Modal.Window name="delete">
          <AddEditList />
        </Modal.Window>
      </Modal>
    </StledAppLayout>
  );
}

export default MainLayout;
