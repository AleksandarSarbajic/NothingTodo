import styled from "styled-components";
import AnalyticsButton from "./AnalyticsButton";
import { useSearchParams } from "react-router-dom";

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 5rem 0 5rem;
`;

function AnalyticsButtonRow() {
  const [searchParamas, setSearchParams] = useSearchParams();
  const query = searchParamas.get("q") || "day";

  function onClickHandler(value: string) {
    searchParamas.set("q", value);
    setSearchParams(searchParamas);
  }

  return (
    <StyledRow>
      <AnalyticsButton
        onClick={() => onClickHandler("day")}
        filter={query === "day"}
      >
        Day
      </AnalyticsButton>
      <AnalyticsButton
        onClick={() => onClickHandler("week")}
        filter={query === "week"}
      >
        Week
      </AnalyticsButton>
      <AnalyticsButton
        onClick={() => onClickHandler("month")}
        filter={query === "month"}
      >
        Month
      </AnalyticsButton>
    </StyledRow>
  );
}

export default AnalyticsButtonRow;
