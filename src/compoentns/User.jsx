import React from "react";
import Img from "../avatar.png";

function User({ user, selectUser }) {
  return (
    <>
      <div className="user_wrapper" onClick={() => selectUser(user)}>
        <div className="user_info">
          <div className="user_detail">
            <img className="avatar" src={user.avatar || Img} alt="avatar" />
            <h4>{user.name}</h4>
          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
      </div>
      
      <div
        onClick={() => selectUser(user)}
        // className={`sm_container ${chat.name === user.name && "selected_user"}`}
      >
        <img
          src={user.avatar || Img}
          alt="avatar"
          className="avatar sm_screen"
        />
      </div>
    </>
  );
}

export default User;
