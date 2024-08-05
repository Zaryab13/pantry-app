"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  Pagination,
  Grid,
  CircularProgress,
} from "@mui/material";
import { firestore } from "@/app/firebase";
import {
  collection,
  query,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ItemModal = lazy(() => import("../components/ItemModal"));
const ItemCard = lazy(() => import("../components/ItemCard"));

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    updateInventory();
  }, []);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ id: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const addItem = async () => {
    const docRef = doc(collection(firestore, "inventory"));
    await setDoc(docRef, {
      name: itemName,
      category: itemCategory,
      quantity: itemQuantity,
    });
    await updateInventory();
    setOpen(false);
  };

  const removeItem = async (id) => {
    const docRef = doc(collection(firestore, "inventory"), id);
    await deleteDoc(docRef);
    await updateInventory();
  };

  const exportToCSV = () => {
    const csvData = inventory.map((item) => ({
      Name: item.name,
      Quantity: item.quantity,
      Category: item.category,
    }));

    const csvString = [
      ["Name", "Quantity", "Category"],
      ...csvData.map((item) => [item.Name, item.Quantity, item.Category]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "inventory.csv");
    document.body.appendChild(link);
    link.click();
  };

  const filteredInventory = inventory.filter((item) => {
    // Ensure item and item.name are defined and item.name is a string
    const name = item.name ? item.name.toLowerCase() : "";
    return name.includes(searchTerm.toLowerCase());
  });

  const displayedItems = filteredInventory.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box
      width="100%"
      maxWidth="800px"
      height="fit-content"
      display="flex"
      margin="0 auto"
      justifyContent="center"
      flexDirection="column"
      gap={2}
      p={2}
    >
      <Typography variant="h4">Inventory Management</Typography>
      <Box
        display="flex"
        alignItems="center"
        gap="4px"
        justifyContent="space-between"
        width="100%"
      >
        <TextField
          label="Search"
          variant="outlined"
          sx={{
            placeSelf: "flex-start",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box display="flex" gap="4px" alignItems="center">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Item
          </Button>
          <Button variant="contained" onClick={exportToCSV}>
            Export as CSV
          </Button>
        </Box>
      </Box>

      <Suspense fallback={<CircularProgress />}>
        <ItemModal
          open={open}
          handleClose={() => setOpen(false)}
          addItem={addItem}
          itemName={itemName}
          setItemName={setItemName}
          itemCategory={itemCategory}
          setItemCategory={setItemCategory}
          itemQuantity={itemQuantity}
          setItemQuantity={setItemQuantity}
        />
        <Grid container padding="10px" spacing={2}>
          {displayedItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ItemCard item={item} removeItem={removeItem} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={Math.ceil(filteredInventory.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Suspense>
    </Box>
  );
};

export default Dashboard;
