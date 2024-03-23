import React, { useState, useEffect, useMemo } from "react";

function gigFormatter(packages) {
  return packages.map((pack) => pack + "GB");
}

function amounts(dictionary, packages) {
  return packages.map((pack) => dictionary[parseInt(pack)]);
}

const Home = () => {
  const initialAgentPrices = useMemo(
    () => ({
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
    }),
    []
  );

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [tableContent, setTableContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let values = inputValue.split("+").map((value) => value.trim());
    let packs = gigFormatter(values);
    let prices = amounts(initialAgentPrices, values);
    const formattedTable = tabularFormat(packs, prices);
    setTableContent(formattedTable);
  }, [inputValue, initialAgentPrices]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    const validInputRegex = /^[0-9+\s]*$/;

    if (validInputRegex.test(inputValue)) {
      setInputValue(inputValue);
      setInputError("");
    } else {
      setInputError("Input must contain only numbers, spaces, and +");
    }
  };

  const tabularFormat = (packages, prices) => {
    return (
      <div>
        <p>PACKS PRICES</p>
        {packages.map((pack, index) => {
          const packLen = pack.length;
          const priceLen = String(prices[index]).length;
          const indexLen = String(index + 1).length;
          const totalLen = 20;
          const dotsLen = totalLen - (packLen + priceLen + indexLen + 5); // 5 is the number of additional characters including dots, spaces, and indexes

          let dots = "";
          for (let i = 0; i < dotsLen; i++) {
            dots += ".";
          }

          return (
            <p key={index}>
              {index + 1}. {pack} {dots} {prices[index]}
            </p>
          );
        })}
        <p>Total: GHS{prices.reduce((acc, cur) => acc + cur, 0)}</p>
        <p>Orders placed on {new Date().toLocaleDateString("en-GB")}</p>
      </div>
    );
  };

  const handleCopyToClipboard = () => {
    let values = inputValue.split("+").map((value) => value.trim());
    let packs = gigFormatter(values);
    let prices = amounts(initialAgentPrices, values);
    const plainTextLines = plainTextFormat(packs, prices);

    const plainText = plainTextLines.join("\n");

    navigator.clipboard
      .writeText(plainText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  function plainTextFormat(packages, prices) {
    let output = [];
    output.push("\n*PACKS*\t\t*PRICES*");
    for (let i = 0; i < packages.length; i++) {
      let pack = packages[i];
      let price = prices[i];
      let packLen = pack.length;
      let priceLen = price.toString().length;
      let middleLen =
        30 - (packLen + 1 + (priceLen + 1) + (i.toString().length + 2));
      let line = `${i + 1}. ${pack}`;
      for (let j = 0; j < middleLen; j++) {
        line += ".";
      }
      line += ` ${price}`;
      output.push(line);
    }
    let total = prices.reduce((acc, curr) => acc + curr, 0);
    output.push(`\n*Total: GHS${total}*`);
    let today = new Date().toLocaleDateString();
    output.push(`\n*Orders placed on ${today}*`);
    return output;
  }

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
