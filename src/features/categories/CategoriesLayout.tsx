import { HiEye } from "react-icons/hi2";
import CategoriesBox from "../../UI/CategoriesBox";
import Menus from "../../UI/Menus";
import TaskNav from "../../UI/TaskNav";
import Modal from "../../UI/Modal";
import SortByModal from "../../UI/SortByModal";

function CategoriesLayout() {
  return (
    <div>
      <Modal>
        <Menus>
          <TaskNav direction="/dashboard">
            <Menus.Toggle id={"text"} />
            <Menus.List id={"text"}>
              <Modal.Open opens="sortBy">
                <Menus.Button icon={<HiEye />}>Sort by</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="sortBy" padding={true}>
              <SortByModal option="categories" />
            </Modal.Window>
          </TaskNav>
          <CategoriesBox layout={true} />
        </Menus>
      </Modal>
    </div>
  );
}

export default CategoriesLayout;
