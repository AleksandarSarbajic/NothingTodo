import { HiOutlineBell } from "react-icons/hi2";
import Menus from "./Menus";
import NotificationItem from "./NotificationItem";
import styled from "styled-components";
import useLoadSettings from "../features/settings/useLoadSettings";
import { isSameAsCurrentDate } from "../utils/helpers";
import { useEffect, useState } from "react";
import { DEFAULT_NOTIFICATIONS_ARRAY } from "../utils/constants";

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 2.4rem 1.4rem 2.4rem;
  border-bottom: 1px solid var(--color-black-50);
  gap: 3rem;
  & span {
  }
  & button {
    color: var(--color-red-50);
    font-weight: 600;
    &:hover {
      color: var(--color-red-800);
    }
  }
`;
export interface SettingsType {
  all_lists: boolean;
  autohide_lists: boolean | null;
  completed_array: string[] | null;

  user_id: string | null;
}

function Notification() {
  const { settings = [] } = useLoadSettings();

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("notifications") || "null")
  );

  const storedNotification = localStorage.getItem("notification");
  const storedNotificationsMessages = localStorage.getItem("notifications");
  const completedArrayLenght =
    (settings as SettingsType)?.completed_array?.length || 0;

  function setNotificationHandler() {
    const date = new Date().toISOString();

    if (storedNotification !== null) {
      const notification = JSON.parse(storedNotification);

      if (!isSameAsCurrentDate(notification.date))
        if (completedArrayLenght !== 0) {
          localStorage.setItem(
            "notification",
            JSON.stringify({ date: date, length: completedArrayLenght })
          );
        }
    } else if (storedNotification === null)
      if (completedArrayLenght !== 0) {
        localStorage.setItem(
          "notification",
          JSON.stringify({ date: date, length: completedArrayLenght })
        );
      }
  }

  const filteredNotifications = DEFAULT_NOTIFICATIONS_ARRAY.filter(
    (val) =>
      !(
        storedNotificationsMessages !== null &&
        JSON.parse(storedNotificationsMessages).completed.includes(val)
      )
  );

  const filteredReadNotifications = filteredNotifications.filter(
    (val) => !(items !== null && items.read.includes(val))
  );

  function onClickReadAllHandler() {
    if (storedNotificationsMessages !== null) {
      const notificationsMessages = JSON.parse(storedNotificationsMessages);
      setItems((cur: { completed: number[]; read: number[] }) => {
        return { ...cur, read: [...cur.read, ...filteredReadNotifications] };
      });
      localStorage.setItem(
        "notifications",
        JSON.stringify({
          completed: notificationsMessages.completed,
          read: [...items.read, ...filteredReadNotifications],
        })
      );
    }
  }

  useEffect(() => {
    setNotificationHandler();
  }, [settings]);

  return (
    <>
      <Menus>
        <Menus.Toggle id={"notification"} icon={<HiOutlineBell />} />
        <Menus.List id={"notification"}>
          <StyledBox>
            <span>Notifications</span>
            <button onClick={onClickReadAllHandler}>Read All</button>
          </StyledBox>
          {filteredReadNotifications.map((item) => (
            <NotificationItem
              value={item}
              key={item}
              onClick={(value) =>
                setItems((cur: { completed: number[]; read: number[] }) => {
                  return { ...cur, read: [...cur.read, value] };
                })
              }
            />
          ))}
        </Menus.List>
      </Menus>
    </>
  );
}

export default Notification;
