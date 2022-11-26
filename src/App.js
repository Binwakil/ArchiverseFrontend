
import './App.css';
import {Navbar,Footer} from './components'
import {Home,Profile,Item, Create,Login, Register, Nftitem} from './pages'
import { Routes, Route } from "react-router-dom"
import * as React from 'react';


// page :::::::::::::::::



function App() {
  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/create" element={<Create /> } />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/nftitem/:token_id" element={ <Nftitem />} />
          </Routes>
      <Footer />
    </div>

  );
}

export default App;
