import "./App.css";
import SignUp from "./Components/Auth/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Auth/LogIn";
import Welcome from "./Components/Pages/Welcome";
import UpdateProfile from "./Components/Pages/UpdateProfile";
import ResetPassword from "./Components/Auth/ResetPassword";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>
      {!isAuth && <Route path="/login" element={<Login />} />}
      {!isAuth && <Route path="signup" element={<SignUp />} />}
      {!isAuth ? (
        <Route path="/*" element={<Navigate to="/login" />} />
      ) : (
        <>
          <Route path="/" element={<Welcome />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </>
      )}
      <Route path="/resetpassword" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
