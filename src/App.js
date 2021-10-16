import { ThemeProvider } from "@mui/material";
import Routes from "./routes";
import theme from "./theme";
import LayoutComponent from "./layout/LayoutComponent";
import { BrowserRouter as Router } from "react-router-dom";
import SupplierState from "./context/SupplierContext.js/SupplierState";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <LayoutComponent>
            <SupplierState>
              <Routes />
            </SupplierState>
          </LayoutComponent>
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
