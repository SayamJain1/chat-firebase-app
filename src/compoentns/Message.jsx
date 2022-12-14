import React, { useEffect, useRef } from "react";
// import Moment from "react-moment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function Message({ msg, user1 }) {
    const scrollRef = useRef();
    
    useEffect(() => {
        scrollRef.current.scrollIntoView({behavior : 'smooth'})
    }, [msg])

  dayjs.extend(relativeTime);
  const date = dayjs(msg.createdAt.toDate()).fromNow();

  return (
    <div ref={scrollRef} className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}>
      <p className={`${msg.from === user1 ? "me" : "friend"}`}>
        {msg.media ? (
          <img style={{ width: "190px", height: "190px" }} src={msg.media} />
        ) : null}
        {msg.text}
        <br />
        <small>{date}</small>
      </p>
    </div>
  );
}

export default Message;
