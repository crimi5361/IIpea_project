import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { mois: "Jan", montant: 20000000 },
  { mois: "Fév", montant: 30000000 },
  { mois: "Mars", montant: 40000000 },
  { mois: "Avr", montant: 28000000 },
  { mois: "Mai", montant: 35000000 },
];

const IncomeChart = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-md h-[320px]">
      <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
        📈 Évolution des entrées mensuelles
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="mois" stroke="#4b5563" />
          <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} stroke="#4b5563" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "none" }}
            labelStyle={{ color: "#6b7280" }}
            formatter={(value: number) => `${value.toLocaleString()} FCFA`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="montant"
            stroke="url(#colorMontant)"
            strokeWidth={3}
            dot={{ stroke: "#10b981", strokeWidth: 2, fill: "white", r: 5 }}
            activeDot={{ r: 7 }}
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;
