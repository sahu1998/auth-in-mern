import { Route, Routes } from "react-router-dom";
import AfterSignupPage from "../pages/AfterSignupPage";
import EmailConfirmation from "../pages/EmailConfirmation";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ForgotPassword/change-password";
import Home from "../pages/home";
import SignIn from "../pages/login";
import SignUp from "../pages/signup";

// import Home from "./pages/Home";
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password/:id/:confirmationCode"
        element={<ChangePassword />}
      />
      <Route
        path="/confirm/:id/:confirmationCode"
        element={<EmailConfirmation />}
      />
      <Route path="/account" element={<AfterSignupPage />} />
    </Routes>
  );
}

export default AllRoutes;
