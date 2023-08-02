import React from 'react'
import SearchBox from './SearchBox'

function HeaderBody({curFolder, handleSearch}) {
  return (
    <header className="header-body">
      <h2>{curFolder.title}</h2>
      <SearchBox handleSearch={handleSearch}></SearchBox>
    </header>
  )
}

export default HeaderBody