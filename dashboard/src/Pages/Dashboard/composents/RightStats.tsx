import { Card } from "antd";
import { GraduationCap, Users, BookOpen, School } from "lucide-react";
import { CardContent } from "@mui/material";

const cardStyle = "rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300";

const RightStats = () => {
  return (
    <div className="space-y-4">
      {/* Étudiants */}
      <Card className={`${cardStyle} bg-gradient-to-br from-blue-50 to-white`}>
        <CardContent>
          <div className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <GraduationCap className="text-blue-600 group-hover:scale-105 transition-transform duration-300" />
            Étudiants
            <span className="ml-auto text-green-700 text-xl">5.329</span>
          </div>
          <ul className="text-sm space-y-2 text-blue-800 font-medium">
            <li className="flex justify-between">
              <span>Universitaires</span>
              <span className="text-green-700">2.915</span>
            </li>
            <li className="flex justify-between">
              <span>Professionnels</span>
              <span className="text-green-700">2.227</span>
            </li>
            <li className="flex justify-between">
              <span>Formation Continue</span>
              <span className="text-green-700">187</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Enseignants */}
      <Card className={`${cardStyle} bg-gradient-to-br from-purple-50 to-white`}>
        <CardContent className="flex items-center justify-between text-purple-800">
          <div className="flex items-center gap-2">
            <Users className="text-purple-600 group-hover:scale-105 transition-transform duration-300" />
            <span className="font-semibold">Enseignants</span>
          </div>
          <span className="text-lg font-bold">332</span>
        </CardContent>
      </Card>

      {/* Classes & Campus */}
      <Card className={`${cardStyle} bg-gradient-to-br from-yellow-50 to-white`}>
        <CardContent className="space-y-3 text-yellow-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="text-yellow-600" />
              <span className="font-semibold">Classes</span>
            </div>
            <span className="text-lg font-bold">166</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <School className="text-yellow-600" />
              <span className="font-semibold">Campus</span>
            </div>
            <span className="text-lg font-bold">5</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightStats;
