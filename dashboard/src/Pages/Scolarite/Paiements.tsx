import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, DatePicker } from 'antd';
import { SearchOutlined, FilterOutlined, DownloadOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { DollarOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Paiement {
  id: number;
  etudiant: string;
  numeroEtudiant: string;
  montant: number;
  datePaiement: string;
  methode: string;
  statut: string;
  reference: string;
  anneeAcademique: string;
  typeFrais: string;
}

const Paiements = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  // Données fictives pour les paiements
  const paiements: Paiement[] = [
    {
      id: 1,
      etudiant: 'Martin Dupont',
      numeroEtudiant: '2023001',
      montant: 1500,
      datePaiement: '2024-01-15',
      methode: 'Carte bancaire',
      statut: 'Payé',
      reference: 'PAY-2024-001',
      anneeAcademique: '2023-2024',
      typeFrais: 'Frais de scolarité'
    },
    {
      id: 2,
      etudiant: 'Sophie Bernard',
      numeroEtudiant: '2023002',
      montant: 800,
      datePaiement: '2024-01-20',
      methode: 'Virement bancaire',
      statut: 'En attente',
      reference: 'PAY-2024-002',
      anneeAcademique: '2023-2024',
      typeFrais: 'Frais d\'inscription'
    },
    {
      id: 3,
      etudiant: 'Pierre Leroy',
      numeroEtudiant: '2023003',
      montant: 1200,
      datePaiement: '2024-01-10',
      methode: 'Espèces',
      statut: 'Payé',
      reference: 'PAY-2024-003',
      anneeAcademique: '2023-2024',
      typeFrais: 'Frais de scolarité'
    },
    {
      id: 4,
      etudiant: 'Marie Dubois',
      numeroEtudiant: '2023004',
      montant: 950,
      datePaiement: '2024-01-25',
      methode: 'Chèque',
      statut: 'En retard',
      reference: 'PAY-2024-004',
      anneeAcademique: '2023-2024',
      typeFrais: 'Frais de laboratoire'
    }
  ];

  const columns = [
    {
      title: 'Étudiant',
      key: 'etudiant',
      render: (_: any, record: Paiement) => (
        <div>
          <div className="font-medium">{record.etudiant}</div>
          <div className="text-sm text-gray-500">#{record.numeroEtudiant}</div>
        </div>
      ),
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      render: (montant: number) => (
        <span className="font-semibold text-green-600">
          {montant.toLocaleString('fr-FR')} €
        </span>
      ),
    },
    {
      title: 'Date de paiement',
      dataIndex: 'datePaiement',
      key: 'datePaiement',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Méthode',
      dataIndex: 'methode',
      key: 'methode',
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Paiement) => {
        const statusConfig = {
          'Payé': { color: 'green', icon: <CheckCircleOutlined /> },
          'En attente': { color: 'blue', icon: <ClockCircleOutlined /> },
          'En retard': { color: 'red', icon: <ExclamationCircleOutlined /> },
        };
        const config = statusConfig[record.statut as keyof typeof statusConfig];
        return (
          <Tag color={config?.color} icon={config?.icon}>
            {record.statut}
          </Tag>
        );
      },
    },
    {
      title: 'Référence',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Paiement) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const filteredData = paiements.filter(paiement => {
    const matchesSearch = 
      paiement.etudiant.toLowerCase().includes(searchText.toLowerCase()) ||
      paiement.numeroEtudiant.toLowerCase().includes(searchText.toLowerCase()) ||
      paiement.reference.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || paiement.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalMontant = paiements.reduce((sum, p) => sum + p.montant, 0);
  const paiementsPayes = paiements.filter(p => p.statut === 'Payé').length;
  const paiementsEnAttente = paiements.filter(p => p.statut === 'En attente').length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      {/* Statistiques */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total des paiements"
              value={totalMontant}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="€"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Paiements payés"
              value={paiementsPayes}
              valueStyle={{ color: '#3f8600' }}
              suffix={`/ ${paiements.length}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En attente"
              value={paiementsEnAttente}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Taux de recouvrement"
              value={((paiementsPayes / paiements.length) * 100).toFixed(1)}
              suffix="%"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Historique des Paiements</h2>
            <p className="text-gray-600 mt-1">Suivi de tous les paiements étudiants</p>
          </div>
          <Space>
            <Button icon={<DownloadOutlined />}>
              Exporter
            </Button>
            <Button type="primary">
              + Nouveau paiement
            </Button>
          </Space>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un étudiant ou référence..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
          <Select
            placeholder="Statut"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Payé">Payé</Option>
            <Option value="En attente">En attente</Option>
            <Option value="En retard">En retard</Option>
          </Select>
          <RangePicker
            placeholder={['Date début', 'Date fin']}
            onChange={(dates) => {
              if (dates) {
                setDateRange([dates[0]?.toISOString() || '', dates[1]?.toISOString() || '']);
              } else {
                setDateRange(null);
              }
            }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} sur ${total} paiements`,
          }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default Paiements;
