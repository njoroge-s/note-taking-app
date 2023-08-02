import React from 'react'
import { Link } from 'react-router-dom'
import tick from './../../assets/tick-96.png'
import ReactDom from 'react-dom'

function NoteAddedModal({ show, handleClose }) {
    if (!show) return null;

    return ReactDom.createPortal(
        <div className="modal">
            <div className="overlay">
            </div>
            <div className="modal-content modal-note">
                <img src={tick} alt="" />
                <h2>Note Added Successfully</h2>
                <Link onClick={handleClose} to="/main">Ok</Link>
            </div>
        </div>
        , document.getElementById("modal"));
}

export default NoteAddedModal