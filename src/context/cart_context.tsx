import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";
import { PropsWithChildren } from "react";
import { SingleProduct } from "./products_context";

export interface CartProduct {
  id: string;
  name: string;
  color: string;
  amount: number;
  image: string;
  price: number;
  max: number;
}

export interface CartState {
  cart: CartProduct[];
  totalItems: number;
  totalAmount: number;
  shippingFee: number;
}
interface CartContext extends CartState {
  addToCart: (
    id: string,
    color: string,
    amount: number,
    product: SingleProduct
  ) => void;
  removeItem: (id: string) => void;
  toggleAmount: (id: string, value: "inc" | "dec") => void;
  clearCart: () => void;
}

function getLocalStorage() {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const CartContext = React.createContext<CartContext>({
  ...initialState,
  addToCart: () => {},
  removeItem: () => {},
  toggleAmount: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addToCart(
    id: string,
    color: string,
    amount: number,
    product: SingleProduct
  ) {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  }
  function removeItem(id: string) {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  }
  function toggleAmount(id: string, value: "inc" | "dec") {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  }
  function clearCart() {
    dispatch({ type: CLEAR_CART });
  }

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
