import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopArticleProviders } from "../../services/ArticleService";
import "./navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const [artcileQuery, setArticleQuery] = useState({
    keyword: "",
    country: "UK,US",
    category: "",
    timespan: "",
    num_records: 5,
    domain: getTopArticleProviders(),
    start_date: "",
    end_date: "",
  });
  const handleKeywordChange = (e: any) => {
    setArticleQuery({ ...artcileQuery, keyword: e.target.value });
  };
  const handleTimespanChange = (e: any) => {
    setArticleQuery({ ...artcileQuery, timespan: e.target.value });
  };
  const handleStartDateChange = (e: any) => {
    setArticleQuery({ ...artcileQuery, start_date: e.target.value });
  };
  const handleEndDateChange = (e: any) => {
    setArticleQuery({ ...artcileQuery, end_date: e.target.value });
  };
  return (
    <div className="navbar-main">
      <NavbarTop />
      <div className="navbar-bottom">
        <div className="navbar-main-content">
          <div className="navbar-bottom-item">
            <img
              src="../logo.svg"
              onClick={() => navigate("/")}
              alt="Neutroview logo"
            ></img>
          </div>
          <div className="navbar-bottom-item">
            <a href="/">Home</a>
          </div>
          <div className="navbar-bottom-item">
            <a onClick={() => navigate("/search/?keyword=eu,european,union")}>
              European Poltics
            </a>
          </div>
          <div className="navbar-bottom-item">
            <a onClick={() => navigate("/search/?keyword=biden,trump,us")}>
              US
            </a>
          </div>
          <div className="navbar-bottom-item">
            <div className="navbar-search-bar-lite-main">
              <div className="navbar-search-bar navbar-search-bar-lite">
                <div className="icon-holder">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                  />
                </div>
                <input
                  type="text"
                  placeholder={`keyword=${artcileQuery.keyword}`}
                  autoComplete="one-time-code"
                  value={artcileQuery.keyword}
                  onChange={handleKeywordChange}
                  onKeyUp={FunctionSearchByAdditionalParams}
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
                    <tbody>
                      <tr>
                        <td>Timespan: </td>
                        <td>
                          <select
                            name="timespan"
                            value={artcileQuery.timespan}
                            onChange={handleTimespanChange}
                          >
                            <option value="1d">1 Day</option>
                            <option value="1w">1 Week</option>
                            <option value="1m">1 Month</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Start Date: </td>
                        <td>
                          <input
                            type="date"
                            name="start-date"
                            value={artcileQuery.start_date}
                            onChange={handleStartDateChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>End Date: </td>
                        <td>
                          <input
                            type="date"
                            name="end-date"
                            value={artcileQuery.end_date}
                            onChange={handleEndDateChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function FunctionSearchByAdditionalParams(event: any) {
    if (event.key === "Enter") {
      const keyword = artcileQuery.keyword
        ? `?keyword=${artcileQuery.keyword}`
        : "";
      const timespan = artcileQuery.timespan
        ? `&timespan=${artcileQuery.timespan}`
        : "";
      const start_date = artcileQuery.start_date
        ? `&start_date=${artcileQuery.start_date}`
        : "";
      const end_date = artcileQuery.end_date
        ? `&end_date=${artcileQuery.end_date}`
        : "";
      navigate(`/search/${keyword}${timespan}${start_date}${end_date}`);
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
