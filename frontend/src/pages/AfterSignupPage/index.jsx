import React from "react";
import { Link } from "react-router-dom";

const AfterSignupPage = () => {
  return (
    <div className="text-center py-5 bg-primary text-white">
      <div className="fw-bold fs-2">Almost there...</div>
      <div className="py-4">
        Please check your email <br />
        to confirm your account.
      </div>
      <hr />
      <div className="py-4">
        If ______ is not your email
        <br />
        address, please <Link to="/signup">go back</Link>
        and enter the correct one
      </div>
    </div>
  );
};

export default AfterSignupPage;
