import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker, Modal, Form, InputNumber, Space, Statistic, Progress, Alert, Tooltip, message, Badge, Upload } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined, UploadOutlined, FileTextOutlined, UserOutlined, CheckCircleOutlined, ExclamationCircleOutlined, PrinterOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface ListeMinistereData {
  id: string;
  numero: string;
  type: string;
  anneeAcademique: string;
  filiere: string;
  niveau: string;
  nombreEtudiants: number;
  statut: string;
  dateCreation: string;
  dateValidation: string;
  responsable: string;
  commentaires: string;
  etudiants: Array<{
    matricule: string;
    nom: string;
    prenom: string;
    statut: string;
    moyenne: number;
  }>;
}

const ListesMinistere = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedListe, setSelectedListe] = useState<ListeMinistereData | null>(null);
  const [form] = Form.useForm();

  // Données simulées
  const listesData: ListeMinistereData[] = [
    {
      id: 'LST-001',
      numero: 'LST-2024-001',
      type: 'Liste d\'inscription',
      anneeAcademique: '2023-2024',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      nombreEtudiants: 45,
      statut: 'Validée',
      dateCreation: '2024-01-15',
      dateValidation: '2024-01-20',
      responsable: 'Dr. Martin Dupont',
      commentaires: 'Liste validée par le ministère',
      etudiants: [
        { matricule: 'ETU-001', nom: 'Dubois', prenom: 'Marie', statut: 'Inscrit', moyenne: 15.5 },
        { matricule: 'ETU-002', nom: 'Martin', prenom: 'Jean', statut: 'Inscrit', moyenne: 14.2 },
        { matricule: 'ETU-003', nom: 'Bernard', prenom: 'Sophie', statut: 'En attente', moyenne: 13.8 }
      ]
    },
    {
      id: 'LST-002',
      numero: 'LST-2024-002',
      type: 'Liste de diplômés',
      anneeAcademique: '2023-2024',
      filiere: 'Gestion',
      niveau: 'Master 2',
      nombreEtudiants: 32,
      statut: 'En cours',
      dateCreation: '2024-01-10',
      dateValidation: '',
      responsable: 'Dr. Claire Moreau',
      commentaires: 'En cours de validation',
      etudiants: [
        { matricule: 'ETU-004', nom: 'Petit', prenom: 'Pierre', statut: 'Diplômé', moyenne: 16.8 },
        { matricule: 'ETU-005', nom: 'Durand', prenom: 'Lucie', statut: 'Diplômé', moyenne: 17.2 },
        { matricule: 'ETU-006', nom: 'Leroy', prenom: 'Thomas', statut: 'En attente', moyenne: 15.9 }
      ]
    },
    {
      id: 'LST-003',
      numero: 'LST-2024-003',
      type: 'Liste de transfert',
      anneeAcademique: '2023-2024',
      filiere: 'Droit',
      niveau: 'Licence 2',
      nombreEtudiants: 28,
      statut: 'Brouillon',
      dateCreation: '2024-01-25',
      dateValidation: '',
      responsable: 'Dr. Antoine Rousseau',
      commentaires: 'Liste en préparation',
      etudiants: [
        { matricule: 'ETU-007', nom: 'Roux', prenom: 'Emma', statut: 'Transfert', moyenne: 14.5 },
        { matricule: 'ETU-008', nom: 'Simon', prenom: 'Lucas', statut: 'Transfert', moyenne: 13.9 },
        { matricule: 'ETU-009', nom: 'Michel', prenom: 'Camille', statut: 'En attente', moyenne: 15.1 }
      ]
    },
    {
      id: 'LST-004',
      numero: 'LST-2024-004',
      type: 'Liste d\'exclusion',
      anneeAcademique: '2023-2024',
      filiere: 'Langues',
      niveau: 'Licence 1',
      nombreEtudiants: 5,
      statut: 'Validée',
      dateCreation: '2024-01-30',
      dateValidation: '2024-02-05',
      responsable: 'Dr. Isabelle Blanc',
      commentaires: 'Exclusions pour absences répétées',
      etudiants: [
        { matricule: 'ETU-010', nom: 'Garcia', prenom: 'Ana', statut: 'Exclu', moyenne: 8.5 },
        { matricule: 'ETU-011', nom: 'Lopez', prenom: 'Carlos', statut: 'Exclu', moyenne: 7.2 },
        { matricule: 'ETU-012', nom: 'Rodriguez', prenom: 'Maria', statut: 'Exclu', moyenne: 9.1 }
      ]
    },
    {
      id: 'LST-005',
      numero: 'LST-2024-005',
      type: 'Liste de réinscription',
      anneeAcademique: '2024-2025',
      filiere: 'Physique',
      niveau: 'Licence 2',
      nombreEtudiants: 38,
      statut: 'En cours',
      dateCreation: '2024-02-01',
      dateValidation: '',
      responsable: 'Dr. Paul Dubois',
      commentaires: 'Liste de réinscription en cours',
      etudiants: [
        { matricule: 'ETU-013', nom: 'Lefevre', prenom: 'Julie', statut: 'Réinscrit', moyenne: 16.3 },
        { matricule: 'ETU-014', nom: 'Girard', prenom: 'Nicolas', statut: 'Réinscrit', moyenne: 15.7 },
        { matricule: 'ETU-015', nom: 'Bonnet', prenom: 'Sarah', statut: 'En attente', moyenne: 14.8 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validée': return 'success';
      case 'En cours': return 'processing';
      case 'Brouillon': return 'warning';
      case 'Rejetée': return 'error';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Liste d\'inscription': return 'blue';
      case 'Liste de diplômés': return 'green';
      case 'Liste de transfert': return 'purple';
      case 'Liste d\'exclusion': return 'red';
      case 'Liste de réinscription': return 'orange';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Numéro',
      dataIndex: 'numero',
      key: 'numero',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>
          {type}
        </Tag>
      )
    },
    {
      title: 'Filière',
      dataIndex: 'filiere',
      key: 'filiere',
    },
    {
      title: 'Niveau',
      dataIndex: 'niveau',
      key: 'niveau',
    },
    {
      title: 'Étudiants',
      dataIndex: 'nombreEtudiants',
      key: 'nombreEtudiants',
      render: (nombre: number) => (
        <span className="font-medium text-blue-600">
          {nombre}
        </span>
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
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Date création',
      dataIndex: 'dateCreation',
      key: 'dateCreation',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: ListeMinistereData) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Télécharger">
            <Button type="text" icon={<DownloadOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Imprimer">
            <Button type="text" icon={<PrinterOutlined />} size="small" />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleViewDetails = (liste: ListeMinistereData) => {
    setSelectedListe(liste);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Liste créée:', values);
      message.success('Liste créée avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création de la liste');
    }
  };

  const totalListes = listesData.length;
  const listesValidees = listesData.filter(l => l.statut === 'Validée').length;
  const totalEtudiants = listesData.reduce((sum, liste) => sum + liste.nombreEtudiants, 0);
  const listesEnCours = listesData.filter(l => l.statut === 'En cours').length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des listes"
                value={totalListes}
                valueStyle={{ color: '#1890ff' }}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Listes validées"
                value={listesValidees}
                suffix={`/${totalListes}`}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des étudiants"
                value={totalEtudiants}
                valueStyle={{ color: '#722ed1' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En cours"
                value={listesEnCours}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ExclamationCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Filtres et actions */}
        <Card>
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Input
                placeholder="Rechercher une liste..."
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4}>
              <Select placeholder="Type" style={{ width: '100%' }}>
                <Option value="all">Tous les types</Option>
                <Option value="inscription">Liste d'inscription</Option>
                <Option value="diplomes">Liste de diplômés</Option>
                <Option value="transfert">Liste de transfert</Option>
                <Option value="exclusion">Liste d'exclusion</Option>
                <Option value="reinscription">Liste de réinscription</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Statut" style={{ width: '100%' }}>
                <Option value="all">Tous les statuts</Option>
                <Option value="validee">Validée</Option>
                <Option value="en_cours">En cours</Option>
                <Option value="brouillon">Brouillon</Option>
                <Option value="rejetee">Rejetée</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} placeholder={['Date début', 'Date fin']} />
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouvelle liste
                </Button>
                <Button icon={<UploadOutlined />}>
                  Importer
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des listes */}
        <Card title="Listes pour le ministère">
          <Table
            dataSource={listesData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: listesData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} listes`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Listes en attente de validation"
          description="3 listes sont en attente de validation par le ministère. Veuillez les traiter rapidement."
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
        title="Nouvelle liste"
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
                name="type"
                label="Type de liste"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select placeholder="Sélectionner le type">
                  <Option value="Liste d'inscription">Liste d'inscription</Option>
                  <Option value="Liste de diplômés">Liste de diplômés</Option>
                  <Option value="Liste de transfert">Liste de transfert</Option>
                  <Option value="Liste d'exclusion">Liste d'exclusion</Option>
                  <Option value="Liste de réinscription">Liste de réinscription</Option>
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
                name="responsable"
                label="Responsable"
                rules={[{ required: true, message: 'Veuillez saisir le responsable' }]}
              >
                <Input placeholder="Nom du responsable" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="statut"
                label="Statut initial"
                rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
              >
                <Select placeholder="Sélectionner le statut">
                  <Option value="Brouillon">Brouillon</Option>
                  <Option value="En cours">En cours</Option>
                  <Option value="Validée">Validée</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaires"
                label="Commentaires"
              >
                <TextArea rows={3} placeholder="Commentaires sur la liste..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer la liste
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails de la liste"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedListe && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Numéro:</strong> {selectedListe.numero}</p>
                  <p><strong>Type:</strong> 
                    <Tag color={getTypeColor(selectedListe.type)} className="ml-2">
                      {selectedListe.type}
                    </Tag>
                  </p>
                  <p><strong>Filière:</strong> {selectedListe.filiere}</p>
                  <p><strong>Niveau:</strong> {selectedListe.niveau}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Statut:</strong> 
                    <Tag color={getStatusColor(selectedListe.statut)} className="ml-2">
                      {selectedListe.statut}
                    </Tag>
                  </p>
                  <p><strong>Responsable:</strong> {selectedListe.responsable}</p>
                  <p><strong>Date création:</strong> {new Date(selectedListe.dateCreation).toLocaleDateString('fr-FR')}</p>
                  {selectedListe.dateValidation && (
                    <p><strong>Date validation:</strong> {new Date(selectedListe.dateValidation).toLocaleDateString('fr-FR')}</p>
                  )}
                </Col>
              </Row>
              <div className="mt-4">
                <p><strong>Commentaires:</strong></p>
                <p className="text-gray-600">{selectedListe.commentaires}</p>
              </div>
            </Card>

            {/* Étudiants */}
            <Card title="Étudiants inclus" size="small">
              <Table
                dataSource={selectedListe.etudiants}
                columns={[
                  { title: 'Matricule', dataIndex: 'matricule', key: 'matricule' },
                  { title: 'Nom', dataIndex: 'nom', key: 'nom' },
                  { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
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
                    title: 'Moyenne', 
                    dataIndex: 'moyenne', 
                    key: 'moyenne',
                    render: (moyenne: number) => (
                      <span className="font-medium text-green-600">
                        {moyenne}/20
                      </span>
                    )
                  }
                ]}
                pagination={false}
                size="small"
              />
            </Card>

            {/* Actions rapides */}
            <Card title="Actions rapides" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="primary" block icon={<DownloadOutlined />}>
                  Télécharger la liste
                </Button>
                <Button block icon={<PrinterOutlined />}>
                  Imprimer la liste
                </Button>
                <Button block icon={<UploadOutlined />}>
                  Envoyer au ministère
                </Button>
                <Button block icon={<EditOutlined />}>
                  Modifier la liste
                </Button>
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListesMinistere;
