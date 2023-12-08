import styled from "styled-components";
import MainImportant from "./MainImportant";
import TaskList from "../TaskList/TaskList";

import StyledHeader from "../../UI/Header";
import Heading from "../../UI/Heading";
import Button from "../../UI/Button";
import { HiPlus } from "react-icons/hi2";
import { useUser } from "../Auth/useUser";

import Modal from "../../UI/Modal";
import AddEditList from "../TaskList/AddEditList";
import MainNav from "../../UI/MainNav";
import useDetectCreateSettings from "../settings/useDetectCreateSettings";
import { useEffect } from "react";

const StledAppLayout = styled.div`
  max-height: 100dvh;
`;

function MainLayout() {
  const { insertSettings, isPending } = useDetectCreateSettings();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await insertSettings();
        window.location.reload();
      } catch (error) {
        console.error("Error inserting settings:", error);
      }
    };

    fetchData();
  }, [insertSettings]);

  const { user } = useUser();

  if (isPending) return <p>loading...</p>;

  return (
    <StledAppLayout>
      <MainNav
        name={user?.user_metadata.full_name}
        id={user?.id}
        avatar={user?.user_metadata.avatar_url}
      />
      <StyledHeader>
        <Heading as={"h1"}>What's up, {user?.user_metadata.full_name}!</Heading>
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
