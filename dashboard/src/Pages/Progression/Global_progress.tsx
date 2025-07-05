import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker, Modal, Form, Steps, Space, Statistic, Progress, Alert, Tooltip, message, Badge, Timeline, Descriptions, Divider, Upload, Checkbox } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined, EyeOutlined, EditOutlined, SendOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined, FileTextOutlined, UserOutlined, AuditOutlined, PrinterOutlined, DownloadOutlined, TrophyOutlined, BarChartOutlined, LineChartOutlined, PieChartOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface ProgressData {
  id: string;
  filiere: string;
  niveau: string;
  anneeAcademique: string;
  totalEtudiants: number;
  moyenneGenerale: number;
  tauxReussite: number;
  tauxEchec: number;
  tauxAbandon: number;
  progression: number;
  statut: string;
  dateEvaluation: string;
  commentaires: string;
  modules: Array<{
    nom: string;
    moyenne: number;
    tauxReussite: number;
    effectifs: number;
  }>;
  tendances: Array<{
    periode: string;
    moyenne: number;
    tauxReussite: number;
  }>;
}

const GlobalProgress = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState<ProgressData | null>(null);
  const [form] = Form.useForm();

  // Données simulées
  const progressData: ProgressData[] = [
    {
      id: 'PROG-001',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      anneeAcademique: '2023-2024',
      totalEtudiants: 45,
      moyenneGenerale: 15.8,
      tauxReussite: 85.2,
      tauxEchec: 12.3,
      tauxAbandon: 2.5,
      progression: 78.5,
      statut: 'En cours',
      dateEvaluation: '2024-01-15',
      commentaires: 'Progression satisfaisante avec quelques points d\'amélioration',
      modules: [
        { nom: 'Programmation Avancée', moyenne: 16.2, tauxReussite: 88.9, effectifs: 45 },
        { nom: 'Base de données', moyenne: 15.5, tauxReussite: 82.2, effectifs: 45 },
        { nom: 'Réseaux', moyenne: 17.1, tauxReussite: 91.1, effectifs: 45 },
        { nom: 'Mathématiques', moyenne: 14.8, tauxReussite: 75.6, effectifs: 45 }
      ],
      tendances: [
        { periode: 'S1 2023', moyenne: 15.2, tauxReussite: 82.1 },
        { periode: 'S2 2023', moyenne: 15.8, tauxReussite: 85.2 },
        { periode: 'S1 2024', moyenne: 16.1, tauxReussite: 87.3 }
      ]
    },
    {
      id: 'PROG-002',
      filiere: 'Gestion',
      niveau: 'Master 1',
      anneeAcademique: '2023-2024',
      totalEtudiants: 32,
      moyenneGenerale: 14.5,
      tauxReussite: 78.1,
      tauxEchec: 18.8,
      tauxAbandon: 3.1,
      progression: 72.3,
      statut: 'En cours',
      dateEvaluation: '2024-01-10',
      commentaires: 'Progression stable avec quelques difficultés en finance',
      modules: [
        { nom: 'Comptabilité', moyenne: 14.8, tauxReussite: 81.3, effectifs: 32 },
        { nom: 'Marketing', moyenne: 15.2, tauxReussite: 84.4, effectifs: 32 },
        { nom: 'Finance', moyenne: 13.9, tauxReussite: 71.9, effectifs: 32 },
        { nom: 'Management', moyenne: 14.7, tauxReussite: 79.7, effectifs: 32 }
      ],
      tendances: [
        { periode: 'S1 2023', moyenne: 14.1, tauxReussite: 75.0 },
        { periode: 'S2 2023', moyenne: 14.5, tauxReussite: 78.1 },
        { periode: 'S1 2024', moyenne: 14.8, tauxReussite: 80.6 }
      ]
    },
    {
      id: 'PROG-003',
      filiere: 'Droit',
      niveau: 'Licence 2',
      anneeAcademique: '2023-2024',
      totalEtudiants: 28,
      moyenneGenerale: 13.2,
      tauxReussite: 67.9,
      tauxEchec: 28.6,
      tauxAbandon: 3.5,
      progression: 65.4,
      statut: 'Attention',
      dateEvaluation: '2024-01-08',
      commentaires: 'Progression en difficulté, nécessite un suivi renforcé',
      modules: [
        { nom: 'Droit Civil', moyenne: 13.5, tauxReussite: 71.4, effectifs: 28 },
        { nom: 'Droit Pénal', moyenne: 12.8, tauxReussite: 64.3, effectifs: 28 },
        { nom: 'Procédure', moyenne: 13.1, tauxReussite: 67.9, effectifs: 28 },
        { nom: 'Histoire du droit', moyenne: 13.4, tauxReussite: 69.6, effectifs: 28 }
      ],
      tendances: [
        { periode: 'S1 2023', moyenne: 13.8, tauxReussite: 71.4 },
        { periode: 'S2 2023', moyenne: 13.2, tauxReussite: 67.9 },
        { periode: 'S1 2024', moyenne: 12.9, tauxReussite: 65.2 }
      ]
    },
    {
      id: 'PROG-004',
      filiere: 'Langues',
      niveau: 'Licence 1',
      anneeAcademique: '2023-2024',
      totalEtudiants: 38,
      moyenneGenerale: 16.1,
      tauxReussite: 89.5,
      tauxEchec: 9.2,
      tauxAbandon: 1.3,
      progression: 88.7,
      statut: 'Excellent',
      dateEvaluation: '2024-01-12',
      commentaires: 'Excellente progression, résultats remarquables',
      modules: [
        { nom: 'Anglais', moyenne: 16.5, tauxReussite: 92.1, effectifs: 38 },
        { nom: 'Espagnol', moyenne: 15.8, tauxReussite: 86.8, effectifs: 38 },
        { nom: 'Allemand', moyenne: 16.2, tauxReussite: 89.5, effectifs: 38 },
        { nom: 'Culture générale', moyenne: 16.0, tauxReussite: 88.2, effectifs: 38 }
      ],
      tendances: [
        { periode: 'S1 2023', moyenne: 15.8, tauxReussite: 86.8 },
        { periode: 'S2 2023', moyenne: 16.1, tauxReussite: 89.5 },
        { periode: 'S1 2024', moyenne: 16.3, tauxReussite: 91.2 }
      ]
    },
    {
      id: 'PROG-005',
      filiere: 'Physique',
      niveau: 'Master 2',
      anneeAcademique: '2023-2024',
      totalEtudiants: 25,
      moyenneGenerale: 17.2,
      tauxReussite: 96.0,
      tauxEchec: 4.0,
      tauxAbandon: 0.0,
      progression: 95.8,
      statut: 'Excellent',
      dateEvaluation: '2024-01-05',
      commentaires: 'Progression exceptionnelle, niveau d\'excellence',
      modules: [
        { nom: 'Mécanique Quantique', moyenne: 17.8, tauxReussite: 96.0, effectifs: 25 },
        { nom: 'Thermodynamique', moyenne: 17.5, tauxReussite: 96.0, effectifs: 25 },
        { nom: 'Optique', moyenne: 16.8, tauxReussite: 92.0, effectifs: 25 },
        { nom: 'Méthodes numériques', moyenne: 17.0, tauxReussite: 96.0, effectifs: 25 }
      ],
      tendances: [
        { periode: 'S1 2023', moyenne: 16.8, tauxReussite: 92.0 },
        { periode: 'S2 2023', moyenne: 17.2, tauxReussite: 96.0 },
        { periode: 'S1 2024', moyenne: 17.5, tauxReussite: 98.0 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'success';
      case 'En cours': return 'processing';
      case 'Attention': return 'warning';
      case 'Critique': return 'error';
      default: return 'default';
    }
  };

  const getProgressColor = (progression: number) => {
    if (progression >= 80) return '#3f8600';
    if (progression >= 60) return '#1890ff';
    if (progression >= 40) return '#faad14';
    return '#cf1322';
  };

  const columns = [
    {
      title: 'Filière',
      dataIndex: 'filiere',
      key: 'filiere',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Niveau',
      dataIndex: 'niveau',
      key: 'niveau',
    },
    {
      title: 'Effectifs',
      dataIndex: 'totalEtudiants',
      key: 'totalEtudiants',
      render: (nombre: number) => (
        <span className="font-medium text-blue-600">
          {nombre}
        </span>
      )
    },
    {
      title: 'Moyenne générale',
      dataIndex: 'moyenneGenerale',
      key: 'moyenneGenerale',
      render: (moyenne: number) => (
        <span className="font-bold" style={{ color: getProgressColor(moyenne * 5) }}>
          {moyenne}/20
        </span>
      )
    },
    {
      title: 'Taux de réussite',
      dataIndex: 'tauxReussite',
      key: 'tauxReussite',
      render: (taux: number) => (
        <div>
          <Progress percent={taux} size="small" />
          <div className="text-xs text-gray-500 mt-1">
            {taux}%
          </div>
        </div>
      )
    },
    {
      title: 'Progression',
      dataIndex: 'progression',
      key: 'progression',
      render: (progression: number) => (
        <div>
          <Progress percent={progression} size="small" />
          <div className="text-xs text-gray-500 mt-1">
            {progression}%
          </div>
        </div>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut: string) => (
        <Tag color={getStatusColor(statut)}>
          {statut}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: ProgressData) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Analyser">
            <Button 
              type="text" 
              icon={<BarChartOutlined />} 
              size="small"
            />
          </Tooltip>
          <Tooltip title="Exporter">
            <Button 
              type="text" 
              icon={<DownloadOutlined />} 
              size="small"
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleViewDetails = (progress: ProgressData) => {
    setSelectedProgress(progress);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Progression créée:', values);
      message.success('Progression créée avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création de la progression');
    }
  };

  const totalEffectifs = progressData.reduce((sum, p) => sum + p.totalEtudiants, 0);
  const moyenneGlobale = progressData.reduce((sum, p) => sum + p.moyenneGenerale, 0) / progressData.length;
  const tauxReussiteGlobal = progressData.reduce((sum, p) => sum + p.tauxReussite, 0) / progressData.length;
  const progressionGlobale = progressData.reduce((sum, p) => sum + p.progression, 0) / progressData.length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques globales */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des effectifs"
                value={totalEffectifs}
                valueStyle={{ color: '#1890ff' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Moyenne globale"
                value={moyenneGlobale.toFixed(1)}
                suffix="/20"
                valueStyle={{ color: '#3f8600' }}
                prefix={<TrophyOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Taux de réussite global"
                value={tauxReussiteGlobal.toFixed(1)}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
                prefix={<RiseOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Progression globale"
                value={progressionGlobale.toFixed(1)}
                suffix="%"
                valueStyle={{ color: '#faad14' }}
                prefix={<LineChartOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Graphiques et tendances */}
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Tendances par filière" extra={<BarChartOutlined />}>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center">
                  <PieChartOutlined className="text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-500">Graphique des tendances</p>
                  <p className="text-sm text-gray-400">Visualisation des évolutions</p>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Répartition des taux de réussite" extra={<PieChartOutlined />}>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center">
                  <BarChartOutlined className="text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-500">Répartition des réussites</p>
                  <p className="text-sm text-gray-400">Analyse par niveau</p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Filtres et actions */}
        <Card>
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Input
                placeholder="Rechercher une filière..."
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4}>
              <Select placeholder="Niveau" style={{ width: '100%' }}>
                <Option value="all">Tous les niveaux</Option>
                <Option value="licence1">Licence 1</Option>
                <Option value="licence2">Licence 2</Option>
                <Option value="licence3">Licence 3</Option>
                <Option value="master1">Master 1</Option>
                <Option value="master2">Master 2</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Statut" style={{ width: '100%' }}>
                <Option value="all">Tous les statuts</Option>
                <Option value="excellent">Excellent</Option>
                <Option value="en_cours">En cours</Option>
                <Option value="attention">Attention</Option>
                <Option value="critique">Critique</Option>
              </Select>
            </Col>
            <Col span={6}>
              <DatePicker.RangePicker style={{ width: '100%' }} placeholder={['Date début', 'Date fin']} />
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" icon={<LineChartOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouvelle évaluation
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des progressions */}
        <Card title="Progression globale par filière">
          <Table
            dataSource={progressData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: progressData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} filières`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Filières nécessitant une attention particulière"
          description="2 filières ont des taux de réussite inférieurs à 70% et nécessitent un suivi renforcé."
          type="warning"
          showIcon
          action={
            <Button size="small" type="link">
              Voir les détails
            </Button>
          }
        />
      </div>

      {/* Modal de création/modification */}
      <Modal
        title="Nouvelle évaluation de progression"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="filiere"
                label="Filière"
                rules={[{ required: true, message: 'Veuillez sélectionner la filière' }]}
              >
                <Select placeholder="Sélectionner la filière">
                  <Option value="Informatique">Informatique</Option>
                  <Option value="Gestion">Gestion</Option>
                  <Option value="Droit">Droit</Option>
                  <Option value="Langues">Langues</Option>
                  <Option value="Physique">Physique</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="niveau"
                label="Niveau"
                rules={[{ required: true, message: 'Veuillez sélectionner le niveau' }]}
              >
                <Select placeholder="Sélectionner le niveau">
                  <Option value="Licence 1">Licence 1</Option>
                  <Option value="Licence 2">Licence 2</Option>
                  <Option value="Licence 3">Licence 3</Option>
                  <Option value="Master 1">Master 1</Option>
                  <Option value="Master 2">Master 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="anneeAcademique"
                label="Année académique"
                rules={[{ required: true, message: 'Veuillez saisir l\'année' }]}
              >
                <Input placeholder="2023-2024" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="totalEtudiants"
                label="Nombre d'étudiants"
                rules={[{ required: true, message: 'Veuillez saisir le nombre' }]}
              >
                <Input placeholder="45" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="moyenneGenerale"
                label="Moyenne générale"
                rules={[{ required: true, message: 'Veuillez saisir la moyenne' }]}
              >
                <Input placeholder="15.8" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tauxReussite"
                label="Taux de réussite (%)"
                rules={[{ required: true, message: 'Veuillez saisir le taux' }]}
              >
                <Input placeholder="85.2" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaires"
                label="Commentaires"
              >
                <TextArea rows={3} placeholder="Commentaires sur la progression..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer l'évaluation
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails de la progression"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={900}
      >
        {selectedProgress && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Filière:</strong> {selectedProgress.filiere}</p>
                  <p><strong>Niveau:</strong> {selectedProgress.niveau}</p>
                  <p><strong>Année académique:</strong> {selectedProgress.anneeAcademique}</p>
                  <p><strong>Effectifs:</strong> {selectedProgress.totalEtudiants} étudiants</p>
                </Col>
                <Col span={12}>
                  <p><strong>Moyenne générale:</strong> 
                    <span className="font-bold ml-2" style={{ color: getProgressColor(selectedProgress.moyenneGenerale * 5) }}>
                      {selectedProgress.moyenneGenerale}/20
                    </span>
                  </p>
                  <p><strong>Taux de réussite:</strong> {selectedProgress.tauxReussite}%</p>
                  <p><strong>Progression:</strong> {selectedProgress.progression}%</p>
                  <p><strong>Statut:</strong> 
                    <Tag color={getStatusColor(selectedProgress.statut)} className="ml-2">
                      {selectedProgress.statut}
                    </Tag>
                  </p>
                </Col>
              </Row>
              <div className="mt-4">
                <p><strong>Commentaires:</strong></p>
                <p className="text-gray-600">{selectedProgress.commentaires}</p>
              </div>
            </Card>

            {/* Détails des modules */}
            <Card title="Détails par module" size="small">
              <Table
                dataSource={selectedProgress.modules}
                columns={[
                  { title: 'Module', dataIndex: 'nom', key: 'nom' },
                  { 
                    title: 'Moyenne', 
                    dataIndex: 'moyenne', 
                    key: 'moyenne',
                    render: (moyenne: number) => (
                      <span className="font-medium" style={{ color: getProgressColor(moyenne * 5) }}>
                        {moyenne}/20
                      </span>
                    )
                  },
                  { 
                    title: 'Taux de réussite', 
                    dataIndex: 'tauxReussite', 
                    key: 'tauxReussite',
                    render: (taux: number) => (
                      <div>
                        <Progress percent={taux} size="small" />
                        <div className="text-xs text-gray-500 mt-1">
                          {taux}%
                        </div>
                      </div>
                    )
                  },
                  { title: 'Effectifs', dataIndex: 'effectifs', key: 'effectifs' }
                ]}
                pagination={false}
                size="small"
              />
            </Card>

            {/* Tendances */}
            <Card title="Évolution des tendances" size="small">
              <Table
                dataSource={selectedProgress.tendances}
                columns={[
                  { title: 'Période', dataIndex: 'periode', key: 'periode' },
                  { 
                    title: 'Moyenne', 
                    dataIndex: 'moyenne', 
                    key: 'moyenne',
                    render: (moyenne: number) => (
                      <span className="font-medium" style={{ color: getProgressColor(moyenne * 5) }}>
                        {moyenne}/20
                      </span>
                    )
                  },
                  { 
                    title: 'Taux de réussite', 
                    dataIndex: 'tauxReussite', 
                    key: 'tauxReussite',
                    render: (taux: number) => `${taux}%`
                  }
                ]}
                pagination={false}
                size="small"
              />
            </Card>

            {/* Actions rapides */}
            <Card title="Actions rapides" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="primary" block icon={<BarChartOutlined />}>
                  Analyser les tendances
                </Button>
                <Button block icon={<DownloadOutlined />}>
                  Exporter le rapport
                </Button>
                <Button block icon={<PrinterOutlined />}>
                  Imprimer les statistiques
                </Button>
                <Button block icon={<EditOutlined />}>
                  Modifier les données
                </Button>
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GlobalProgress;
