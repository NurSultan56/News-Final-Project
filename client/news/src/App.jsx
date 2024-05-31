import "./App.css";
import Header from "./Components/Header";
import Main from "./Pages/MainPage/Main";
import { Routes, Route } from "react-router-dom";
import ReadPage from "./Pages/ReadMore/ReadPage";
import LatestNews from "./Pages/Latest/LatestNews";
import Favourites from "./Pages/Favourites/Favourites";

function App() {
  return (
    <>
      <div className="app_container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/read" element={<ReadPage />} />
          <Route path="/latest" element={<LatestNews/>} />
          <Route path="/favourites" element={<Favourites/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
