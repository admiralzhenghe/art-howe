import "./App.css";

// Components
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";
import Search from "./components/Search";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Search />
        <Routes>
          <Route path="" element={<Mosaic />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
