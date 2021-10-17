/* eslint-disable react-hooks/exhaustive-deps */
import { Edit, LocalGroceryStore, Visibility } from "@mui/icons-material";
import { Grid, Typography, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import SupplierContext from "../../context/SupplierContext.js/SupplierContext";
import ModalCreateSupplier from "./components/ModalCreateSupplier";
import ModalEditSupplier from "./components/ModalEditSupplier";

const SupplierView = () => {
  const { suppliers, getSuppliers, getSelectSupplier, getStockProduct } =
    useContext(SupplierContext);
  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "ruc", headerName: "Ruc", width: 200 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "createdAt", headerName: "Creado", width: 150 },
    { field: "updateAt", headerName: "Actualizado", width: 150 },
    {
      field: "todos",
      headerName: "Productos",
      width: 130,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleShowProducts(params.row)}
          color="secondary"
        >
          <Visibility />
        </IconButton>
      ),
    },
    {
      field: "stock",
      headerName: "En stock",
      width: 130,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleProductsStock(params.row)}
          color="secondary"
        >
          <LocalGroceryStore />
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: "Editar",
      width: 130,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleSupplierEdit(params.row)}
          color="secondary"
        >
          <Edit />
        </IconButton>
      ),
    },
  ];

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [supplierSelct, setSupplierSelct] = useState({});

  const handleSupplierEdit = (supplier) => {
    setOpen(true);
    setSupplierSelct(supplier);
  };
  const handleSupplierCreate = () => {
    setOpenCreate(true);
  };
  const handleShowProducts = (supplier) => {
    history.push("/supplier/products");
    getSelectSupplier(supplier);
  };
  const handleProductsStock = (supplier) => {
    history.push("/supplier/products");
    getStockProduct(supplier);
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <Grid item xs={6}>
            <Typography style={{ fontWeight: "bold" }} variant="h5">
              Gestión de proveedores
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSupplierCreate}
            >
              Agregar Proveedor
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={suppliers}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
      </Grid>
      <ModalEditSupplier
        open={open}
        setOpen={setOpen}
        supplier={supplierSelct}
      />
      <ModalCreateSupplier open={openCreate} setOpen={setOpenCreate} />
    </>
  );
};

export default SupplierView;
