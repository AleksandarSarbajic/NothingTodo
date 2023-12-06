import Heading from "../../UI/Heading";
import LineThru from "../../UI/LineThru";

import ToggleRow from "../../UI/ToggleRow";
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
      <LineThru $margin={"form"} />
      <Heading as="h6" $caps={true} style={{ marginTop: "3rem" }}>
        General
      </Heading>
      <ToggleRow text="Add a new task on top" />
    </div>
  );
}

export default SettingsLayout;
