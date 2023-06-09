import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../store/auth/authSlice";
import { hanleSingup } from "../store/auth/authActions";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";

const Register = () => {
  const { email, password, emailError, passwordError } = useSelector(
    (state) => state.auth
  );
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUser = () => {
    if (!email.trim() || !password.trim()) {
      setShowError(true);
      return;
    }

    const obj = {
      email,
      password,
      navigate,
    };
    dispatch(hanleSingup(obj));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "10px",
          gap: "20px",
          width: "35%",
          height: "70vh",
          "@media (max-width: 2560px)": {
            width: "35%",
            height: "65vh",
          },
          "@media (max-width: 1000px)": {
            width: "45%",
            height: "70vh",
          },
          "@media (max-width: 600px)": {
            width: "45%",
            height: "70vh",
          },
          "@media (max-width: 500px)": {
            width: "55%",
            height: "70vh",
          },
          "@media (max-width: 400px)": {
            width: "60%",
            height: "70vh",
          },
          "@media (max-width: 320px)": {
            width: "70%",
            height: "70vh",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0650/8521/0875/files/color_logo_390x.png?v=1663667137"
            alt="logo-error"
            style={{
              width: "80%",
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              textAlign: "center",
              "@media (max-width: 910px)": {
                fontSize: "20px",
              },
            }}
          >
            Join Lonely Planet
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-required"
            label="Email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            color="primary"
            sx={{
              mb: 2,
              width: "80%",
              "@media (max-width:768px)": {
                width: "90%",
                mb: 1,
              },
            }}
          />
          {emailError && (
            <Typography
              sx={{
                width: "80%",
                color: "red",
                marginBottom: "10px",
              }}
            >
              {emailError}
            </Typography>
          )}
          <TextField
            id="outlined-required"
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            color="primary"
            sx={{
              mb: 2,
              width: "80%",
              "@media (max-width:768px)": {
                width: "90%",
                mb: 1,
              },
            }}
          />
          {passwordError && (
            <Typography
              sx={{
                width: "80%",
                color: "red",
                marginBottom: "10px",
              }}
            >
              {passwordError}
            </Typography>
          )}
          {showError ? (
            <Typography variant="h6" sx={{ color: "red" }}>
              Заполните все поля
            </Typography>
          ) : (
            <></>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Button
            onClick={handleUser}
            variant="contained"
            color="primary"
            sx={{
              width: "80%",
              height: "50px",
            }}
          >
            Register
          </Button>
        </Box>
        <Link
          className="links"
          sx={{ color: "black" }}
          href="#"
          variant="body2"
          onClick={() => navigate("/login")}
        >
          {"Already have an account? Log In"}
        </Link>
      </Container>
    </Box>
  );
};

export default Register;
