import React from "react";
import { useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  // Dashboard
  "/dashboard": "Vue générale du tableau de bord",

  // Enseignant
  "/enseignants/enregistrement": "Page des enregistrements",
  "/enseignants/contrat": "Gestion des contrats",
  "/enseignants/liste": "Liste des enseignants",

  // Scolarité
  "/scolarite/statuts": "Gestion des statuts",
  "/scolarite/paiements": "Suivi des paiements",
  "/scolarite/inscription_attentes": "Inscriptions en attente",

  // Progression
  "/progression/global_progress": "Progression globale",
  "/progression/progress": "Suivi des progrès",

  // Transport
  "/transport/vehicules": "Liste des véhicules",
  "/transport/itineraires": "Gestion des itinéraires",
  "/transport/abonnements": "Abonnements de transport",

  // Gestion académique
  "/Gestion_academique/Statistique": "Statistiques académiques",
  "/Gestion_academique/Effectifs": "Effectifs généraux",
  "/Gestion_academique/Annes_accademique": "Années académiques",
  "/Gestion_academique/Salles": "Gestion des salles",
  "/Gestion_academique/Filieres": "Gestion des filières",
  "/Gestion_academique/Niviaux": "Niveaux d'études",
  "/Gestion_academique/Classes": "Gestion des classes",
  "/Gestion_academique/Maquettes": "Maquettes pédagogiques",
  "/Gestion_academique/Resultats": "Résultats académiques",
  "/Gestion_academique/Migrations": "Migrations d'étudiants",
  "/Gestion_academique/Fusion": "Fusion des classes ou filières",

  // Étudiant
  "/Etudiant/Nouvelle_Admission": "Nouvelle admission étudiant",
  "/Etudiant/Reinscription": "Réinscription étudiant",
  "/Etudiant/Dossiers": "Dossiers étudiants",
  "/Etudiant/Effectifs": "Effectifs étudiants",
  "/Etudiant/Cartes": "Cartes étudiantes",
  "/Etudiant/Listes_Ministere": "Listes transmises au ministère",
  "/Etudiant/Verification": "Vérification des informations",

  // Infirmerie
  "/Infirmerie/Dossiers_Medicals": "Dossiers médicaux",
  "/Infirmerie/Historiques": "Historique médical",

  // Diplômes
  "/Diplome/Liste_des_Diplomes": "Liste des diplômes",
  "/Diplome/Nouveau_diplome": "Création d’un nouveau diplôme",

  // Dossier L3
  "/Dossier_l3/Nouveau": "Nouveau dossier L3",
  "/Dossier_l3/Liste_Dossiers": "Liste des dossiers L3",
  "/Dossier_l3/Dossier_Djabou": "Dossier Djabou",
  "/Dossier_l3/Invoice_Plus": "Gestion des factures avancées",

  // Moyens Généraux
  "/Moyens_Generaux/Etat_du_stock": "État du stock",
  "/Moyens_Generaux/Fournisseurs": "Liste des fournisseurs",
  "/Moyens_Generaux/Commandes": "Commandes en cours",
  "/Moyens_Generaux/Reception_Commande": "Réception des commandes",
  "/Moyens_Generaux/Kit_et_Accessoires": "Kits et accessoires disponibles",

  // Accompte
  "/Accompte/Demandes_en_attentes": "Demandes d’acompte en attente",
  "/Accompte/Demandes_Validee": "Demandes d’acompte validées",
  "/Accompte/Demandes_a_Venir": "Demandes d’acompte à venir",
};

const formatSegment = (segment: string) => {
  if (!segment) return "";
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/_/g, " ");
};

const PageHeader: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const segments = path.split("/").filter(Boolean); // ex: ["enseignants", "contrat"]
  const folder = segments[0] ? formatSegment(segments[0]) : "Accueil";
  const page = segments[1] ? formatSegment(segments[1]) : "";
  const fullPath = `/${segments.join("/")}`;

  const title = titles[fullPath] || "Page";

  return (
    <div className="p-4 ">
      <div className="text-sl text-gray-500 font-semibold">
        {folder} / {page} / {title}
      </div>
    </div>
  );
};

export default PageHeader;
