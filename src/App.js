import React from "react";
import "./App.css";
import Navbar from "./Navbar"; // Importing the Navbar component
import Home from "./Home"; // Importing the Home component

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Rendering the Navbar component */}
      <div className="Home">
        <Home /> {/* Rendering the Home component */}
      </div>
    </div>
  );
}

export default App;
