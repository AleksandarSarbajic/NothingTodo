import styled, { css } from "styled-components";
import Heading from "./Heading";
import { Link, useLocation } from "react-router-dom";
import {
  HiBars3,
  HiOutlineBell,
  HiOutlineChartPie,
  HiOutlineCog6Tooth,
  HiXMark,
} from "react-icons/hi2";
import { BiCategory } from "react-icons/bi";
import Search from "./Search";
import { useEffect, useState } from "react";
import Logout from "./Logout";
import NavProgressBar from "./NavProgressBar";

interface UserProps {
  name: string;
  id?: string;
  avatar: string;
}
interface MobileProps {
  $open?: boolean;
  $type?: string;
}

const StyledNav = styled.nav`
  max-width: 135rem;
  padding-bottom: 2rem;
`;

const StyledLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & svg {
    width: 3rem;
    height: 3rem;
  }
`;

const StyledMenu = styled.button<MobileProps>`
  margin-left: -0.5rem;
  position: relative;
  & svg {
    width: 4rem;
    height: 4rem;
  }

  ${(props) =>
    props.$type &&
    css`
      display: none;
    `}

  ${(props) =>
    props.$open &&
    css`
      display: inline-block;
      position: fixed;
      top: 2%;
      right: 6%;
      border-radius: 50%;
      padding: 0.5rem;

      &:hover {
        color: var(--color-grey-100);
        background-color: var(--color-red-100);
      }
      & svg {
        width: 3.6rem;
        height: 3.6rem;
      }
    `}
`;

const StyledList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  gap: 2.4rem;
  order: 3;
`;
const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-bottom: 3.6rem;
`;
const StyledAvatar = styled.img`
  width: 12rem;
  height: 12rem;
  margin-bottom: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  gap: 1.6rem;
`;

const StyledMobileBox = styled.div<MobileProps>`
  display: flex;
  flex-direction: column;

  padding: 15dvh 5dvw 0 35dvw;
  width: 100%;
  position: fixed;

  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  height: 100dvh;
  width: 100%;

  background-color: var(--color-black-100);
  border-top-right-radius: 4rem;
  border-bottom-right-radius: 4rem;
  z-index: 5;

  ${(props) =>
    !props.$open &&
    css`
      left: -50%;
      transform: translate(-50%, -50%);
    `}
  transition:all 0.3s;
`;

const StyledSearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Layout = styled.div<MobileProps>`
  display: none;
  z-index: 1;
  content: " ";
  ${(props) =>
    props.$open &&
    css`
      display: block;
      width: 100%;
      height: 100dvh;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
`;

const AvatarBox = styled.div`
  position: relative;
`;

function MainNav({ name, avatar }: UserProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen((cur) => !cur);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <StyledNav>
      <Layout $open={isOpen} onClick={open} />
      <StyledLayout>
        <StyledMenu $open={false} onClick={() => setIsOpen((cur) => !cur)}>
          <HiBars3 />
        </StyledMenu>

        <StyledMobileBox $open={isOpen}>
          <StyledHeader>
            <AvatarBox>
              <NavProgressBar />
              <StyledAvatar src={avatar || "default-user.jpg"} />
            </AvatarBox>
            <Heading as="h3">{name}</Heading>
          </StyledHeader>
          <StyledList>
            <li>
              <StyledLink to={"/categories"}>
                <BiCategory /> Categories
              </StyledLink>
            </li>
            <li>
              <StyledLink to={"/settings"}>
                <HiOutlineChartPie /> Analytics
              </StyledLink>
            </li>
            <li>
              <StyledLink to={"/settings"}>
                <HiOutlineCog6Tooth /> Settings
              </StyledLink>
            </li>
            <li>
              <Logout />
            </li>
          </StyledList>
          <StyledMenu
            $type="cross"
            $open={isOpen}
            onClick={() => setIsOpen((cur) => !cur)}
          >
            <HiXMark />
          </StyledMenu>
        </StyledMobileBox>
        <StyledSearchBox>
          <Search />
          <HiOutlineBell />
        </StyledSearchBox>
      </StyledLayout>
    </StyledNav>
  );
}

export default MainNav;
