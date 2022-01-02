// React
import { useState } from "react";
// Components
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";
import Search from "./components/Search";

function App() {
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewing, setViewing] = useState(false);
  return (
    <>
      <Header
        setSearching={setSearching}
        setSearchTerm={setSearchTerm}
        setViewing={setViewing}
      />
      <Search
        setSearching={setSearching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setViewing={setViewing}
      />
      <Mosaic
        searching={searching}
        setSearching={setSearching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewing={viewing}
        setViewing={setViewing}
      />
    </>
  );
}

export default App;
