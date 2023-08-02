import React from 'react'
import NewTab from './NewTab';
import Note from './Note'
import { useNotesContext } from '../../Context/NotesContext';
import addNote from './../../assets/undraw_note_list_re_r4u9.svg'

function NotesList({ curFolder, searchVal }) {
    const notesObj = useNotesContext();
    let notesArr = notesObj[curFolder.title] ? notesObj[curFolder.title].notes : [];

    return (
        <div className="notes-list">
            {
                notesArr.length !== 0 ? notesArr.map((note) => {
                    if (searchVal === "") {
                        return (<Note noteObj={note} key={note.id}></Note>)
                    }
                    else {
                        if (note.text.includes(searchVal) || note.title.includes(searchVal)) {
                            return (<Note noteObj={note} key={note.id}></Note>);
                        }
                    }
                }) : <h2>No Notes added</h2>
            }
            <NewTab curFolder={curFolder}></NewTab>
        </div>
    )
}

export default NotesList