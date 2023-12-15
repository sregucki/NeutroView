import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { NavbarTop } from "./Navbar";
import "./navbar.scss";

function NavbarLite() {
  const navigate = useNavigate();
  return (
    <div className="navbar-main">
      <NavbarTop />
      <div className="navbar-bottom">
        <div className="navbar-main-content navbar-main-content-lite">
          <div className="navbar-bottom-item">
            <img
              src="../logo.svg"
              onClick={() => {
                navigate("/");
              }}
              alt=""
            ></img>
          </div>
          <div className="navbar-bottom-item">
            <div className="navbar-search-bar navbar-search-bar-lite">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" placeholder="Search" autoComplete="one-time-code"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarLite;
