import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import styled from "styled-components";
import useLogOut from "../features/Auth/useLogOut";
import SpinnerMini from "./SpinnerMini";

const StyledLogout = styled.button`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--color-red-100);
  font-size: 1.8rem;
`;
function Logout() {
  const { logout, isPending } = useLogOut();
  return (
    <StyledLogout onClick={() => logout()}>
      {!isPending ? (
        <>
          <HiOutlineArrowRightOnRectangle />
        </>
      ) : (
        <SpinnerMini />
      )}
      Log out
    </StyledLogout>
  );
}

export default Logout;
