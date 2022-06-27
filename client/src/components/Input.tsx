import React from 'react';
import styled from 'styled-components';

interface IInput {
  id: string;
  label: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const StyledLabel = styled.label`
  display: inline-block;
`;

const StyledInput = styled.input`
  display: inline-block;
`;

function Input({ id, label, type, onChange }: IInput) {
  return (
    <div>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput id={id} type={type} onChange={onChange} />
    </div>
  );
}

export default Input;
