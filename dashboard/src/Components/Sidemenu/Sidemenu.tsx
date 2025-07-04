import { Menu } from "antd";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined, UserOutlined, ReadOutlined, LineChartOutlined, CarOutlined, TeamOutlined,
  MedicineBoxOutlined, FileDoneOutlined, FolderOpenOutlined, AppstoreAddOutlined, BankOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import SubMenuPanel from "../SubMenu/SubmenuPanel";

interface SidemenuProps {
  isSidemenuOpen: boolean;
}

const Sidemenu: React.FC<SidemenuProps> = ({ isSidemenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string>("");

  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Déduction de la clé sélectionnée à partir de l’URL
  useEffect(() => {
    const path = location.pathname;
    const segments = path.split("/");
    const mainKey = segments[1]; // ex: "/dashboard/stats" => "dashboard"
    setSelectedKey(mainKey || "dashboard");
  }, [location.pathname]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuClick = (info: any) => {
    const rect = info.domEvent.currentTarget.getBoundingClientRect();
    setButtonPosition({ top: rect.top, left: rect.right });
    setActiveSubMenu(info.key);
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
    setActiveSubMenu(null);
  };

  const handleCloseSubMenu = () => {
    setActiveSubMenu(null);
  };

  const items = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "enseignant", icon: <UserOutlined />, label: "Enseignant" },
    { key: "scolarite", icon: <ReadOutlined />, label: "Scolarité" },
    { key: "progression", icon: <LineChartOutlined />, label: "Progression" },
    { key: "transport", icon: <CarOutlined />, label: "Transport" },
    { key: "Gestion_academique", icon: <BankOutlined />, label: "Gestion académique" },
    { key: "Etudiant", icon: <TeamOutlined />, label: "Étudiants" },
    { key: "Infirmerie", icon: <MedicineBoxOutlined />, label: "Infirmerie" },
    { key: "Diplome", icon: <FileDoneOutlined />, label: "Diplômes" },
    { key: "Dossier_l3", icon: <FolderOpenOutlined />, label: "Dossier L3" },
    { key: "Moyens_Generaux", icon: <AppstoreAddOutlined />, label: "Moyens Généraux" },
    { key: "Accompte", icon: <SolutionOutlined />, label: "Acompte" },
  ];

  const subMenuData: Record<string, { title: string; subItems: { label: string; path: string }[] }> = {
    dashboard: {
      title: "Dashboard",
      subItems: [{ label: "Dashboard", path: "/dashboard" }],
    },
    enseignant: {
      title: "Enseignant",
      subItems: [
        { label: "Enregistrement", path: "/enseignants/enregistrement" },
        { label: "Contrat", path: "/enseignants/contrat" },
        { label: "Liste des enseignant", path: "/enseignants/liste" },
      ],
    },
    scolarite: {
      title: "Scolarité",
      subItems: [
        { label: "Statuts", path: "/scolarite/statuts" },
        { label: "Historique des Paiement", path: "/scolarite/paiements" },
        { label: "Inscription en attentes", path: "/scolarite/inscription_attentes" },

      ],
    },
    progression: {
      title: "Progression",
      subItems: [
        { label: "Global Progress", path: "/progression/global_progress" },
        { label: "Progression", path: "/progression/progress" },
      ],
    },
    transport: {
      title: "Transport",
      subItems: [
        { label: "Liste des véhicules", path: "/transport/vehicules" },
        { label: "Itinéraires", path: "/transport/itineraires" },
        { label: "Abonnements", path: "/transport/abonnements" },
      ],
    },

    Gestion_academique: {
      title: "Gestion academique",
      subItems: [
        { label: "Statistique", path: "/Gestion_academique/Statistique" },
        { label: "Effectifs", path: "/Gestion_academique/Effectifs" },
        { label: "Années accademique", path: "/Gestion_academique/Annes_accademique" },
        { label: "Salles", path: "/Gestion_academique/Salles" },
        { label: "Filieres", path: "/Gestion_academique/Filieres" },
        { label: "Niviaux", path: "/Gestion_academique/Niviaux" },
        { label: "Classes", path: "/Gestion_academique/Classes" },
        { label: "Maquettes", path: "/Gestion_academique/Maquettes" },
        { label: "Resultats", path: "/Gestion_academique/Resultats" },
        { label: "Migrations", path: "/Gestion_academique/Migrations" },
        { label: "Fusion", path: "/Gestion_academique/Fusion" },
      
      ],
    },
    Etudiant: {
      title: "Etudiants",
      subItems: [
        { label: "Nouvelle Admission", path: "/Etudiant/Nouvelle_Admission" },
        { label: "Ré-inscription", path: "/Etudiant/Reinscription" },
        { label: "Dossier", path: "/Etudiant/Dossiers" },
        { label: "Effectifs", path: "/Etudiant/Effectifs" },
        { label: "Cartes", path: "/Etudiant/Cartes" },
        { label: "Listes Ministère", path: "/Etudiant/Listes_Ministere" },
        { label: "Verification", path: "/Etudiant/Verification" },
      ],
    },
    Infirmerie: {
      title: "Infirmeries",
      subItems: [
        { label: "Dossiers Medicals", path: "/Infirmerie/Dossiers_Medicals" },
        { label: "Historiques", path: "/Infirmerie/Historiques" },
        
      ],
    },
    Diplome: {
      title: "Diplomes",
      subItems: [
        { label: "Liste des Diplomes", path: "/Diplome/Liste_des_Diplomes" },
        { label: "Nouveau diplome", path: "/Diplome/Nouveau_diplome" },
    
      ],
    },
    Dossier_l3: {
      title: "Dossier l3",
      subItems: [
        { label: "Nouveau", path: "/Dossier_l3/Nouveau" },
        { label: "Liste Dossiers", path: "/Dossier_l3/Liste_Dossiers" },
        { label: "Dossier Djabou", path: "/Dossier_l3/Dossier_Djabou" },
        { label: "Invoice Plus", path: "/Dossier_l3/Invoice_Plus" },
      ],
    },
    Moyens_Generaux: {
      title: "Moyens Generaux",
      subItems: [
        { label: "Etat du stock", path: "/Moyens_Generaux/Etat_du_stock" },
        { label: "Fournisseurs", path: "/Moyens_Generaux/Fournisseurs" },
        { label: "Commandes", path: "/Moyens_Generaux/Commandes" },
        { label: "Reception Commande", path: "/Moyens_Generaux/Reception_Commande" },
        { label: "Kit et Accessoires", path: "/Moyens_Generaux/Kit_et_Accessoires" },
      ],
    },
    Accompte: {
      title: "Accompte",
      subItems: [
        { label: "Demandes en attentes", path: "/Accompte/Demandes_en_attentes" },
        { label: "Demandes Validée", path: "/Accompte/Demandes_Validee" },
        { label: "Demandes a Venir", path: "/Accompte/Demandes_a_Venir" },
      ],
    },
    
  };

  return (
    <div ref={containerRef}>
      <div
        className={`fixed top-0 left-0 z-40 h-screen pt-20 border-r transition-all duration-300
        ${isSidemenuOpen ? "w-64" : "w-20"}`}
      >
        <Menu
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[selectedKey]}
          inlineCollapsed={!isSidemenuOpen}
          className="!bg-transparent"
          items={items}
        />
      </div>

      {activeSubMenu && subMenuData[activeSubMenu] && (
        <SubMenuPanel
          position={buttonPosition}
          data={subMenuData[activeSubMenu]}
          onClose={handleCloseSubMenu}
          onSubItemClick={handleSubItemClick}
        />
      )}
    </div>
  );
};

export default Sidemenu;
