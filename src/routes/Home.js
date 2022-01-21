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

  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
