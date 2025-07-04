import { useState } from "react";
import Header from "./Components/Header/Header";
import PageContent from "./Components/PageContent/PageContent";
import Sidemenu from "./Components/Sidemenu/Sidemenu";


function App() {
  // États pour le mode sombre et l'ouverture du menu latéral

  const [isSidemenuOpen, setIsSidemenuOpen] = useState(false);

  

  // Fonction pour ouvrir/fermer le menu latéral
  const toggleSidemenu = () => {
    setIsSidemenuOpen(!isSidemenuOpen);
  };

  return (
    <div className="font-tinos ">
      {/* Barre de navigation */}
      <Header toggleSidemenu={toggleSidemenu} darkMode={false} userName={""} onLogout={function (): void {
        throw new Error("Function not implemented.");
      } } />
      {/* Menu latéral */}
      <Sidemenu isSidemenuOpen={isSidemenuOpen}  />
      {/* Contenu principal */}
      <PageContent isSidemenuOpen={isSidemenuOpen} />
    </div>
  );
}

export default App;
