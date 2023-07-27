import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import VotingPage from "./VotingPage";
import VotingData from "./VotingData";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/votingpage" element={<VotingPage />} />
        <Route path="/votingdata" element={<VotingData />} />
      </Routes>
    </Router>
  );
};

export default App;
