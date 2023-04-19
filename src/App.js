import { Routes, Route } from "react-router-dom";
import "./App.css";

//Components
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import PhotoList from "./components/PhotoList";

//Context
import PhotoState from "./context/Photo/PhotoState";

function App() {
  return (
    <PhotoState>
      <NavBar />
      <div className="search-container">
        <SearchBar />
        <Routes>
          <Route path="/photosearch" element={<PhotoList />} />
          <Route path="/photosearch/tag/:tagName" element={<PhotoList />} />
        </Routes>
      </div>
    </PhotoState>
  );
}

export default App;
