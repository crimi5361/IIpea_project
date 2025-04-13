import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import EmploiTeme from "../../Pages/Emploi_du_Temps/EmploiTeme";
import Classe from "../../Pages/Classes/Classe";
import Professeur from "../../Pages/Professeur/Professeur";
import Filiere from "../../Pages/Filieres/Filiere";
import Sale from "../../Pages/Sales/Sale";
import Campus from "../../Pages/Campus/Campus";

const AppRoutes:unknown = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/emploi_du_temps" element={<EmploiTeme />} />
      <Route path="/classe" element={<Classe />} />
      <Route path="/professeur" element={<Professeur />} />
      <Route path="/Campus" element={<Campus />} />
      <Route path="/filiere" element={<Filiere />} />
      <Route path="/sales" element={<Sale />} />
    </Routes>
  );
};

export default AppRoutes;
