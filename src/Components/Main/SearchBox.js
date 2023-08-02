import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import searchIcon from './../../assets/icons8-search.svg'
import cancelIcon from './../../assets/cancel-icon.png'

function SearchBox({ handleSearch }) {
    const [searchVal, setSearchVal] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        handleSearch(searchVal);
    }, [searchVal])

    return (
        <div className="searchBox" onBlur={() => setIsActive(false)}>
            <img src={searchIcon} alt="" onClick={() => {setIsActive(true)}}/>
            {isActive && <input type="text" placeholder='Notes' value={searchVal} onChange={(e) => setSearchVal(e.target.value)}></input>}
            {isActive && <img src={cancelIcon} alt="" onClick={() => setSearchVal("")} />}
        </div>
    )
}

// <img className="searchIcon" src={searchIcon} alt="search" />
// <img className="resetIcon" src={resetIcon} onClick={() => setSearchVal("")} />
export default SearchBox