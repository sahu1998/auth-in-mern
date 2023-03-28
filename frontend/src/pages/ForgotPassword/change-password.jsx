import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getApiHandler, postApiHandler } from "../../apiHandler";

const ChangePassword = () => {
  const { confirmationCode } = useParams();
  const { register, handleSubmit } = useForm();
  const [showComp, setShowComp] = useState(false);

  const onSubmit = async (value) => {
    console.log("forgot email: ", value);
    const checkEmail = await postApiHandler("/change-password", value);
    console.log("kdsfjl: ", checkEmail);
  };
  const verifyUserEmail = async () => {
    const verifyUser = await getApiHandler(`/verify-user/${confirmationCode}`);
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
            type="email"
            fullWidth
            {...register("password")}
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="email"
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
