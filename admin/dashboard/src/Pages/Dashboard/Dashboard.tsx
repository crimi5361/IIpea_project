import { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaUniversity, FaBuilding, FaUsers, FaBook, FaFileImport, FaSync, FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    classes: 0,
    salles: 0,
    campus: 0,
    professeurs: 0,
    filieres: 0,
  });
  const [taskStatus, setTaskStatus] = useState<{ task: string; status: string }[]>([]);


  useEffect(() => {
    setTimeout(() => {
      setStats({
        classes: 20,
        salles: 10,
        campus: 3,
        professeurs: 50,
        filieres: 8,
      });
    }, 1000);
  }, []);

  const handleTask = (task: string) => {
    setTaskStatus((prev) => [...prev, { task, status: "Succès" }]);
  };

  const statItems = [
    { title: "Classes", count: stats.classes, icon: <FaChalkboardTeacher size={40} className="text-blue-600" /> },
    { title: "Salles", count: stats.salles, icon: <FaBuilding size={40} className="text-green-600" /> },
    { title: "Campus", count: stats.campus, icon: <FaUniversity size={40} className="text-purple-600" /> },
    { title: "Professeurs", count: stats.professeurs, icon: <FaUsers size={40} className="text-orange-600" /> },
    { title: "Filières", count: stats.filieres, icon: <FaBook size={40} className="text-red-600" /> },
  ];

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gray-100 min-h-screen">
      {/* Statistiques */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-gray-300 hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            {stat.icon}
            <h2 className="text-lg font-semibold text-gray-700 mt-3">{stat.title}</h2>
            <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>
      
      {/* Raccourcis de Tâches */}
      <div className="bg-white p-6 shadow-lg rounded-xl flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Raccourcis de Tâches</h2>
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-medium hover:bg-blue-600 transition" onClick={() => handleTask("Importation des données via Excel")}>
          <FaFileImport /> Importer les données
        </button>
        <button className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-medium hover:bg-green-600 transition" onClick={() => handleTask("Génération des emplois du temps")}>
          <FaCalendarAlt /> Générer les emplois du temps
        </button>
        <button className="w-full bg-purple-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-medium hover:bg-purple-600 transition" onClick={() => handleTask("Synchronisation sur My_IIPEA")}>
          <FaSync /> Synchroniser les données
        </button>
      </div>
      
      {/* Statut des Tâches */}
      <div className="lg:col-span-3 bg-white p-6 shadow-lg rounded-xl mt-4">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Statut des Tâches et Activités</h2>
        <ul className="space-y-2">
          {taskStatus.map((task, index) => (
            <li key={index} className="bg-green-100 text-green-800 p-3 rounded-lg font-medium shadow-md">✔ {task.task} - {task.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
