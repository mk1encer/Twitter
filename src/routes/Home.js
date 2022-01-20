import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Tweet from "../components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs);
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
      console.log(tweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "tweets"), {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          type="text"
          placeholder="what's going on?"
          maxLength={140}
          onChange={onChange}
        />
        <input type="submit" value="twt" />
      </form>
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
