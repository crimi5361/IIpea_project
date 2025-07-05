import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Table, Select, DatePicker, Progress, List, Avatar, Tag } from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  TrophyOutlined, 
  ReadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TeamOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface StatistiqueData {
  totalEtudiants: number;
  totalEnseignants: number;
  totalFilieres: number;
  tauxReussite: number;
  tauxPresence: number;
  budgetTotal: number;
  evolutionEtudiants: number;
  evolutionReussite: number;
}

interface TopFiliere {
  nom: string;
  effectif: number;
  tauxReussite: number;
  couleur: string;
}

interface PerformanceClasse {
  classe: string;
  filiere: string;
  effectif: number;
  moyenne: number;
  tauxReussite: number;
  statut: string;
}

const Statistique = () => {
  const [periode, setPeriode] = useState('2024-2025');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  // Données fictives
  const statistiques: StatistiqueData = {
    totalEtudiants: 2847,
    totalEnseignants: 156,
    totalFilieres: 12,
    tauxReussite: 78.5,
    tauxPresence: 92.3,
    budgetTotal: 2450000,
    evolutionEtudiants: 12.5,
    evolutionReussite: 3.2
  };

  const topFilieres: TopFiliere[] = [
    { nom: 'Informatique', effectif: 456, tauxReussite: 85.2, couleur: '#1890ff' },
    { nom: 'Mathématiques', effectif: 342, tauxReussite: 82.1, couleur: '#52c41a' },
    { nom: 'Physique', effectif: 298, tauxReussite: 79.8, couleur: '#faad14' },
    { nom: 'Chimie', effectif: 234, tauxReussite: 76.5, couleur: '#f5222d' },
    { nom: 'Biologie', effectif: 198, tauxReussite: 81.3, couleur: '#722ed1' }
  ];

  const performanceClasses: PerformanceClasse[] = [
    {
      classe: 'L1 Info',
      filiere: 'Informatique',
      effectif: 156,
      moyenne: 14.2,
      tauxReussite: 87.5,
      statut: 'Excellent'
    },
    {
      classe: 'L2 Math',
      filiere: 'Mathématiques',
      effectif: 134,
      moyenne: 13.8,
      tauxReussite: 82.1,
      statut: 'Bon'
    },
    {
      classe: 'L3 Physique',
      filiere: 'Physique',
      effectif: 98,
      moyenne: 12.9,
      tauxReussite: 79.8,
      statut: 'Bon'
    },
    {
      classe: 'M1 Chimie',
      filiere: 'Chimie',
      effectif: 76,
      moyenne: 14.5,
      tauxReussite: 91.2,
      statut: 'Excellent'
    },
    {
      classe: 'L1 Bio',
      filiere: 'Biologie',
      effectif: 142,
      moyenne: 13.1,
      tauxReussite: 81.3,
      statut: 'Bon'
    }
  ];

  const columns = [
    {
      title: 'Classe',
      dataIndex: 'classe',
      key: 'classe',
      render: (classe: string) => (
        <div className="font-medium">{classe}</div>
      ),
    },
    {
      title: 'Filière',
      dataIndex: 'filiere',
      key: 'filiere',
    },
    {
      title: 'Effectif',
      dataIndex: 'effectif',
      key: 'effectif',
      render: (effectif: number) => (
        <span className="font-semibold">{effectif}</span>
      ),
    },
    {
      title: 'Moyenne',
      dataIndex: 'moyenne',
      key: 'moyenne',
      render: (moyenne: number) => (
        <span className="font-semibold text-blue-600">{moyenne}/20</span>
      ),
    },
    {
      title: 'Taux de réussite',
      dataIndex: 'tauxReussite',
      key: 'tauxReussite',
      render: (taux: number) => (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{taux}%</span>
          <Progress percent={taux} size="small" showInfo={false} />
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: PerformanceClasse) => {
        const color = record.statut === 'Excellent' ? 'green' : 'blue';
        return <Tag color={color}>{record.statut}</Tag>;
      },
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      {/* Filtres */}
      <Card>
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Année académique
            </label>
            <Select
              value={periode}
              onChange={setPeriode}
              style={{ width: 200 }}
            >
              <Option value="2024-2025">2024-2025</Option>
              <Option value="2023-2024">2023-2024</Option>
              <Option value="2022-2023">2022-2023</Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Période
            </label>
            <RangePicker
              onChange={(dates) => {
                if (dates) {
                  setDateRange([dates[0]?.toISOString() || '', dates[1]?.toISOString() || '']);
                } else {
                  setDateRange(null);
                }
              }}
            />
          </div>
        </div>
      </Card>

      {/* Statistiques principales */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Étudiants"
              value={statistiques.totalEtudiants}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
                             suffix={
                 <span className="text-sm text-green-600">
                   <ArrowUpOutlined /> +{statistiques.evolutionEtudiants}%
                 </span>
               }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Enseignants"
              value={statistiques.totalEnseignants}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Taux de Réussite"
              value={statistiques.tauxReussite}
              precision={1}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
                             suffix={
                 <span className="text-sm text-green-600">
                   <ArrowUpOutlined /> +{statistiques.evolutionReussite}%
                 </span>
               }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Budget Total"
              value={statistiques.budgetTotal}
              precision={0}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#722ed1' }}
              suffix="€"
            />
          </Card>
        </Col>
      </Row>

      {/* Graphiques et détails */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Top 5 des Filières" className="h-full">
            <List
              dataSource={topFilieres}
              renderItem={(item, index) => (
                <List.Item>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                                             <Avatar 
                         style={{ backgroundColor: item.couleur }}
                         icon={<ReadOutlined />}
                       />
                      <div>
                        <div className="font-medium">{item.nom}</div>
                        <div className="text-sm text-gray-500">
                          {item.effectif} étudiants
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {item.tauxReussite}%
                      </div>
                      <div className="text-sm text-gray-500">Taux de réussite</div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Indicateurs de Performance" className="h-full">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Taux de présence</span>
                  <span className="font-semibold">{statistiques.tauxPresence}%</span>
                </div>
                <Progress percent={statistiques.tauxPresence} strokeColor="#52c41a" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Taux de réussite global</span>
                  <span className="font-semibold">{statistiques.tauxReussite}%</span>
                </div>
                <Progress percent={statistiques.tauxReussite} strokeColor="#1890ff" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Nombre de filières</span>
                  <span className="font-semibold">{statistiques.totalFilieres}</span>
                </div>
                <Progress percent={(statistiques.totalFilieres / 15) * 100} strokeColor="#faad14" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tableau de performance des classes */}
      <Card title="Performance par Classe">
        <Table
          columns={columns}
          dataSource={performanceClasses}
          rowKey="classe"
          pagination={false}
          className="custom-table"
        />
      </Card>
    </div>
  );
};

export default Statistique;
