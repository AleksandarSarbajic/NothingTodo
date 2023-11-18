import React from "react";
import styled from "styled-components";

interface Props {
  label?: string;
  children?: React.ReactNode;
  error?: string;
}

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.4rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }: Props) {
  return (
    <StyledFormRow>
      {label && React.isValidElement(children) && (
        <Label htmlFor={children.props.id}>{label}</Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
