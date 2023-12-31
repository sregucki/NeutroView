import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setClientLocation } from "../../../services/LocationService";

function LocalNews() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const handleInputChange = (event: any) => {
    setLocation(event.target.value);
  };

  return (
    <div className="container" id="local-news">
      <h2>Daily Local News</h2>
      <div className="container-title">
        <span className="title-smaller">
          Discover stories happening right in your country.
        </span>
      </div>
      <div id="local-news-search-container">
        <div id="local-news-search">
          <input
            type="text"
            placeholder="Enter country's name"
            value={location}
            onChange={handleInputChange}
          />
        </div>
        <div id="local-news-search-button">
          <button onClick={() => navigate(`/search/?keyword=${location}`)}>
            Submit
          </button>
        </div>
      </div>
      <div className="divider-thick"></div>
      <div id="set-location-container">
        <button onClick={() => setClientLocation(setLocation)}>
          <FontAwesomeIcon icon={faLocationDot} /> Set Location
        </button>
      </div>
      <div className="divider-thin"></div>
    </div>
  );
}

export default LocalNews;
