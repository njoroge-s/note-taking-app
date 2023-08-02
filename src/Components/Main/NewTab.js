import React from 'react'
import { useNavigate } from 'react-router-dom';
import addNew from './../../assets/icons8-add-new.png'
import { v4 as uuidv4 } from 'uuid';

function NewTab({ curFolder }) {
    const navigate = useNavigate();

    const handleClick = () => {
        const noteObj = { id: uuidv4(), title: "", date: "", text: "", folder: curFolder.title === "All Notes" ? "" : curFolder.title, color: curFolder.color };
        navigate('/addnotes', { state: { noteObj } });
    }
    return (
        <div className="add-note-btn" onClick={() => handleClick()}>
            <h3>Add Note</h3>
            <img src={addNew} alt="" />
        </div>
    )
}
// <div onClick={() => handleClick()} className="newTab">
//     <img src={addNew} alt="" />
//     <p>Add a Note</p>
// </div>

export default NewTab