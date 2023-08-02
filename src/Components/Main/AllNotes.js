import React, { useState } from 'react'
import { useEffect } from 'react';
import HeaderBody from './HeaderBody.js';
import NotesList from './NotesList.js';

function AllNotes({ curFolder }) {
    const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        // console.log(searchVal);
    },[searchVal])

    return (
        <div className="body">
            <HeaderBody curFolder={curFolder} handleSearch={(value) => setSearchVal(value)}></HeaderBody>
            <NotesList curFolder={curFolder} searchVal={searchVal}></NotesList>
        </div>
    )
}

export default AllNotes