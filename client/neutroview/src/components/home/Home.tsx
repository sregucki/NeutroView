import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../navbar/Navbar";
import "./home.scss";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="container" id="top-news-stories">
          <div id="timeline-container">
            <div id="timeline-img"></div>
            <h2>Israel Palestine War</h2>
            <div id="timeline-desc">
              <span>
                A timeline of news events of the most recent escalation in
                violence of the Israeli-Palestinian conflict.
              </span>
            </div>
            <div id="timeline-explore">
              <button>Explore Timeline</button>
            </div>
          </div>
        </div>
        <div className="container" id="headlines"></div>
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
      </div>
    </div>
  );
}

export default Home;
