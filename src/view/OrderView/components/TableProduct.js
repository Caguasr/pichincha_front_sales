import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const TableProduct = ({ products, setDetail, detail }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "price", headerName: "Precio", width: 130 },
    { field: "stock", headerName: "Stock", width: 130 },
    { field: "createdAt", headerName: "Creado", width: 130 },
    {
      field: "eliminar",
      headerName: "Agregar",
      width: 200,
      renderCell: (params) => (
        <IconButton
          onClick={() =>
            setDetail([...detail, { product: { ...params.row }, quantity: 1 }])
          }
          color="secondary"
        >
          <Add />
        </IconButton>
      ),
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default TableProduct;
