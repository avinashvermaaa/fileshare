import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FileDownload() {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/files/${id}`
        );
        setFileUrl(data.url);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, [id]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Download Your File</h2>
      {fileUrl ? (
        <a href={fileUrl} download>
          <button>Download File</button>
        </a>
      ) : (
        <p>File not found or expired!</p>
      )}
    </div>
  );
}

export default FileDownload;
