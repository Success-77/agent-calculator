import React from "react";

const Snippet = ({ markdownText }) => {
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(markdownText)
      .then(() => {
        alert("Content copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="snippet">
      <pre>{markdownText}</pre>
      <button onClick={handleCopyClick}>Copy to Clipboard</button>
    </div>
  );
};

export default Snippet;
