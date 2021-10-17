import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SupplierContext from "../../../context/SupplierContext.js/SupplierContext";

const ModalEditSupplier = ({ open, setOpen, supplier }) => {
  const [nameSupplier, setNameSupplier] = useState(supplier.name);
  const [rucSupplier, setRucSupplier] = useState(supplier.ruc);
  const { updateSupplier } = useContext(SupplierContext);
  const handelUpdate = async () => {
    supplier.name = nameSupplier;
    supplier.ruc = rucSupplier;

    await updateSupplier(supplier);
    setOpen(false);
  };

  useEffect(() => {
    setNameSupplier(supplier.name);
    setRucSupplier(supplier.ruc);
  }, [supplier]);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Editar Proveedor</DialogTitle>
      <DialogContent style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre proveedor"
              value={nameSupplier}
              onChange={(e) => setNameSupplier(e.target.value)}
              fullWidth
              color="secondary"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Ruc"
              value={rucSupplier}
              onChange={(e) => setRucSupplier(e.target.value)}
              fullWidth
              color="secondary"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handelUpdate}>
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditSupplier;
