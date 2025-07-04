import PageHeader from '../../Components/PageHeader/PageHeader';
import DashboardSection from './composents/DashboardSection';
import TopStatsCards from './composents/TopStatsCards';

const Dashboard = () => {
  return (
    <div className="p-4 space-y-6">
      {/* En-tête */}
      <PageHeader />

      {/* Statistiques principales en haut */}
      <TopStatsCards />

      {/* Section principale : Graphique + Stats latérales, intégrée dans un seul composant */}
      <DashboardSection />
    </div>
  );
};

export default Dashboard;
