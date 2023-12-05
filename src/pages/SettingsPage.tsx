import Heading from "../UI/Heading";
import TaskNav from "../UI/TaskNav";
import SettingsLayout from "../features/settings/SettingsLayout";

function SettingsPage() {
  return (
    <>
      <TaskNav center={true}>
        <Heading as={"h5"}>Settings</Heading>
      </TaskNav>
      <SettingsLayout />
    </>
  );
}

export default SettingsPage;
