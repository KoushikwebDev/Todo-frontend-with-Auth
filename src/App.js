import Registerform from "./MyComponents/Registerform";

import { Routes, Route } from "react-router-dom";
import Loginform from "./MyComponents/Loginform";
import Dashboard from "./MyComponents/Dashboard";
import MyTodos from "./MyComponents/MyTodos";
import SearchData from "./MyComponents/SearchData";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Loginform />} />

        <Route path="/register" element={<Registerform />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/mytodo" element={<MyTodos />} />

        <Route path="/search" element={<SearchData />} />
      </Routes>
      ;
    </div>
  );
}

export default App;
