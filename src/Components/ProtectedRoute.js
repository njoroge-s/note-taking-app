import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext'

function ProtectedRoute({ children }) {
    const {user} = useUserAuth() ;
    const navigate = useNavigate() ;
    if(!user){
        navigate('/');
        return null ;
    }
    return children ;
}

export default ProtectedRoute