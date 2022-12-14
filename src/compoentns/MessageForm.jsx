import React from "react";
import Attetch from "../svg/Attetch";

function MessageForm({ handleSubmit, setText, text, setImg }) {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write Message"
        />
      </div>
      <label htmlFor="img" style={{marginRight: '10px'}}>
        <Attetch />
      </label>
      <input
        type="file"
        id="img"
        onChange={(e) => setImg(e.target.files[0])}
        accept="image/*"
        style={{ display: " none" }}
      />
      <div>
        <button className="btn">Send</button>
      </div>
    </form>
  );
}

export default MessageForm;
