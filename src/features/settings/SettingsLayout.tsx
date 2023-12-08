import styled from "styled-components";
import Heading from "../../UI/Heading";
import LineThru from "../../UI/LineThru";
import Spinner from "../../UI/Spinner";

import ToggleRow from "../../UI/ToggleRow";
import { useUser } from "../Auth/useUser";
import UpdateAccout from "./UpdateAccout";
import useLoadSettings from "./useLoadSettings";

const generalArray = [
  "Add new tasks on top",
  "Move starred tasks on top",
  "Show 'Due Today' tasks",
];
const listsArray = ["All", "Important", "Planned", "Completed"];

const StyledGeneralSettings = styled.ul`
  margin: 2.4rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function SettingsLayout() {
  const { user } = useUser();
  const { settings = [], isLoading } = useLoadSettings();

  const filterKeys = (targetWord: string) =>
    Object.entries(settings)
      .filter(([key]) => key.includes(targetWord))
      .map(([key, value]) => ({ key, value }));
  if (isLoading) return <Spinner />;

  return (
    <>
      <UpdateAccout
        email={user?.email}
        fullName={user?.user_metadata.userName}
        avatar={user?.user_metadata.avatar}
      />
      <LineThru $margin={"form"} />
      <Heading as="h6" $caps={true} style={{ marginTop: "3rem" }}>
        General
      </Heading>
      <StyledGeneralSettings>
        {filterKeys("Task").map((item, i) => {
          return (
            <ToggleRow
              id={user?.id}
              type={item.key}
              key={item.key}
              state={item.value as boolean}
              text={generalArray[i]}
            />
          );
        })}
      </StyledGeneralSettings>
      <LineThru $margin={"form"} />
      <Heading as="h6" $caps={true} style={{ marginTop: "3rem" }}>
        Smart Lists
      </Heading>
      <StyledGeneralSettings>
        {[...filterKeys("lists")].map((item, i) => {
          return (
            <ToggleRow
              id={user?.id}
              type={item.key}
              state={item.value as boolean}
              key={item.key}
              text={listsArray[i]}
            />
          );
        })}
      </StyledGeneralSettings>
    </>
  );
}

export default SettingsLayout;
