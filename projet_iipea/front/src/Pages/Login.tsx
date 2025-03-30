import React from "react";
import { Input, Button } from "antd";

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="p-4">
      <form className="space-y-4">
        {/* Champ Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Adresse Email
          </label>
          <Input placeholder="Votre mail" type="email" />
        </div>

        {/* Champ Mot de passe */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Mot de passe
          </label>
          <Input.Password placeholder="Votre mot de passe" />
        </div>

        {/* Bouton de connexion */}
        <Button type="primary" className="w-full" htmlType="submit">
          Se connecter
        </Button>
      </form>
    </div>
  );
};

export default Login;
