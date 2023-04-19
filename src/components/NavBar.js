import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/photosearch">
          <strong>
            <span style={{ color: "#828282" }}>PHOTO</span>
            <span style={{ color: "white" }}>SEARCH</span>
          </strong>{" "}
          <span style={{ color: "#828282" }}>powered by flickr</span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav"></div>
      </div>
    </nav>
  );
};

export default NavBar;
