import { Route, Routes, Navigate } from "react-router-dom";

// Dashboard
import Dashboard from "../../Pages/Dashboard/Dashboard";

// Enseignants
import Enregistrement from "../../Pages/Enseignants/Enregistrement";
import Contrat from "../../Pages/Enseignants/Contrat";
import Liste from "../../Pages/Enseignants/Liste";

// Scolarité
import Statuts from "../../Pages/Scolarite/Statuts";
import Paiements from "../../Pages/Scolarite/Paiements";
import Inscription_attentes from "../../Pages/Scolarite/Inscription_attentes";

// Progression
import Global_progress from "../../Pages/Progression/Global_progress";
import Progress from "../../Pages/Progression/Progress";

// Transport
import Vehicules from "../../Pages/Transport/Vehicules";
import Itineraires from "../../Pages/Transport/Itineraires";
import Abonnements from "../../Pages/Transport/Abonnements";
import Statistique from "../../Pages/Gestion_academique/Statistique";
import Effectifs from "../../Pages/Gestion_academique/Effectifs";
import Annes_accademique from "../../Pages/Gestion_academique/Annes_accademique";
import Salles from "../../Pages/Gestion_academique/Salles";
import Niviaux from "../../Pages/Gestion_academique/Niviaux";
import Filieres from "../../Pages/Gestion_academique/Filieres";
import Classes from "../../Pages/Gestion_academique/Classes ";
import DemandesAVenir from "../../Pages/Accompte/DemandesAVenir";
import DemandesEnAttentes from "../../Pages/Accompte/DemandesEnAttentes";
import DemandesValidee from "../../Pages/Accompte/DemandesValidee";
import ListeDesDiplomes from "../../Pages/Diplome/ListeDesDiplomes";
import NouveauDiplome from "../../Pages/Diplome/NouveauDiplome";
import DossierDjabou from "../../Pages/Dossier_l3/DossierDjabou";
import InvoicePlus from "../../Pages/Dossier_l3/InvoicePlus";
import ListeDossiers from "../../Pages/Dossier_l3/ListeDossiers";
import Nouveau from "../../Pages/Dossier_l3/Nouveau";
import Cartes from "../../Pages/Etudiant/Cartes";
import Dossiers from "../../Pages/Etudiant/Dossiers";
import EffectifsEtudiant from "../../Pages/Etudiant/EffectifsEtudiant";
import ListesMinistere from "../../Pages/Etudiant/ListesMinistere";
import NouvelleAdmission from "../../Pages/Etudiant/NouvelleAdmission";
import Reinscription from "../../Pages/Etudiant/Reinscription";
import Verification from "../../Pages/Etudiant/Verification";
import Fusion from "../../Pages/Gestion_academique/Fusion";
import Maquettes from "../../Pages/Gestion_academique/Maquettes";
import Migrations from "../../Pages/Gestion_academique/Migrations";
import Resultats from "../../Pages/Gestion_academique/Resultats";
import DossiersMedicals from "../../Pages/Infirmerie/DossiersMedicals";
import Historiques from "../../Pages/Infirmerie/Historiques";
import Commandes from "../../Pages/Moyens_Generaux/Commandes";
import EtatDuStock from "../../Pages/Moyens_Generaux/EtatDuStock";
import Fournisseurs from "../../Pages/Moyens_Generaux/Fournisseurs";
import KitEtAccessoires from "../../Pages/Moyens_Generaux/KitEtAccessoires";
import ReceptionCommande from "../../Pages/Moyens_Generaux/ReceptionCommande";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Enseignants */}
      <Route path="/enseignants/enregistrement" element={<Enregistrement />} />
      <Route path="/enseignants/contrat" element={<Contrat />} />
      <Route path="/enseignants/liste" element={<Liste />} />

      {/* Scolarité */}
      <Route path="/scolarite/statuts" element={<Statuts />} />
      <Route path="/scolarite/paiements" element={<Paiements />} />
      <Route path="/scolarite/inscription_attentes" element={<Inscription_attentes />} />

      {/* Progression */}
      <Route path="/progression/global_progress" element={<Global_progress />} />
      <Route path="/progression/progress" element={<Progress />} />

      {/* Transport */}
      <Route path="/transport/vehicules" element={<Vehicules />} />
      <Route path="/transport/itineraires" element={<Itineraires />} />
      <Route path="/transport/abonnements" element={<Abonnements />} />

      {/* Gestion académique */}
      <Route path="/Gestion_academique/Statistique" element={<Statistique />} />
      <Route path="/Gestion_academique/Effectifs" element={<Effectifs />} />
      <Route path="/Gestion_academique/Annes_accademique" element={<Annes_accademique />} />
      <Route path="/Gestion_academique/Salles" element={<Salles />} />
      <Route path="/Gestion_academique/Filieres" element={<Filieres />} />
      <Route path="/Gestion_academique/Niviaux" element={<Niviaux />} />
      <Route path="/Gestion_academique/Classes" element={<Classes />} />
      <Route path="/Gestion_academique/Maquettes" element={<Maquettes />} />
      <Route path="/Gestion_academique/Resultats" element={<Resultats />} />
      <Route path="/Gestion_academique/Migrations" element={<Migrations />} />
      <Route path="/Gestion_academique/Fusion" element={<Fusion />} />

      {/* Étudiant */}
      <Route path="/Etudiant/Nouvelle_Admission" element={<NouvelleAdmission />} />
      <Route path="/Etudiant/Reinscription" element={<Reinscription />} />
      <Route path="/Etudiant/Dossiers" element={<Dossiers />} />
      <Route path="/Etudiant/Effectifs" element={<EffectifsEtudiant />} />
      <Route path="/Etudiant/Cartes" element={<Cartes />} />
      <Route path="/Etudiant/Listes_Ministere" element={<ListesMinistere />} />
      <Route path="/Etudiant/Verification" element={<Verification />} />

      {/* Infirmerie */}
      <Route path="/Infirmerie/Dossiers_Medicals" element={<DossiersMedicals />} />
      <Route path="/Infirmerie/Historiques" element={<Historiques />} />

      {/* Diplômes */}
      <Route path="/Diplome/Liste_des_Diplomes" element={<ListeDesDiplomes />} />
      <Route path="/Diplome/Nouveau_diplome" element={<NouveauDiplome />} />

      {/* Dossier L3 */}
      <Route path="/Dossier_l3/Nouveau" element={<Nouveau />} />
      <Route path="/Dossier_l3/Liste_Dossiers" element={<ListeDossiers />} />
      <Route path="/Dossier_l3/Dossier_Djabou" element={<DossierDjabou />} />
      <Route path="/Dossier_l3/Invoice_Plus" element={<InvoicePlus />} />

      {/* Moyens Généraux */}
      <Route path="/Moyens_Generaux/Etat_du_stock" element={<EtatDuStock />} />
      <Route path="/Moyens_Generaux/Fournisseurs" element={<Fournisseurs />} />
      <Route path="/Moyens_Generaux/Commandes" element={<Commandes />} />
      <Route path="/Moyens_Generaux/Reception_Commande" element={<ReceptionCommande />} />
      <Route path="/Moyens_Generaux/Kit_et_Accessoires" element={<KitEtAccessoires />} />

      {/* Accompte */}
      <Route path="/Accompte/Demandes_en_attentes" element={<DemandesEnAttentes />} />
      <Route path="/Accompte/Demandes_Validee" element={<DemandesValidee />} />
      <Route path="/Accompte/Demandes_a_Venir" element={<DemandesAVenir />} />
    </Routes>
  );
};

export default AppRoutes;
