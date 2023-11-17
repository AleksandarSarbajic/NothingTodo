import styled from "styled-components";
import MainImportant from "./MainImportant";
// import TaskList from "../TaskList/TaskList";
import MainNav from "./MainNav";
import StyledHeader from "../../UI/Header";
import StyledHeading from "../../UI/Heading";
import Button from "../../UI/Button";

const StledAppLayout = styled.div``;

function MainLayout() {
  return (
    <StledAppLayout>
      <MainNav />
      <StyledHeader>
        <StyledHeading as={"h1"}>What's up, Aleksandar!</StyledHeading>
      </StyledHeader>
      <MainImportant />
      <Button></Button>
    </StledAppLayout>
  );
}

export default MainLayout;
