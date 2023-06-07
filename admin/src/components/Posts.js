import React, { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Posts</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item, index) => {
            console.log("aghfdhga", item);
            return (
              <tr key={index}>
                <th scope="row">{item.title}</th>
                <td>{item.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* {posts.length > 0 ? (
        posts?.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )} */}
    </div>
  );
};

export default Posts;
