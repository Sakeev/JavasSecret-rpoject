import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setProducts } from "./productsSlice";
import { API } from "../../helpers/consts";

export const getproducts = createAsyncThunk(
  "@products/getProducts",
  async (_, { dispatch }) => {
    const { data } = await axios(API);
    dispatch(setProducts(data));
  }
);

export const addProduct = createAsyncThunk(
  "@product/addProduct",
  async (newProduct, { dispatch }) => {
    await axios.post(API, newProduct);
    dispatch(getproducts());
  }
);
