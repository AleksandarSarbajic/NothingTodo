import { useRef } from "react";
import styled from "styled-components";
import { useUpdateAvatar } from "../features/Auth/useUpdateAvatar";

interface AvatarProps {
  image?: string;
}
interface Update {
  avatar?: File;
}

const StyledLabel = styled.label`
  position: relative;
  margin-top: 2.5rem;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;

  &:hover::before {
    display: block;
  }

  &:hover > img {
    filter: blur(5px);
  }

  &::before {
    content: "Change Avatar";
    font-weight: 600;
    line-height: 1.1;
    font-family: "Noto Sans Mono", sans-serif;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    z-index: 3;
    cursor: pointer;
  }
`;

const StyledAvatar = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  transition: filter 0.3s ease-in-out;
`;

function Avatar({ image }: AvatarProps) {
  const { updateAvatar } = useUpdateAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const updateObject: Update = {
        avatar: selectedFile,
      };
      updateAvatar(updateObject);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />

      <StyledLabel htmlFor="avatarInput" onClick={handleImageClick}>
        <StyledAvatar
          src={image || "default-user.jpg"}
          alt="Avatar"
          style={{ cursor: "pointer" }}
        />
      </StyledLabel>
    </>
  );
}

export default Avatar;
