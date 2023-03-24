import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import { PropsWithChildren } from "react";
import { Product } from "./products_context";

export interface FilterState {
  filteredProducts: Product[];
  allProducts: Product[];
  gridView: boolean;
  sort: string;
  filters: Filters;
}
interface Filters {
  text: string;
  company: string;
  category: string;
  color: string;
  minPrice: number;
  maxPrice: number;
  price: number;
  shipping: boolean;
}
interface FilterContext extends FilterState {
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updateFilters: (e: any) => void;
  clearFilters: () => void;
}

const initialState: FilterState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext<FilterContext>({
  ...initialState,
  setGridView: () => {},
  setListView: () => {},
  updateSort: () => {},
  updateFilters: (e) => {},
  clearFilters: () => {},
});

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  function setGridView() {
    dispatch({ type: SET_GRIDVIEW });
  }
  function setListView() {
    dispatch({ type: SET_LISTVIEW });
  }
  function updateSort(e: React.ChangeEvent<HTMLSelectElement>) {
    // const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  }
  function updateFilters(e: any) {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    } else if (name === "color") {
      value = e.target.dataset.color;
    } else if (name === "price") {
      value = Number(value);
    } else if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  }
  function clearFilters() {
    dispatch({ type: CLEAR_FILTERS });
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
