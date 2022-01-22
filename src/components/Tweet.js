import react from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useState } from "react/cjs/react.development";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, owned }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    const tweetTextRef = doc(db, "tweets", `${tweetObj.id}`);
    if (ok) {
      await deleteDoc(tweetTextRef);
      if (tweetObj.attachmentURL !== "") {
        await deleteObject(ref(storage, tweetObj.attachmentUrl));
      }
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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newTweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <div key={tweetObj.id}>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          {owned && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Tweet;
