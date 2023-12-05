import { useUser } from "../Auth/useUser";
import UpdateAccout from "./UpdateAccout";

function SettingsLayout() {
  const { user } = useUser();

  return (
    <div>
      <UpdateAccout
        email={user?.email}
        fullName={user?.user_metadata.userName}
        avatar={user?.user_metadata.avatar}
      />
    </div>
  );
}

export default SettingsLayout;
