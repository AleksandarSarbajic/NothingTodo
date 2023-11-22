import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface ConfirmProps {
  resourceName: string;
  onConfirm?: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
}

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmProps) {
  return (
    <StyledConfirmDelete>
      <Heading as="h5">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this "{resourceName}" permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button primary="modal" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          primary="modal"
          secondary="modalRed"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
