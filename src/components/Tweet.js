import react from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react/cjs/react.development";

const Tweet = ({ tweetObj, owned }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    const tweetTextRef = doc(db, "tweets", `${tweetObj.id}`);
    if (ok) {
      await deleteDoc(tweetTextRef);
    }
  };
  const toggleEditing = async () => {
    setEditing((prev) => !prev);
  };

  const onChange = (event) => {
    setNewTweet(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const tweetTextRef = doc(db, "tweets", `${tweetObj.id}`);
    await updateDoc(tweetTextRef, {
      text: newTweet,
    });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input value={newTweet} onChange={onChange} required />
            <input type="submit" value="update" />
          </form>
          <button onClick={toggleEditing}>cancle</button>
        </>
      ) : (
        <div key={tweetObj.id} style={{ backgroundColor: "lightgrey" }}>
          <h4>{tweetObj.text}</h4>
          {owned && (
            <>
              <button onClick={toggleEditing}>Edit</button>
              <button onClick={onDeleteClick}>delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default Tweet;
