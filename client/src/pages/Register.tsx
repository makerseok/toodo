import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';

function Register() {
  const navigate = useNavigate();
  return (
    <div className="register-container">
      <Input id="name" label="이름" />
      <Input id="email" label="이메일" type="email" />
      <Input id="password" label="비밀번호" type="password" />
      <Input id="confirm-password" label="비밀번호 확인" type="password" />
    </div>
  );
}

export default Register;
