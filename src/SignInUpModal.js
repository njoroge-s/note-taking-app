import React from 'react'
import ReactDom from 'react-dom'

function SignInUpModal({ show, handleClose }) {

    if (!show) return null;

    return ReactDom.createPortal(
        <div className="modalnp">
            <div className="overlay"></div>
            <div className="modalContent">
                <div className="modalHeader">
                    <h2>Trailer</h2>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
        , document.getElementById("modal"))
}


export default SignInUpModal