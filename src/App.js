import logo from "./logo.svg";
import "./App.css";
import SignUp from "./Components/Auth/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Auth/LogIn";
import { useContext } from "react";
import AuthContext from "./Store/auth-context";
import Welcome from "./Components/Pages/Welcome";
import UpdateProfile from "./Components/Pages/UpdateProfile";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
      {<Route path="/login" element={<Login />} />}
      {<Route path="signup" element={<SignUp />} />}
      <Route path="/" element={<Welcome />} />
      <Route path="/updateprofile" element={<UpdateProfile />} />
    </Routes>
  );
}

export default App;
