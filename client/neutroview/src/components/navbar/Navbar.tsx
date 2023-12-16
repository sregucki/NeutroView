import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar-main">
      <NavbarTop />
      <div className="navbar-bottom">
        <div className="navbar-main-content">
          <div className="navbar-bottom-item">
            <img
              src="logo.svg"
              onClick={() => navigate("/")}
              alt="Neutroview logo"
            ></img>
          </div>
          <div className="navbar-bottom-item">
            <a href="/">Home</a>
          </div>
          <div className="navbar-bottom-item">
            <a onClick={() => navigate("/search/?keyword=eu,european,union")}>European Poltics</a>
          </div>
          <div className="navbar-bottom-item">
            <a onClick={() => navigate("/search/?keyword=biden,trump,us")}>US</a>
          </div>
          <div className="navbar-bottom-item">
            <div className="navbar-search-bar">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                type="text"
                placeholder="Search"
                id="search-by-keyword"
                onKeyUp={FunctionSearchByKeyword}
                autoComplete="one-time-code"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function FunctionSearchByKeyword(event: any) {
    if (event.key === "Enter") {
      navigate(`/search/?keyword=${getInputKeywords()}`);
    }
  }
}

function NavbarTop() {
  const [currentDatetime, setCurrentDatetime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDatetime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
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
  );
}

function getInputKeywords(): string {
  return (document.getElementById("search-by-keyword") as HTMLInputElement)
    .value;
}

export default Navbar;
export { NavbarTop };
