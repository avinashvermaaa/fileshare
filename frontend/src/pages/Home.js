import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        Sharekaro.io
        <p className="sub-header1">
          Effortlessly Send & Receive Files - Secure🔐, Fast🚀and Hassle-Free✨!
        </p>
        <p className="sub-header2">
          "Say goodbye 👋 to complicated transfers and enjoy seamless🌟 file
          sharing 📂 anytime, anywhere 🌍🌻!"
        </p>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Action Buttons */}
        <div className="buttons">
          <button className="button">Send Files</button>
          <button className="button">Request Files</button>
          <button className="button">Sent</button>
          <button className="button">Login</button>
        </div>

        {/* File Upload Section */}
        <div className="upload-section">
          <h2>Transfer Your Files 🚀💙</h2>
          <button className="button">Upload Files</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2024 Sharekaro.io | All Rights Reserved 💙
      </footer>
    </div>
  );
};

export default Home;
