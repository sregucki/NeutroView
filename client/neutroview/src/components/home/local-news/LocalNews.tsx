import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LocalNews() {
  return (
    <div className="container" id="local-news">
      <h2>Daily Local News</h2>
      <div className="container-title">
        <span className="title-smaller">
          Discover stories happening right in your city.
        </span>
      </div>
      <div id="local-news-search-container">
        <div id="local-news-search">
          <input type="text" placeholder="Enter your city's name" />
        </div>
        <div id="local-news-search-button">
          <button>Submit</button>
        </div>
      </div>
      <div className="divider-thick"></div>
      <div id="set-location-container">
        <button>
          <FontAwesomeIcon icon={faLocationDot} /> Set Location
        </button>
      </div>
      <div className="divider-thin"></div>
    </div>
  );
}

export default LocalNews;
