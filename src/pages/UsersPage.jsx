import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserNicknames, renameNickname, deleteNickname } from '../services/NickNameFunc';
import UserAuth from '../components/auth/UserAuth';
import { IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";

const DisplayNicknames = () => {
  const [nicknames, setNicknames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stanja za dijalog i preimenovanje
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNickname, setSelectedNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');

  const navigate = useNavigate();

  // Funkcija za dohvaćanje nickname-ova
  const fetchNicknames = async () => {
    try {
      const fetchedNicknames = await getUserNicknames();
      setNicknames(fetchedNicknames);
    } catch (error) {
      console.error('Greška pri dohvaćanju nickname-ova:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNicknames();
  }, []);

  // Otvaranje dijaloga
  const handleOpenDialog = (nickname) => {
    setSelectedNickname(nickname);
    setNewNickname('');
    setOpenDialog(true);
  };

  // Zatvaranje dijaloga
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNickname('');
    setNewNickname('');
  };

  // Obrada preimenovanja
  const handleRename = async () => {
    try {
      await renameNickname(selectedNickname, newNickname);
      setNicknames((prevNicknames) =>
        prevNicknames.map((nick) => (nick === selectedNickname ? newNickname : nick))
      );
      handleCloseDialog();

        // Preusmjeravanje na /dashboard nakon uspješnog uređivanja
        navigate("/dashboard");
    } catch (error) {
      console.error('Greška pri preimenovanju nickname-a:', error.message);
    }
  };

  if (loading) {
    return <div>Učitavanje...</div>;
  }
   // Obrada brisanja
   const handleDelete = async (nickname) => {
    try {
      await deleteNickname( nickname);
      setNicknames((prevNicknames) => prevNicknames.filter((nick) => nick !== nickname));
    } catch (error) {
      console.error("Greška pri brisanju nickname-a:", error.message);
    }
  };

  if (loading) {
    return <div>Učitavanje...</div>;
  }

  return (
    <div>
      <h2>Vaši nickname-ovi</h2>
      <ul>
        {nicknames.map((nickname, index) => (
          <li key={index} style={{ backgroundColor: "white", padding: "10px" }}>
            {nickname}
            <IconButton onClick={() => handleOpenDialog(nickname)} aria-label="Preimenuj">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(nickname)} aria-label="Obriši" color="error">
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
      {/* Prosljeđivanje callback funkcije u UserAuth */}
      <UserAuth refreshNicknames={fetchNicknames} />

      {/* Dijalog za preimenovanje */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Preimenuj nickname</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Novi nickname"
            type="text"
            fullWidth
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Odustani
          </Button>
          <Button onClick={handleRename} color="primary" disabled={!newNickname}>
            Spremi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DisplayNicknames;