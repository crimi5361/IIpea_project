import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge, Avatar, Timeline } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, MedicineBoxOutlined, UserOutlined, CalendarOutlined, FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface HistoriqueMedical {
  id: number;
  numeroHistorique: string;
  nom: string;
  prenom: string;
  type: string;
  dateVisite: string;
  motif: string;
  diagnostic: string;
  traitement: string;
  medecin: string;
  duree: string;
  statut: string;
  urgence: string;
  commentaires: string;
  prochaineVisite: string;
  resultat: string;
}

const Historiques = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingHistorique, setEditingHistorique] = useState<HistoriqueMedical | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les historiques médicaux
  const historiques: HistoriqueMedical[] = [
    {
      id: 1,
      numeroHistorique: 'HIST-2024-001',
      nom: 'Dupont',
      prenom: 'Jean',
      type: 'Étudiant',
      dateVisite: '2024-03-15',
      motif: 'Consultation de routine',
      diagnostic: 'Bonne santé générale',
      traitement: 'Aucun traitement nécessaire',
      medecin: 'Dr. Martin',
      duree: '15 minutes',
      statut: 'Terminé',
      urgence: 'Non',
      commentaires: 'Étudiant en bonne santé, contrôle annuel',
      prochaineVisite: '2025-03-15',
      resultat: 'Favorable'
    },
    {
      id: 2,
      numeroHistorique: 'HIST-2024-002',
      nom: 'Bernard',
      prenom: 'Sophie',
      type: 'Personnel',
      dateVisite: '2024-03-10',
      motif: 'Suivi hypertension',
      diagnostic: 'Tension artérielle élevée',
      traitement: 'Médicaments antihypertenseurs',
      medecin: 'Dr. Leroy',
      duree: '30 minutes',
      statut: 'Terminé',
      urgence: 'Non',
      commentaires: 'Surveillance tensionnelle recommandée',
      prochaineVisite: '2024-04-10',
      resultat: 'Amélioration'
    },
    {
      id: 3,
      numeroHistorique: 'HIST-2024-003',
      nom: 'Martin',
      prenom: 'Pierre',
      type: 'Étudiant',
      dateVisite: '2024-02-20',
      motif: 'Accident sportif',
      diagnostic: 'Fracture bras droit',
      traitement: 'Plâtre, rééducation',
      medecin: 'Dr. Dubois',
      duree: '45 minutes',
      statut: 'Terminé',
      urgence: 'Oui',
      commentaires: 'Accident lors d\'un match de football',
      prochaineVisite: '2024-05-20',
      resultat: 'Guérison'
    },
    {
      id: 4,
      numeroHistorique: 'HIST-2024-004',
      nom: 'Leroy',
      prenom: 'Marie',
      type: 'Personnel',
      dateVisite: '2024-03-20',
      motif: 'Contrôle diabète',
      diagnostic: 'Diabète type 2 stable',
      traitement: 'Insuline, régime alimentaire',
      medecin: 'Dr. Bernard',
      duree: '25 minutes',
      statut: 'Terminé',
      urgence: 'Non',
      commentaires: 'Glycémie bien contrôlée',
      prochaineVisite: '2024-04-20',
      resultat: 'Stable'
    },
    {
      id: 5,
      numeroHistorique: 'HIST-2024-005',
      nom: 'Dubois',
      prenom: 'Marc',
      type: 'Étudiant',
      dateVisite: '2024-03-25',
      motif: 'Crise d\'asthme',
      diagnostic: 'Asthme léger',
      traitement: 'Ventoline, évitement des facteurs déclencheurs',
      medecin: 'Dr. Martin',
      duree: '20 minutes',
      statut: 'Terminé',
      urgence: 'Oui',
      commentaires: 'Crise déclenchée par l\'exposition au pollen',
      prochaineVisite: '2024-06-25',
      resultat: 'Amélioration'
    },
    {
      id: 6,
      numeroHistorique: 'HIST-2024-006',
      nom: 'Moreau',
      prenom: 'Julie',
      type: 'Étudiant',
      dateVisite: '2024-03-28',
      motif: 'Fatigue persistante',
      diagnostic: 'Anémie ferriprive',
      traitement: 'Supplémentation en fer',
      medecin: 'Dr. Leroy',
      duree: '35 minutes',
      statut: 'En cours',
      urgence: 'Non',
      commentaires: 'Analyses sanguines prescrites',
      prochaineVisite: '2024-04-28',
      resultat: 'En attente'
    }
  ];

  const columns = [
    {
      title: 'Patient',
      key: 'patient',
      render: (_: any, record: HistoriqueMedical) => (
        <div className="flex items-center">
          <Avatar size={32} className="mr-3">
            {record.prenom.charAt(0)}{record.nom.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">{record.prenom} {record.nom}</div>
            <div className="text-sm text-gray-500">#{record.numeroHistorique}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      key: 'type',
      render: (_: any, record: HistoriqueMedical) => {
        const typeConfig = {
          'Étudiant': { color: 'blue' },
          'Personnel': { color: 'green' },
          'Visiteur': { color: 'orange' },
        };
        const config = typeConfig[record.type as keyof typeof typeConfig];
        return (
          <Tag color={config?.color}>
            {record.type}
          </Tag>
        );
      },
    },
    {
      title: 'Date de visite',
      key: 'dateVisite',
      render: (_: any, record: HistoriqueMedical) => (
        <div>
          <div className="text-sm">{new Date(record.dateVisite).toLocaleDateString('fr-FR')}</div>
          <div className="text-xs text-gray-500">{record.duree}</div>
        </div>
      ),
    },
    {
      title: 'Motif',
      key: 'motif',
      render: (_: any, record: HistoriqueMedical) => (
        <div>
          <div className="font-medium">{record.motif}</div>
          <div className="text-xs text-gray-500">Dr. {record.medecin.split(' ')[1]}</div>
        </div>
      ),
    },
    {
      title: 'Diagnostic',
      dataIndex: 'diagnostic',
      key: 'diagnostic',
      render: (diagnostic: string) => (
        <span className="text-sm">{diagnostic}</span>
      ),
    },
    {
      title: 'Urgence',
      key: 'urgence',
      render: (_: any, record: HistoriqueMedical) => {
        const urgenceConfig = {
          'Oui': { color: 'red', icon: <ExclamationCircleOutlined /> },
          'Non': { color: 'green', icon: <CheckCircleOutlined /> },
        };
        const config = urgenceConfig[record.urgence as keyof typeof urgenceConfig];
        return (
          <Tag color={config?.color} icon={config?.icon}>
            {record.urgence}
          </Tag>
        );
      },
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: HistoriqueMedical) => {
        const statusConfig = {
          'Terminé': { color: 'green', icon: <CheckCircleOutlined /> },
          'En cours': { color: 'blue', icon: <ClockCircleOutlined /> },
          'Annulé': { color: 'red', icon: <ExclamationCircleOutlined /> },
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
      title: 'Résultat',
      key: 'resultat',
      render: (_: any, record: HistoriqueMedical) => {
        const resultatConfig = {
          'Favorable': { color: 'green' },
          'Amélioration': { color: 'blue' },
          'Stable': { color: 'orange' },
          'Guérison': { color: 'green' },
          'En attente': { color: 'gray' },
        };
        const config = resultatConfig[record.resultat as keyof typeof resultatConfig];
        return (
          <Tag color={config?.color}>
            {record.resultat}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: HistoriqueMedical) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleView(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  const filteredData = historiques.filter(historique => {
    const matchesSearch = 
      historique.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      historique.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
      historique.numeroHistorique.toLowerCase().includes(searchText.toLowerCase()) ||
      historique.motif.toLowerCase().includes(searchText.toLowerCase()) ||
      historique.diagnostic.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesType = typeFilter === 'all' || historique.type === typeFilter;
    const matchesStatut = statutFilter === 'all' || historique.statut === statutFilter;
    
    return matchesSearch && matchesType && matchesStatut;
  });

  // Statistiques
  const totalHistoriques = historiques.length;
  const termines = historiques.filter(h => h.statut === 'Terminé').length;
  const enCours = historiques.filter(h => h.statut === 'En cours').length;
  const urgences = historiques.filter(h => h.urgence === 'Oui').length;

  // Visites récentes (7 derniers jours)
  const visitesRecentes = historiques.filter(historique => {
    const dateVisite = new Date(historique.dateVisite);
    const today = new Date();
    const daysDiff = Math.ceil((today.getTime() - dateVisite.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
  }).length;

  const handleView = (historique: HistoriqueMedical) => {
    setEditingHistorique(historique);
    setIsModalVisible(true);
  };

  const handleEdit = (historique: HistoriqueMedical) => {
    setEditingHistorique(historique);
    form.setFieldsValue({
      ...historique,
      dateVisite: new Date(historique.dateVisite),
      prochaineVisite: new Date(historique.prochaineVisite)
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingHistorique(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingHistorique) {
        message.success('Historique médical modifié avec succès !');
      } else {
        message.success('Historique médical ajouté avec succès !');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      {/* Alertes */}
      {urgences > 0 && (
        <Alert
          message={`${urgences} visites d'urgence dans l'historique`}
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
          className="mb-4"
        />
      )}
      
      {/* Statistiques */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Historiques"
              value={totalHistoriques}
              prefix={<HistoryOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Visites Terminées"
              value={termines}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En Cours"
              value={enCours}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Visites Récentes"
              value={visitesRecentes}
              suffix="(7 jours)"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Historiques Médicaux</h2>
            <p className="text-gray-600 mt-1">Suivi des consultations et traitements passés</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouvel historique
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un historique..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
          <Select
            placeholder="Type"
            value={typeFilter}
            onChange={setTypeFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les types</Option>
            <Option value="Étudiant">Étudiant</Option>
            <Option value="Personnel">Personnel</Option>
            <Option value="Visiteur">Visiteur</Option>
          </Select>
          <Select
            placeholder="Statut"
            value={statutFilter}
            onChange={setStatutFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Terminé">Terminé</Option>
            <Option value="En cours">En cours</Option>
            <Option value="Annulé">Annulé</Option>
          </Select>
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
              `${range[0]}-${range[1]} sur ${total} historiques`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un historique */}
      <Modal
        title={editingHistorique ? 'Modifier l\'historique médical' : 'Nouvel historique médical'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'Terminé',
            type: 'Étudiant',
            urgence: 'Non',
            resultat: 'Favorable'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="numeroHistorique"
                label="Numéro d'historique"
                rules={[{ required: true, message: 'Veuillez saisir le numéro' }]}
              >
                <Input placeholder="HIST-2024-001" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Nom de famille" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="prenom"
                label="Prénom"
                rules={[{ required: true, message: 'Veuillez saisir le prénom' }]}
              >
                <Input placeholder="Prénom" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select>
                  <Option value="Étudiant">Étudiant</Option>
                  <Option value="Personnel">Personnel</Option>
                  <Option value="Visiteur">Visiteur</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateVisite"
                label="Date de visite"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duree"
                label="Durée de la consultation"
                rules={[{ required: true, message: 'Veuillez saisir la durée' }]}
              >
                <Input placeholder="15 minutes" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="medecin"
                label="Médecin"
                rules={[{ required: true, message: 'Veuillez saisir le médecin' }]}
              >
                <Input placeholder="Dr. Nom Prénom" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="motif"
                label="Motif de la visite"
                rules={[{ required: true, message: 'Veuillez saisir le motif' }]}
              >
                <Input placeholder="Consultation de routine" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="diagnostic"
                label="Diagnostic"
                rules={[{ required: true, message: 'Veuillez saisir le diagnostic' }]}
              >
                <Input placeholder="Diagnostic établi" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="traitement"
                label="Traitement"
                rules={[{ required: true, message: 'Veuillez saisir le traitement' }]}
              >
                <Input placeholder="Traitement prescrit" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="urgence"
                label="Cas d'urgence"
                rules={[{ required: true, message: 'Veuillez sélectionner' }]}
              >
                <Select>
                  <Option value="Oui">Oui</Option>
                  <Option value="Non">Non</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="statut"
                label="Statut"
                rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
              >
                <Select>
                  <Option value="Terminé">Terminé</Option>
                  <Option value="En cours">En cours</Option>
                  <Option value="Annulé">Annulé</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="resultat"
                label="Résultat"
                rules={[{ required: true, message: 'Veuillez sélectionner le résultat' }]}
              >
                <Select>
                  <Option value="Favorable">Favorable</Option>
                  <Option value="Amélioration">Amélioration</Option>
                  <Option value="Stable">Stable</Option>
                  <Option value="Guérison">Guérison</Option>
                  <Option value="En attente">En attente</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="prochaineVisite"
                label="Prochaine visite"
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaires"
                label="Commentaires"
              >
                <Input.TextArea rows={3} placeholder="Observations et commentaires..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Historiques;
