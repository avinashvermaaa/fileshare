import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:5000/api/files/upload", formData);
      setFileUrl(`${window.location.origin}/file/${data.fileId}`);
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", border: "1px solid gray", borderRadius: "8px" }}>
      <h2>Upload Your File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>Upload</button>
      
      {fileUrl && (
        <div>
          <p>Share this link:</p>
          <input type="text" value={fileUrl} readOnly />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
