import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import swal from "sweetalert";
import * as yup from "yup";
import { postApiHandler } from "../../apiHandler";
import { NavLink, useNavigate } from "react-router-dom";

const theme = createTheme();
const schema = yup.object().shape({
  first_name: yup
    .string()
    .required("*User name is required")
    .matches(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/, "*Use only alphabats"),
  last_name: yup
    .string()
    .required("*User name is required")
    .matches(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/, "*Use only alphabats"),
  username: yup
    .string()
    .required("*User name is required")
    .matches(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/, "*Use only alphabats"),
  email: yup
    .string()
    .required("*email is required")
    .matches(
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
      "*Incorrect Email"
    ),
  // adharcard: yup
  //   .string()
  //   .required("*Adhar card is required")
  //   .matches(/^[0-9]+$/, "Must be only digits")
  //   .min(12, "Must be exactly 12 digits")
  //   .max(12, "Must be exactly 12 digits"),
  phone: yup
    .string()
    .required("*Contact is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  password: yup
    .string()
    .required("*Password is required")
    .min(8, "*Minimum 8 characters "),
  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .min(8, "*Minimum 8 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});
export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useNavigate();
  const onSubmit = async (values) => {
    console.log("user: ", values);
    // if (!(values.password === values.confirm_password)) {
    //   setError("confirm_password", {
    //     type: "focus",
    //     message: "Password doesn't match",
    //   });
    // } else {
    const result = await postApiHandler("/register", values);
    console.log("result:-----", result);
    if (result.status) {
      await swal("Registration Successfull", result.message, "success");

      history("/account");
    } else {
      await swal("Registration Failed", result.message, "error");
    }
    // }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "90vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...register("first_name")}
                    error={!!errors?.first_name}
                    helperText={errors?.first_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="last_name"
                    {...register("last_name")}
                    error={!!errors?.last_name}
                    helperText={errors?.last_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    {...register("username")}
                    error={!!errors?.username}
                    helperText={errors?.username?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register("email")}
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Mobile Number"
                    name="phone"
                    {...register("phone")}
                    error={!!errors?.phone}
                    helperText={errors?.phone?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password")}
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    {...register("confirm_password")}
                    error={!!errors?.confirm_password}
                    helperText={errors?.confirm_password?.message}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink to={"/signin"}>
                    {"Don't have an account? Sign In"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
