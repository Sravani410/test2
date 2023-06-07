// Comments.js
import React, { useState, useEffect } from "react";

const Comments = ({ postId }) => {
  // State to store comments data
  const [comments, setComments] = useState([]);

  // Fetch comments data from the API
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/comments?postId=${postId}`
      );
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  // Render comments data
  return (
    <div>
      <h2>Comments for Post {postId}</h2>
      {console.log("gasfhdg", comments)}
      {/* Display comments data */}
    </div>
  );
};

export default Comments;
