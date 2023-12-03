import styled from "styled-components";
import Heading from "./Heading";

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;

  align-items: center;

  width: 100%;
  padding-top: 25%;
`;

function EmptyTasks() {
  return (
    <CenterDiv>
      <Heading>Nothing to-do. Enjoy!</Heading>
    </CenterDiv>
  );
}

export default EmptyTasks;
