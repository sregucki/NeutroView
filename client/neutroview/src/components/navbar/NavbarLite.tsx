import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTopArticleProviders } from "../../services/ArticleService";
import { getUrlParams } from "../search/Search";
import { NavbarTop } from "./Navbar";
import "./navbar.scss";

function NavbarLite() {
  const location = useLocation();
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
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    onClick={searchByAdditionalParamsClick}
                  />
                </div>
                <input
                  type="text"
                  placeholder={`keyword=${getUrlParams(location.search).get(
                    "keyword"
                  )}`}
                  autoComplete="one-time-code"
                  value={artcileQuery.keyword}
                  onChange={handleKeywordChange}
                  onKeyUp={searchByAdditionalParamsEnter}
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
  function searchByAdditionalParamsEnter(event: any) {
    if (event.key === "Enter") {
      navigate(getArticlePath());
      window.location.reload();
    }
  }
  function searchByAdditionalParamsClick() {
    navigate(getArticlePath());
    window.location.reload();
  }
  function getArticlePath(): string {
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
    return `/search/${keyword}${timespan}${start_date}${end_date}`;
  }
}

export default NavbarLite;
