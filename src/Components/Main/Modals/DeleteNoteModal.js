import React from 'react'
import ReactDom from 'react-dom'
import { useNotesContext } from '../../../Context/NotesContext';
import NotesServices from '../../../Services/NotesServices';
import { useUserAuth } from '../../../Context/UserAuthContext';

function DeleteNoteModal({ show, handleClose, noteObj }) {
    if (!show) return null;
    const { user } = useUserAuth();
    const notesObj = useNotesContext();


    const updateObj = (folderTitle) => {
        if (folderTitle !== "") {
          notesObj[folderTitle].notes.forEach((noteElem, index) => {
            if (noteElem.id === noteObj.id) {
              notesObj[folderTitle].notes.splice(index, 1);
            }
          });
          notesObj[folderTitle].length--;
        }
      }
    
      const handleDelete = async () => {
        updateObj("All Notes");
        updateObj(noteObj.folder);
        await NotesServices.updateUser(user.uid, { notesObj }).then(() => {
          window.location.reload(false);
        });
      }

    return ReactDom.createPortal(
        <div className="modal">
            <div className="overlay">
            </div>
            <div className="modal-content modal-note">
                <h2>Are you sure you want to delete the note ?</h2>
                <section>
                    <a onClick={() => {handleClose();handleDelete()}}>Ok</a>
                    <a onClick={handleClose}>Cancel</a>
                </section>
            </div>
        </div>
        , document.getElementById("modal"));
}

export default DeleteNoteModal