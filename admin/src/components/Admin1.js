import React, { useState, useEffect } from "react";

const BASE_URL = "https://dummyjson.com";

const Admin1 = () => {
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
    try {
      const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: updatedContent }),
      });

      if (response.ok) {
        const updatedComment = await response.json();

        // Update the comments state with the modified comment
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === updatedComment.id ? updatedComment : comment
          )
        );
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted comment from the comments state
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleUserUpdate = async (userId, updatedDetails) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
  
        // Update the users state with the modified user
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
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
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <ul>
                    {comments
                      .filter((comment) => comment.postId === post.id)
                      .map((comment) => (
                        <li key={comment.id}>
                          {comment.body}
                          <button
                            onClick={() =>
                              handleCommentUpdate(comment.id, "Updated Comment")
                            }
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleCommentDelete(comment.id)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUserUpdate(user.id, { name: "Updated Name" })
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin1;
