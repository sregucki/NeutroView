import Navbar from "../navbar/Navbar";
import Headlines from "./headlines/Headlines";
import "./home.scss";
import LocalNews from "./local-news/LocalNews";
import TopStories from "./top-stories/TopStories";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <TopStories />
        <Headlines />
        <LocalNews />
      </div>
    </div>
  );
}

export default Home;
