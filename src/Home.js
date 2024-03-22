import "./Home.css";
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
  const values = packages.map((pack) => pack + "GB");
  return values;
}

function amounts(dictionary, packages) {
  const prices = packages.map((pack) => dictionary[parseInt(pack)]);
  return prices;
}

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [tableContent, setTableContent] = useState("");

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
    let formattedTable = "<div>";
    formattedTable += "<p>PACKS&nbsp;&nbsp;PRICES</p>";
    packages.forEach((pack, index) => {
      const packLen = pack.length;
      const priceLen = String(prices[index]).length;
      const middleLen =
        25 - (packLen + 1 + (priceLen + 1) + (String(index + 1).length + 2));
      let middleDots = "";
      for (let dot = 0; dot < middleLen; dot++) {
        middleDots += ".";
      }
      formattedTable += `<p>${index + 1}. ${pack} ${middleDots} ${
        prices[index]
      }</p>`;
    });
    formattedTable += "</div>";
    const period = new Date().toLocaleDateString("en-GB");
    formattedTable += `<p>Total: GHS${prices.reduce(
      (acc, cur) => acc + cur,
      0
    )}</p>`;
    formattedTable += `<p>Orders placed on ${period}</p>`;
    return formattedTable;
  };

  const handleCopyToClipboard = () => {
    // Construct the header content
    //const headerContent = "PACKS\t\t\t\t\t\t\t\t\t\tPRICES\n";

    // Construct the plain text content with proper line breaks
    const plainTextContent = tableContent;

    // Create a temporary textarea element
    const tempTextArea = document.createElement("textarea");

    // Set the value of the textarea to the prepared text content
    tempTextArea.value = plainTextContent
      .replace(/<\/?p>/g, "\n")
      .replace(/&nbsp;/g, "\t")
      .replace(/<[^>]+>/g, ""); // Replace HTML tags and entities with proper line breaks and tabs

    // Append the textarea to the document body
    document.body.appendChild(tempTextArea);

    // Select the content of the textarea
    tempTextArea.select();

    // Copy text content to clipboard
    document.execCommand("copy");

    // Remove the temporary textarea from the document body
    document.body.removeChild(tempTextArea);
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    // Update state to indicate that the image has been clicked
    setIsClicked(true);

    // Copy the content here (you can use document.execCommand('copy') or other methods)
    // For simplicity, I'm just logging a message to the console
    console.log("Content copied!");
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
            onChange={handleInputChange} // Add onChange event handler to update the input value
          />
        </div>
        <div className="submit-button">{inputError && <p>{inputError}</p>}</div>
      </div>
      <div className="packs-container form">
        <div dangerouslySetInnerHTML={{ __html: tableContent }}></div>
        {isClicked ? (
          <p>Content copied!</p>
        ) : (
          <button
            className="copy"
            onClick={() => {
              handleClick();
              handleCopyToClipboard();
            }}
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
