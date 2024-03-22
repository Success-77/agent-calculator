import React, { useState, useEffect } from "react";

const agentPrices = {
  1: 5,
  2: 8.5,
  3: 11.5,
  4: 17,
  5: 19,
  6: 19 + 5,
  7: 19 + 8.5,
  8: 31,
  9: 33,
  10: 35,
  15: 52,
  20: 68,
  25: 82,
  30: 100,
  40: 135,
  50: 158,
  100: 300,
};

function gigFormatter(packages) {
  return packages.map((pack) => pack + "GB");
}

function amounts(dictionary, packages) {
  return packages.map((pack) => dictionary[parseInt(pack)]);
}

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [tableContent, setTableContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Update table content whenever inputValue changes
    let values = inputValue.split("+").map((value) => value.trim());
    let packs = gigFormatter(values);
    let prices = amounts(agentPrices, values);
    const formattedTable = tabularFormat(packs, prices);
    setTableContent(formattedTable);
  }, [inputValue]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Regular expression to match integers, spaces, and the plus sign
    const validInputRegex = /^[0-9+\s]*$/;

    if (validInputRegex.test(inputValue)) {
      setInputValue(inputValue);
      setInputError(""); // Clear input error if input is valid
    } else {
      setInputError("Input must contain only numbers, spaces, and +");
    }
  };

  const tabularFormat = (packages, prices) => {
    return (
      <div>
        <p>PACKS&nbsp;&nbsp;PRICES</p>
        {packages.map((pack, index) => (
          <p key={index}>
            {index + 1}. {pack} .................... {prices[index]}
          </p>
        ))}
        <p>Total: GHS{prices.reduce((acc, cur) => acc + cur, 0)}</p>
        <p>Orders placed on {new Date().toLocaleDateString("en-GB")}</p>
      </div>
    );
  };

  const handleCopyToClipboard = () => {
    const plainTextContent = tableContent.props.children;

    // Create a temporary textarea element
    const tempTextArea = document.createElement("textarea");

    // Set the value of the textarea to the prepared text content
    tempTextArea.value = plainTextContent;

    // Append the textarea to the document body
    document.body.appendChild(tempTextArea);

    // Select the content of the textarea
    tempTextArea.select();

    // Copy text content to clipboard
    document.execCommand("copy");

    // Remove the temporary textarea from the document body
    document.body.removeChild(tempTextArea);

    // Set isCopied to true to show the message
    setIsCopied(true);
  };

  return (
    <div className="main-container">
      <h3 className="home-header">Daily Sales Calculator</h3>
      <div className="form">
        <div className="input-sales">
          <label htmlFor="day_sales">
            Enter your sales packages separated with +
          </label>
          <input
            type="text"
            name="sales"
            id="day_sales"
            placeholder="10 + 7 + 9 + 6 + 4"
            value={inputValue}
            onChange={handleInputChange}
          />
          {inputError && <p>{inputError}</p>}
        </div>
      </div>
      <div className="packs-container form">
        {tableContent}
        {!isCopied && (
          <button className="copy" onClick={handleCopyToClipboard}>
            Copy
          </button>
        )}
        {isCopied && <p>Content copied!</p>}
      </div>
    </div>
  );
};

export default Home;
