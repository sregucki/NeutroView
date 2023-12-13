import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

function NavbarLite() {
  const [currentDatetime, setCurrentDatetime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDatetime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <div className="navbar-main">
      <div className="navbar-top">
        <div className="navbar-main-content">
          <div className="navbar-top-item-datetime">
            <span>
              {currentDatetime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="navbar-main-content navbar-search-bar-lite">
          <div className="navbar-bottom-item">
            <img
              src="logo.svg"
              onClick={() => {
                navigate("/");
              }}
            ></img>
          </div>
          <div className="navbar-bottom-item">
            <div className="navbar-search-bar">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" placeholder="Search"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarLite;
