import React from "react";
import FileUpload from "../components/FileUpload";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to FileShare</h1>
      <FileUpload />
    </div>
  );
}

export default Home;
