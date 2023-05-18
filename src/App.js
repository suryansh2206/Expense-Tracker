import "./App.css";
import SignUp from "./Components/Auth/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/LogIn";
import Welcome from "./Components/Pages/Welcome";
import UpdateProfile from "./Components/Pages/UpdateProfile";
import ResetPassword from "./Components/Auth/ResetPassword";

function App() {
  return (
    <Routes>
      {<Route path="/login" element={<Login />} />}
      {<Route path="signup" element={<SignUp />} />}
      <Route path="/" element={<Welcome />} />
      <Route path="/updateprofile" element={<UpdateProfile />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
