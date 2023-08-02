import React from 'react'
import { Link } from 'react-router-dom'
import ReactDom from 'react-dom'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNotesContext } from '../../../Context/NotesContext';
import NotesServices from '../../../Services/NotesServices';
import { useUserAuth } from '../../../Context/UserAuthContext';

function NoteReturnModal({ show, handleClose }) {
    if (!show) return null;
    const { user } = useUserAuth();
    const notesObj = useNotesContext();
    const [title, setTitle] = useState("");
    const [color, setColor] = useState();
    const [error, setError] = useState("");


    const addFolder = async () => {
        console.log(notesObj);
        await NotesServices.updateUser(user.uid, { notesObj }).then((response) => {
            console.log(response);
            handleClose();
        })
    }

    const handleClick = () => {
        if (title == "") {
            setError("Set a title");
            return;
        }
        setError("");
        const folder = { id: uuidv4(), title, color, length: 0, notes: [] };
        notesObj[title] = folder;
        addFolder(notesObj);
        console.log(notesObj);
    }

    return ReactDom.createPortal(
        <div className="modal">
            <div className="overlay">
            </div>
            <div className="modal-content modal-new-folder modal-login">
                <div className="modal-header">
                    <h2>New Folder</h2>
                </div>
                <section className="modal-form">
                    <section>
                        <h3>Title : </h3>
                        <input type="text" placeholder="New Folder" id="folderTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {error && <p className="modal-form-error">{error}</p>}
                    </section>
                    <section>
                        <h3>Color : </h3>
                        <input type="color" placeholder="New Folder" id="folderColor" value={color} onChange={(e) => setColor(e.target.value)} />
                    </section>
                </section>
                <section className="modal-folder-btns">
                    <Link onClick={() => handleClick()} to="/main">Create</Link>
                    <Link onClick={handleClose} to="/main">Cancel</Link>
                </section>
            </div>
        </div>
        , document.getElementById("modal"));
}

export default NoteReturnModal