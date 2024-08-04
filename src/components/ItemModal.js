import { Box, Stack, Typography, Button, TextField, Modal } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const ItemModal = ({
  open,
  handleClose,
  addItem,
  itemName,
  setItemName,
  itemCategory,
  setItemCategory,
  itemQuantity,
  setItemQuantity,
}) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Item
      </Typography>
      <Stack width="100%" direction="row" spacing={2}>
        <TextField
          label="Item"
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        />
      </Stack>
      <TextField
        label="Quantity"
        variant="outlined"
        type="number"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(e.target.value)}
      />
      <Button variant="contained" onClick={addItem}>
        Add
      </Button>
    </Box>
  </Modal>
);

export default ItemModal;
