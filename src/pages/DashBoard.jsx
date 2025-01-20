import React, { useState } from "react";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Modal, Box, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";

const DashBoard = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Drži stanje modala
  const [nickname, setNickname] = useState(""); // Stanje za unos nadimka
  const [openSnackbar, setOpenSnackbar] = useState(false); // Stanje za snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Poruka za snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Tip obavijesti (success/error)

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNickname(""); // Resetiraj unos nadimka
  };

  const handleAddNickname = async () => {
    console.log("Dodavanje nadimka pokrenuto");
    console.log("UserID unutar funkcije:", userId); // Provjera vrijednosti
  
    if (!nickname.trim()) {
      setSnackbarMessage("Nickname ne može biti prazan.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
  
    try {
      console.log("Provjera nadimka:", nickname);
  
      const nicknameRef = doc(collection(db, `users/${userId}/nicknames`), nickname);
      const nicknameDoc = await getDoc(nicknameRef);
  
      if (nicknameDoc.exists()) {
        setSnackbarMessage("Nickname već postoji.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }
  
      const initialData = {
        savings: [],
        expenses: [],
        categories: ["auto", "hrana", "kafić", "teretana", "računi"],
        color: "#008000",
      };
  
      await setDoc(nicknameRef, initialData);
  
      setSnackbarMessage(`Nickname "${nickname}" uspješno dodan!`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
  
      console.log("Nickname uspješno dodan!");
      handleCloseModal();
    } catch (error) {
      console.error("Greška pri dodavanju nickname-a:", error.code, error.message);
      setSnackbarMessage(`Greška pri dodavanju nickname-a: ${error.message}`);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  
  

  return (
    <div className="dashboard-page">
      <div className="dashboard-shortcuts">
        <div className="add-nickname">
          <PersonAddIcon
            sx={{ color: "#977be5", cursor: "pointer" }}
            onClick={handleOpenModal}
          />
        </div>
      </div>
      <div className="main-box"></div>

      {/* Modal za dodavanje nadimka */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #977be5",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Dodaj novi Nickname
          </Typography>
          <TextField
            label="Novi Nickname"
            variant="outlined"
            fullWidth
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            margin="normal"
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Odustani
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#977be5", color: "white" }}
              onClick={handleAddNickname}
            >
              Dodaj
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar za obavijesti */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DashBoard;
