/* eslint-disable react-hooks/exhaustive-deps */
import { Delete, Edit } from "@mui/icons-material";
import { Grid, Typography, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import SupplierContext from "../../context/SupplierContext.js/SupplierContext";
import ModalCreateSupplier from "./components/ModalCreateProduct";
import ModalEditSupplier from "./components/ModalEditProduct";

const ProductView = () => {
  const { select, deleteProduct } = useContext(SupplierContext);
  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "price", headerName: "Precio", width: 130 },
    { field: "stock", headerName: "Stock", width: 130 },
    { field: "createdAt", headerName: "Creado", width: 130 },
    {
      field: "eliminar",
      headerName: "Eliminar",
      width: 200,
      renderCell: (params) => (
        <IconButton
          onClick={() => deleteProduct(params.row.id)}
          color="secondary"
        >
          <Delete />
        </IconButton>
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 200,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleProductEdit(params.row)}
          color="secondary"
        >
          <Edit />
        </IconButton>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [supplierSelct, setSupplierSelct] = useState({});

  const handleProductEdit = (product) => {
    setOpen(true);
    setSupplierSelct(product);
  };
  const handleProductCreate = () => {
    setOpenCreate(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <Grid item xs={6}>
            <Typography style={{ fontWeight: "bold" }} variant="h5">
              {`Proovedor: ${select.name}`}
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleProductCreate}
            >
              Agregar Producto
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={select.product}
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
        product={supplierSelct}
      />
      <ModalCreateSupplier
        open={openCreate}
        setOpen={setOpenCreate}
        supplier={select}
      />
    </>
  );
};

export default ProductView;
