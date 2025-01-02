import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, TextField, Box, Snackbar, Alert } from "@mui/material";

const AddNickname = ({ userId,  }) => {
  const [nickname, setNickname] = useState(""); // Stanje za unos nadimka
  const [openSnackbar, setOpenSnackbar] = useState(false); // Drži stanje snackbar-a
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Poruka u snackbar-u

  const navigate = useNavigate();
  // Funkcija za dodavanje nadimka
  const handleAddNickname = async (e) => {
    e.preventDefault();
  
    if (!nickname.trim()) {
      setSnackbarMessage("Nickname ne može biti prazan.");
      setOpenSnackbar(true);
      return;
    }
  
    try {
      const nicknameRef = doc(collection(db, `users/${userId}/nicknames`), nickname);
  
      const initialData = {
        savings: [],
        expenses: [],
        categories: ["auto", "hrana", "kafić", "teretana", "računi"],
        color: "#008000",

      };
      console.log('UserId:', userId);  // Provjeri korisnički ID

      await setDoc(nicknameRef, initialData);
      setSnackbarMessage(`Nickname "${nickname}" uspješno dodan!`);
      setOpenSnackbar(true);
      setNickname(""); // Resetiraj unos nakon dodavanja
      navigate('/dashboard')
    } catch (error) {
      setSnackbarMessage(`Greška pri dodavanju nickname-a: ${error.message}`);
      setOpenSnackbar(true);
    }
  };
  

  return (
    <form onSubmit={handleAddNickname}>
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          label="Novi Nickname"
          variant="outlined"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Dodaj Nickname
        </Button>
      </Box>

      {/* Snackbar za prikaz obavijesti */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AddNickname;
