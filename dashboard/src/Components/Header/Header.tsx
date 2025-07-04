import { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard, MdNotificationsNone } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";

interface HeaderProps {
  darkMode: boolean;
  toggleSidemenu: () => void;
  userName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidemenu, userName, onLogout }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-4 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* Section gauche */}
          <div className="flex items-center">
            <button
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidemenu}
            >
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>

            <a href="#" className="flex items-center ms-4 space-x-3">
              <MdSpaceDashboard className="text-xl text-violet-500" />
              <img
                src="/logo.png"
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl sm:text-3xl font-bold text-[#2E86C1] tracking-wide">
                IIPEA
              </span>

            </a>
          </div>

          {/* Section droite : Notifications + Utilisateur */}
          <div className="flex items-center space-x-4 relative">
            {/* Bouton Notifications */}
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <MdNotificationsNone className="text-2xl" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Drawer Notifications */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: 300 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg dark:bg-gray-800 z-50 p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold dark:text-white">Notifications</h2>
                    <button onClick={() => setShowNotifications(false)} className="text-xl">✖</button>
                  </div>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700 dark:text-gray-300">Pas de notifications pour le moment.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Utilisateur */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown((prev) => !prev)}
                className="rounded-full overflow-hidden focus:outline-none"
              >
                <img
                  src="/icons8-utilisateur-50.png"
                  alt="User Icon"
                  className="w-10 h-10"
                />
              </button>

              {/* Dropdown utilisateur */}
              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md
                     shadow-lg dark:bg-gray-700 dark:border-gray-600 z-50"
                  >
                    {/* Tête : nom utilisateur */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-600">
                      <FaUserCircle className="text-xl text-gray-500 dark:text-gray-300" />
                      <span className="block text-sm font-medium text-gray-900 dark:text-white">
                        {userName}
                      </span>
                    </div>

                    {/* Options */}
                    <ul className="py-1">
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700
                           hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          <FiSettings className="text-base" />
                          Paramètres
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={onLogout}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600
                           hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
                        >
                          <FiLogOut className="text-base" />
                          Se déconnecter
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
