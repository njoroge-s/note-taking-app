import React, { useState } from 'react'
import edit from './../../assets/icons8-edit.svg'
import trash from './../../assets/trash (1).png'
import folderIcon from './../../assets/folder_icon.svg'
import { useNavigate } from 'react-router-dom';
import DeleteNoteModal from './Modals/DeleteNoteModal';
import MoveFolderModal from './Modals/MoveFolderModal';
import {Markup} from 'interweave';

function Note({ noteObj }) {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);

  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalChangeFolderShow, setModalChangeFolderShow] = useState(false);

  const showModalDelete = () => {
    setModalDeleteShow(true);
  };

  const hideModalDelete = () => {
    setModalDeleteShow(false);
    return true;
  };

  const showModalChangeFolder = () => {
    setModalChangeFolderShow(true);
  }
  const hideModalChangeFolder = () => {
    setModalChangeFolderShow(false);
    return true;
  };

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="note" style={{ backgroundColor: noteObj.color }} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {isHover ?
        <div className="note-heading">
          <p style={{ background: "#00ca4e" }} onClick={() => navigate('/addnotes', { state: { noteObj } })}>
            <img src={edit} alt="" />
          </p>
          <p style={{ background: "#ffbd44" }} onClick={() => showModalChangeFolder()}>
            <img src={folderIcon} alt="" />
          </p>
          <p style={{ background: "#ff605c" }} onClick={() => showModalDelete()}>
            <img src={trash} alt="" />
          </p>
        </div>
        : null}
      <div>
        <section>
          <h3 className="noteTitle">{noteObj.title}</h3>
          <p className="noteDate">{noteObj.date}</p>
        </section>
        <div style={{ border: "1px solid black" }}></div>
        <section>
          <Markup content={noteObj.text}/>
        </section>
      </div>
      <DeleteNoteModal show={modalDeleteShow} handleClose={hideModalDelete} noteObj={noteObj}></DeleteNoteModal>
      <MoveFolderModal show={modalChangeFolderShow} handleClose={hideModalChangeFolder} noteObj={noteObj}></MoveFolderModal>
    </div>
  )
}

export default Note