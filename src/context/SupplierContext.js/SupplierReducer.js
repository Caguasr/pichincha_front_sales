/* eslint-disable import/no-anonymous-default-export */
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CUSTOMERS,
  GET_ORDER_BY_DATE,
  GET_SUPPLIERS,
  PROUCT_STOCK,
  SELECT_SUPPLIER,
  UPDATE_PRODUCT,
} from "../types";

export default function (state, action) {
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
      };
    case SELECT_SUPPLIER:
      return {
        ...state,
        select: action.payload,
        inStock: [],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        select: {
          ...state.select,
          name: action.payload.name,
          price: action.payload.price,
          stock: action.payload.stock,
        },
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        select: {
          ...state.select,
          product: state.select.product.filter((e) => e.id !== action.payload),
        },
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        select: {
          ...state.select,
          product: [...state.select.product, action.payload],
        },
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case GET_ORDER_BY_DATE:
      return {
        ...state,
        ordersByDate: action.payload,
      };
    case PROUCT_STOCK:
      return {
        ...state,
        inStock: action.payload,
        select: {},
      };
    default:
      return state;
  }
}
