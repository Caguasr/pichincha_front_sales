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

const ModalCreateSupplier = ({ open, setOpen, supplier }) => {
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [stockProduct, setStockProduct] = useState("");
  const { createProduct } = useContext(SupplierContext);
  const handelUpdate = async () => {
    const { product, ...rest } = supplier;

    const data = {
      name: nameProduct,
      price: priceProduct,
      stock: stockProduct,
      supplier: { ...rest },
    };

    await createProduct(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Crear Producto</DialogTitle>
      <DialogContent style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre producto"
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
              fullWidth
              color="secondary"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Precio"
              value={priceProduct}
              onChange={(e) => setPriceProduct(e.target.value)}
              fullWidth
              color="secondary"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Stock"
              value={stockProduct}
              onChange={(e) => setStockProduct(e.target.value)}
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
