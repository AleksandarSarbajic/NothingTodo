import { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.li`
  font-size: 1.6rem;
  padding: 1.4rem 2.4rem 1.4rem 2.4rem;
  min-width: 37.5rem;
  border-bottom: 1px solid var(--color-black-50);
  &:hover {
    background-color: var(--color-black-300);
  }
`;
const StyledButton = styled.button`
  color: var(--color-red-50);
`;

function NotificationItem({
  value,
  onClick,
}: {
  value: number;
  onClick: (value: number) => void;
}) {
  const [isShown, setIsShown] = useState(false);
  const storedNotificationsMessages = localStorage.getItem("notifications");
  function onClickHandler() {
    if (storedNotificationsMessages !== null) {
      onClick(value);
      const notificationsMessages = JSON.parse(storedNotificationsMessages);
      localStorage.setItem(
        "notifications",
        JSON.stringify({
          completed: notificationsMessages.completed,
          read: [...notificationsMessages.read, value],
        })
      );
    }
  }
  return (
    <StyledContainer
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {!isShown ? (
        `You have completed ${value} tasks today`
      ) : (
        <StyledButton onClick={onClickHandler}>Delete</StyledButton>
      )}
    </StyledContainer>
  );
}

export default NotificationItem;
