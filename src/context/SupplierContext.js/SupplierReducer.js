/* eslint-disable import/no-anonymous-default-export */
import { GET_SUPPLIERS, SELECT_SUPPLIER } from "../types";

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
      };

    default:
      return state;
  }
}
