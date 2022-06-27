import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserUpdateContext } from '../../App';
import Logo from '../Logo';
import TextButton from '../TextButton';

function Header() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const updateUser = useContext(UserUpdateContext);

  const handleClickLogin = () => {
    console.log(user);
    navigate('/login');
  };

  const handleClickRegister = () => {
    navigate('/register');
  };

  const handleClickLogout = () => {
    // navigate('/');
    axios
      .get('/api/users/logout')
      .then(res => {
        updateUser();
        console.log(res);
        alert('로그아웃 되었습니다!');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="header-container">
      <div className="header-container-left">
        <Logo text={'Toodo'} />
      </div>
      <div className="header-container-right">
        {user?.auth ? (
          <>
            <TextButton onClick={() => {}} text={user?.user!.email} />
            <TextButton onClick={handleClickLogout} text={'로그아웃'} />
          </>
        ) : (
          <>
            <TextButton onClick={handleClickLogin} text={'로그인'} />
            <TextButton onClick={handleClickRegister} text={'회원가입'} />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
