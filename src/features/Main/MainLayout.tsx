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
import { useEffect } from "react";
import useCreateSettings from "../settings/useCreateSettings";
import Spinner from "../../UI/Spinner";

const StyledAppLayout = styled.div`
  max-height: 100dvh;
`;

function MainLayout() {
  const { user } = useUser();
  const { insertSettings, isPending } = useCreateSettings();
  console.log(user);
  useEffect(() => {
    insertSettings(user?.id);
  });

  if (!isPending)
    return (
      <StyledAppLayout>
        <Spinner />
      </StyledAppLayout>
    );

  return (
    <StyledAppLayout>
      <MainNav
        name={user?.user_metadata.full_name}
        id={user?.id}
        avatar={
          user?.user_metadata.profile_picture
            ? user?.user_metadata.profile_picture
            : user?.user_metadata.avatar_url
        }
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
    </StyledAppLayout>
  );
}

export default MainLayout;
