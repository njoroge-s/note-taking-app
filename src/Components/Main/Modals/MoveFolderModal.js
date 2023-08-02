import React from 'react'
import { Link } from 'react-router-dom'
import ReactDom from 'react-dom'
import { useState } from 'react';
import { useNotesContext } from '../../../Context/NotesContext';
import NotesServices from '../../../Services/NotesServices';
import { useUserAuth } from '../../../Context/UserAuthContext';
import folderIcon from './../../../assets/folder_icon.svg'

function MoveFolderModal({ show, handleClose, noteObj }) {
    if (!show) return null;
    const { user } = useUserAuth();
    const notesObj = useNotesContext();
    const [selectedFolder, setSelectedFolder] = useState("");
    const [error, setError] = useState("");

    const updateObj = () => {
        notesObj[noteObj.folder].notes.forEach((noteElem, index) => {
            if (noteElem.id === noteObj.id) {
                notesObj[noteObj.folder].notes.splice(index, 1);
                notesObj[noteObj.folder].length-- ;
            }
        });
        noteObj = { ...noteObj, folder: selectedFolder,color:notesObj[selectedFolder].color };
        notesObj["All Notes"].notes.forEach((noteElem, index) => {
            if (noteElem.id === noteObj.id) {
                notesObj["All Notes"].notes[index] = noteObj;
            }
        });

        notesObj[selectedFolder].notes.push(noteObj);
        notesObj[selectedFolder].length++ ;

    }

    const handleChangeFolder = async () => {
        updateObj();
        await NotesServices.updateUser(user.uid, { notesObj }).then(() => {
            window.location.reload(false);
        });
    }

    const handleClick = () => {
        if (selectedFolder === "") {
            setError("Select a folder");
            return;
        }
        setError("");
        handleChangeFolder();
    }

    return ReactDom.createPortal(
        <div className="modal">
            <div className="overlay">
            </div>
            <div className="modal-content modal-new-folder modal-login">
                <div className="modal-header">
                    <h2>Move to Folder</h2>
                </div>
                <section className="modal-form">
                    {notesObj ? Object.values(notesObj).map((folder) => {
                        return (
                            (folder.title != "All Notes" && folder.title!==noteObj.folder) ?
                                <section className={selectedFolder === folder.title ? "folder-row active-folder" : "folder-row"} onClick={() => setSelectedFolder(folder.title)} key={folder.id}>
                                    <section>
                                        <img src={folderIcon} alt="" />
                                        <h3>{folder.title}</h3>
                                    </section>
                                    <p>{folder.length}</p>
                                </section>
                                : null
                        )
                    }) :
                        <section className="folder-row">
                            <h3>No Folders</h3>
                        </section>
                    }
                    {error && <p className="modal-form-error">{error}</p>}
                </section>
                <section className="modal-folder-btns">
                    <Link onClick={() => handleClick()} to="/main">Add</Link>
                    <Link onClick={handleClose} to="/main">Cancel</Link>
                </section>
            </div>
        </div>
        , document.getElementById("modal"));
}

export default MoveFolderModal