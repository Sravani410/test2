import React, { useState, useEffect } from "react";

const BASE_URL = "https://dummyjson.com";

const User = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [editingUserId, setEditingUserId] = useState(null);

  const enableUserEdit = (userId) => {
    setEditingUserId(userId);
  };

  const cancelUserEdit = () => {
    setEditingUserId(null);
  };

  const handleUserChange = (userId, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

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
  const handleUserUpdate = async (userId) => {
    try {
      const userToUpdate = users.find((user) => user.id === userId);
      const updatedDetails = {
        name: userToUpdate.name,
        email: userToUpdate.email,
      };

      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, ...updatedDetails } : user
          )
        );
        setEditingUserId(null);
      } else {
        console.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <>
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
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        handleUserChange(user.id, "name", e.target.value)
                      }
                    />
                  ) : (
                    <span>{user.name}</span>
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <>
                      <button onClick={() => handleUserUpdate(user.id)}>
                        Save
                      </button>
                      <button onClick={() => cancelUserEdit()}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => enableUserEdit(user.id)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
