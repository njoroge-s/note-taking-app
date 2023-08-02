import logo from './logo.svg';
import React from 'react'
import './stylesheet.css'
import Home from './Components/Home/Home.js'
import Main from './Components/Main/Main.js'
import AddNotes from './Components/AddNote/AddNotes';
import { Routes, Route } from 'react-router-dom'
import Body from './Components/Main/AllNotes';
import { UserAuthContextProvider } from './Context/UserAuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { NotesContextProvider } from './Context/NotesContext'

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <NotesContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            } />
            <Route path="addnotes" element={
              <ProtectedRoute>
                <AddNotes />
              </ProtectedRoute>
            } />
          </Routes>
        </NotesContextProvider>
      </UserAuthContextProvider>
    </div>
  );
  // <Route path="allnotes" element={<Body />} />
}

export default App;
