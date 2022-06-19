import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

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
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <input name="email" value={user.email} onChange={handleChangeEmail} />
        <input
          name="password"
          value={user.password}
          onChange={handleChangePassword}
        />
        <button onClick={handleLogin}>login</button>
      </form>
    </div>
  );
}

export default Login;
