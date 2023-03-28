import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import { postApiHandler } from "../../apiHandler";
const buttonSx = {
  ...{
    bgcolor: green[500],
    "&:hover": {
      bgcolor: green[700],
    },
  },
};
const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (value) => {
    setLoading(true);
    console.log("forgot email: ", value);
    const checkEmail = await postApiHandler("/check-email", value);
    console.log("kdsfjl: ", checkEmail);
    if (checkEmail.status === 200) {
      await swal(
        checkEmail.message,
        `Link for changing password is sended to ${value.email}`,
        "success"
      );
    } else {
      await swal("Error", checkEmail.message, "warning");
    }
    setLoading(false);
  };
  return (
    <div className="forgot-pass-container ">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="w-100">
        <TextField
          variant="outlined"
          label="Enter Email"
          type="email"
          fullWidth
          {...register("email")}
        />
        <Box sx={{ m: 1, position: "relative" }} className=" pt-3">
          <Button
            className="w-100 "
            type="submit"
            variant="contained"
            disabled={loading}
          >
            Submit
            {/* {loading && <CircularProgress/>} */}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-5px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
        <div className="pt-3 text-end">
          <Divider />
          <NavLink to="/signin">Go Back</NavLink>
        </div>
      </Box>
    </div>
  );
};

export default ForgotPassword;
