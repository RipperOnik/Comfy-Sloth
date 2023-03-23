import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";
import { PropsWithChildren } from "react";

export interface ProductsState {
  isSidebarOpen: boolean;
  productsLoading: boolean;
  productsError: boolean;
  products: Product[];
  featuredProducts: Product[];
  singleProductLoading: boolean;
  singleProductError: boolean;
  singleProduct?: SingleProduct;
}
interface BaseProduct {
  id: string;
  name: string;
  price: number;
  colors: string[];
  company: string;
  description: string;
  category: string;
  shipping: boolean;
  featured?: boolean;
}
export interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  thumbnails: Thumbnails;
  type: string;
}
interface Thumbnails {
  full: Thumbnail;
  large: Thumbnail;
  small: Thumbnail;
}
interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Product extends BaseProduct {
  image: string;
}
export interface SingleProduct extends BaseProduct {
  reviews: number;
  stars: number;
  stock: number;
  images: Image[];
}

export interface ProductsContext extends ProductsState {
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchSingleProduct: (url: string) => void;
}

const initialState: ProductsState = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProductLoading: false,
  singleProductError: false,
};

const ProductsContext = React.createContext<ProductsContext>({
  ...initialState,
  openSidebar: () => {},
  closeSidebar: () => {},
  fetchSingleProduct: () => {},
});

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function openSidebar() {
    dispatch({ type: SIDEBAR_OPEN });
  }
  function closeSidebar() {
    dispatch({ type: SIDEBAR_CLOSE });
  }

  async function fetchProducts(url: string) {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  }
  async function fetchSingleProduct(url: string) {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  }
  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
