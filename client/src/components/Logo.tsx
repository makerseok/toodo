import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ILogo {
  text: string;
}

function Logo({ text }: ILogo) {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
    <span onClick={handleClickLogo} className="logo">
      {text}
    </span>
  );
}

export default Logo;
