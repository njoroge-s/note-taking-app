import React, { useEffect, useState } from 'react'
import NoteAddedModal from './NoteAddedModal'
import { useLocation } from 'react-router-dom'
import './addnotestylesheet.css'
import returnIcon from './../../assets/left-arrow.png'
import saveIcon from './../../assets/icons8-done.svg'
import NoteReturnModal from './NoteReturnModal';
import { v4 as uuidv4 } from 'uuid';
import { useNotesContext } from '../../Context/NotesContext';
import NotesServices from '../../Services/NotesServices';
import { useUserAuth } from '../../Context/UserAuthContext';
import Editor from './Editor'

function AddNotes() {
    const location = useLocation();
    const notesObj = useNotesContext();
    const { user } = useUserAuth();

    // Not necessary
    const noteObj = location.state ? location.state.noteObj : {
        id: uuidv4(),
        title: "",
        date: "",
        text: "",
        color: "rgb(187, 224, 104)",
        folder: ""
    };

    const [note, setNote] = useState({
        id: noteObj.id, title: noteObj.title, date: new Date().toString().substring(4, 16), text: noteObj.text, color: noteObj.color, folder: noteObj.folder
    });
    // let updatedNotesObj = notesObj ;

    const [modalAddShow, setModalAddShow] = useState(false);
    const [modalReturnShow, setModalReturnShow] = useState(false);

    const updateObj = (folderTitle) => {
        if (folderTitle !== "") {

            let flag = false;
            notesObj[folderTitle].notes.forEach((noteElem, index) => {
                if (!flag && noteElem.id === note.id) {
                    flag = true;
                    notesObj[folderTitle].notes[index] = note;
                }
                return noteElem;
            });
            if (!flag) {
                notesObj[folderTitle].notes.push(note);
                notesObj[folderTitle].length++;
            }
        }
    }

    const onSave = async () => {
        updateObj("All Notes");
        updateObj(note.folder);
        console.log(notesObj);
        await NotesServices.updateUser(user.uid, { notesObj }).then((response) => {
            console.log(response);
            setNote({ ...note, title: "", text: "" });
            showModalAdd();
        })
    }

    useEffect(() => {
        console.log(note.text);
    }, [note]);

    const showModalAdd = () => {
        setModalAddShow(true);
    };
    const showModalReturn = () => {
        setModalReturnShow(true);
    }

    const hideModalReturn = () => {
        setModalReturnShow(false);
        return true;
    };

    const hideModalAdd = () => {
        setModalAddShow(false);
        return true;
    };

    return (
        <div>
            <div className="addNotes">
                <h3>Edit Note</h3>
                <div className="addNotesBox">
                    <section className="header-addnotes">
                        <img src={returnIcon} alt="" onClick={() => showModalReturn()} />
                        <img src={saveIcon} alt="" onClick={() => onSave()} />
                    </section>
                    <section>
                        <h4>Note Title</h4>
                        <input type="text" name="title" onChange={(e) => setNote({ ...note, title: e.target.value })} value={note.title} placeholder="Title"></input>
                        <h4>Note Text</h4>
                        <Editor propValue={note.text} onChange={(textValue) => setNote({ ...note, text: textValue })} />
                    </section>
                    <NoteAddedModal show={modalAddShow} handleClose={hideModalAdd}></NoteAddedModal>
                    <NoteReturnModal show={modalReturnShow} handleClose={hideModalReturn}></NoteReturnModal>
                </div>
            </div>
        </div>
    )
}
// <textarea name="textarea" cols="30" rows="15" onChange={(e) => setNote({ ...note, text: e.target.value })} value={note.text} placeholder="Text..." ></textarea>

export default AddNotes