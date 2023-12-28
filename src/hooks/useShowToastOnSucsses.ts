import toast from "react-hot-toast";
import { SettingsType } from "../UI/Notification";
import useLoadSettings from "../features/settings/useLoadSettings";
import { useEffect } from "react";
import { DEFAULT_NOTIFICATIONS_ARRAY } from "../utils/constants";
import { isSameAsCurrentDate } from "../utils/helpers";

export function useShowToastOnSuccess() {
  const { settings = [] } = useLoadSettings();
  const completedArrayLenght =
    (settings as SettingsType)?.completed_array?.length || 0;
  const storedNotification = localStorage.getItem("notification");
  const storedNotificationsMessages = localStorage.getItem("notifications");
  useEffect(() => {
    function showToastOnSuccessHandler() {
      if (storedNotification !== null && storedNotificationsMessages !== null) {
        const notification = JSON.parse(storedNotification);
        const notificationsMessages = JSON.parse(storedNotificationsMessages);
        const derivedValue = completedArrayLenght - notification.length;

        if (
          notificationsMessages.completed.some(
            (val: number) => val === derivedValue
          )
        ) {
          toast(
            `Congratulations you have completed ${derivedValue} tasks today!`,
            {
              icon: "🎊",
            }
          );

          const filteredArray = notificationsMessages.completed.filter(
            (val: number) => val !== derivedValue
          );

          localStorage.setItem(
            "notifications",
            JSON.stringify({ completed: filteredArray, read: [] })
          );
        }
        if (!isSameAsCurrentDate(notification.date)) {
          localStorage.setItem(
            "notifications",
            JSON.stringify({
              completed: DEFAULT_NOTIFICATIONS_ARRAY,
              read: [],
            })
          );
        }
      } else if (storedNotificationsMessages === null) {
        localStorage.setItem(
          "notifications",
          JSON.stringify({
            completed: DEFAULT_NOTIFICATIONS_ARRAY,
            read: [],
          })
        );
      }
    }

    showToastOnSuccessHandler();
  }, [completedArrayLenght, storedNotification, storedNotificationsMessages]);
}
