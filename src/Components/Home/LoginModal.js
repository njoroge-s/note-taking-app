import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import googleIcon from './../../assets/google_icon.svg'
import ReactDom from 'react-dom'
import { useUserAuth } from '../../Context/UserAuthContext'

function LoginModal({ show, handleClose, showSignup }) {
    if (!show) return null;

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { logIn, googleSignIn } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == "" || password == "") {
            setError("All fields are mandatory");
            return;
        }
        setError("");
        try {
            await logIn(email, password);
            handleClose();
            navigate("/");
        } catch (err) {
            setError(err.message.substring(10));
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            googleSignIn().then(() => {
                handleClose();
            });
        } catch (error) {
            setError(error.message.substring(10));
        }
    }

    return ReactDom.createPortal(
        <div className="modal">
            <div className="overlay">
            </div>
            <div className="modal-content modal-login">
                <div className="modal-header">
                    <p>Log In, to continue</p>
                    <p onClick={handleClose}>X</p>
                </div>
                <div className="modal-body">
                    <section>
                        <h1>notely</h1>
                    </section>
                    <section className="modal-form">
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={(e) => handleSubmit(e)}>Log In</button>
                        {error && <p className="modal-form-error">{error}</p>}
                    </section>
                    <section className="modal-or">
                        <p></p>
                        <p>OR</p>
                        <p></p>
                    </section>
                    <section className="modal-google" onClick={(e) => handleGoogleSignIn(e)}>
                        <img src={googleIcon} alt="" />
                        <p>Sign in with Google</p>
                    </section>
                    <section>
                        <p>New here? <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                            handleClose();
                            showSignup();
                        }}>Sign Up</span></p>
                    </section>
                </div>
            </div>
        </div>
        , document.getElementById("modal"));
}

export default LoginModal