import React, { useState } from 'react'
import HeaderImg from './../../assets/homepage.svg'
import { useNavigate } from 'react-router-dom'
import './homestylesheet.css'
import LoginModal from './LoginModal';
import SignupModal from './SignUpModal';
import { useUserAuth } from '../../Context/UserAuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [modalSignupShow, setModalSignupShow] = useState(false);
  const { user, logOut } = useUserAuth();

  const handleLogOut = async () => {
    toast.promise(logOut(), {
      loading: 'Logging out',
      success: 'Logged out Successfully',
      error: 'Unable to Logout',
    });
    navigate('/');
  }

  const showModalLogin = () => {
    setModalLoginShow(true);
  };
  const hideModalLogin = () => {
    setModalLoginShow(false);
    return true;
  };

  const showModalSignup = () => {
    setModalSignupShow(true);
  }
  const hideModalSignup = () => {
    setModalSignupShow(false);
    return true;
  };

  return (
    <div className="home">
      <header>
        <h1 onClick={() => navigate('/')}>notely</h1>
        {
          user ? <nav>
            <p onClick={() => navigate('/main')}>My Notes</p>
            <p onClick={() => handleLogOut()}>Log Out</p>
          </nav> :
            <nav>
              <p onClick={() => showModalLogin()}>Log In</p>
              <p onClick={() => showModalSignup()}>Sign Up</p>
            </nav>
        }
      </header>

      <div className="home-header">
        <section>
          <h1>Bring your ideas to life</h1>
          <p>
            Notely is the best place to jot down quick thoughts.
          </p>
          <button onClick={() => user ? navigate('/main') : showModalLogin()}>Get Started</button>
        </section>
        <section>
          <img src={HeaderImg} alt="" />
        </section>
      </div>
      <LoginModal show={modalLoginShow} handleClose={hideModalLogin} showSignup={showModalSignup}></LoginModal>
      <SignupModal show={modalSignupShow} handleClose={hideModalSignup} showLogin={showModalLogin}></SignupModal>
      <Toaster toastOptions={{
        className: '',
        style: {
          border: '2px solid #000',
          padding: '16px',
          fontFamily:'Mabry Pro',
          borderRadius:'5px'
        },
      }}/>
    </div>
  )
}

export default Home