import React, { useState, useEffect } from "react";
import copyIcon from "../assets/copy.png";

const serverDetails = {
  momoNumber: "0544188015",
  momoName: "Desmond Quayson",
};
function gigFormatter(packages) {
  return packages.map((pack) => pack + "GB");
}

function amounts(dictionary, packages) {
  return packages.map((pack) => dictionary[parseInt(pack)]);
}

function replaceUndefinedWithQuestionMark(prices) {
  return prices.map((price) => (price === undefined ? "?" : price));
}

const Calculator = ({ initialAgentPrices, network }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [tableContent, setTableContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const values = inputValue.split("+").map((value) => value.trim());
    const packs = gigFormatter(values);
    const prices = amounts(initialAgentPrices, values);
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
      setInputError("Invalid input!");
    }
  };

  const handleInputBlur = () => {
    if (inputError) {
      setInputError("");
    }
  };

  const handleCopyToClipboard = () => {
    if (inputValue) {
      const values = inputValue.split("+").map((value) => value.trim());
      const packs = gigFormatter(values);
      const prices = amounts(initialAgentPrices, values);
      const plainTextLines = plainTextFormat(packs, prices);
      const plainText = plainTextLines.join("\n");

      navigator.clipboard
        .writeText(plainText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  const copyMomoNumber = () => {
    navigator.clipboard
      .writeText(serverDetails.momoNumber)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => console.error("Copy failed!", err));
  };
  const tabularFormat = (packages, prices) => {
    const replacedPrices = replaceUndefinedWithQuestionMark(prices.slice());
    const numericPrices = replacedPrices.map((price) =>
      typeof price === "number" ? price : 0
    );

    return (
      <div>
        <h4 className="sales-header">
          <span>Packs</span>
          <span>Prices</span>
        </h4>
        {packages.map((pack, index) => {
          const packLen = pack.length;
          const priceLen = String(numericPrices[index]).length;
          const indexLen = String(index + 1).length;
          const totalLen = 20;
          const dotsLen = totalLen - (packLen + priceLen + indexLen + 5);

          let dots = "";
          for (let i = 0; i < dotsLen; i++) {
            dots += ".";
          }

          return (
            <p key={index}>
              {index + 1}. {pack} {dots}{" "}
              {numericPrices[index] === 0 ? "?" : numericPrices[index]}
            </p>
          );
        })}
        <p className="totalAmt">
          Total: GH&#8373;
          {numericPrices.reduce((acc, cur) => acc + cur, 0).toFixed(2)}
        </p>
        <p>Orders placed on {new Date().toLocaleDateString("en-GB")}</p>
      </div>
    );
  };

  function plainTextFormat(packages, prices) {
    const output = [];
    output.push("\n*PACKS*\t\t*PRICES*");

    const copiedPrices = prices.slice();

    for (let i = 0; i < packages.length; i++) {
      const pack = packages[i];
      const price = copiedPrices[i];
      const packLen = pack.length;
      const priceStr = price !== undefined ? price.toString() : "?";
      const priceLen = priceStr.length;
      const middleLen =
        30 - (packLen + 1 + (priceLen + 1) + (i.toString().length + 2));
      let line = `${i + 1}. ${pack}`;
      for (let j = 0; j < middleLen; j++) {
        line += ".";
      }
      line += ` ${priceStr}`;
      output.push(line);
    }
    const total = copiedPrices.reduce((acc, curr) => acc + (curr || 0), 0);
    output.push(`\n*Total: GH₵${total.toFixed(2)}*`);
    const today = new Date().toLocaleDateString();
    output.push(`\n*Orders placed on ${today}*`);
    return output;
  }

  return (
    <div className="main-container">
      <div className="form">
        <div className="input-sales">
          <p className="small-text guide">
            Enter packages separating each with the plus sign [ + ]
          </p>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="2 + 5 + 10"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <label htmlFor="floatingInput">Enter MTN Packages</label>
          </div>
          {inputError && <p className="error guide">{inputError}</p>}
        </div>
      </div>
      <div className="packs-container form">
        {tableContent}
        {!isCopied && (
          <button className="copy" onClick={handleCopyToClipboard}>
            <img src={copyIcon} alt="copy icon" />
            <span>Copy</span>
          </button>
        )}
        {isCopied && <p>copied!</p>}
      </div>
      <div className="payment">
        <p>
          Make payment to
          <br />
          Momo name: {serverDetails.momoName}
          <br />
          Momo number:
          {(() => {
            const lastTwoDigits = serverDetails.momoNumber.slice(-2);
            return `+233xxxxxxx${lastTwoDigits}`;
          })()}
        </p>

        {!isCopied && (
          <button className="copy" onClick={copyMomoNumber}>
            <img src={copyIcon} alt="copy icon" />
            <span>Copy</span>
          </button>
        )}
        {isCopied && <p>Momo Number Copied!</p>}
      </div>
    </div>
  );
};

export default Calculator;
