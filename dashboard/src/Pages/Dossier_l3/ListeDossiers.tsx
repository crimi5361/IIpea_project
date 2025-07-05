import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, FileTextOutlined, UserOutlined, CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, FolderOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface DossierL3 {
  id: number;
  numeroDossier: string;
  nom: string;
  prenom: string;
  filiere: string;
  dateCreation: string;
  dateValidation: string;
  statut: string;
  responsable: string;
  documents: string[];
  commentaires: string;
  priorite: string;
  derniereAction: string;
  dateDerniereAction: string;
  etape: string;
  progression: number;
}

const ListeDossiers = () => {
  const [searchText, setSearchText] = useState('');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [filiereFilter, setFiliereFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDossier, setEditingDossier] = useState<DossierL3 | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les dossiers L3
  const dossiers: DossierL3[] = [
    {
      id: 1,
      numeroDossier: 'L3-2024-001',
      nom: 'Dupont',
      prenom: 'Jean',
      filiere: 'Informatique',
      dateCreation: '2024-01-15',
      dateValidation: '2024-06-30',
      statut: 'En cours',
      responsable: 'Dr. Martin',
      documents: ['CV', 'Lettre de motivation', 'Relevés de notes'],
      commentaires: 'Dossier complet, en attente de validation finale',
      priorite: 'Normale',
      derniereAction: 'Documents vérifiés',
      dateDerniereAction: '2024-03-20',
      etape: 'Validation finale',
      progression: 85
    },
    {
      id: 2,
      numeroDossier: 'L3-2024-002',
      nom: 'Bernard',
      prenom: 'Sophie',
      filiere: 'Gestion',
      dateCreation: '2024-01-20',
      dateValidation: '2024-06-30',
      statut: 'Validé',
      responsable: 'Dr. Leroy',
      documents: ['CV', 'Lettre de motivation', 'Relevés de notes', 'Certificat de stage'],
      commentaires: 'Dossier validé avec succès',
      priorite: 'Haute',
      derniereAction: 'Validation approuvée',
      dateDerniereAction: '2024-03-15',
      etape: 'Terminé',
      progression: 100
    },
    {
      id: 3,
      numeroDossier: 'L3-2024-003',
      nom: 'Martin',
      prenom: 'Pierre',
      filiere: 'Langues',
      dateCreation: '2024-02-01',
      dateValidation: '2024-06-30',
      statut: 'En attente',
      responsable: 'Dr. Dubois',
      documents: ['CV', 'Lettre de motivation'],
      commentaires: 'Documents incomplets, en attente de complément',
      priorite: 'Basse',
      derniereAction: 'Demande de documents supplémentaires',
      dateDerniereAction: '2024-03-10',
      etape: 'Vérification documents',
      progression: 45
    },
    {
      id: 4,
      numeroDossier: 'L3-2024-004',
      nom: 'Leroy',
      prenom: 'Marie',
      filiere: 'Droit',
      dateCreation: '2024-02-10',
      dateValidation: '2024-06-30',
      statut: 'Rejeté',
      responsable: 'Dr. Bernard',
      documents: ['CV', 'Lettre de motivation', 'Relevés de notes'],
      commentaires: 'Dossier rejeté pour documents insuffisants',
      priorite: 'Normale',
      derniereAction: 'Dossier rejeté',
      dateDerniereAction: '2024-03-05',
      etape: 'Rejeté',
      progression: 0
    },
    {
      id: 5,
      numeroDossier: 'L3-2024-005',
      nom: 'Dubois',
      prenom: 'Marc',
      filiere: 'Physique',
      dateCreation: '2024-02-15',
      dateValidation: '2024-06-30',
      statut: 'En cours',
      responsable: 'Dr. Moreau',
      documents: ['CV', 'Lettre de motivation', 'Relevés de notes', 'Projet de recherche'],
      commentaires: 'Dossier en cours d\'évaluation',
      priorite: 'Haute',
      derniereAction: 'Évaluation en cours',
      dateDerniereAction: '2024-03-25',
      etape: 'Évaluation',
      progression: 60
    }
  ];

  const columns = [
    {
      title: 'Candidat',
      key: 'candidat',
      render: (_: any, record: DossierL3) => (
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
      title: 'Filière',
      key: 'filiere',
      render: (_: any, record: DossierL3) => {
        const filiereConfig = {
          'Informatique': { color: 'blue' },
          'Gestion': { color: 'green' },
          'Langues': { color: 'orange' },
          'Droit': { color: 'purple' },
          'Physique': { color: 'cyan' },
        };
        const config = filiereConfig[record.filiere as keyof typeof filiereConfig];
        return (
          <Tag color={config?.color}>
            {record.filiere}
          </Tag>
        );
      },
    },
    {
      title: 'Progression',
      key: 'progression',
      render: (_: any, record: DossierL3) => (
        <div>
          <div className="font-medium">{record.progression}%</div>
          <Progress 
            percent={record.progression} 
            size="small" 
            showInfo={false}
            strokeColor={record.progression === 100 ? '#52c41a' : record.progression > 50 ? '#faad14' : '#ff4d4f'}
          />
          <div className="text-xs text-gray-500">{record.etape}</div>
        </div>
      ),
    },
    {
      title: 'Priorité',
      key: 'priorite',
      render: (_: any, record: DossierL3) => {
        const prioriteConfig = {
          'Haute': { color: 'red' },
          'Normale': { color: 'blue' },
          'Basse': { color: 'green' },
        };
        const config = prioriteConfig[record.priorite as keyof typeof prioriteConfig];
        return (
          <Tag color={config?.color}>
            {record.priorite}
          </Tag>
        );
      },
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: DossierL3) => {
        const statusConfig = {
          'Validé': { color: 'green', icon: <CheckCircleOutlined /> },
          'En cours': { color: 'blue', icon: <ClockCircleOutlined /> },
          'En attente': { color: 'orange', icon: <ClockCircleOutlined /> },
          'Rejeté': { color: 'red', icon: <ExclamationCircleOutlined /> },
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
      title: 'Dernière action',
      key: 'derniereAction',
      render: (_: any, record: DossierL3) => (
        <div>
          <div className="text-sm">{record.derniereAction}</div>
          <div className="text-xs text-gray-500">{new Date(record.dateDerniereAction).toLocaleDateString('fr-FR')}</div>
        </div>
      ),
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: DossierL3) => (
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
      dossier.numeroDossier.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatut = statutFilter === 'all' || dossier.statut === statutFilter;
    const matchesFiliere = filiereFilter === 'all' || dossier.filiere === filiereFilter;
    
    return matchesSearch && matchesStatut && matchesFiliere;
  });

  // Statistiques
  const totalDossiers = dossiers.length;
  const valides = dossiers.filter(d => d.statut === 'Validé').length;
  const enCours = dossiers.filter(d => d.statut === 'En cours').length;
  const enAttente = dossiers.filter(d => d.statut === 'En attente').length;

  // Dossiers urgents (haute priorité)
  const urgents = dossiers.filter(d => d.priorite === 'Haute').length;

  const handleView = (dossier: DossierL3) => {
    setEditingDossier(dossier);
    setIsModalVisible(true);
  };

  const handleEdit = (dossier: DossierL3) => {
    setEditingDossier(dossier);
    form.setFieldsValue({
      ...dossier,
      dateCreation: new Date(dossier.dateCreation),
      dateValidation: new Date(dossier.dateValidation),
      documents: dossier.documents
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
        message.success('Dossier modifié avec succès !');
      } else {
        message.success('Dossier ajouté avec succès !');
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
      {urgents > 0 && (
        <Alert
          message={`${urgents} dossiers en priorité haute nécessitent une attention immédiate`}
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
              title="Total Dossiers"
              value={totalDossiers}
              prefix={<FolderOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Dossiers Validés"
              value={valides}
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
              title="En Attente"
              value={enAttente}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Dossiers L3</h2>
            <p className="text-gray-600 mt-1">Suivi des candidatures pour la Licence 3</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouveau dossier
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un dossier..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
          <Select
            placeholder="Statut"
            value={statutFilter}
            onChange={setStatutFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Validé">Validé</Option>
            <Option value="En cours">En cours</Option>
            <Option value="En attente">En attente</Option>
            <Option value="Rejeté">Rejeté</Option>
          </Select>
          <Select
            placeholder="Filière"
            value={filiereFilter}
            onChange={setFiliereFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Toutes les filières</Option>
            <Option value="Informatique">Informatique</Option>
            <Option value="Gestion">Gestion</Option>
            <Option value="Langues">Langues</Option>
            <Option value="Droit">Droit</Option>
            <Option value="Physique">Physique</Option>
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
        title={editingDossier ? 'Modifier le dossier' : 'Nouveau dossier'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'En cours',
            priorite: 'Normale',
            progression: 0
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="numeroDossier"
                label="Numéro de dossier"
                rules={[{ required: true, message: 'Veuillez saisir le numéro' }]}
              >
                <Input placeholder="L3-2024-001" />
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
                name="filiere"
                label="Filière"
                rules={[{ required: true, message: 'Veuillez sélectionner la filière' }]}
              >
                <Select>
                  <Option value="Informatique">Informatique</Option>
                  <Option value="Gestion">Gestion</Option>
                  <Option value="Langues">Langues</Option>
                  <Option value="Droit">Droit</Option>
                  <Option value="Physique">Physique</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="responsable"
                label="Responsable"
                rules={[{ required: true, message: 'Veuillez saisir le responsable' }]}
              >
                <Input placeholder="Dr. Nom Prénom" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priorite"
                label="Priorité"
                rules={[{ required: true, message: 'Veuillez sélectionner la priorité' }]}
              >
                <Select>
                  <Option value="Haute">Haute</Option>
                  <Option value="Normale">Normale</Option>
                  <Option value="Basse">Basse</Option>
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
                  <Option value="Validé">Validé</Option>
                  <Option value="En cours">En cours</Option>
                  <Option value="En attente">En attente</Option>
                  <Option value="Rejeté">Rejeté</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="progression"
                label="Progression (%)"
                rules={[{ required: true, message: 'Veuillez saisir la progression' }]}
              >
                <Input type="number" min={0} max={100} placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateCreation"
                label="Date de création"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateValidation"
                label="Date de validation"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="documents"
                label="Documents requis"
                rules={[{ required: true, message: 'Veuillez sélectionner les documents' }]}
              >
                <Select mode="tags" placeholder="Ajouter des documents">
                  <Option value="CV">CV</Option>
                  <Option value="Lettre de motivation">Lettre de motivation</Option>
                  <Option value="Relevés de notes">Relevés de notes</Option>
                  <Option value="Certificat de stage">Certificat de stage</Option>
                  <Option value="Projet de recherche">Projet de recherche</Option>
                  <Option value="Recommandations">Recommandations</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="derniereAction"
                label="Dernière action"
                rules={[{ required: true, message: 'Veuillez saisir la dernière action' }]}
              >
                <Input placeholder="Description de la dernière action effectuée" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="etape"
                label="Étape actuelle"
                rules={[{ required: true, message: 'Veuillez saisir l\'étape' }]}
              >
                <Input placeholder="Étape actuelle du traitement" />
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

export default ListeDossiers;
