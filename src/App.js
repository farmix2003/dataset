import { Route, Routes } from "react-router-dom";
import Main from "./components/main";
import EntityService from "./service/entityAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEntitySuccess } from "./slice/entity";
import EntityCard from "./components/entityCard";
import EditEntity from "./components/editEntity";

function App() {
  return (
    <div className="container mt-2 pb-5">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/entity/:id" element={<EntityCard />} />
        <Route path="/edit/:id" element={<EditEntity />} />
      </Routes>
    </div>
  );
}

export default App;
