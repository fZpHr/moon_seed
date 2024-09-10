import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './UserTable.css'; // Importer le fichier CSS

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
});

function UserTable() {
  const [open, setOpen] = useState({});

  const handleToggle = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  const users = [
    { 
      id: 1,
      class: 'deathKnight',
      name: 'Arthur le Chevalier de la Mort', 
      head: 'Casque du Chevalier de la Mort', 
      shoulders: 'Épaulières du Chevalier de la Mort', 
      chest: 'Plastron du Chevalier de la Mort', 
      wrists: 'Brassards du Chevalier de la Mort', 
      hands: 'Gantelets du Chevalier de la Mort', 
      belt: 'Ceinture du Chevalier de la Mort', 
      legs: 'Jambières du Chevalier de la Mort', 
      feet: 'Bottes du Chevalier de la Mort', 
      ring1: 'Anneau du Chevalier de la Mort 1', 
      ring2: 'Anneau du Chevalier de la Mort 2', 
      trinket1: 'Bijou du Chevalier de la Mort 1', 
      trinket2: 'Bijou du Chevalier de la Mort 2', 
      weapon1: 'Arme du Chevalier de la Mort 1', 
      weapon2: 'Arme du Chevalier de la Mort 2',
      history: ['2024-09-09: Arthur a mis à jour son équipement.', '2024-09-08: Arthur s\'est connecté.', '2024-09-07: Arthur a créé son personnage.'], 
    },
    { 
      id: 2,
      class: 'demonHunter',
      name: 'Elena la Chasseuse de Démons', 
      head: 'Casque de la Chasseuse de Démons', 
      shoulders: 'Épaulières de la Chasseuse de Démons', 
      chest: 'Plastron de la Chasseuse de Démons', 
      wrists: 'Brassards de la Chasseuse de Démons', 
      hands: 'Gantelets de la Chasseuse de Démons', 
      belt: 'Ceinture de la Chasseuse de Démons', 
      legs: 'Jambières de la Chasseuse de Démons', 
      feet: 'Bottes de la Chasseuse de Démons', 
      ring1: 'Anneau de la Chasseuse de Démons 1', 
      ring2: 'Anneau de la Chasseuse de Démons 2', 
      trinket1: 'Bijou de la Chasseuse de Démons 1', 
      trinket2: 'Bijou de la Chasseuse de Démons 2', 
      weapon1: 'Arme de la Chasseuse de Démons 1', 
      weapon2: 'Arme de la Chasseuse de Démons 2',
      history: ['2024-09-09: Elena a mis à jour son équipement.', '2024-09-08: Elena s\'est connectée.', '2024-09-07: Elena a créé son personnage.'], 
    },
    { 
      id: 3,
      class: 'druid',
      name: 'Kael le Druide', 
      head: 'Casque du Druide', 
      shoulders: 'Épaulières du Druide', 
      chest: 'Plastron du Druide', 
      wrists: 'Brassards du Druide', 
      hands: 'Gantelets du Druide', 
      belt: 'Ceinture du Druide', 
      legs: 'Jambières du Druide', 
      feet: 'Bottes du Druide', 
      ring1: 'Anneau du Druide 1', 
      ring2: 'Anneau du Druide 2', 
      trinket1: 'Bijou du Druide 1', 
      trinket2: 'Bijou du Druide 2', 
      weapon1: 'Arme du Druide 1', 
      weapon2: 'Arme du Druide 2',
      history: ['2024-09-09: Kael a mis à jour son équipement.', '2024-09-08: Kael s\'est connecté.', '2024-09-07: Kael a créé son personnage.'], 
    },
    { 
      id: 4,
      class: 'evoker',
      name: 'Alys l\'Évocatrice', 
      head: 'Casque de l\'Évocatrice', 
      shoulders: 'Épaulières de l\'Évocatrice', 
      chest: 'Plastron de l\'Évocatrice', 
      wrists: 'Brassards de l\'Évocatrice', 
      hands: 'Gantelets de l\'Évocatrice', 
      belt: 'Ceinture de l\'Évocatrice', 
      legs: 'Jambières de l\'Évocatrice', 
      feet: 'Bottes de l\'Évocatrice', 
      ring1: 'Anneau de l\'Évocatrice 1', 
      ring2: 'Anneau de l\'Évocatrice 2', 
      trinket1: 'Bijou de l\'Évocatrice 1', 
      trinket2: 'Bijou de l\'Évocatrice 2', 
      weapon1: 'Arme de l\'Évocatrice 1', 
      weapon2: 'Arme de l\'Évocatrice 2',
      history: ['2024-09-09: Alys a mis à jour son équipement.', '2024-09-08: Alys s\'est connectée.', '2024-09-07: Alys a créé son personnage.'], 
    },
    { 
      id: 5,
      class: 'hunter',
      name: 'Rex le Chasseur', 
      head: 'Casque du Chasseur', 
      shoulders: 'Épaulières du Chasseur', 
      chest: 'Plastron du Chasseur', 
      wrists: 'Brassards du Chasseur', 
      hands: 'Gantelets du Chasseur', 
      belt: 'Ceinture du Chasseur', 
      legs: 'Jambières du Chasseur', 
      feet: 'Bottes du Chasseur', 
      ring1: 'Anneau du Chasseur 1', 
      ring2: 'Anneau du Chasseur 2', 
      trinket1: 'Bijou du Chasseur 1', 
      trinket2: 'Bijou du Chasseur 2', 
      weapon1: 'Arme du Chasseur 1', 
      weapon2: 'Arme du Chasseur 2',
      history: ['2024-09-09: Rex a mis à jour son équipement.', '2024-09-08: Rex s\'est connecté.', '2024-09-07: Rex a créé son personnage.'], 
    },
    { 
      id: 6,
      class: 'mage',
      name: 'Lila la Mage', 
      head: 'Casque de la Mage', 
      shoulders: 'Épaulières de la Mage', 
      chest: 'Plastron de la Mage', 
      wrists: 'Brassards de la Mage', 
      hands: 'Gantelets de la Mage', 
      belt: 'Ceinture de la Mage', 
      legs: 'Jambières de la Mage', 
      feet: 'Bottes de la Mage', 
      ring1: 'Anneau de la Mage 1', 
      ring2: 'Anneau de la Mage 2', 
      trinket1: 'Bijou de la Mage 1', 
      trinket2: 'Bijou de la Mage 2', 
      weapon1: 'Arme de la Mage 1', 
      weapon2: 'Arme de la Mage 2',
      history: ['2024-09-09: Lila a mis à jour son équipement.', '2024-09-08: Lila s\'est connectée.', '2024-09-07: Lila a créé son personnage.'], 
    },
    { 
      id: 7,
      class: 'monk',
      name: 'Zhao le Moine', 
      head: 'Casque du Moine', 
      shoulders: 'Épaulières du Moine', 
      chest: 'Plastron du Moine', 
      wrists: 'Brassards du Moine', 
      hands: 'Gantelets du Moine', 
      belt: 'Ceinture du Moine', 
      legs: 'Jambières du Moine', 
      feet: 'Bottes du Moine', 
      ring1: 'Anneau du Moine 1', 
      ring2: 'Anneau du Moine 2', 
      trinket1: 'Bijou du Moine 1', 
      trinket2: 'Bijou du Moine 2', 
      weapon1: 'Arme du Moine 1', 
      weapon2: 'Arme du Moine 2',
      history: ['2024-09-09: Zhao a mis à jour son équipement.', '2024-09-08: Zhao s\'est connecté.', '2024-09-07: Zhao a créé son personnage.'], 
    },
    { 
      id: 8,
      class: 'paladin',
      name: 'Valeria la Paladine', 
      head: 'Casque de la Paladine', 
      shoulders: 'Épaulières de la Paladine', 
      chest: 'Plastron de la Paladine', 
      wrists: 'Brassards de la Paladine', 
      hands: 'Gantelets de la Paladine', 
      belt: 'Ceinture de la Paladine', 
      legs: 'Jambières de la Paladine', 
      feet: 'Bottes de la Paladine', 
      ring1: 'Anneau de la Paladine 1', 
      ring2: 'Anneau de la Paladine 2', 
      trinket1: 'Bijou de la Paladine 1', 
      trinket2: 'Bijou de la Paladine 2', 
      weapon1: 'Arme de la Paladine 1', 
      weapon2: 'Arme de la Paladine 2',
      history: ['2024-09-09: Valeria a mis à jour son équipement.', '2024-09-08: Valeria s\'est connectée.', '2024-09-07: Valeria a créé son personnage.'], 
    },
    { 
      id: 9,
      class: 'priest',
      name: 'Isabella la Prêtresse', 
      head: 'Casque de la Prêtresse', 
      shoulders: 'Épaulières de la Prêtresse', 
      chest: 'Plastron de la Prêtresse', 
      wrists: 'Brassards de la Prêtresse', 
      hands: 'Gantelets de la Prêtresse', 
      belt: 'Ceinture de la Prêtresse', 
      legs: 'Jambières de la Prêtresse', 
      feet: 'Bottes de la Prêtresse', 
      ring1: 'Anneau de la Prêtresse 1', 
      ring2: 'Anneau de la Prêtresse 2', 
      trinket1: 'Bijou de la Prêtresse 1', 
      trinket2: 'Bijou de la Prêtresse 2', 
      weapon1: 'Arme de la Prêtresse 1', 
      weapon2: 'Arme de la Prêtresse 2',
      history: ['2024-09-09: Isabella a mis à jour son équipement.', '2024-09-08: Isabella s\'est connectée.', '2024-09-07: Isabella a créé son personnage.'], 
    },
    { 
      id: 10,
      class: 'rogue',
      name: 'Shade le Voleur', 
      head: 'Capuche du Voleur', 
      shoulders: 'Épaulières du Voleur', 
      chest: 'Plastron du Voleur', 
      wrists: 'Brassards du Voleur', 
      hands: 'Gants du Voleur', 
      belt: 'Ceinture du Voleur', 
      legs: 'Jambières du Voleur', 
      feet: 'Bottes du Voleur', 
      ring1: 'Anneau du Voleur 1', 
      ring2: 'Anneau du Voleur 2', 
      trinket1: 'Bijou du Voleur 1', 
      trinket2: 'Bijou du Voleur 2', 
      weapon1: 'Dague du Voleur 1', 
      weapon2: 'Dague du Voleur 2',
      history: ['2024-09-09: Shade a mis à jour son équipement.', '2024-09-08: Shade s\'est connecté.', '2024-09-07: Shade a créé son personnage.'], 
    },
    { 
      id: 11,
      class: 'shaman',
      name: 'Tarak le Chaman', 
      head: 'Heaume du Chaman', 
      shoulders: 'Épaulières du Chaman', 
      chest: 'Plastron du Chaman', 
      wrists: 'Brassards du Chaman', 
      hands: 'Gantelets du Chaman', 
      belt: 'Ceinture du Chaman', 
      legs: 'Jambières du Chaman', 
      feet: 'Bottes du Chaman', 
      ring1: 'Anneau du Chaman 1', 
      ring2: 'Anneau du Chaman 2', 
      trinket1: 'Bijou du Chaman 1', 
      trinket2: 'Bijou du Chaman 2', 
      weapon1: 'Arme du Chaman 1', 
      weapon2: 'Arme du Chaman 2',
      history: ['2024-09-09: Tarak a mis à jour son équipement.', '2024-09-08: Tarak s\'est connecté.', '2024-09-07: Tarak a créé son personnage.'], 
    },
    { 
      id: 12,
      class: 'warlock',
      name: 'Morgana la Sorcière', 
      head: 'Capuche de la Sorcière', 
      shoulders: 'Épaulières de la Sorcière', 
      chest: 'Robe de la Sorcière', 
      wrists: 'Bracelets de la Sorcière', 
      hands: 'Gants de la Sorcière', 
      belt: 'Ceinture de la Sorcière', 
      legs: 'Jambières de la Sorcière', 
      feet: 'Bottes de la Sorcière', 
      ring1: 'Anneau de la Sorcière 1', 
      ring2: 'Anneau de la Sorcière 2', 
      trinket1: 'Bijou de la Sorcière 1', 
      trinket2: 'Bijou de la Sorcière 2', 
      weapon1: 'Sceptre de la Sorcière', 
      weapon2: 'Baguette de la Sorcière',
      history: ['2024-09-09: Morgana a mis à jour son équipement.', '2024-09-08: Morgana s\'est connectée.', '2024-09-07: Morgana a créé son personnage.'], 
    },
    { 
      id: 13,
      class: 'warrior',
      name: 'Thor le Guerrier', 
      head: 'Casque du Guerrier', 
      shoulders: 'Épaulières du Guerrier', 
      chest: 'Plastron du Guerrier', 
      wrists: 'Brassards du Guerrier', 
      hands: 'Gantelets du Guerrier', 
      belt: 'Ceinture du Guerrier', 
      legs: 'Jambières du Guerrier', 
      feet: 'Bottes du Guerrier', 
      ring1: 'Anneau du Guerrier 1', 
      ring2: 'Anneau du Guerrier 2', 
      trinket1: 'Bijou du Guerrier 1', 
      trinket2: 'Bijou du Guerrier 2', 
      weapon1: 'Épée du Guerrier 1', 
      weapon2: 'Épée du Guerrier 2',
      history: ['2024-09-09: Thor a mis à jour son équipement.', '2024-09-08: Thor s\'est connecté.', '2024-09-07: Thor a créé son personnage.'], 
    },
    { 
      id: 14,
      class: 'warlock',
      name: 'Selena la Nécromancienne', 
      head: 'Casque de la Nécromancienne', 
      shoulders: 'Épaulières de la Nécromancienne', 
      chest: 'Robe de la Nécromancienne', 
      wrists: 'Bracelets de la Nécromancienne', 
      hands: 'Gants de la Nécromancienne', 
      belt: 'Ceinture de la Nécromancienne', 
      legs: 'Jambières de la Nécromancienne', 
      feet: 'Bottes de la Nécromancienne', 
      ring1: 'Anneau de la Nécromancienne 1', 
      ring2: 'Anneau de la Nécromancienne 2', 
      trinket1: 'Bijou de la Nécromancienne 1', 
      trinket2: 'Bijou de la Nécromancienne 2', 
      weapon1: 'Sceptre de la Nécromancienne', 
      weapon2: 'Baguette de la Nécromancienne',
      history: ['2024-09-09: Selena a mis à jour son équipement.', '2024-09-08: Selena s\'est connectée.', '2024-09-07: Selena a créé son personnage.'], 
    },
    { 
      id: 15,
      class: 'mage',
      name: 'Zara l\'Élémentaliste', 
      head: 'Casque de l\'Élémentaliste', 
      shoulders: 'Épaulières de l\'Élémentaliste', 
      chest: 'Plastron de l\'Élémentaliste', 
      wrists: 'Brassards de l\'Élémentaliste', 
      hands: 'Gantelets de l\'Élémentaliste', 
      belt: 'Ceinture de l\'Élémentaliste', 
      legs: 'Jambières de l\'Élémentaliste', 
      feet: 'Bottes de l\'Élémentaliste', 
      ring1: 'Anneau de l\'Élémentaliste 1', 
      ring2: 'Anneau de l\'Élémentaliste 2', 
      trinket1: 'Bijou de l\'Élémentaliste 1', 
      trinket2: 'Bijou de l\'Élémentaliste 2', 
      weapon1: 'Sceptre de l\'Élémentaliste', 
      weapon2: 'Orbe de l\'Élémentaliste',
      history: ['2024-09-09: Zara a mis à jour son équipement.', '2024-09-08: Zara s\'est connectée.', '2024-09-07: Zara a créé son personnage.'], 
    },
    { 
      id: 16,
      class: 'mage',
      name: 'Darius le Mage de Guerre', 
      head: 'Casque du Mage de Guerre', 
      shoulders: 'Épaulières du Mage de Guerre', 
      chest: 'Plastron du Mage de Guerre', 
      wrists: 'Brassards du Mage de Guerre', 
      hands: 'Gantelets du Mage de Guerre', 
      belt: 'Ceinture du Mage de Guerre', 
      legs: 'Jambières du Mage de Guerre', 
      feet: 'Bottes du Mage de Guerre', 
      ring1: 'Anneau du Mage de Guerre 1', 
      ring2: 'Anneau du Mage de Guerre 2', 
      trinket1: 'Bijou du Mage de Guerre 1', 
      trinket2: 'Bijou du Mage de Guerre 2', 
      weapon1: 'Épée du Mage de Guerre', 
      weapon2: 'Baguette du Mage de Guerre',
      history: ['2024-09-09: Darius a mis à jour son équipement.', '2024-09-08: Darius s\'est connecté.', '2024-09-07: Darius a créé son personnage.'], 
    },
    { 
      id: 17,
      class: 'hunter',
      name: 'Bjorn le Maître des Bêtes', 
      head: 'Heaume du Maître des Bêtes', 
      shoulders: 'Épaulières du Maître des Bêtes', 
      chest: 'Plastron du Maître des Bêtes', 
      wrists: 'Brassards du Maître des Bêtes', 
      hands: 'Gantelets du Maître des Bêtes', 
      belt: 'Ceinture du Maître des Bêtes', 
      legs: 'Jambières du Maître des Bêtes', 
      feet: 'Bottes du Maître des Bêtes', 
      ring1: 'Anneau du Maître des Bêtes 1', 
      ring2: 'Anneau du Maître des Bêtes 2', 
      trinket1: 'Bijou du Maître des Bêtes 1', 
      trinket2: 'Bijou du Maître des Bêtes 2', 
      weapon1: 'Fusil du Maître des Bêtes', 
      weapon2: 'Dague du Maître des Bêtes',
      history: ['2024-09-09: Bjorn a mis à jour son équipement.', '2024-09-08: Bjorn s\'est connecté.', '2024-09-07: Bjorn a créé son personnage.'], 
    },
    { 
      id: 18,
      class: 'deathKnight',
      name: 'Draven le Chevalier Noir', 
      head: 'Casque du Chevalier Noir', 
      shoulders: 'Épaulières du Chevalier Noir', 
      chest: 'Plastron du Chevalier Noir', 
      wrists: 'Brassards du Chevalier Noir', 
      hands: 'Gantelets du Chevalier Noir', 
      belt: 'Ceinture du Chevalier Noir', 
      legs: 'Jambières du Chevalier Noir', 
      feet: 'Bottes du Chevalier Noir', 
      ring1: 'Anneau du Chevalier Noir 1', 
      ring2: 'Anneau du Chevalier Noir 2', 
      trinket1: 'Bijou du Chevalier Noir 1', 
      trinket2: 'Bijou du Chevalier Noir 2', 
      weapon1: 'Épée du Chevalier Noir', 
      weapon2: 'Bouclier du Chevalier Noir',
      history: ['2024-09-09: Draven a mis à jour son équipement.', '2024-09-08: Draven s\'est connecté.', '2024-09-07: Draven a créé son personnage.'], 
    },
    { 
      id: 19,
      class: 'priest',
      name: 'Nyx la Prêtresse de l\'Ombre', 
      head: 'Capuche de la Prêtresse de l\'Ombre', 
      shoulders: 'Épaulières de la Prêtresse de l\'Ombre', 
      chest: 'Robe de la Prêtresse de l\'Ombre', 
      wrists: 'Bracelets de la Prêtresse de l\'Ombre', 
      hands: 'Gants de la Prêtresse de l\'Ombre', 
      belt: 'Ceinture de la Prêtresse de l\'Ombre', 
      legs: 'Jambières de la Prêtresse de l\'Ombre', 
      feet: 'Sandales de la Prêtresse de l\'Ombre', 
      ring1: 'Anneau de la Prêtresse de l\'Ombre 1', 
      ring2: 'Anneau de la Prêtresse de l\'Ombre 2', 
      trinket1: 'Bijou de la Prêtresse de l\'Ombre 1', 
      trinket2: 'Bijou de la Prêtresse de l\'Ombre 2', 
      weapon1: 'Baguette de la Prêtresse de l\'Ombre', 
      weapon2: 'Orbe de la Prêtresse de l\'Ombre',
      history: ['2024-09-09: Nyx a mis à jour son équipement.', '2024-09-08: Nyx s\'est connectée.', '2024-09-07: Nyx a créé son personnage.'], 
    },
    { 
      id: 20,
      class: 'warlock',
      name: 'Chronos le Marcheur du Temps', 
      head: 'Heaume du Marcheur du Temps', 
      shoulders: 'Épaulières du Marcheur du Temps', 
      chest: 'Plastron du Marcheur du Temps', 
      wrists: 'Brassards du Marcheur du Temps', 
      hands: 'Gantelets du Marcheur du Temps', 
      belt: 'Ceinture du Marcheur du Temps', 
      legs: 'Jambières du Marcheur du Temps', 
      feet: 'Bottes du Marcheur du Temps', 
      ring1: 'Anneau du Marcheur du Temps 1', 
      ring2: 'Anneau du Marcheur du Temps 2', 
      trinket1: 'Bijou du Marcheur du Temps 1', 
      trinket2: 'Bijou du Marcheur du Temps 2', 
      weapon1: 'Bâton du Marcheur du Temps', 
      weapon2: 'Dague du Marcheur du Temps',
      history: ['2024-09-09: Chronos a mis à jour son équipement.', '2024-09-08: Chronos s\'est connecté.', '2024-09-07: Chronos a créé son personnage.'], 
    },
  ];
  
  
  
  

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table className="user-table">
            <TableHead>
              <TableRow>
                <TableCell className="historique-column">Log</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Tête</TableCell>
                <TableCell>Épaules</TableCell>
                <TableCell>Torse</TableCell>
                <TableCell>Poignets</TableCell>
                <TableCell>Mains</TableCell>
                <TableCell>Ceinture</TableCell>
                <TableCell>Jambes</TableCell>
                <TableCell>Pieds</TableCell>
                <TableCell>Anneau 1</TableCell>
                <TableCell>Anneau 2</TableCell>
                <TableCell>Bijou 1</TableCell>
                <TableCell>Bijou 2</TableCell>
                <TableCell>Arme 1</TableCell>
                <TableCell>Arme 2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  <TableRow className={user.class}>
                    <TableCell className="historique-column">
                      <IconButton onClick={() => handleToggle(user.id)}>
                        {open[user.id] ? 
                          <ExpandLessIcon className="collapse-icon" /> : 
                          <ExpandMoreIcon className="expand-icon" />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.head}</TableCell>
                    <TableCell>{user.shoulders}</TableCell>
                    <TableCell>{user.chest}</TableCell>
                    <TableCell>{user.wrists}</TableCell>
                    <TableCell>{user.hands}</TableCell>
                    <TableCell>{user.belt}</TableCell>
                    <TableCell>{user.legs}</TableCell>
                    <TableCell>{user.feet}</TableCell>
                    <TableCell>{user.ring1}</TableCell>
                    <TableCell>{user.ring2}</TableCell>
                    <TableCell>{user.trinket1}</TableCell>
                    <TableCell>{user.trinket2}</TableCell>
                    <TableCell>{user.weapon1}</TableCell>
                    <TableCell>{user.weapon2}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={16}>
                      <Collapse in={open[user.id]} timeout="auto" unmountOnExit>
                        <Table size="small" className="collapse-table">
                          <TableBody>
                            {user.history.map((event, index) => (
                              <TableRow key={index}>
                                <TableCell className="historique-column">{event}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}

export default UserTable;