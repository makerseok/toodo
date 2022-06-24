import React from 'react';

interface ITextButtonProps {
  text: string;
  onClick: () => void;
}

function TextButton({ onClick, text }: ITextButtonProps) {
  return (
    <button className="button-text" onClick={onClick}>
      {text}
    </button>
  );
}

export default TextButton;
