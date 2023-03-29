import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { getApiHandler, postApiHandler } from "../../apiHandler";

const ChangePassword = () => {
  const { id, confirmationCode } = useParams();
  const { register, handleSubmit } = useForm();
  const [showComp, setShowComp] = useState(false);
  const history = useNavigate();

  const onSubmit = async (value) => {
    console.log("forgot email: ", value);
    const checkEmail = await postApiHandler(
      `/change-password/${id}/${confirmationCode}`,
      value
    );
    checkEmail.status === 200
      ? await swal("Success", "Paswword Reset Successfully.", "success")
      : await swal("Error", "Invalid link.", "error");
    history("/signin");
    console.log("kdsfjl: ", checkEmail);
  };
  const verifyUserEmail = async () => {
    const verifyUser = await getApiHandler(
      `/verify-user/${id}/${confirmationCode}`
    );
    console.log("verify: ", verifyUser);
    if (verifyUser.status === 200) {
      setShowComp(true);
    }
  };

  useEffect(() => {
    if (confirmationCode) {
      verifyUserEmail();
    }
  }, []);
  return (
    <div className="forgot-pass-container ">
      {showComp ? (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="w-100"
        >
          <TextField
            variant="outlined"
            className="pb-4"
            label="Enter Password"
            type="password"
            fullWidth
            {...register("password")}
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="text"
            fullWidth
            {...register("confirm-password")}
          />

          <div className=" pt-3">
            <Button className="w-100 " type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </Box>
      ) : (
        <Box>Link Expired...</Box>
      )}
    </div>
  );
};

export default ChangePassword;
