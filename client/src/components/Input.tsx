import React from 'react';
import styled from 'styled-components';

interface IInput {
  id: string;
  label: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const StyledLabel = styled.label`
  display: inline-block;
`;

const StyledInput = styled.input`
  display: inline-block;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50vw;
`;

function Input({ id, label, type, onChange }: IInput) {
  return (
    <StyledDiv>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput id={id} type={type} onChange={onChange} />
    </StyledDiv>
  );
}

export default Input;
