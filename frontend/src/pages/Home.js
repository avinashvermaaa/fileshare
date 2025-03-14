import React, { useState } from "react";
import "./Home.css";
import axios from "axios"; // Ensure you have axios installed

const BACKEND_URL = "https://share247.onrender.com"; // Updated backend URL

const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [shortLinks, setShortLinks] = useState([]);

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]); // Append new files
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  // Remove a file from the list
  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  // Handle sending files
  const handleSendFiles = async () => {
    if (selectedFiles.length === 0) {
      alert("Please upload at least one file before sending.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/upload`, // Use deployed backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Files sent successfully!");
        setShortLinks(response.data.shortLinks);
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Error sending files:", error);
      alert("Failed to send files. Try again.");
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        Sharekaro.io
        <p className="sub-header1">
          Effortlessly Send & Receive Files - Secure🔐, Fast🚀 and
          Hassle-Free✨!
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
          <button className="button" onClick={handleSendFiles}>
            Send Files
          </button>
          <button className="button">Request Files</button>
          <button className="button">Sent</button>
          <button className="button">Login</button>
        </div>

        {/* File Upload Section */}
        <div className="upload-section">
          <h2>Transfer Your Files 🚀💙</h2>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            multiple
            onChange={handleFileChange}
          />
          <button className="button" onClick={handleUploadClick}>
            Upload Files
          </button>

          {selectedFiles.length > 0 && (
            <div className="file-list">
              <p className="file-count">
                Selected Files: {selectedFiles.length}
              </p>
              <table>
                <thead>
                  <tr>
                    <th>S.no.</th>
                    <th>File Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFiles.map((file, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{file.name}</td>
                      <td>
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveFile(index)}
                        >
                           Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Short Links Display */}
        {shortLinks.length > 0 && (
          <div className="short-links">
            <h3>Generated Links:</h3>
            {shortLinks.map((link, index) => (
              <p key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2024 Sharekaro.io | All Rights Reserved 💙
      </footer>
    </div>
  );
};

export default Home;
