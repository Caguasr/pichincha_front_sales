import { Switch, Route } from "react-router-dom";
import { CustomerView, HomeView, OrderView, ProductView } from "./view";
import SupplierView from "./view/SupplierView/SupplierView";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/supplier" component={SupplierView} />
      <Route exact path="/supplier/products" component={ProductView} />
      <Route exact path="/customer" component={CustomerView} />
      <Route exact path="/order" component={OrderView} />
    </Switch>
  );
};

export default Routes;
