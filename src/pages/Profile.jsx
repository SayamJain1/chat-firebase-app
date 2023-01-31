import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import Img from "../avatar.png";
import Camera from "../svg/Camera";
import Delete from "../svg/Delete";

function Profile() {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          console.log(url);
          setImg("");
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadImg();
    }
  }, [img, user]);

  const deleteImg = async () => {
    try {
      const confirm = window.confirm("Delete avatar");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const editBio = async () => {
    const newBio = prompt("Write your bio");
    try {
      if (newBio) {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          bio: newBio,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return user ? (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={user.avatar || Img} alt="Avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo" title="upload picture">
                <Camera />
              </label>
              {user.avatar ? <Delete deleteImg={deleteImg} /> : null}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          {/* <hr /> */}
          <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>

      <div className="bio_container">
        <button onClick={editBio}>Edit Bio</button>
        <p>{user.bio}</p>
      </div>
    </section>
  ) : null;
}

export default Profile;
