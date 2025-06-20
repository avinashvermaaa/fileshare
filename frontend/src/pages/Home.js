import React, { useState, useEffect } from "react";
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
  const [totalSize, setTotalSize] = useState(0); // For total file size


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

    // Calculate the total size of the selected files whenever selectedFiles changes
  useEffect(() => {
    const size = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    setTotalSize(size);
  }, [selectedFiles]);

  // Convert size to a readable format (KB, MB, GB)
  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  };


  // Render the component (Main Content section)
  return (
    <div className="container">
      <div className="header">
        FileShare247
        <p className="subheader">
          Next-Gen File Sharing 📁 :&nbsp;
          <span className="animate-text lightning">Lightning Fast 🚀,</span>
          <span className="animate-text rock-solid">Rock-Solid Secure 🔐</span>
          <span className="animate-text hassle-free"> & Hassle-Free ✨</span>
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
              <p className="file-count">Files Count: {selectedFiles.length} | Total Size: {formatFileSize(totalSize)}</p>
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
          <a href="https://github.com/avinashvermaaa" target="_blank" rel="noopener noreferrer"> <FaGithub className="social-icon github" /> </a>
          <a href="https://www.linkedin.com/in/avinash-verma-20946b21b/" target="_blank" rel="noopener noreferrer"> <FaLinkedin className="social-icon linkedin" /> </a> 
          <a href="https://www.instagram.com/avinash_vermaa" target="_blank" rel="noopener noreferrer"> <FaInstagram className="social-icon instagram" /> </a>
          <a href="mailto:code6969nation@gmail.com.com" target="_blank" rel="noopener noreferrer"> <FaEnvelope className="social-icon envelope" /> </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer"> <FaTwitter className="social-icon twitter" /> </a>
          <a href="https://www.snapchat.com" target="_blank" rel="noopener noreferrer"> <FaSnapchat className="social-icon snapchat" /> </a>
          <span> <strong>| © 2025 Fileshare247</strong> </span>
          <span> <strong>| Made with 💙 in India.</strong> </span>
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
