import logo from "./logo.svg";
import "./App.css";
import SignUp from "./Components/Auth/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Auth/LogIn";
import { useContext } from "react";
import AuthContext from "./Store/auth-context";
import Welcome from "./Components/Pages/Welcome";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <div className="App-header">
        <Routes>
          {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
          {!authCtx.isLoggedIn && <Route path="signup" element={<SignUp />} />}
          {authCtx.isLoggedIn && <Navigate to="/" />}
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
