import React, { useState } from 'react'
import folderIcon from './../../assets/folder_icon.svg'
import { useNotesContext } from '../../Context/NotesContext'
import NewFolderModal from './Modals/NewFolderModal'
import addNew from './../../assets/icons8-add-new.png'

function Sidebar({ curFolder, handleClick, isSideBar }) {
  const [modalShow, setModalShow] = useState(false);
  const notesObj = useNotesContext();

  const showModal = () => {
    setModalShow(true);
  };
  const hideModal = () => {
    setModalShow(false);
    return true;
  };

  return (
    isSideBar ?
      <aside className="sidebar">
        <h2>Folders</h2>
        {notesObj["All Notes"] && <div>
          <section className={"All Notes" === curFolder.title ? "folder-row active-folder" : "folder-row"} onClick={() => handleClick("All Notes", notesObj["All Notes"].color)} key={notesObj["All Notes"].id}>
            <section>
              <img src={folderIcon} alt="" />
              <h3>All Notes</h3>
            </section>
            <p>{notesObj["All Notes"].length}</p>
          </section>
          {Object.values(notesObj).map((folder) => {
            return (
              folder.title != "All Notes" ?
                <section className={folder.title === curFolder.title ? "folder-row active-folder" : "folder-row"} onClick={() => handleClick(folder.title, folder.color)} key={folder.id}>
                  <section>
                    <img src={folderIcon} alt="" />
                    <h3>{folder.title}</h3>
                  </section>
                  <p>{folder.length}</p>
                </section>
                : null
            )
          })}
          <hr />
          <section className="folder-row new-folder-btn" onClick={() => showModal()}>
            <section>
              <img src={folderIcon} alt="" />
              <h3>New Folder</h3>
            </section>
            <img src={addNew} alt="" />
          </section>
        </div>}
        <NewFolderModal show={modalShow} handleClose={hideModal}></NewFolderModal>
      </aside> : null
  )
}

export default Sidebar