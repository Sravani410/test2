import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const handleButtonUser = () => {
    navigate("/");
  };
  const handleButtonClick = () => {
    navigate("/users");
  };

  return (
    <div>
      <button onClick={handleButtonUser}>Go to Posts</button>
      <button onClick={handleButtonClick}>Go to Users</button>
    </div>
  );
};

export default Navigation;
