import styled from "styled-components";
import MainImportant from "./MainImportant";
import TaskList from "../TaskList/TaskList";
import MainNav from "./MainNav";
import StyledHeader from "../../UI/Header";
import Heading from "../../UI/Heading";
import Button from "../../UI/Button";

const StledAppLayout = styled.div`
  max-height: 100dvh;
`;

function MainLayout() {
  return (
    <StledAppLayout>
      <MainNav />
      <StyledHeader>
        <Heading as={"h1"}>What's up, Aleksandar!</Heading>
      </StyledHeader>
      <MainImportant />
      <TaskList />
      <Button />
    </StledAppLayout>
  );
}

export default MainLayout;
