import styled from "styled-components";
import { formatDistanceFromNow } from "../utils/helpers";

const StyledDate = styled.p`
  color: var(--color-grey-550);
  opacity: 0.3;
  font-weight: 600;
  font-size: 1.8rem;
`;

function EditedAt({ date }: { date: string }) {
  const fromNow = formatDistanceFromNow(date);

  return (
    <StyledDate>
      Edited{" "}
      {fromNow.includes("1") && fromNow.includes("hour")
        ? "Less than hour ago"
        : fromNow}
    </StyledDate>
  );
}

export default EditedAt;
