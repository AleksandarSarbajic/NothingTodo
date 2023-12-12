import { HiEye } from "react-icons/hi2";
import CategoriesBox from "../../UI/CategoriesBox";
import Menus from "../../UI/Menus";
import TaskNav from "../../UI/TaskNav";

function CategoriesLayout() {
  return (
    <div>
      <Menus>
        <TaskNav>
          <Menus.Toggle id={"text"} />
          <Menus.List id={"text"}>
            <Menus.Button icon={<HiEye />}>Sort by</Menus.Button>
          </Menus.List>
        </TaskNav>
        <CategoriesBox layout={true} />
      </Menus>
    </div>
  );
}

export default CategoriesLayout;
