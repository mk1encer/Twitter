import { render } from "@testing-library/react";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth, { db } from "../firebase";
import "../components/App";

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = () => {
    auth.signOut();
    navigate("/");
  };

  const getMyTweets = async () => {
    const q = query(
      collection(db, "tweets"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data);
    });
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj !== newDisplayName) {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      }).then(() => {
        //alert("profile updated!");
        refreshUser();
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          autoFocus
          onChange={onChange}
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
