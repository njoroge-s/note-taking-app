import React from 'react'
import Sidebar from './Sidebar'
import AllNotes from './AllNotes'

function Body({curFolder, handleClickFolder, isSideBar}) {
    return (
        <main>
            <Sidebar curFolder={curFolder} handleClick={handleClickFolder} isSideBar={isSideBar}></Sidebar>
            <AllNotes curFolder={curFolder}></AllNotes>
        </main>
    )
}

export default Body