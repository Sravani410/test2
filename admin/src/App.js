import logo from "./logo.svg";
import "./App.css";
import { Router, Switch, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
import Admin from "./components/Admin";
import Admin1 from "./components/Admin1";
import Post from "./components/Post";
import User from "./components/user";
import Navigation from "./components/Navigation";

// import Users from "./Users";
// import Comments from "./Comments";
// import Search from "./Search";

function App() {
  return (
    <div className="App">
      {/* <Admin /> */}
      <Navigation />

      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
