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
    }
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