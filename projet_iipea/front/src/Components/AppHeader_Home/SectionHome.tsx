import React, { useState } from "react";
import { Select, Button } from "antd"; // Import des composants Ant Design
import ilustration from "./ilustration.svg";



const SectionHome = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
   <div className="w-screen min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10">

      
      {/* Partie du texte */}
      <div className="max-w-lg text-center md:text-left flex-1 flex flex-col justify-center">
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(to right, #2980b9, #3498db)",
          }}
        >
         SYSTÈME DE GESTION DES EMPLOIS DU TEMPS
        </h1>
        <p className="italic text-lg text-gray-700 mb-6 leading-relaxed">
          Transformez la gestion manuelle de vos emplois du temps en une gestion{" "}
          <span className="font-semibold text-blue-600">automatisée et efficace.</span>
        </p>

        {/* Bouton principal */}
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 mt-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          Consulter les emplois du temps
        </button>

        {/* Section des filtres */}
        <div className={`transition-all duration-500 ${showFilters ? "opacity-100 mt-6 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"}`}>
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4">
            
            {/* Select 1 : Année */}
            <Select placeholder="Année" className="w-36 md:w-44">
          
            </Select>

            {/* Select 2 : Classe */}
            <Select placeholder="Classe" className="w-36 md:w-44">

            </Select>

            {/* Select 3 : Groupe */}
            <Select placeholder="Groupe" className="w-36 md:w-44">

            </Select>

            {/* Bouton Télécharger */}
            <Button type="primary" className="bg-blue-600 hover:bg-blue-700 px-6">
              Télécharger
            </Button>

          </div>
        </div>
      </div>

      {/* Partie de l'image */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src={ilustration}
          alt="Illustration du système de gestion"
          className="w-60 md:w-80 lg:w-96 rounded-lg drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default SectionHome;
