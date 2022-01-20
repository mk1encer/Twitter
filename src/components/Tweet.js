const Tweet = ({ key, tweetObj, owned }) => {
  return (
    <div key={key} style={{ backgroundColor: "lightgrey" }}>
      <h4>{tweetObj.text}</h4>
      {owned && (
        <>
          <button>Edit</button>
          <button>delete</button>
        </>
      )}
    </div>
  );
};
export default Tweet;
