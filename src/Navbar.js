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
            <a href="#">Calculate</a>
          </li>
          <li className="list-item">
            <a href="#">Agent prices</a>
          </li>
          <li className="list-item">
            <a href="#">Sales prices</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
