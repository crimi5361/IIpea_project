import React, { useRef } from "react";
import { 
  FaChalkboardTeacher, FaBuilding, FaSchool, FaBook, 
  FaCheckCircle, FaTimesCircle, FaUpload, FaSyncAlt, FaDownload 
} from "react-icons/fa";

interface ButtonProps {
  icon: React.ReactNode;
  text: string;
  color: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, color, onClick }) => (
  <button 
    className={`${color} text-white px-4 py-2 rounded-lg flex items-center space-x-2 mb-2 w-full`} 
    onClick={onClick}
  >
    {icon} <span>{text}</span>
  </button>
);

const Dashboard = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Fichier sélectionné:", file.name);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Statistiques */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { title: "Classes", value: 0, icon: <FaChalkboardTeacher className="text-green-500" /> },
          { title: "Salles", value: 0, icon: <FaBuilding className="text-blue-500" /> },
          { title: "Campus", value: 0, icon: <FaSchool className="text-indigo-500" /> },
          { title: "Professeurs", value: 0, icon: <FaChalkboardTeacher className="text-yellow-500" /> },
          { title: "Filières", value: 0, icon: <FaBook className="text-red-500" /> },
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3">
            <div className="text-3xl">{item.icon}</div>
            <div>
              <h4 className="text-gray-600">{item.title}</h4>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions et Status */}
      <div className="grid grid-cols-2 gap-4">
        {/* Actions */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <Button   icon={<FaUpload />} text="Importer les données" color="bg-blue-600" onClick={handleFileUpload}  />
          <Button icon={<FaSyncAlt />} text="Générer les emplois du temps" color="bg-green-600" />
          <Button icon={<FaDownload />} text="Synchroniser les données" color="bg-purple-600" />
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".xlsx, .xls" 
            onChange={handleFileChange} 
          />
        </div>

        {/* Statut des tâches */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4">Status des tâches et activité</h4>
          {[
            { label: "Importer les données", success: false },
            { label: "Générer les emplois du temps", success: false },
            { label: "Synchroniser les données", success: false },
          ].map((task, index) => (
            <div key={index} className="flex items-center space-x-3 mb-2">
              {task.success ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <FaTimesCircle className="text-red-500 text-xl" />
              )}
              <p className="font-medium">{task.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
