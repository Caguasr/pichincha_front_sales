import { Switch, Route } from "react-router-dom";
import { HomeView, ProductView } from "./view";
import SupplierView from "./view/SupplierView/SupplierView";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/supplier" component={SupplierView} />
      <Route exact path="/supplier/products" component={ProductView} />
    </Switch>
  );
};

export default Routes;
