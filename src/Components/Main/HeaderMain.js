import React from 'react'
import HamBurger from './HamBurger'
import notesLogo from './../../assets/Notes_Outline.svg'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from './../../Context/UserAuthContext'

function HeaderMain({ isSideBar, handleClick }) {
  const navigate = useNavigate();
  const { logOut } = useUserAuth();

  const handleLogOut = async () => {
    logOut();
  }

  return (
    <div className="header-main">
      <section>
        <HamBurger isSideBar={isSideBar} handleClick={handleClick} />
      </section>
      <section onClick={() => navigate('/')}>
        <h1>notely</h1>
      </section>
      <section onClick={() => navigate('/main')}>
        <h2>My Notes</h2>
      </section>
      <section onClick={() => navigate('/')}>
        <p onClick={() => handleLogOut()}>Log Out</p>
      </section>
    </div>
  )
}

export default HeaderMain