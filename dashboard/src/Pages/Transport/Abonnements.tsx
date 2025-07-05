import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CarOutlined, UserOutlined, CalendarOutlined, CreditCardOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface Abonnement {
  id: number;
  numeroAbonnement: string;
  nom: string;
  prenom: string;
  type: string;
  duree: string;
  dateDebut: string;
  dateFin: string;
  montant: number;
  statut: string;
  moyenPaiement: string;
  responsable: string;
  commentaires: string;
  derniereAction: string;
  dateDerniereAction: string;
}

const Abonnements = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAbonnement, setEditingAbonnement] = useState<Abonnement | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les abonnements
  const abonnements: Abonnement[] = [
    {
      id: 1,
      numeroAbonnement: 'ABO-2024-001',
      nom: 'Dupont',
      prenom: 'Jean',
      type: 'Étudiant',
      duree: 'Annuel',
      dateDebut: '2024-01-01',
      dateFin: '2024-12-31',
      montant: 120,
      statut: 'Actif',
      moyenPaiement: 'Carte bancaire',
      responsable: 'Marie Martin',
      commentaires: 'Abonnement étudiant standard',
      derniereAction: 'Paiement reçu',
      dateDerniereAction: '2024-01-01'
    },
    {
      id: 2,
      numeroAbonnement: 'ABO-2024-002',
      nom: 'Bernard',
      prenom: 'Sophie',
      type: 'Personnel',
      duree: 'Mensuel',
      dateDebut: '2024-02-01',
      dateFin: '2024-02-29',
      montant: 45,
      statut: 'Actif',
      moyenPaiement: 'Virement',
      responsable: 'Pierre Leroy',
      commentaires: 'Abonnement personnel mensuel',
      derniereAction: 'Paiement reçu',
      dateDerniereAction: '2024-02-01'
    },
    {
      id: 3,
      numeroAbonnement: 'ABO-2024-003',
      nom: 'Martin',
      prenom: 'Pierre',
      type: 'Étudiant',
      duree: 'Semestriel',
      dateDebut: '2024-01-01',
      dateFin: '2024-06-30',
      montant: 80,
      statut: 'Expiré',
      moyenPaiement: 'Espèces',
      responsable: 'Jean Dupont',
      commentaires: 'Abonnement expiré, renouvellement en attente',
      derniereAction: 'Abonnement expiré',
      dateDerniereAction: '2024-06-30'
    },
    {
      id: 4,
      numeroAbonnement: 'ABO-2024-004',
      nom: 'Leroy',
      prenom: 'Marie',
      type: 'Personnel',
      duree: 'Annuel',
      dateDebut: '2024-01-01',
      dateFin: '2024-12-31',
      montant: 480,
      statut: 'Suspendu',
      moyenPaiement: 'Carte bancaire',
      responsable: 'Sophie Bernard',
      commentaires: 'Abonnement suspendu pour non-paiement',
      derniereAction: 'Abonnement suspendu',
      dateDerniereAction: '2024-03-15'
    },
    {
      id: 5,
      numeroAbonnement: 'ABO-2024-005',
      nom: 'Dubois',
      prenom: 'Marc',
      type: 'Étudiant',
      duree: 'Mensuel',
      dateDebut: '2024-03-01',
      dateFin: '2024-03-31',
      montant: 30,
      statut: 'En attente',
      moyenPaiement: 'Chèque',
      responsable: 'Marie Martin',
      commentaires: 'Paiement en attente de validation',
      derniereAction: 'Paiement en attente',
      dateDerniereAction: '2024-03-01'
    }
  ];

  const columns = [
    {
      title: 'Abonné',
      key: 'abonne',
      render: (_: any, record: Abonnement) => (
        <div className="flex items-center">
          <Avatar size={32} className="mr-3">
            {record.prenom.charAt(0)}{record.nom.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">{record.prenom} {record.nom}</div>
            <div className="text-sm text-gray-500">#{record.numeroAbonnement}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      key: 'type',
      render: (_: any, record: Abonnement) => {
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
      title: 'Durée',
      dataIndex: 'duree',
      key: 'duree',
      render: (duree: string) => (
        <div className="text-center">
          <div className="font-medium">{duree}</div>
        </div>
      ),
    },
    {
      title: 'Période',
      key: 'periode',
      render: (_: any, record: Abonnement) => (
        <div>
          <div className="text-sm">{new Date(record.dateDebut).toLocaleDateString('fr-FR')}</div>
          <div className="text-xs text-gray-500">au {new Date(record.dateFin).toLocaleDateString('fr-FR')}</div>
        </div>
      ),
    },
    {
      title: 'Montant',
      key: 'montant',
      render: (_: any, record: Abonnement) => (
        <div className="text-center">
          <div className="font-medium">{record.montant}€</div>
          <div className="text-xs text-gray-500">{record.moyenPaiement}</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Abonnement) => {
        const statusConfig = {
          'Actif': { color: 'green', icon: <CheckCircleOutlined /> },
          'Expiré': { color: 'red', icon: <ExclamationCircleOutlined /> },
          'Suspendu': { color: 'orange', icon: <ExclamationCircleOutlined /> },
          'En attente': { color: 'blue', icon: <ClockCircleOutlined /> },
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
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Abonnement) => (
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

  const filteredData = abonnements.filter(abonnement => {
    const matchesSearch = 
      abonnement.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      abonnement.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
      abonnement.numeroAbonnement.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesType = typeFilter === 'all' || abonnement.type === typeFilter;
    const matchesStatut = statutFilter === 'all' || abonnement.statut === statutFilter;
    
    return matchesSearch && matchesType && matchesStatut;
  });

  // Statistiques
  const totalAbonnements = abonnements.length;
  const actifs = abonnements.filter(a => a.statut === 'Actif').length;
  const expires = abonnements.filter(a => a.statut === 'Expiré').length;
  const suspendus = abonnements.filter(a => a.statut === 'Suspendu').length;
  const totalMontant = abonnements.reduce((sum, a) => sum + a.montant, 0);

  // Abonnements expirant bientôt
  const expirantBientot = abonnements.filter(abonnement => {
    const dateFin = new Date(abonnement.dateFin);
    const today = new Date();
    const daysUntilExpiration = Math.ceil((dateFin.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiration > 0 && daysUntilExpiration <= 30 && abonnement.statut === 'Actif';
  }).length;

  const handleView = (abonnement: Abonnement) => {
    setEditingAbonnement(abonnement);
    setIsModalVisible(true);
  };

  const handleEdit = (abonnement: Abonnement) => {
    setEditingAbonnement(abonnement);
    form.setFieldsValue({
      ...abonnement,
      dateDebut: new Date(abonnement.dateDebut),
      dateFin: new Date(abonnement.dateFin)
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingAbonnement(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingAbonnement) {
        message.success('Abonnement modifié avec succès !');
      } else {
        message.success('Abonnement ajouté avec succès !');
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
      {expirantBientot > 0 && (
        <Alert
          message={`${expirantBientot} abonnements expirant dans les 30 prochains jours`}
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
              title="Total Abonnements"
              value={totalAbonnements}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Abonnements Actifs"
              value={actifs}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Montant Total"
              value={totalMontant}
              prefix="€"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Abonnements Expirés"
              value={expires}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Abonnements</h2>
            <p className="text-gray-600 mt-1">Suivi des abonnements de transport des étudiants et du personnel</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouvel abonnement
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un abonnement..."
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
            <Option value="Actif">Actif</Option>
            <Option value="Expiré">Expiré</Option>
            <Option value="Suspendu">Suspendu</Option>
            <Option value="En attente">En attente</Option>
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
              `${range[0]}-${range[1]} sur ${total} abonnements`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un abonnement */}
      <Modal
        title={editingAbonnement ? 'Modifier l\'abonnement' : 'Nouvel abonnement'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'Actif',
            duree: 'Mensuel'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="numeroAbonnement"
                label="Numéro d'abonnement"
                rules={[{ required: true, message: 'Veuillez saisir le numéro' }]}
              >
                <Input placeholder="ABO-2024-001" />
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
                name="duree"
                label="Durée"
                rules={[{ required: true, message: 'Veuillez sélectionner la durée' }]}
              >
                <Select>
                  <Option value="Mensuel">Mensuel</Option>
                  <Option value="Semestriel">Semestriel</Option>
                  <Option value="Annuel">Annuel</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="montant"
                label="Montant (€)"
                rules={[{ required: true, message: 'Veuillez saisir le montant' }]}
              >
                <Input type="number" placeholder="30" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateDebut"
                label="Date de début"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateFin"
                label="Date de fin"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="moyenPaiement"
                label="Moyen de paiement"
                rules={[{ required: true, message: 'Veuillez sélectionner le moyen' }]}
              >
                <Select>
                  <Option value="Carte bancaire">Carte bancaire</Option>
                  <Option value="Virement">Virement</Option>
                  <Option value="Espèces">Espèces</Option>
                  <Option value="Chèque">Chèque</Option>
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
                  <Option value="Actif">Actif</Option>
                  <Option value="Expiré">Expiré</Option>
                  <Option value="Suspendu">Suspendu</Option>
                  <Option value="En attente">En attente</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="responsable"
                label="Responsable"
                rules={[{ required: true, message: 'Veuillez saisir le responsable' }]}
              >
                <Input placeholder="Nom du responsable" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaires"
                label="Commentaires"
              >
                <Input.TextArea rows={3} placeholder="Commentaires additionnels..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Abonnements;
