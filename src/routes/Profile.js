import React from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase";

const Profile = () => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};

export default Profile;
