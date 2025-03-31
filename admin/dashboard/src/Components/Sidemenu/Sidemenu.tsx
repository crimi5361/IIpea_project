import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  CalendarOutlined,
  TeamOutlined,
  ApartmentOutlined,
  BookOutlined,
  ShopOutlined,
} from "@ant-design/icons";

interface SidemenuProps {
  isSidemenuOpen: boolean;
  darkMode: boolean; 
}

const Sidemenu: React.FC<SidemenuProps> = ({ isSidemenuOpen, darkMode }) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string>("/");

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleMenuClick = (item: { key: string }) => {
    navigate(item.key);
  };

  const items = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Tableau de bord" },
    { key: "/Emploi_du_temps", icon: <CalendarOutlined />, label: "Emploi du temps" },
    { key: "/classe", icon: <TeamOutlined />, label: "Classes" },
    { key: "/professeur", icon: <TeamOutlined />, label: "Professeurs" },
    { key: "/departement", icon: <ApartmentOutlined />, label: "Département" },
    { key: "/filiere", icon: <BookOutlined />, label: "Filières" },
    { key: "/sales", icon: <ShopOutlined />, label: "Salles" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen pt-20 border-r transition-all duration-300 flex flex-col
      ${isSidemenuOpen ? "w-64" : "w-20"} 
      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[selectedKeys]}
        theme={darkMode ? "dark" : "light"}
        mode="inline"
        inlineCollapsed={!isSidemenuOpen}
        className={`!bg-transparent`}
        items={items}
      />
    </div>
  );
};

export default Sidemenu;
