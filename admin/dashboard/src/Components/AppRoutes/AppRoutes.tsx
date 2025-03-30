import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import EmploiTeme from "../../Pages/Emploi_du_Temps/EmploiTeme";
import Classe from "../../Pages/Classes/Classe";
import Professeur from "../../Pages/Professeur/Professeur";
import Departement from "../../Pages/Departement/Departement";
import Filiere from "../../Pages/Filieres/Filiere";
import Sale from "../../Pages/Sales/Sale";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/emploi_du_temps" element={<EmploiTeme />} />
      <Route path="/classe" element={<Classe />} />
      <Route path="/professeur" element={<Professeur />} />
      <Route path="/departement" element={<Departement />} />
      <Route path="/filiere" element={<Filiere />} />
      <Route path="/sales" element={<Sale />} />
    </Routes>
  );
};

export default AppRoutes;
