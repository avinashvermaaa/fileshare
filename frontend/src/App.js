import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FileDownload from "./components/FileDownload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file/:id" element={<FileDownload />} />
      </Routes>
    </Router>
  );
}

export default App;
