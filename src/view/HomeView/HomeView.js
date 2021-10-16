import { Grid, Typography } from "@mui/material";

const HomeView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container justifyContent="center">
        <Typography variant="h5">Bienvenido</Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Typography variant="h5">Carlos Aguas</Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <img src="assets/ventas.png" alt="inicio" width={800} />
      </Grid>
    </Grid>
  );
};

export default HomeView;
