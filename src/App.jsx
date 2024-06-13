import React, { useState, useMemo } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import Navbar from "./components/TopBar";

const App = () => {
  const mtnPrices = useMemo(
    () => ({
      2: 11,
      3: 17,
      4: 21,
      5: 23,
      10: 42,
      15: 62,
      20: 73,
      30: 120,
      40: 160,
      50: 200,
      100: 400,
    }),
    []
  );

  // const atPrices = useMemo(
  //   () => ({
  //     1: 3.5,
  //     2: 7,
  //     3: 10,
  //     4: 13,
  //     5: 16,
  //     6: 19,
  //     7: 22,
  //     8: 25,
  //     10: 30,
  //     15: 47,
  //     20: 61,
  //     25: 81,
  //     30: 90,
  //     40: 110,
  //     50: 134,
  //     100: 240,
  //   }),
  //   []
  // );

  // const vodaPrices = useMemo(
  //   () => ({
  //     1: 5.4,
  //     2: 10.4,
  //     3: 15,
  //     4: 19,
  //     5: 22,
  //     10: 40,
  //     15: 60,
  //     20: 80,
  //     50: 196,
  //     100: 385,
  //   }),
  //   []
  // );

  return (
    <div className="App">
      <Navbar />
      <Calculator initialAgentPrices={mtnPrices} />
    </div>
  );
};

export default App;
