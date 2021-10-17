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

const ModalEditSupplier = ({ open, setOpen, product }) => {
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [stockProduct, setStockProduct] = useState("");
  const { updateProduct } = useContext(SupplierContext);
  const handelUpdate = async () => {
    product.name = nameProduct;
    product.price = priceProduct;
    product.stock = stockProduct;

    await updateProduct(product);
    setOpen(false);
  };

  useEffect(() => {
    setNameProduct(product.name);
    setPriceProduct(product.price);
    setStockProduct(product.stock);
  }, [product]);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Editar Proovedor</DialogTitle>
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
              label="Stok"
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

export default ModalEditSupplier;
