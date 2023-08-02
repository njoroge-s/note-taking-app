import React, {useState} from 'react'
import HeaderMain from './HeaderMain.js'
import Body from './Body.js'
import './mainstylesheet.css'
import { Outlet } from 'react-router-dom';

function Main() {
  const [curFolder, setCurFolder] = useState({title:"All Notes",color:"rgb(187, 224, 104)"}) ;
  const [isSideBar, setIsSideBar] = useState(false) ;

  const handleClickFolder = (title,color) => {
    setCurFolder({title,color}) ;
  }

  const handleClickSideBar = () => {
    setIsSideBar(!isSideBar) ;
  }

  return (
    <div className="main">
      <HeaderMain isSideBar={isSideBar} handleClick={handleClickSideBar} />
      <Body curFolder={curFolder} handleClickFolder={handleClickFolder} isSideBar={isSideBar}></Body>
    </div>
  )
}

export default Main