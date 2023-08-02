import React from 'react'
import { Link } from 'react-router-dom'
import tick from './../../assets/tick-96.png'
import ReactDom from 'react-dom'

function NoteReturnModal({ show, handleClose }) {
    if (!show) return null;

    return ReactDom.createPortal(
        <div className="modal">
            <div className="overlay">
            </div>
            <div className="modal-content modal-note">
                <h2>Do you want to continue without saving ?</h2>
                <section>
                    <Link onClick={handleClose} to="/main">Ok</Link>
                    <Link onClick={handleClose} to="/addnotes">Cancel</Link>
                </section>
            </div>
        </div>
        , document.getElementById("modal"));
}

export default NoteReturnModal