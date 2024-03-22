import "./App.css";
import "./Navbar.js";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="Home">
        <Home />
      </div>
    </div>
  );
}

export default App;
