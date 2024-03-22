import { link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="brand-name">
        <h3>Hello</h3>
      </div>
      <nav>
        <ul>
          <li className="list-item">
            <Link to="/calculate">Calculate</Link>
          </li>
          <li className="list-item">
            <Link to="/agent-prices">Agent prices</Link>
          </li>
          <li className="list-item">
            <Link to="/sales-prices">Sales prices</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
