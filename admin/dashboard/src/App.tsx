import { useState } from "react";
import Header from "./Components/Header/Header";
import Sidemenu from "./Components/Sidemenu/Sidemenu";
import PageContent from "./Components/PageContent/PageContent";

function App() {
  // États pour le mode sombre et l'ouverture du menu latéral
  const [darkMode, setDarkMode] = useState(false);
  const [isSidemenuOpen, setIsSidemenuOpen] = useState(false);

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Fonction pour ouvrir/fermer le menu latéral
  const toggleSidemenu = () => {
    setIsSidemenuOpen(!isSidemenuOpen);
  };

  return (
    <div className="font-tinos ">
      {/* Barre de navigation */}
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSidemenu={toggleSidemenu} />
      {/* Menu latéral */}
      <Sidemenu isSidemenuOpen={isSidemenuOpen} darkMode={darkMode} />
      {/* Contenu principal */}
      <PageContent isSidemenuOpen={isSidemenuOpen} />
    </div>
  );
}

export default App;
