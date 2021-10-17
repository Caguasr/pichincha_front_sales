/* eslint-disable react-hooks/exhaustive-deps */

import { Visibility } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import SupplierContext from "../../context/SupplierContext.js/SupplierContext";
import ModalDetailOrder from "./components/ModalDetailOrder";

const CustomerView = () => {
  const { customers, getCustomers } = useContext(SupplierContext);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "identity", headerName: "Cédula", width: 130 },
    { field: "phone", headerName: "Celular", width: 130 },
    {
      field: "ver",
      headerName: "Ver facturas",
      width: 200,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleOpenDetail(params.row.orders)}
          color="secondary"
        >
          <Visibility />
        </IconButton>
      ),
    },
  ];
  const handleOpenDetail = (orders) => {
    setOpen(true);
    setOrders(orders);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <Grid item xs={6}>
            <Typography style={{ fontWeight: "bold" }} variant="h5">
              {`Clientes`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={customers}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
      </Grid>
      <ModalDetailOrder open={open} setOpen={setOpen} facturas={orders} />
    </>
  );
};

export default CustomerView;
