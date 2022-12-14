import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function ProtectedRoute({children}) {
    // const user = useAuth()
    const {user} = useContext(AuthContext)

    if (!user) {
        return <Navigate to='/login' />
    }
  return children
}

export default ProtectedRoute