import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub, FaEnvelope, FaSnapchat, } from "react-icons/fa";
import { FaTimes } from 'react-icons/fa';
import { MdRemoveRedEye } from 'react-icons/md';

const BACKEND_URL = "https://share247.onrender.com";

const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [shortLinks, setShortLinks] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [previewFile, setPreviewFile] = useState(null); // For modal

  const handlePreview = (file) => {
    setPreviewFile(file);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleSendFiles = async () => {
    if (selectedFiles.length === 0) {
      alert("Please upload at least one file before sending.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    setIsSending(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Files sent successfully!");
        setShortLinks(response.data.shortLinks);
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Error sending files:", error);
      alert("Failed to send files. Try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyLink = async (link, index) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const renderPreview = (file) => {
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return <img src={URL.createObjectURL(file)} alt="preview" className="modal-content-img" />;
    } else if (fileType === "application/pdf") {
      return <iframe src={URL.createObjectURL(file)} title={file.name} className="modal-content-pdf"></iframe>;
    } else if (fileType.startsWith("video/")) {
      return (
        <video controls className="modal-content-video">
          <source src={URL.createObjectURL(file)} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <span className="preview-text">File type not supported, Only preview with(pdf,img,video)</span>;
    }
  };


  return (
    <div className="container">
      <div className="header">
        FileShare247
        <p className="sub-header1">
          Next-Gen File Sharing 📁 :- Lightning Fast 🚀, Rock-Solid Secure 🔐 & Hassle-Free ✨!
        </p>
      </div>

      <div className="content">
        <div className="buttons">
          <button
            className={`button ${isSending ? "sending" : ""}`}
            onClick={handleSendFiles}
            disabled={isSending}
          >
            {isSending ? "Sending...🚀" : "Send Files"}
          </button>
        </div>

        <div className="upload-section">
          <h2>Transfer Your Files 📁🚀💙</h2>
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
              <p className="file-count">Selected Files: {selectedFiles.length}</p>
              <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>0.</th>
                    <th>File Name</th>
                    <th>View</th>
                    <th>X</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFiles.map((file, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{file.name}</td>
                      <td>
                        <button className="preview-button" onClick={() => handlePreview(file)}>
                        <MdRemoveRedEye size={18} color="black" />
                        </button>
                      </td>
                      <td>
                        <button className="remove-button" onClick={() => handleRemoveFile(index)}>
                        <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          )}
        </div>

        {shortLinks.length > 0 && (
          <div className="short-links">
            <h3>Generated Links:</h3>
            {shortLinks.map((link, index) => (
              <div className="link-item" key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
                <button className="copy-button" onClick={() => handleCopyLink(link, index)}>
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <span>© 2024 Fileshare247 |</span>
          <a href="https://www.instagram.com/avinash_vermaa" target="_blank" rel="noopener noreferrer"> <FaInstagram className="social-icon instagram" /> </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"> <FaLinkedin className="social-icon linkedin" /> </a> 
          <a href="https://x.com" target="_blank" rel="noopener noreferrer"> <FaTwitter className="social-icon twitter" /> </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"> <FaGithub className="social-icon github" /> </a>
          <a href="mailto:notadded@mail.com" target="_blank" rel="noopener noreferrer"> <FaEnvelope className="social-icon envelope" /> </a>
          <a href="https://www.snapchat.com" target="_blank" rel="noopener noreferrer"> <FaSnapchat className="social-icon snapchat" /> </a>
          <span>| Made with 💙 in India.</span>
        </div>
      </footer>

      {/* MODAL PREVIEW */}
      {previewFile && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleClosePreview}>
              <FaTimes size={24} />
            </button>
            {renderPreview(previewFile)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
