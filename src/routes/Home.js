import React, { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Tweet from "../components/Tweet";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import TweetFactory from "../components/TweetFactory";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   let attachmentUrl = "";
  //   if (attachment !== "") {
  //     const fileRef = ref(storage, `${userObj.uid}/${v4()}`);
  //     const uploadFile = await uploadString(fileRef, attachment, "data_url");
  //     console.log(uploadFile);
  //     attachmentUrl = await getDownloadURL(uploadFile.ref);
  //     console.log(attachmentUrl);
  //   }
  //   const tweetPosting = {
  //     text: tweet,
  //     createdAt: Date.now(),
  //     creatorId: userObj.uid,
  //     attachmentUrl,
  //   };

  //   await addDoc(collection(db, "tweets"), tweetPosting);
  //   setTweet("");
  //   onClearAttachment();
  // };

  // const onChange = (event) => {
  //   setTweet(event.target.value);
  // };

  // const fileOnChange = (e) => {
  //   const reader = new FileReader();
  //   reader.onloadend = (finishedEvent) => {
  //     const {
  //       currentTarget: { result },
  //     } = finishedEvent;
  //     setAttachment(result);
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  // const onClearAttachment = () => {
  //   fileInput.current.value = "";
  //   setAttachment("");
  // };

  return (
    <div>
      {/* <form onSubmit={onSubmit}>
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
      </form> */}
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => {
          return (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              owned={tweet.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
