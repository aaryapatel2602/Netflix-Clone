import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup.jsx';
import Netflix from './pages/Netflix';
import Player from './pages/Player.jsx';
import MoviePage from './pages/Movies';
import TVShows from "./pages/TVShows"
import UserLiked from './pages/UserLiked';
// import NodeBuffer from "node:buffer";

function App() {
  return (
          <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/signup" element={<Signup />}/>
            <Route exact path="/" element={<Netflix />}/>
            <Route exact path="/movies" element={<MoviePage />}/>
            <Route exact path="/mylist" element={<UserLiked />}/>
            <Route exact path="/TVShows" element={<TVShows />}/>
            <Route exact path="/player" element={<Player />}/>
          </Routes>
          </BrowserRouter>
  );
}

export default App;
