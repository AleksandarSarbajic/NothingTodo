import styled from "styled-components";
import Heading from "../../UI/Heading";
import FormRowVertical from "../../UI/FormRowVertical";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useState } from "react";
import useCreateList from "./useCreateList";
import SpinnerMini from "../../UI/SpinnerMini";
import useUpdateList from "./useUpdateList";
import { toast } from "react-hot-toast";

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
  rename?: boolean;
  inputValue?: string;
  id?: number;
}

function AddEditList({
  onCloseModal,
  disabled,
  rename,
  inputValue = "",
  id,
}: List) {
  const [list_name, setListName] = useState(inputValue);
  const { createList, isPending: isCreating } = useCreateList();
  const { updateList, isPending: isUpdating } = useUpdateList(id);

  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!list_name) return;

    if (!rename) {
      createList(list_name, {
        onSuccess: () => {
          onCloseModal?.();
          setListName("");
        },
      });
    } else {
      if (inputValue === list_name)
        return toast.error("You are using the same name");
      updateList(
        { newList: { list_name }, id },
        {
          onSuccess: () => {
            onCloseModal?.();
            setListName("");
          },
        }
      );
    }
  }

  return (
    <StyledAddList>
      <Heading as="h5" $margin={1}>
        {rename ? "Rename List" : "New List"}
      </Heading>
      <form onSubmit={onSubmitHandler}>
        <FormRowVertical>
          <Input
            id="listName"
            name="listName"
            placeholder="Enter list title"
            value={list_name}
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
            disabled={list_name.length === 0 || disabled}
          >
            {isCreating || isUpdating ? (
              <SpinnerMini />
            ) : !rename ? (
              "Create List"
            ) : (
              "Save"
            )}
          </Button>
        </StyledButtonRow>
      </form>
    </StyledAddList>
  );
}

export default AddEditList;
