import { Add, Groups, Home, Person } from "@mui/icons-material";

export const DasboardNaviationConfig = [
  {
    name: "Inicio",
    link: "/",
    icon: <Home />,
  },
  {
    name: "Nuevo pedido",
    link: "/order",
    icon: <Add />,
  },
  {
    name: "Proveedores",
    link: "/supplier",
    icon: <Groups />,
  },
  {
    name: "Clientes",
    link: "/customer",
    icon: <Person />,
  },
];
