import React, { useState } from 'react';
import { renameNickname } from '../services/api'; // Importiraj funkciju za preimenovanje

const RenameNickname = () => {
  const [oldNickname, setOldNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');

  const handleRenameNickname = async (e) => {
    e.preventDefault();
    try {
      await renameNickname(oldNickname, newNickname); // Pozovi funkciju za preimenovanje
      setOldNickname('');
      setNewNickname('');
    } catch (error) {
      console.error("Greška pri preimenovanju nickname-a:", error.message);
    }
  };

  return (
    <div>
      <h2>Preimenuj nickname</h2>
      <form onSubmit={handleRenameNickname}>
        <input
          type="text"
          value={oldNickname}
          onChange={(e) => setOldNickname(e.target.value)}
          placeholder="Unesite stari nickname"
          required
        />
        <input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="Unesite novi nickname"
          required
        />
        <button type="submit">Preimenuj nickname</button>
      </form>
    </div>
  );
};

export default RenameNickname;
