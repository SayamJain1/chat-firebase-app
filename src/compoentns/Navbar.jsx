import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { auth, db } from "../firebase";

function Navbar() {
  const { user } = useContext(AuthContext)
  // const user = useAuth()
  const navigate = useNavigate()
  
  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate('/login')
  };

  return (
    <nav>
      <h3>
        <NavLink to="/">Chat</NavLink>
      </h3>
      <div>
        {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <button className="btn-nav" onClick={handleSignOut}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
