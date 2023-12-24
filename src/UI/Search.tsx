import { useEffect, useRef, useState } from "react";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useSearchParams } from "react-router-dom";

interface SearchProps {
  $isOpen?: boolean;
  $length?: boolean;
}

const StyledContainer = styled.div`
  position: relative;
`;
const StyledSearch = styled.input<SearchProps>`
  padding: 0.7rem 2rem;
  opacity: 0;
  width: 0rem;

  border: none;
  background-color: var(--color-grey-750);
  border-radius: 1.8rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-100);
  &::placeholder {
    color: var(--color-grey-400);
  }

  ${(props) =>
    props.$isOpen &&
    css`
      padding: 0.7rem 4.4rem;
      opacity: 1;
      width: 25rem;
      transition: all 1s;
    `}
`;

const StyledButton = styled.button<SearchProps>`
  position: absolute;
  top: 0.4rem;
  right: 0;
  z-index: 3;
  width: 3rem;
  height: 3rem;
  & svg {
    width: 3rem;
    height: 3rem;
  }
  ${(props) =>
    props.$isOpen &&
    css`
      left: 1rem;
    `}
`;
const StyledCancel = styled.button<SearchProps>`
  position: absolute;
  top: 0.4rem;
  right: 1rem;
  z-index: 2;
  width: 3rem;
  height: 3rem;
  display: none;
  transition: all 0.3s;
  & svg {
    width: 3rem;
    height: 3rem;
  }
  &:hover {
    color: var(--color-red-700);
  }
  ${(props) =>
    props.$length &&
    css`
      display: block;
    `}
`;

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const clear = () => setSearchQuery("");

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const searchInputRef = useRef<HTMLInputElement>(null);

  function deleteQuery() {
    searchParams.delete("search");
    setSearchParams(searchParams);
  }

  function handleFocus() {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }

  const handleButtonClick = () => {
    setIsOpen((cur) => !cur);
    handleFocus();
  };

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      deleteQuery();
    } else {
      searchParams.set("search", event.target.value);
      setSearchParams(searchParams);
    }
  }

  useEffect(() => {
    deleteQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer ref={ref}>
      <StyledSearch
        ref={searchInputRef}
        $isOpen={isOpen}
        onChange={onChangeHandler}
        value={searchQuery}
      />
      <StyledButton
        onClick={handleButtonClick}
        $isOpen={isOpen}
        disabled={isOpen}
      >
        <HiOutlineMagnifyingGlass />
      </StyledButton>
      <StyledCancel
        $length={searchQuery.length > 0 && isOpen}
        onClick={() => {
          handleFocus();
          deleteQuery();
          clear();
          if (searchInputRef.current) {
            searchInputRef.current.blur();
            setIsOpen(false);
          }
        }}
      >
        <HiXMark />
      </StyledCancel>
    </StyledContainer>
  );
}

export default Search;
