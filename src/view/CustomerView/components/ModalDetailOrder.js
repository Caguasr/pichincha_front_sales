import { Delete, Visibility } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useContext, useEffect, useState } from "react";
import SupplierContext from "../../../context/SupplierContext.js/SupplierContext";
import { format } from "date-fns";

const ModalDetailOrder = ({ open, setOpen, facturas }) => {
  const { deleteOrder, ordersByDate, findByDate } = useContext(SupplierContext);
  const [detailOrder, setDetailOrder] = useState(null);
  const [dateOrder, setDateOrder] = useState([]);
  const [desde, setDesde] = useState(null);
  const [hasta, setHasta] = useState(null);
  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "createdAt", headerName: "Creado", width: 200 },
    {
      field: "ver",
      headerName: "Eliminar",
      width: 200,
      renderCell: (params) => (
        <IconButton
          onClick={() => deleteOrder(params.row.id)}
          color="secondary"
        >
          <Delete />
        </IconButton>
      ),
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 200,
      renderCell: (params) => (
        <IconButton
          onClick={() => setDetailOrder(params.row.detail)}
          color="secondary"
        >
          <Visibility />
        </IconButton>
      ),
    },
  ];

  const columnsDetail = [
    { field: "id", headerName: "ID", width: 130 },
    {
      field: "product",
      headerName: "Nombre",
      width: 200,
      valueGetter: (params) => `${params.row.product.name}`,
    },
    {
      field: "product.price",
      headerName: "Precio",
      width: 200,
      valueGetter: (params) => `$${params.row.product.price}`,
    },
    { field: "quantity", headerName: "Cantidad", width: 200 },
  ];

  const handlerClose = () => {
    setOpen(false);
    setDetailOrder(null);
  };

  const handleFind = () => {
    const data = {
      since: format(desde, "yyyy-MM-dd"),
      until: format(hasta, "yyyy-MM-dd"),
    };
    findByDate(data);
  };
  useEffect(() => {
    setDateOrder(ordersByDate);
  }, [ordersByDate]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <DialogTitle>Pedidos</DialogTitle>
      <DialogContent style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Desde"
                value={desde}
                onChange={(newValue) => {
                  setDesde(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Hasta"
                value={hasta}
                onChange={(newValue) => {
                  setHasta(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1} container alignItems="center">
            <Button variant="contained" color="secondary" onClick={handleFind}>
              Buscar
            </Button>
          </Grid>

          <Grid item xs={12}>
            <div style={{ height: 400, width: "100%" }}>
              {dateOrder.length > 0 ? (
                <DataGrid
                  rows={dateOrder}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              ) : (
                <DataGrid
                  rows={facturas}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            {detailOrder ? (
              <>
                <Typography variant="h6">Detalle de pedido</Typography>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={detailOrder ? detailOrder : []}
                    columns={columnsDetail}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </div>
              </>
            ) : null}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handlerClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDetailOrder;
