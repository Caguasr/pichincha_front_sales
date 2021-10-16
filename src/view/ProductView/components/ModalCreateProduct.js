import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import { useContext, useState } from "react";
import SupplierContext from "../../../context/SupplierContext.js/SupplierContext";

const ModalCreateSupplier = ({ open, setOpen }) => {
  const [nameSupplier, setNameSupplier] = useState("");
  const [rucSupplier, setRucSupplier] = useState("");
  const { createSupplier } = useContext(SupplierContext);
  const handelUpdate = async () => {
    const data = {
      name: nameSupplier,
      ruc: rucSupplier,
    };

    await createSupplier(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Crear Proovedor</DialogTitle>
      <DialogContent style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre proovedor"
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

export default ModalCreateSupplier;
