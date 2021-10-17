import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SupplierContext from "../../context/SupplierContext.js/SupplierContext";
import TableProduct from "./components/TableProduct";
const OrderView = () => {
  const { customers, suppliers, getCustomers, getSuppliers, createOrder } =
    useContext(SupplierContext);

  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState({});
  const [detail, setDetail] = useState([]);

  const handleSendOrder = async () => {
    const { orders, ...rest } = customer;

    const data = {
      customer: { ...rest },
      detail,
    };

    await createOrder(data);
    setProducts([]);
    setCustomer({});
    setDetail([]);
  };

  useEffect(() => {
    getCustomers();
    getSuppliers();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container>
        <Grid item xs={6}>
          <Typography style={{ fontWeight: "bold" }} variant="h5">
            Nuevo pedido
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={5}>
            <Card style={{ padding: 20 }}>
              <CardHeader title="Completa los campos para realizar el pedido" />
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    options={customers}
                    getOptionLabel={(option) => option.name}
                    onChange={(old, newValue) => setCustomer(newValue)}
                    renderInput={(params) => (
                      <TextField
                        color="secondary"
                        {...params}
                        label="Selecciona el cliente"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    options={suppliers}
                    getOptionLabel={(option) => option.name}
                    onChange={(old, newValue) =>
                      setProducts(newValue == null ? [] : newValue.product)
                    }
                    renderInput={(params) => (
                      <TextField
                        color="secondary"
                        {...params}
                        label="Marca"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card style={{ padding: 20 }}>
              <CardHeader title="Mi pedido" />
              <CardContent>
                <List>
                  {detail.map((e) => (
                    <ListItem key={e.product.name}>
                      <ListItemText
                        primary={e.product.name}
                        secondary={`Total $${e.product.price}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSendOrder}
              >
                Realiazar pedido
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <TableProduct
              products={products}
              setDetail={setDetail}
              detail={detail}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderView;
