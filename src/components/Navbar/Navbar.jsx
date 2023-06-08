import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ADMIN } from "../../helpers/consts";
import { useDispatch, useSelector } from "react-redux";
import { authListener } from "../../store/auth/authActions";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const NavbarContainer = styled(AppBar)(({ theme }) => ({
    backgroundColor: scrolled ? "#ff0000" : "transparent",
    transition: "background-color 0.3s ease",
  }));

  const StyledTypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    display: { xs: "none", sm: "block" },
  }));

  useEffect(() => {
    dispatch(authListener());
  }, []);

  return (
    <Box sx={{ flexGrow: 1, m: 0 }}>
      <NavbarContainer
        position="sticky"
        sx={{ backgroundColor: "white", m: 0 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              width: "20%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography style={{ color: "black", cursor: "pointer" }}>
              Destination
            </Typography>
            <Typography
              onClick={() => navigate("/products")}
              style={{ color: "black", cursor: "pointer" }}
            >
              Products
            </Typography>

            {user === ADMIN && (
              <Typography
                onClick={() => navigate("/admin")}
                style={{ color: "black", cursor: "pointer" }}
              >
                Admin
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: "40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "40%",
                cursor: "pointer",
              }}
              src="https://cdn.shopify.com/s/files/1/0650/8521/0875/files/color_logo_390x.png?v=1663667137"
              alt=""
              onClick={() => navigate("/")}
            />
          </Box>

          <Box sx={{ width: "20%" }}>
            <LoginIcon color="primary" />
          </Box>
        </Toolbar>
      </NavbarContainer>
    </Box>
  );
}
