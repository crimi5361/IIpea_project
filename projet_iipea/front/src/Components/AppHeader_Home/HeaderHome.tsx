import React, { useState } from "react";
import { Button, Modal } from "antd";
import logo from "./Logo.png";
import Login from "../../Pages/Login";

const HeaderHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-100 bg-opacity-50 z-20">
      <img src={logo} alt="logo" className="h-15" />

      {/* Bouton Connexion */}
      <Button 
        type="primary"
        className="mt-4"
        onClick={() => setIsModalOpen(true)}  
      >
        Connexion
      </Button>

      {/* Modale Ant Design */}
      <Modal 
        title="Connexion" 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        footer={null}
      >
        <Login onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HeaderHome;
