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
  margin-top: 2.5rem;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
`;
const StyledAvatar = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
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
