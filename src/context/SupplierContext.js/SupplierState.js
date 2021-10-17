import SupplierReducer from "./SupplierReducer";
import SupplierContext from "./SupplierContext";
import { useReducer } from "react";
import httpConfig from "../../config/HttpConfig";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CUSTOMERS,
  GET_ORDER_BY_DATE,
  GET_SUPPLIERS,
  SELECT_SUPPLIER,
  UPDATE_SUPPLIER,
  PROUCT_STOCK,
} from "../types";
import { useSnackbar } from "notistack";
const SupplierState = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const initialState = {
    suppliers: [],
    select: {},
    customers: [],
    ordersByDate: [],
    inStock: [],
  };

  const [state, dispatch] = useReducer(SupplierReducer, initialState);

  const getSuppliers = async () => {
    try {
      const res = await httpConfig.get("/supplier");
      dispatch({
        type: GET_SUPPLIERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateSupplier = async (data) => {
    try {
      await httpConfig.put(`/supplier/${data.id}`, data);
      await getSuppliers();
      enqueueSnackbar("Proovedor actualizado correctamente", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error);
    }
  };

  const createSupplier = async (data) => {
    try {
      await httpConfig.post(`/supplier/`, data);
      await getSuppliers();
      enqueueSnackbar("Proovedor creado correctamente", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error);
    }
  };

  const getSelectSupplier = (supplier) => {
    dispatch({
      type: SELECT_SUPPLIER,
      payload: supplier,
    });
  };

  const updateProduct = async (data) => {
    try {
      await httpConfig.put(`/product/${data.id}`, data);
      enqueueSnackbar("Producto actualizado correctamente", {
        variant: "success",
      });
      dispatch({
        type: UPDATE_SUPPLIER,
        payload: data,
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error.response);
    }
  };
  const deleteOrder = async (id) => {
    try {
      await httpConfig.delete(`/order/${id}`);
      await getCustomers();
      enqueueSnackbar("Pedido eliminada correctamente", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error.response);
    }
  };
  const deleteProduct = async (id) => {
    try {
      await httpConfig.delete(`/product/${id}`);
      enqueueSnackbar("Producto eliminado correctamente", {
        variant: "success",
      });
      dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error.response);
    }
  };

  const createProduct = async (data) => {
    try {
      const res = await httpConfig.post(`/product`, data);
      enqueueSnackbar("Producto creado correctamente", {
        variant: "success",
      });
      dispatch({
        type: CREATE_PRODUCT,
        payload: res.data.data,
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error.response);
    }
  };

  const getCustomers = async () => {
    try {
      const res = await httpConfig.get(`/customer`);
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data,
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error.response);
    }
  };

  const createOrder = async (data) => {
    try {
      await httpConfig.post(`/order`, data);
      enqueueSnackbar("Order creada correctamente", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error.response);
    }
  };

  const findByDate = async (data) => {
    try {
      const res = await httpConfig.get(`/order/${data.since}/${data.until}`);
      dispatch({
        type: GET_ORDER_BY_DATE,
        payload: res.data,
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error.response);
    }
  };
  const getStockProduct = async (supplier) => {
    try {
      const { product, ...rest } = supplier;
      const res = await httpConfig.post(`/product/stock`, { ...rest });
      dispatch({
        type: PROUCT_STOCK,
        payload: res.data,
      });
    } catch (error) {
      enqueueSnackbar("Algo salió mal intentalo más tarde", {
        variant: "error",
      });
      console.log(error.response);
    }
  };

  return (
    <SupplierContext.Provider
      value={{
        suppliers: state.suppliers,
        select: state.select,
        customers: state.customers,
        ordersByDate: state.ordersByDate,
        inStock: state.inStock,
        getSuppliers,
        updateSupplier,
        createSupplier,
        getSelectSupplier,
        updateProduct,
        deleteProduct,
        createProduct,
        getCustomers,
        createOrder,
        deleteOrder,
        findByDate,
        getStockProduct,
      }}
    >
      {props.children}
    </SupplierContext.Provider>
  );
};

export default SupplierState;
