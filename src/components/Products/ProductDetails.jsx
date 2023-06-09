import { Button, CardMedia, Divider, Stack, Typography } from "@mui/material";
import Star from "@mui/icons-material/Star";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getOneProduct,
} from "../../store/products/productsActions";
import ModalEdit from "../ModalEdit/ModalEdit";
import { ADMIN } from "../../helpers/consts";
import { calcTotalPrice } from "../../helpers/functions";
import { getCart } from "../../store/cart/cartSlice";

const ColorButton = styled(Button)(() => ({
  color: "#000 !important",
  textTransform: "none !important",
  borderColor: "#000 !important",
  borderRadius: "50px !important",
  padding: "7px 18px !important",
  width: "216px !important",
}));

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetails } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [checkProduct, setCheckProduct] = useState(false);

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [id]);

  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      item: product,
      count: 1,
      subPrice: +product.price,
    };

    let productToFind = cart.products.filter(
      (elem) => elem.item.id === product.id
    );

    if (productToFind.length == 0) {
      cart.products.push(newProduct);
    } else {
      cart.products = cart.products.filter(
        (elem) => elem.item.id !== product.id
      );
    }

    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));

    setCheckProduct((prev) => !prev);
    dispatch(getCart(cart.products));
  };

  const checkProductInCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({ products: [], totalPrice: 0 })
      );
      cart = { products: [], totalPrice: 0 };
    }
    const check = cart.products
      ? cart.products?.find((elem) => elem.item.id === productDetails.id)
      : false;
    return check;
  };

  return (
    <Stack
      direction="row"
      spacing={15}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: "20vh",
      }}
    >
      <CardMedia
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: "10vw",
        }}
      >
        <img
          style={{ maxHeight: "65vh" }}
          src={productDetails?.image}
          alt="img"
        />
      </CardMedia>

      <div style={{ width: "520px" }}>
        <Typography
          variant="caption"
          sx={{ color: "#4d4444", fontSize: "14px" }}
        >
          Lonely Planet
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#0057D9",
            fontSize: "40px",
            fontWeight: "600",
            marginTop: "6px",
          }}
        >
          {productDetails?.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontSize: "16px", marginTop: "26px", marginBottom: "10px" }}
        >
          Pay in 4 interest-free installments for orders over{" "}
          <strong>$50.00</strong> with
          <Typography variant="body2" sx={{ textDecoration: "underline" }}>
            Learn more
          </Typography>
        </Typography>

        <Divider />

        <Typography
          variant="body2"
          sx={{ fontSize: "16px", marginTop: "10px" }}
        >
          eBook
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontSize: "24px", fontWeight: "600" }}
        >
          ${productDetails?.price} USD
        </Typography>

        <Stack direction="row">
          <Star color="primary" />
          <Star color="primary" />
          <Star color="primary" />
          <Star color="primary" />
          <Star color="primary" />

          <Typography variant="body2" sx={{ fontSize: "16px" }}>
            14 reviews
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          sx={{ color: "#4d4444", fontSize: "16px", marginTop: "20px" }}
        >
          <strong>
            Lonely Planet’s{" "}
            <span style={{ fontStyle: "italic" }}>{productDetails?.title}</span>
          </strong>{" "}
          {productDetails?.descr}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            marginTop: "15px",
            marginBottom: "35px",
            cursor: "pointer",
          }}
        >
          Read More
        </Typography>

        <Divider sx={{ marginBottom: "20px" }} />

        <Stack direction="row" sx={{ flexWrap: "wrap", gap: "10px" }}>
          <ColorButton variant="outlined">
            <Stack>
              <Typography
                variant="body2"
                sx={{ fontSize: "16px", fontWeight: "600" }}
              >
                eBook
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontSize: "16px", fontWeight: "600" }}
              >
                $18.95 USD
              </Typography>
            </Stack>
          </ColorButton>

          <ColorButton variant="outlined">
            <Stack>
              <Typography
                variant="body2"
                sx={{ fontSize: "16px", fontWeight: "600" }}
              >
                Book
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "16px", fontWeight: "600" }}
              >
                $29.99 USD
              </Typography>
            </Stack>
          </ColorButton>

          <ColorButton variant="outlined">
            <Stack>
              <Typography
                variant="body2"
                sx={{ fontSize: "16px", fontWeight: "600" }}
              >
                Print & eBook
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontSize: "16px", fontWeight: "600" }}
              >
                $37.99 USD
              </Typography>
            </Stack>
          </ColorButton>
        </Stack>

        <Divider sx={{ marginBottom: "40px" }} />

        <Stack direction="row" sx={{ flexWrap: "wrap", gap: "10px" }}>
          {user === ADMIN ? (
            <>
              {" "}
              <ColorButton
                variant="outlined"
                sx={{
                  backgroundColor: "#0057D9",
                  border: "none !important",
                  "&:hover": {
                    backgroundColor: "#0057D9 !important",
                  },
                }}
              >
                <ModalEdit productDetails={productDetails} />
              </ColorButton>
              <ColorButton
                variant="outlined"
                sx={{
                  backgroundColor: " rgba(98, 60, 150, 0.932)",
                  border: "none !important",
                  height: "44px",

                  "&:hover": {
                    backgroundColor: "rgba(98, 60, 150, 0.932) !important",
                  },
                }}
                onClick={() => {
                  dispatch(deleteProduct(id));
                  navigate("/products");
                }}
              >
                <Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    Delete card
                  </Typography>
                </Stack>
              </ColorButton>
            </>
          ) : checkProductInCart() ? (
            <ColorButton
              variant="outlined"
              sx={{
                border: "none !important",
                backgroundColor: "#0057D9",
                height: "44px",
                "&:hover": {
                  backgroundColor: "#0057D9 !important",
                },
              }}
              onClick={() => addProductToCart(productDetails)}
            >
              <Stack>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  Remove from cart
                </Typography>
              </Stack>
            </ColorButton>
          ) : (
            <ColorButton
              variant="outlined"
              sx={{
                border: "none !important",
                backgroundColor: "#0057D9",
                height: "44px",
                "&:hover": {
                  backgroundColor: "#0057D9 !important",
                },
              }}
              onClick={() => addProductToCart(productDetails)}
            >
              <Stack>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  Add to cart
                </Typography>
              </Stack>
            </ColorButton>
          )}
        </Stack>

        <Divider sx={{ margin: "20px 0" }} />
      </div>
    </Stack>
  );
}

export default ProductDetails;
