import Registerform from "./MyComponents/Registerform";

import { Routes, Route } from "react-router-dom";
import Loginform from "./MyComponents/Loginform";
import Dashboard from "./MyComponents/Dashboard";
import MyTodos from "./MyComponents/MyTodos";
import SearchData from "./MyComponents/SearchData";
import AppwriteLogin from "./Appwrite/AppwriteLogin";
import AppwriteSignUp from "./Appwrite/AppwriteSignUp";
import AppwriteDashboard from "./Appwrite/AppwriteDashboard";
import Alltodos from "./Appwrite/Alltodos";
import Search from "./Appwrite/Search";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Loginform />} />

        <Route path="/register" element={<Registerform />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/mytodo" element={<MyTodos />} />

        <Route path="/search" element={<SearchData />} />

        <Route path="/appwritelogin" element={<AppwriteLogin />} />

        <Route path="/appwritesignup" element={<AppwriteSignUp />} />

        <Route path="/appwritedashboard" element={<AppwriteDashboard />} />

        <Route path="/appwritetodos" element={<Alltodos />} />

        <Route path="/appwritesearch" element={<Search />} />
      </Routes>
      ;
    </div>
  );
}

export default App;
