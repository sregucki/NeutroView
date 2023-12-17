import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarTop } from "./Navbar";
import "./navbar.scss";

function NavbarLite() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const keyword = window.location.href.split("keyword")[1].replace("=", "");
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
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
            <div className="navbar-search-bar-lite-main">
              <div className="navbar-search-bar navbar-search-bar-lite">
                <div className="icon-holder">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                  type="text"
                  placeholder={`keyword=${keyword}`}
                  autoComplete="one-time-code"
                ></input>
                <div
                  className="icon-holder expand-options"
                  onClick={toggleVisibility}
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
              {isVisible && (
                <div className="additional-search-options">
                  <table>
                    <tr>
                      <th>Timespan: </th>
                      <th>
                        <select name="timespan">
                          <option value="1d">1 Day</option>
                          <option value="1w">1 Week</option>
                          <option value="1m">1 Month</option>
                        </select>
                      </th>
                    </tr>
                    <tr>
                      <th>Start Date: </th>
                      <input type="date" name="start-date" />
                    </tr>
                    <tr>
                      <th>End Date: </th>
                      <input type="date" name="end-date" />
                    </tr>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarLite;
