import SupplierReducer from "./SupplierReducer";
import SupplierContext from "./SupplierContext";
import { useReducer } from "react";
import httpConfig from "../../config/HttpConfig";
import { GET_SUPPLIERS, SELECT_SUPPLIER } from "../types";
import { useSnackbar } from "notistack";
const SupplierState = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const initialState = {
    suppliers: [],
    select: {},
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

  return (
    <SupplierContext.Provider
      value={{
        suppliers: state.suppliers,
        select: state.select,
        getSuppliers,
        updateSupplier,
        createSupplier,
        getSelectSupplier,
      }}
    >
      {props.children}
    </SupplierContext.Provider>
  );
};

export default SupplierState;
