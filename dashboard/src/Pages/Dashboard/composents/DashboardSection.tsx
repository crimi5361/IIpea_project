import IncomeChart from "./RevenueGraph";
import RightStats from "./RightStats";

const DashboardSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-2/3">
        <IncomeChart />
      </div>
      <div className="w-full md:w-1/3">
        <RightStats />
      </div>
    </div>
  );
};

export default DashboardSection;
