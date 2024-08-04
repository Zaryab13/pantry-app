import { Paper, Typography, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ItemCard = ({ item, removeItem }) => (
  <Paper
    sx={{
      padding: 2,
      borderRadius: "6px",
      boxShadow:
        "6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(0,0,0,0.08)",
      position: "relative",
    }}
  >
    <Stack>
      <Typography variant="h5" fontWeight="600" fontSize="1.5rem">
        {item.name}
      </Typography>
      <Typography color="#717171" fontSize="0.8rem" fontWeight="300">
        Quantity: {item.quantity}
      </Typography>
      <Typography
        display="flex"
        alignItems="center"
        color="#717171"
        fontSize="0.8rem"
        fontWeight="300"
      >
        Category:{" "}
        <Typography fontSize="0.8rem" fontWeight="600">
          {" "}
          {item.category}
        </Typography>
      </Typography>
    </Stack>
    <IconButton
      variant="outlined"
      sx={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1,
      }}
      onClick={() => removeItem(item.id)}
    >
      <DeleteIcon
        sx={{
          fontSize: "24px",
          color: "error.main",
          cursor: "pointer",
          borderRadius: "50%",
          padding: "2px",
          transition: "all 200ms ease-in-out",
          "&:hover": {
            backgroundColor: "error.main",
            color: "white",
          },
        }}
      />
    </IconButton>
  </Paper>
);

export default ItemCard;
