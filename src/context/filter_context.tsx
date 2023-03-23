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
}
interface FilterContext extends FilterState {
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const initialState: FilterState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: "price-lowest",
};

const FilterContext = React.createContext<FilterContext>({
  ...initialState,
  setGridView: () => {},
  setListView: () => {},
  updateSort: () => {},
});

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort]);

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

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
