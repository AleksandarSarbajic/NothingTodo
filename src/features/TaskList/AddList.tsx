import styled from "styled-components";
import Heading from "../../UI/Heading";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useState } from "react";
import useCreateList from "./useCreateList";
import SpinnerMini from "../../UI/SpinnerMini";

const StyledAddList = styled.div``;

const StyledButtonRow = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

interface List {
  onCloseModal?: () => void;
  disabled?: boolean;
}

function AddList({ onCloseModal, disabled }: List) {
  const [listName, setListName] = useState("");
  const { createList, isPending } = useCreateList();
  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!listName) return;

    createList(listName, {
      onSuccess: () => {
        onCloseModal?.();
        setListName("");
      },
    });
  }

  return (
    <StyledAddList>
      <Heading as="h5" $margin={1}>
        New List
      </Heading>
      <form onSubmit={onSubmitHandler}>
        <FormRowVertical>
          <Input
            id="listName"
            name="listName"
            placeholder="Enter list title"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </FormRowVertical>
        <StyledButtonRow>
          <Button primary="modal" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button
            type="submit"
            primary="modal"
            secondary="modalRed"
            disabled={listName.length === 0 || disabled}
          >
            {!isPending ? " Create List" : <SpinnerMini />}
          </Button>
        </StyledButtonRow>
      </form>
    </StyledAddList>
  );
}

export default AddList;
