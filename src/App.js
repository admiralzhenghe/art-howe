import "./App.css";

// Components
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      <Mosaic />
    </div>
  );
}

export default App;
