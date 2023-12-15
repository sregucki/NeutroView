import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Search from "./components/search/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search/*" element={<Search />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
