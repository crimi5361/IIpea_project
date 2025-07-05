import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge, Avatar, Timeline } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, MedicineBoxOutlined, UserOutlined, CalendarOutlined, FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, HeartOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface DossierMedical {
  id: number;
  numeroDossier: string;
  nom: string;
  prenom: string;
  type: string;
  dateCreation: string;
  derniereVisite: string;
  statut: string;
  medecin: string;
  diagnostic: string;
  traitement: string;
  allergie: string;
  groupeSanguin: string;
  urgence: string;
  commentaires: string;
  prochaineVisite: string;
}

const DossiersMedicals = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDossier, setEditingDossier] = useState<DossierMedical | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les dossiers médicaux
  const dossiers: DossierMedical[] = [
    {
      id: 1,
      numeroDossier: 'DM-2024-001',
      nom: 'Dupont',
      prenom: 'Jean',
      type: 'Étudiant',
      dateCreation: '2024-01-01',
      derniereVisite: '2024-03-15',
      statut: 'Actif',
      medecin: 'Dr. Martin',
      diagnostic: 'Rhume saisonnier',
      traitement: 'Paracétamol, repos',
      allergie: 'Aucune',
      groupeSanguin: 'A+',
      urgence: 'Non',
      commentaires: 'Étudiant en bonne santé générale',
      prochaineVisite: '2024-06-15'
    },
    {
      id: 2,
      numeroDossier: 'DM-2024-002',
      nom: 'Bernard',
      prenom: 'Sophie',
      type: 'Personnel',
      dateCreation: '2024-01-01',
      derniereVisite: '2024-03-10',
      statut: 'Suivi',
      medecin: 'Dr. Leroy',
      diagnostic: 'Hypertension artérielle',
      traitement: 'Médicaments antihypertenseurs',
      allergie: 'Pénicilline',
      groupeSanguin: 'O+',
      urgence: 'Oui',
      commentaires: 'Surveillance tensionnelle régulière',
      prochaineVisite: '2024-04-10'
    },
    {
      id: 3,
      numeroDossier: 'DM-2024-003',
      nom: 'Martin',
      prenom: 'Pierre',
      type: 'Étudiant',
      dateCreation: '2024-01-01',
      derniereVisite: '2024-02-20',
      statut: 'Archivé',
      medecin: 'Dr. Dubois',
      diagnostic: 'Fracture bras droit',
      traitement: 'Plâtre, rééducation',
      allergie: 'Aucune',
      groupeSanguin: 'B+',
      urgence: 'Non',
      commentaires: 'Accident sportif, guérison complète',
      prochaineVisite: '2024-05-20'
    },
    {
      id: 4,
      numeroDossier: 'DM-2024-004',
      nom: 'Leroy',
      prenom: 'Marie',
      type: 'Personnel',
      dateCreation: '2024-01-01',
      derniereVisite: '2024-03-20',
      statut: 'Actif',
      medecin: 'Dr. Bernard',
      diagnostic: 'Diabète type 2',
      traitement: 'Insuline, régime alimentaire',
      allergie: 'Aucune',
      groupeSanguin: 'AB+',
      urgence: 'Oui',
      commentaires: 'Surveillance glycémique quotidienne',
      prochaineVisite: '2024-04-20'
    },
    {
      id: 5,
      numeroDossier: 'DM-2024-005',
      nom: 'Dubois',
      prenom: 'Marc',
      type: 'Étudiant',
      dateCreation: '2024-01-01',
      derniereVisite: '2024-03-25',
      statut: 'Actif',
      medecin: 'Dr. Martin',
      diagnostic: 'Asthme léger',
      traitement: 'Ventoline si nécessaire',
      allergie: 'Poussière, pollen',
      groupeSanguin: 'A-',
      urgence: 'Non',
      commentaires: 'Éviter les facteurs déclencheurs',
      prochaineVisite: '2024-06-25'
    }
  ];

  const columns = [
    {
      title: 'Patient',
      key: 'patient',
      render: (_: any, record: DossierMedical) => (
        <div className="flex items-center">
          <Avatar size={32} className="mr-3">
            {record.prenom.charAt(0)}{record.nom.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">{record.prenom} {record.nom}</div>
            <div className="text-sm text-gray-500">#{record.numeroDossier}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      key: 'type',
      render: (_: any, record: DossierMedical) => {
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
      title: 'Diagnostic',
      key: 'diagnostic',
      render: (_: any, record: DossierMedical) => (
        <div>
          <div className="font-medium">{record.diagnostic}</div>
          <div className="text-xs text-gray-500">Dr. {record.medecin.split(' ')[1]}</div>
        </div>
      ),
    },
    {
      title: 'Dernière visite',
      key: 'derniereVisite',
      render: (_: any, record: DossierMedical) => (
        <div>
          <div className="text-sm">{new Date(record.derniereVisite).toLocaleDateString('fr-FR')}</div>
          <div className="text-xs text-gray-500">Prochaine: {new Date(record.prochaineVisite).toLocaleDateString('fr-FR')}</div>
        </div>
      ),
    },
    {
      title: 'Urgence',
      key: 'urgence',
      render: (_: any, record: DossierMedical) => {
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
      render: (_: any, record: DossierMedical) => {
        const statusConfig = {
          'Actif': { color: 'green', icon: <CheckCircleOutlined /> },
          'Suivi': { color: 'blue', icon: <ClockCircleOutlined /> },
          'Archivé': { color: 'gray', icon: <FileTextOutlined /> },
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
      title: 'Groupe sanguin',
      dataIndex: 'groupeSanguin',
      key: 'groupeSanguin',
      render: (groupe: string) => (
        <Tag color="red">
          <HeartOutlined /> {groupe}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: DossierMedical) => (
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

  const filteredData = dossiers.filter(dossier => {
    const matchesSearch = 
      dossier.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      dossier.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
      dossier.numeroDossier.toLowerCase().includes(searchText.toLowerCase()) ||
      dossier.diagnostic.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesType = typeFilter === 'all' || dossier.type === typeFilter;
    const matchesStatut = statutFilter === 'all' || dossier.statut === statutFilter;
    
    return matchesSearch && matchesType && matchesStatut;
  });

  // Statistiques
  const totalDossiers = dossiers.length;
  const actifs = dossiers.filter(d => d.statut === 'Actif').length;
  const suivis = dossiers.filter(d => d.statut === 'Suivi').length;
  const urgences = dossiers.filter(d => d.urgence === 'Oui').length;

  // Visites à venir
  const visitesAVenir = dossiers.filter(dossier => {
    const prochaineVisite = new Date(dossier.prochaineVisite);
    const today = new Date();
    const daysUntilVisit = Math.ceil((prochaineVisite.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilVisit > 0 && daysUntilVisit <= 30;
  }).length;

  const handleView = (dossier: DossierMedical) => {
    setEditingDossier(dossier);
    setIsModalVisible(true);
  };

  const handleEdit = (dossier: DossierMedical) => {
    setEditingDossier(dossier);
    form.setFieldsValue({
      ...dossier,
      dateCreation: new Date(dossier.dateCreation),
      derniereVisite: new Date(dossier.derniereVisite),
      prochaineVisite: new Date(dossier.prochaineVisite)
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingDossier(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingDossier) {
        message.success('Dossier médical modifié avec succès !');
      } else {
        message.success('Dossier médical ajouté avec succès !');
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
          message={`${urgences} dossiers nécessitent une attention urgente`}
          type="error"
          showIcon
          icon={<ExclamationCircleOutlined />}
          className="mb-4"
        />
      )}
      
      {visitesAVenir > 0 && (
        <Alert
          message={`${visitesAVenir} visites de suivi prévues dans les 30 prochains jours`}
          type="warning"
          showIcon
          icon={<ClockCircleOutlined />}
          className="mb-4"
        />
      )}
      
      {/* Statistiques */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Dossiers"
              value={totalDossiers}
              prefix={<MedicineBoxOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Dossiers Actifs"
              value={actifs}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En Suivi"
              value={suivis}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Cas d'Urgence"
              value={urgences}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Dossiers Médicaux</h2>
            <p className="text-gray-600 mt-1">Suivi médical des étudiants et du personnel</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouveau dossier
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un dossier médical..."
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
            <Option value="Suivi">Suivi</Option>
            <Option value="Archivé">Archivé</Option>
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
              `${range[0]}-${range[1]} sur ${total} dossiers`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un dossier */}
      <Modal
        title={editingDossier ? 'Modifier le dossier médical' : 'Nouveau dossier médical'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'Actif',
            type: 'Étudiant',
            urgence: 'Non'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="numeroDossier"
                label="Numéro de dossier"
                rules={[{ required: true, message: 'Veuillez saisir le numéro' }]}
              >
                <Input placeholder="DM-2024-001" />
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
                name="medecin"
                label="Médecin traitant"
                rules={[{ required: true, message: 'Veuillez saisir le médecin' }]}
              >
                <Input placeholder="Dr. Nom Prénom" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="diagnostic"
                label="Diagnostic"
                rules={[{ required: true, message: 'Veuillez saisir le diagnostic' }]}
              >
                <Input placeholder="Diagnostic principal" />
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
                name="allergie"
                label="Allergies"
                rules={[{ required: true, message: 'Veuillez saisir les allergies' }]}
              >
                <Input placeholder="Aucune ou liste des allergies" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="groupeSanguin"
                label="Groupe sanguin"
                rules={[{ required: true, message: 'Veuillez saisir le groupe sanguin' }]}
              >
                <Select>
                  <Option value="A+">A+</Option>
                  <Option value="A-">A-</Option>
                  <Option value="B+">B+</Option>
                  <Option value="B-">B-</Option>
                  <Option value="AB+">AB+</Option>
                  <Option value="AB-">AB-</Option>
                  <Option value="O+">O+</Option>
                  <Option value="O-">O-</Option>
                </Select>
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
                  <Option value="Actif">Actif</Option>
                  <Option value="Suivi">Suivi</Option>
                  <Option value="Archivé">Archivé</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="derniereVisite"
                label="Dernière visite"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="prochaineVisite"
                label="Prochaine visite"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaires"
                label="Commentaires médicaux"
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

export default DossiersMedicals;
