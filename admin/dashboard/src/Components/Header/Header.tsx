import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";

interface  HeaderProps {
darkMode:boolean;
toggleDarkMode: ()=>void;
toggleSidemenu: ()=>void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, toggleSidemenu }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 
    dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-4 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* Section gauche */}
          <div className="flex items-center justify-start">
            {/* Bouton Menu */}
            <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 
              focus:outline-none focus:ring-2 focus:ring-gray-200 
              dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidemenu}>
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>

            {/* Logo */}
            <a href="#" className="flex ms-2 md:me-24">
              <MdSpaceDashboard className="h-8 mr-3 text-xl text-violet-500" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              IIPEA Smart_Plan
              </span>
            </a>
          </div>

          {/* Bouton Mode Sombre */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full transition duration-300 dark:bg-gray-50 dark:text-gray-700">
            {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
