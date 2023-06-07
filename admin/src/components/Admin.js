import React, { useState, useEffect } from "react";

const BASE_URL = "https://dummyjson.com";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchComments();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    console.log(data);
    setPosts(data.posts);
  };

  const fetchUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    setUsers(data.users);
  };

  const fetchComments = async () => {
    const response = await fetch(`${BASE_URL}/comments`);
    const data = await response.json();
    setComments(data.comments);
  };

  const handleCommentUpdate = async (commentId, updatedContent) => {
    // Implement the API call to update the comment here
    // You can use the `commentId` and `updatedContent` parameters
    // to send the necessary data to the server
    // Remember to update the `comments` state with the modified data
  };

  const handleCommentDelete = async (commentId) => {
    // Implement the API call to delete the comment here
    // You can use the `commentId` parameter to send the necessary data to the server
    // Remember to update the `comments` state by removing the deleted comment
  };

  const handleUserUpdate = async (userId, updatedDetails) => {
    // Implement the API call to update the user details here
    // You can use the `userId` and `updatedDetails` parameters
    // to send the necessary data to the server
    // Remember to update the `users` state with the modified data
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPosts.length / pageSize);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredPosts.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <input
          type="text"
          placeholder="Search post by title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div>
        <h2>Posts</h2>
        {getPaginatedData().map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <h4>Comments:</h4>
            {comments
              .filter((comment) => comment.postId === post.id)
              .map((comment) => (
                <div key={comment.id}>
                  <p>{comment.body}</p>
                  <button
                    onClick={() =>
                      handleCommentUpdate(comment.id, "Updated Comment")
                    }
                  >
                    Update
                  </button>
                  <button onClick={() => handleCommentDelete(comment.id)}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
        ))}
        <div>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
      <div>
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button
              onClick={() =>
                handleUserUpdate(user.id, { name: "Updated Name" })
              }
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
