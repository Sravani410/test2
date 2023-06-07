import logo from "./logo.svg";
import "./App.css";
import { Router, Switch, Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import User from "./components/user";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
