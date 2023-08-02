import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import googleIcon from './../../assets/google_icon.svg'
import ReactDom from 'react-dom'
import { useUserAuth } from '../../Context/UserAuthContext'
import { useEffect } from 'react'

function SignupModal({ show, handleClose, showLogin }) {
    if (!show) return null;

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "", confirmPassword: "", firebase: "" });
    const [isValid, setIsValid] = useState(false);

    const { signUp, googleSignIn } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email==="" || password===""){
            setError({...error, firebase:"All fields are mandatory"});
            return;
        }
        if (error.email === "" && error.password === "" && error.confirmPassword === "" && email!=="" && password!=="") {
            try {
                await signUp(email, password);
                handleClose();
            } catch (err) {
                console.log(err.message.substring(10));
                setError({ ...error, firebase: err.message.substring(10) });
            }
        }
    }

    const validateEmail = () => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(email)) {
            setError({ ...error, email: "Invalid email id" });
        }
        else {
            setError({ ...error, email: "" });
        }
    }

    const validatePasswordLength = () => {
        if (password.length < 6)
            setError({ ...error, password: "Password should be at least 6 characters" });
        else {
            setError({ ...error, password: "" });
        }
    }

    useEffect(() => {
        if (password)
            validatePasswordLength();
    }, [password]);

    const validateConfirmPassword = (e) => {
        console.log(password);
        if (e.target.value !== password) {
            setError({ ...error, confirmPassword: "Password doesn't match" });
        }
        else {
            setError({ ...error, confirmPassword: "" });
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            googleSignIn().then(() => {
                handleClose();
            });
        } catch (err) {
            setError({ ...error, firebase: err.message.substring(10) });
        }
    }

    return ReactDom.createPortal(
        <div className="modal">
            <div className="overlay">
            </div>
            <div className="modal-content modal-login">
                <div className="modal-header">
                    <p>Sign Up, to continue</p>
                    <p onClick={handleClose}>X</p>
                </div>
                <div className="modal-body">
                    <section>
                        <h1>notely</h1>
                    </section>
                    <section className="modal-form">
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => validateEmail()} />
                        {error.email && <p className="modal-form-error">{error.email}</p>}

                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {error.password && <p className="modal-form-error">{error.password}</p>}

                        <input type="password" placeholder="Confirm Password" onChange={(e) => validateConfirmPassword(e)} />
                        {error.confirmPassword && <p className="modal-form-error">{error.confirmPassword}</p>}

                        <button onClick={handleSubmit}>Sign In</button>
                        {error.firebase && <p className="modal-form-error">{error.firebase}</p>}
                    </section>
                    <section className="modal-or">
                        <p></p>
                        <p>OR</p>
                        <p></p>
                    </section>
                    <section className="modal-google">
                        <img src={googleIcon} alt="" />
                        <p onClick={() => handleGoogleSignIn()}>Sign in with Google</p>
                    </section>
                    <section>
                        <p>Have an account? <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                            handleClose();
                            showLogin();
                        }}>Log In</span></p>
                    </section>
                </div>
            </div>
        </div>
        , document.getElementById("modal"));
}

export default SignupModal