function tabularFormat(packages, prices) {
  let output = [];
  output.push("\nPACKS\t\tPRICES");
  for (let i = 0; i < packages.length; i++) {
    let package = packages[i];
    let price = prices[i];
    let packLen = package.length;
    let priceLen = price.toString().length;
    let middleLen =
      20 - (packLen + 1 + (priceLen + 1) + (i.toString().length + 2));
    let line = `${i + 1}. ${package}`;
    for (let j = 0; j < middleLen; j++) {
      line += ".";
    }
    line += ` ${price}`;
    output.push(line);
  }
  let total = prices.reduce((acc, curr) => acc + curr, 0);
  output.push(`\nTotal: GHS${total}`);
  let today = new Date().toLocaleDateString();
  output.push(`\nOrders placed on ${today}`);
  return output;
}

// Example usage:
let packages = ["Package A", "Package B", "Package C"];
let prices = [100, 200, 150];
let formattedOutput = tabularFormat(packages, prices);
formattedOutput.forEach((line) => console.log(line));
