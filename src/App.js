import Navbar from "./Navbar";
import Home from "./Home";
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Rendering the Navbar component */}
      <Navbar />
      <div className="Home">
        {/* Rendering the Home component */}
        <Home />
      </div>
    </div>
  );
}

export default App;
