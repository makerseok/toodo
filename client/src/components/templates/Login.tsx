import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserUpdateContext } from '../../App';
import Input from '../atoms/Input';
// import Auth from '../components/hoc/Auth';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const updateUser = useContext(UserUpdateContext);

  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = e => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };

  const handleChangePassword: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    const response = await axios
      .post('/api/users/login', user)
      .then(response => response.data);
    console.log(response);
    if (response.success) {
      alert('로그인 성공!');
      updateUser();
      navigate(-1);
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <Input
          id="email"
          label="email"
          type="email"
          onChange={handleChangeEmail}
        />
        <Input
          id="password"
          label="password"
          type="password"
          onChange={handleChangePassword}
        />
        <button onClick={handleLogin}>login</button>
      </form>
    </div>
  );
}

export default Login;
// export default Auth(Login, false);
