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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useContext } from "react";
import SupplierContext from "../../../context/SupplierContext.js/SupplierContext";

const ModalDetailOrder = ({ open, setOpen, facturas }) => {
  const { deleteOrder } = useContext(SupplierContext);
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
          onClick={() => deleteOrder(params.row.id)}
          color="secondary"
        >
          <Visibility />
        </IconButton>
      ),
    },
  ];
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <DialogTitle>Pedidos</DialogTitle>
      <DialogContent style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Desde"
                value={null}
                onChange={(newValue) => {
                  //setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Hasta"
                value={null}
                onChange={(newValue) => {
                  //setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1} container alignItems="center">
            <Button variant="contained" color="secondary">
              Buscar
            </Button>
          </Grid>

          <Grid item xs={12}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={facturas}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(false)}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDetailOrder;
