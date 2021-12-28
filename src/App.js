import "./App.css";
// React
import { useState } from "react";

// Components
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";
import Search from "./components/Search";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [viewing, setViewing] = useState(false);
  return (
    <Router>
      <div className="App">
        <Header setViewing={setViewing} />
        <Search />
        <Routes>
          <Route
            path=""
            element={<Mosaic viewing={viewing} setViewing={setViewing} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
