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
import CategoriesBox from "../../UI/CategoriesBox";
import SearchPage from "../../UI/SearchPage";
import { useSearchParams } from "react-router-dom";

function MainLayout() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const { insertSettings } = useCreateSettings();

  const userName = user?.user_metadata.userName
    ? user?.user_metadata.userName
    : user?.user_metadata.full_name;

  useEffect(() => {
    insertSettings(user?.id);
  });

  return (
    <div>
      <MainNav
        name={userName}
        id={user?.id}
        avatar={
          user?.user_metadata.profile_picture
            ? user?.user_metadata.profile_picture
            : user?.user_metadata.avatar_url
        }
      />
      {searchQuery === null ? (
        <>
          <StyledHeader>
            <Heading as={"h1"}>What's up, {userName || "User"}!</Heading>
          </StyledHeader>
          <CategoriesBox />
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
        </>
      ) : (
        <SearchPage query={searchQuery} />
      )}
    </div>
  );
}

export default MainLayout;
