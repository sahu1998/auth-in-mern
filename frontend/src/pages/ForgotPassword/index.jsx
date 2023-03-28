import { Button, TextField } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="forgot-pass-container ">
      <div className="w-100">
        <TextField
          variant="outlined"
          label="Enter Email"
          type="email"
          fullWidth
        />
        <div className=" pt-3">
          <Button className="w-100 " variant="contained">
            Submit
          </Button>
        </div>
        <div className="pt-3 text-end">
          <NavLink to="/signin">Go Back</NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
