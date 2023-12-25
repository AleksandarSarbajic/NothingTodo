import styled from "styled-components";
import Heading from "../../UI/Heading";
import LineThru from "../../UI/LineThru";

import ToggleRow from "../../UI/ToggleRow";
import { useUser } from "../Auth/useUser";
import UpdateAccout from "./UpdateAccout";
import useLoadSettings from "./useLoadSettings";
import {
  ABOUT_SETTINGS_ARRAY,
  CONNECT_SETTINGS_ARRAY,
  GENERAL_SETTINGS_ARRAY,
  HELP_SETTINGS_ARRAY,
  LISTS_SETTINGS_ARRAY,
} from "../../utils/constants";
import SettingsLink from "../../UI/SettingsLink";

import {
  HiOutlineCalendarDays,
  HiCheck,
  HiOutlineStar,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi2";
import { PiInfinity } from "react-icons/pi";
import Menus from "../../UI/Menus";
import { useDarkMode } from "../../context/DarkModeContext";
import SpinnerFullPage from "../../UI/SpinnerFullPage";

const StyledGeneralSettings = styled.ul`
  margin: 2.4rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledToggle = styled.div`
  margin-left: -1.5rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  & p {
    font-size: 1.8rem;
  }
  & span {
    color: var(--color-grey-550);
  }
  &:hover {
    background-color: var(--line-color);
  }
`;

const iconsArray = [
  <PiInfinity />,
  <HiOutlineStar />,
  <HiOutlineCalendarDays />,
  <HiCheck />,
];

function SettingsLayout() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user } = useUser();
  const { settings = [], isLoading } = useLoadSettings();

  const filterKeys = (targetWord: string) =>
    Object.entries(settings)
      .filter(([key]) => key.includes(targetWord))
      .map(([key, value]) => ({ key, value }));
  if (isLoading) return <SpinnerFullPage />;

  return (
    <>
      <UpdateAccout
        email={user?.email}
        fullName={
          user?.user_metadata.userName
            ? user?.user_metadata.userName
            : user?.user_metadata.full_name
        }
        avatar={
          user?.user_metadata.profile_picture
            ? user?.user_metadata.profile_picture
            : user?.user_metadata.avatar_url
        }
      />
      <LineThru $margin={"form"} />
      <Heading as="h6" $caps={true} style={{ marginTop: "3rem" }}>
        General
      </Heading>
      <StyledGeneralSettings>
        {filterKeys("Task").map((item, i) => {
          return (
            <ToggleRow
              type={item.key}
              key={item.key}
              state={item.value as boolean}
              text={GENERAL_SETTINGS_ARRAY[i]}
            />
          );
        })}
        <Menus>
          <Menus.Toggle
            id={"theme"}
            text={
              <StyledToggle>
                <p>Theme</p>{" "}
                <span>{isDarkMode ? "Dark theme" : "Light theme"}</span>
              </StyledToggle>
            }
          />
          <Menus.List id={"theme"}>
            <Menus.Button
              icon={<HiOutlineSun />}
              onClick={() => toggleDarkMode(false)}
            >
              Light Theme
            </Menus.Button>
            <Menus.Button
              icon={<HiOutlineMoon />}
              onClick={() => toggleDarkMode(true)}
            >
              Dark Theme
            </Menus.Button>
          </Menus.List>
        </Menus>
      </StyledGeneralSettings>
      <LineThru $margin={"form"} />
      <Heading as="h6" $caps={true} style={{ marginTop: "3rem" }}>
        Smart Lists
      </Heading>
      <StyledGeneralSettings>
        {[...filterKeys("lists")].map((item, i) => {
          return (
            <ToggleRow
              type={item.key}
              state={item.value as boolean}
              key={item.key}
              text={LISTS_SETTINGS_ARRAY[i]}
              icon={iconsArray[i]}
            />
          );
        })}
      </StyledGeneralSettings>
      <LineThru $margin={"form"} />
      <Heading as="h6" $caps={true} style={{ marginTop: "3rem" }}>
        Help & feedback
      </Heading>
      <StyledGeneralSettings>
        {HELP_SETTINGS_ARRAY.map((item) => (
          <SettingsLink link={item.link} text={item.text} key={item.text} />
        ))}
      </StyledGeneralSettings>
      <LineThru $margin={"form"} />
      <Heading as="h6" $caps={true} style={{ marginTop: "3rem" }}>
        Connect
      </Heading>
      <StyledGeneralSettings>
        {CONNECT_SETTINGS_ARRAY.map((item) => (
          <SettingsLink link={item.link} text={item.text} key={item.text} />
        ))}
      </StyledGeneralSettings>
      <LineThru $margin={"form"} />
      <Heading as="h6" $caps={true} style={{ marginTop: "3rem" }}>
        About
      </Heading>
      <StyledGeneralSettings>
        {ABOUT_SETTINGS_ARRAY.map((item) => (
          <SettingsLink link={item.link} text={item.text} key={item.text} />
        ))}
      </StyledGeneralSettings>
    </>
  );
}

export default SettingsLayout;
