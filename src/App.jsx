import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  
  const [loading, setLoading] = useState(true)

  

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home loading={loading} setLoading={setLoading}/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetails loading={loading} setLoading={setLoading}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
