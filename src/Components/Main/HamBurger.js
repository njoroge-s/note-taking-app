import React from 'react'
import { useState } from 'react'

function HamBurger({ isSideBar, handleClick }) {
    return (
        <div className={isSideBar ? "container clicked" : "container"} onClick={handleClick}>
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
        </div>
    )
}

export default HamBurger