import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/Auth/useUser";
import { useEffect } from "react";
import DottedLoading from "./DottedLoading";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <DottedLoading />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
