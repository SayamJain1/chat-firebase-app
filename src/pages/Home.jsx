import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Message from "../compoentns/Message";
import MessageForm from "../compoentns/MessageForm";
import User from "../compoentns/User";
import { auth, db, storage } from "../firebase";

function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const currUserId = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query opb
    const q = query(usersRef, where("uid", "not-in", [currUserId]));
    // execute query
    const unSub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unSub();
  }, []);

  const selectUser = (user) => {
    setChat(user);

    const userS = user.uid;
    const id = currUserId > userS ? `${currUserId + userS}` : `${userS + currUserId}`;

    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;
    const id = currUserId > user2 ? `${currUserId + user2}` : `${user2 + currUserId}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    // store msg into messages collection (chat is sub-collection here)
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: currUserId,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    setText("");
  };

  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User key={user.uid} selectUser={selectUser} user={user} />
        ))}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">{chat.name}</div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => <Message key={i} msg={msg} user1={currUserId} />)
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user</h3>
        )}
      </div>
    </div>
  );
}

export default Home;
