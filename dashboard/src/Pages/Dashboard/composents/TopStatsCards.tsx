import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

// Données de chaque carte statistique
const stats = [
  {
    title: "Scolarités ouvertes",
    amount: "1 386 086 250 FCFA",
    icon: <Wallet />,
    iconColor: "bg-green-500",
    bgGradient: "from-green-100 to-green-200",
    textColor: "text-green-800",
    animation: "animate-bounce",
  },
  {
    title: "Scolarités versées",
    amount: "1 084 055 783 FCFA",
    icon: <TrendingUp />,
    iconColor: "bg-blue-500",
    bgGradient: "from-blue-100 to-blue-200",
    textColor: "text-blue-800",
    animation: "animate-pulse",
  },
  {
    title: "Scolarités attendues",
    amount: "302 030 467 FCFA",
    icon: <TrendingDown />,
    iconColor: "bg-red-500",
    bgGradient: "from-red-100 to-red-200",
    textColor: "text-red-800",
    animation: "animate-bounce",
  },
];

const TopStatsCards = () => {
  return (
    // Grille responsive : 1 colonne sur mobile, 2 sur tablette, 3 sur bureau
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${stat.bgGradient} 
            shadow-md hover:scale-105 transition-transform duration-300 
            p-6 rounded-xl cursor-pointer w-full min-w-[200px]`} // largeur minimum plus large
        >
          {/* Contenu de la carte */}
          <div className="flex items-center gap-5">
            {/* Icône animée dans un cercle coloré */}
            <div className={`p-4 ${stat.iconColor} text-white rounded-full ${stat.animation}`}>
              {stat.icon}
            </div>

            {/* Texte statistique */}
            <div className="flex flex-col">
              <p className="text-base text-gray-700 font-medium">{stat.title}</p>
              <p className={`text-xl font-bold ${stat.textColor}`}>{stat.amount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopStatsCards;
