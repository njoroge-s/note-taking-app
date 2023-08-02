import React from 'react'


function HeaderHome() {
    const { user, logOut } = useUserAuth();

    const handleLogOut = async () => {
        logOut();
        navigate('/');
    }

    return (
        <header>
            <h1>notely</h1>
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
    )
}

export default HeaderHome