import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const BASE_URL = "https://dummyjson.com";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [editingCommentId, setEditingCommentId] = useState(null);

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

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
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
  const enableCommentEdit = (commentId) => {
    setEditingCommentId(commentId);
  };

  const cancelCommentEdit = () => {
    setEditingCommentId(null);
  };

  const handleCommentChange = (commentId, updatedContent) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, body: updatedContent };
        }
        return comment;
      })
    );
  };

  const handleCommentUpdate = async (commentId) => {
    const commentToUpdate = comments.find(
      (comment) => comment.id === commentId
    );
    if (commentToUpdate) {
      try {
        const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: commentToUpdate.body }),
        });

        if (response.ok) {
          setEditingCommentId(null);
        } else {
          console.error("Failed to update comment");
        }
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    }
  };

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];

    setComments(storedComments);
  }, []);
  return (
    <>
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
              <th>Comment</th>
              <th>Actions</th>
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
                        <tr key={comment.id}>
                          <td>
                            {editingCommentId === comment.id ? (
                              <input
                                type="text"
                                value={comment.body}
                                onChange={(e) =>
                                  handleCommentChange(
                                    comment.id,
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <span>{comment.body}</span>
                            )}
                          </td>
                          <td>
                            {editingCommentId === comment.id ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleCommentUpdate(comment.id)
                                  }
                                >
                                  Save
                                </button>
                                <button onClick={() => cancelCommentEdit()}>
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => enableCommentEdit(comment.id)}
                              >
                                Edit
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => handleCommentDelete(comment.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    {/* {comments
                      .filter((comment) => comment.postId === post.id)
                      .map((comment) => (
                        <tr key={comment.id}>
                          <td>
                            {editingCommentId === comment.id ? (
                              <input
                                type="text"
                                value={comment.body}
                                onChange={(e) =>
                                  handleCommentChange(
                                    comment.id,
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <span>{comment.body}</span>
                            )}
                          </td>
                          <td>
                            {editingCommentId === comment.id ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleCommentUpdate(comment.id)
                                  }
                                >
                                  Save
                                </button>
                                <button onClick={() => cancelCommentEdit()}>
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => enableCommentEdit(comment.id)}
                              >
                                Edit
                              </button>
                            )}
                            <button
                              onClick={() => handleCommentDelete(comment.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))} */}

                    {/* {comments
                      .filter((comment) => comment.postId === post.id)
                      .map((comment) => (
                        <tr key={comment.id}>
                          <td>
                            {editingCommentId === comment.id ? (
                              <input
                                type="text"
                                value={comment.body}
                                onChange={(e) =>
                                  handleCommentChange(
                                    comment.id,
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <span>{comment.body}</span>
                            )}
                          </td>
                          <td>
                            {editingCommentId === comment.id ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleCommentUpdate(comment.id)
                                  }
                                >
                                  Save
                                </button>
                                <button onClick={() => cancelCommentEdit()}>
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => enableCommentEdit(comment.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleCommentDelete(comment.id)
                                  }
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))} */}

                    {/* {comments
                      .filter((comment) => comment.postId === post.id)
                      .map((comment) => (
                        <tr key={comment.id}>
                          <td>
                            {editingCommentId === comment.id ? (
                              <input
                                type="text"
                                value={comment.body}
                                onChange={(e) =>
                                  handleCommentChange(
                                    comment.id,
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <span>{comment.body}</span>
                            )}
                          </td>
                          <td>
                            {editingCommentId === comment.id ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleCommentUpdate(comment.id)
                                  }
                                >
                                  Save
                                </button>
                                <button onClick={() => cancelCommentEdit()}>
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => enableCommentEdit(comment.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleCommentDelete(comment.id)
                                  }
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))} */}
                    {/* {comments
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
                      ))} */}
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
    </>
  );
};

export default Post;
