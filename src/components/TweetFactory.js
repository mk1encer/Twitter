import React, { useState, useRef } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";

const TweetFactory = ({ userObj }) => {
  const [attachment, setAttachment] = useState("");
  const [tweet, setTweet] = useState("");
  const fileInput = useRef();
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storage, `${userObj.uid}/${v4()}`);
      const uploadFile = await uploadString(fileRef, attachment, "data_url");
      console.log(uploadFile);
      attachmentUrl = await getDownloadURL(uploadFile.ref);
      console.log(attachmentUrl);
    }
    const tweetPosting = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(db, "tweets"), tweetPosting);
    setTweet("");
    onClearAttachment();
  };

  const onChange = (event) => {
    setTweet(event.target.value);
  };

  const fileOnChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onClearAttachment = () => {
    fileInput.current.value = "";
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={tweet}
        type="text"
        placeholder="what's going on?"
        maxLength={140}
        onChange={onChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={fileOnChange}
        ref={fileInput}
      />
      <input type="submit" value="twt" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
