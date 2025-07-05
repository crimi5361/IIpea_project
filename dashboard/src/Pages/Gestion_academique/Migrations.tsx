import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker, Modal, Form, Steps, Space, Statistic, Progress, Alert, Tooltip, message, Badge, Timeline, Descriptions, Divider, Upload, Checkbox } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined, EyeOutlined, EditOutlined, SendOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined, FileTextOutlined, UserOutlined, AuditOutlined, PrinterOutlined, DownloadOutlined, SwapOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface MigrationData {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  filiereOrigine: string;
  filiereDestination: string;
  niveauOrigine: string;
  niveauDestination: string;
  typeMigration: string;
  statut: string;
  dateDemande: string;
  dateValidation: string;
  validateur: string;
  motif: string;
  commentaires: string;
  documents: Array<{
    nom: string;
    statut: string;
    dateUpload: string;
  }>;
  etapes: Array<{
    etape: string;
    statut: string;
    date: string;
    commentaire: string;
  }>;
}

const Migrations = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedMigration, setSelectedMigration] = useState<MigrationData | null>(null);
  const [form] = Form.useForm();

  // Données simulées
  const migrationsData: MigrationData[] = [
    {
      id: 'MIG-001',
      matricule: 'ETU-2024-001',
      nom: 'Dubois',
      prenom: 'Marie',
      filiereOrigine: 'Informatique',
      filiereDestination: 'Gestion',
      niveauOrigine: 'Licence 2',
      niveauDestination: 'Licence 2',
      typeMigration: 'Changement de filière',
      statut: 'En cours',
      dateDemande: '2024-01-15',
      dateValidation: '',
      validateur: 'Dr. Martin Dupont',
      motif: 'Intérêt pour la gestion d\'entreprise',
      commentaires: 'Étudiante motivée avec de bons résultats',
      documents: [
        { nom: 'Lettre de motivation', statut: 'Validé', dateUpload: '2024-01-15' },
        { nom: 'Relevé de notes', statut: 'Validé', dateUpload: '2024-01-15' },
        { nom: 'Avis du responsable', statut: 'En attente', dateUpload: '2024-01-16' },
        { nom: 'Certificat médical', statut: 'Validé', dateUpload: '2024-01-17' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-15', commentaire: 'Demande soumise' },
        { etape: 'Vérification documents', statut: 'En cours', date: '2024-01-16', commentaire: 'En cours de vérification' },
        { etape: 'Validation département', statut: 'En attente', date: '', commentaire: '' },
        { etape: 'Validation finale', statut: 'En attente', date: '', commentaire: '' }
      ]
    },
    {
      id: 'MIG-002',
      matricule: 'ETU-2024-002',
      nom: 'Martin',
      prenom: 'Jean',
      filiereOrigine: 'Gestion',
      filiereDestination: 'Droit',
      niveauOrigine: 'Licence 1',
      niveauDestination: 'Licence 1',
      typeMigration: 'Changement de filière',
      statut: 'Validé',
      dateDemande: '2024-01-10',
      dateValidation: '2024-01-20',
      validateur: 'Dr. Claire Moreau',
      motif: 'Passion pour le droit',
      commentaires: 'Migration approuvée avec conditions',
      documents: [
        { nom: 'Lettre de motivation', statut: 'Validé', dateUpload: '2024-01-10' },
        { nom: 'Relevé de notes', statut: 'Validé', dateUpload: '2024-01-10' },
        { nom: 'Avis du responsable', statut: 'Validé', dateUpload: '2024-01-12' },
        { nom: 'Certificat médical', statut: 'Validé', dateUpload: '2024-01-11' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-10', commentaire: 'Demande soumise' },
        { etape: 'Vérification documents', statut: 'Terminé', date: '2024-01-12', commentaire: 'Documents vérifiés' },
        { etape: 'Validation département', statut: 'Terminé', date: '2024-01-18', commentaire: 'Validation OK' },
        { etape: 'Validation finale', statut: 'Terminé', date: '2024-01-20', commentaire: 'Approuvé' }
      ]
    },
    {
      id: 'MIG-003',
      matricule: 'ETU-2024-003',
      nom: 'Bernard',
      prenom: 'Sophie',
      filiereOrigine: 'Droit',
      filiereDestination: 'Langues',
      niveauOrigine: 'Licence 2',
      niveauDestination: 'Licence 2',
      typeMigration: 'Changement de filière',
      statut: 'Rejeté',
      dateDemande: '2024-01-08',
      dateValidation: '2024-01-14',
      validateur: 'Dr. Antoine Rousseau',
      motif: 'Intérêt pour les langues étrangères',
      commentaires: 'Rejeté pour résultats insuffisants',
      documents: [
        { nom: 'Lettre de motivation', statut: 'Validé', dateUpload: '2024-01-08' },
        { nom: 'Relevé de notes', statut: 'Rejeté', dateUpload: '2024-01-08' },
        { nom: 'Avis du responsable', statut: 'Rejeté', dateUpload: '2024-01-09' },
        { nom: 'Certificat médical', statut: 'Validé', dateUpload: '2024-01-08' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-08', commentaire: 'Demande soumise' },
        { etape: 'Vérification documents', statut: 'Terminé', date: '2024-01-09', commentaire: 'Documents incomplets' },
        { etape: 'Validation département', statut: 'Rejeté', date: '2024-01-14', commentaire: 'Rejeté pour résultats insuffisants' },
        { etape: 'Validation finale', statut: 'Rejeté', date: '2024-01-14', commentaire: 'Rejeté' }
      ]
    },
    {
      id: 'MIG-004',
      matricule: 'ETU-2024-004',
      nom: 'Petit',
      prenom: 'Pierre',
      filiereOrigine: 'Langues',
      filiereDestination: 'Langues',
      niveauOrigine: 'Licence 1',
      niveauDestination: 'Licence 2',
      typeMigration: 'Passage de niveau',
      statut: 'En attente',
      dateDemande: '2024-01-20',
      dateValidation: '',
      validateur: '',
      motif: 'Passage normal au niveau supérieur',
      commentaires: 'En attente d\'assignation',
      documents: [
        { nom: 'Relevé de notes', statut: 'En attente', dateUpload: '2024-01-20' },
        { nom: 'Avis du responsable', statut: 'En attente', dateUpload: '2024-01-20' },
        { nom: 'Certificat médical', statut: 'En attente', dateUpload: '2024-01-20' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-20', commentaire: 'Demande soumise' },
        { etape: 'Vérification documents', statut: 'En attente', date: '', commentaire: 'En attente d\'assignation' },
        { etape: 'Validation département', statut: 'En attente', date: '', commentaire: '' },
        { etape: 'Validation finale', statut: 'En attente', date: '', commentaire: '' }
      ]
    },
    {
      id: 'MIG-005',
      matricule: 'ETU-2024-005',
      nom: 'Durand',
      prenom: 'Lucie',
      filiereOrigine: 'Physique',
      filiereDestination: 'Informatique',
      niveauOrigine: 'Master 1',
      niveauDestination: 'Master 1',
      typeMigration: 'Changement de filière',
      statut: 'Validé',
      dateDemande: '2024-01-05',
      dateValidation: '2024-01-25',
      validateur: 'Dr. Paul Dubois',
      motif: 'Intérêt pour l\'informatique',
      commentaires: 'Migration approuvée avec excellent dossier',
      documents: [
        { nom: 'Lettre de motivation', statut: 'Validé', dateUpload: '2024-01-05' },
        { nom: 'Relevé de notes', statut: 'Validé', dateUpload: '2024-01-05' },
        { nom: 'Avis du responsable', statut: 'Validé', dateUpload: '2024-01-10' },
        { nom: 'Certificat médical', statut: 'Validé', dateUpload: '2024-01-06' },
        { nom: 'Portfolio projets', statut: 'Validé', dateUpload: '2024-01-07' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-05', commentaire: 'Demande soumise' },
        { etape: 'Vérification documents', statut: 'Terminé', date: '2024-01-10', commentaire: 'Documents vérifiés' },
        { etape: 'Validation département', statut: 'Terminé', date: '2024-01-20', commentaire: 'Validation OK' },
        { etape: 'Validation finale', statut: 'Terminé', date: '2024-01-25', commentaire: 'Approuvé' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validé': return 'success';
      case 'En cours': return 'processing';
      case 'En attente': return 'warning';
      case 'Rejeté': return 'error';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Changement de filière': return 'blue';
      case 'Passage de niveau': return 'green';
      case 'Transfert externe': return 'purple';
      case 'Retour d\'études': return 'orange';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Matricule',
      dataIndex: 'matricule',
      key: 'matricule',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Étudiant',
      key: 'etudiant',
      render: (record: MigrationData) => (
        <div>
          <div className="font-medium">{record.nom} {record.prenom}</div>
          <div className="text-sm text-gray-500">{record.filiereOrigine} → {record.filiereDestination}</div>
        </div>
      )
    },
    {
      title: 'Migration',
      key: 'migration',
      render: (record: MigrationData) => (
        <div>
          <div className="text-sm">
            <ArrowRightOutlined className="text-gray-400" />
            <span className="ml-1">{record.niveauOrigine} → {record.niveauDestination}</span>
          </div>
                     <Tag color={getTypeColor(record.typeMigration)}>
             {record.typeMigration}
           </Tag>
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
      title: 'Date demande',
      dataIndex: 'dateDemande',
      key: 'dateDemande',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      title: 'Validateur',
      dataIndex: 'validateur',
      key: 'validateur',
      render: (validateur: string) => validateur || 'Non assigné'
    },
    {
      title: 'Progression',
      key: 'progression',
      render: (record: MigrationData) => {
        const completedSteps = record.etapes.filter(etape => etape.statut === 'Terminé').length;
        const totalSteps = record.etapes.length;
        const percentage = Math.round((completedSteps / totalSteps) * 100);
        
        return (
          <div>
            <Progress percent={percentage} size="small" />
            <div className="text-xs text-gray-500 mt-1">
              {completedSteps}/{totalSteps} étapes
            </div>
          </div>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: MigrationData) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Approuver">
            <Button 
              type="text" 
              icon={<CheckOutlined />} 
              size="small"
              disabled={record.statut !== 'En cours'}
            />
          </Tooltip>
          <Tooltip title="Rejeter">
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              size="small"
              disabled={record.statut !== 'En cours'}
            />
          </Tooltip>
          <Tooltip title="Assigner">
            <Button 
              type="text" 
              icon={<UserOutlined />} 
              size="small"
              disabled={record.statut !== 'En attente'}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleViewDetails = (migration: MigrationData) => {
    setSelectedMigration(migration);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Migration créée:', values);
      message.success('Migration créée avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création de la migration');
    }
  };

  const totalMigrations = migrationsData.length;
  const migrationsValidees = migrationsData.filter(m => m.statut === 'Validé').length;
  const migrationsEnCours = migrationsData.filter(m => m.statut === 'En cours').length;
  const migrationsEnAttente = migrationsData.filter(m => m.statut === 'En attente').length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des migrations"
                value={totalMigrations}
                valueStyle={{ color: '#1890ff' }}
                prefix={<SwapOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Migrations approuvées"
                value={migrationsValidees}
                suffix={`/${totalMigrations}`}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En cours"
                value={migrationsEnCours}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En attente"
                value={migrationsEnAttente}
                valueStyle={{ color: '#faad14' }}
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
                placeholder="Rechercher un étudiant..."
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4}>
              <Select placeholder="Type" style={{ width: '100%' }}>
                <Option value="all">Tous les types</Option>
                <Option value="changement_filiere">Changement de filière</Option>
                <Option value="passage_niveau">Passage de niveau</Option>
                <Option value="transfert_externe">Transfert externe</Option>
                <Option value="retour_etudes">Retour d'études</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Statut" style={{ width: '100%' }}>
                <Option value="all">Tous les statuts</Option>
                <Option value="valide">Validé</Option>
                <Option value="en_cours">En cours</Option>
                <Option value="en_attente">En attente</Option>
                <Option value="rejete">Rejeté</Option>
              </Select>
            </Col>
            <Col span={6}>
              <DatePicker.RangePicker style={{ width: '100%' }} placeholder={['Date début', 'Date fin']} />
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" icon={<SwapOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouvelle migration
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des migrations */}
        <Card title="Migrations d'étudiants">
          <Table
            dataSource={migrationsData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: migrationsData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} migrations`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Migrations en attente d'assignation"
          description="2 migrations sont en attente d'assignation à un validateur."
          type="warning"
          showIcon
          action={
            <Button size="small" type="link">
              Assigner maintenant
            </Button>
          }
        />
      </div>

      {/* Modal de création/modification */}
      <Modal
        title="Nouvelle migration"
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
                name="matricule"
                label="Matricule étudiant"
                rules={[{ required: true, message: 'Veuillez saisir le matricule' }]}
              >
                <Input placeholder="ETU-2024-XXX" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="typeMigration"
                label="Type de migration"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select placeholder="Sélectionner le type">
                  <Option value="Changement de filière">Changement de filière</Option>
                  <Option value="Passage de niveau">Passage de niveau</Option>
                  <Option value="Transfert externe">Transfert externe</Option>
                  <Option value="Retour d'études">Retour d'études</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="filiereOrigine"
                label="Filière d'origine"
                rules={[{ required: true, message: 'Veuillez sélectionner la filière' }]}
              >
                <Select placeholder="Filière d'origine">
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
                name="filiereDestination"
                label="Filière de destination"
                rules={[{ required: true, message: 'Veuillez sélectionner la filière' }]}
              >
                <Select placeholder="Filière de destination">
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
                name="niveauOrigine"
                label="Niveau d'origine"
                rules={[{ required: true, message: 'Veuillez sélectionner le niveau' }]}
              >
                <Select placeholder="Niveau d'origine">
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
                name="niveauDestination"
                label="Niveau de destination"
                rules={[{ required: true, message: 'Veuillez sélectionner le niveau' }]}
              >
                <Select placeholder="Niveau de destination">
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
                name="validateur"
                label="Validateur assigné"
              >
                <Select placeholder="Sélectionner un validateur">
                  <Option value="Dr. Martin Dupont">Dr. Martin Dupont</Option>
                  <Option value="Dr. Claire Moreau">Dr. Claire Moreau</Option>
                  <Option value="Dr. Antoine Rousseau">Dr. Antoine Rousseau</Option>
                  <Option value="Dr. Isabelle Blanc">Dr. Isabelle Blanc</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priorite"
                label="Priorité"
                rules={[{ required: true, message: 'Veuillez sélectionner la priorité' }]}
              >
                <Select placeholder="Sélectionner la priorité">
                  <Option value="normale">Normale</Option>
                  <Option value="urgente">Urgente</Option>
                  <Option value="critique">Critique</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="motif"
                label="Motif de la migration"
                rules={[{ required: true, message: 'Veuillez saisir le motif' }]}
              >
                <TextArea rows={3} placeholder="Motif de la demande de migration..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaires"
                label="Commentaires additionnels"
              >
                <TextArea rows={3} placeholder="Commentaires additionnels..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer la migration
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails de la migration"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={900}
      >
        {selectedMigration && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Matricule:</strong> {selectedMigration.matricule}</p>
                  <p><strong>Étudiant:</strong> {selectedMigration.nom} {selectedMigration.prenom}</p>
                  <p><strong>Type:</strong> 
                    <Tag color={getTypeColor(selectedMigration.typeMigration)} className="ml-2">
                      {selectedMigration.typeMigration}
                    </Tag>
                  </p>
                  <p><strong>Motif:</strong> {selectedMigration.motif}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Statut:</strong> 
                    <Tag color={getStatusColor(selectedMigration.statut)} className="ml-2">
                      {selectedMigration.statut}
                    </Tag>
                  </p>
                  <p><strong>Validateur:</strong> {selectedMigration.validateur || 'Non assigné'}</p>
                  <p><strong>Date demande:</strong> {new Date(selectedMigration.dateDemande).toLocaleDateString('fr-FR')}</p>
                  {selectedMigration.dateValidation && (
                    <p><strong>Date validation:</strong> {new Date(selectedMigration.dateValidation).toLocaleDateString('fr-FR')}</p>
                  )}
                </Col>
              </Row>
              <div className="mt-4">
                <p><strong>Commentaires:</strong></p>
                <p className="text-gray-600">{selectedMigration.commentaires}</p>
              </div>
            </Card>

            {/* Détails de la migration */}
            <Card title="Détails de la migration" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="Origine" size="small" className="mb-4">
                    <p><strong>Filière:</strong> {selectedMigration.filiereOrigine}</p>
                    <p><strong>Niveau:</strong> {selectedMigration.niveauOrigine}</p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Destination" size="small" className="mb-4">
                    <p><strong>Filière:</strong> {selectedMigration.filiereDestination}</p>
                    <p><strong>Niveau:</strong> {selectedMigration.niveauDestination}</p>
                  </Card>
                </Col>
              </Row>
            </Card>

            {/* Workflow des étapes */}
            <Card title="Workflow de migration" size="small">
              <Steps direction="vertical" current={selectedMigration.etapes.findIndex(etape => etape.statut === 'En cours')}>
                {selectedMigration.etapes.map((etape, index) => (
                  <Step
                    key={index}
                    title={etape.etape}
                    description={
                      <div>
                        <div>{etape.date && new Date(etape.date).toLocaleDateString('fr-FR')}</div>
                        <div className="text-sm text-gray-500">{etape.commentaire}</div>
                      </div>
                    }
                    status={
                      etape.statut === 'Terminé' ? 'finish' :
                      etape.statut === 'En cours' ? 'process' :
                      etape.statut === 'Rejeté' ? 'error' : 'wait'
                    }
                  />
                ))}
              </Steps>
            </Card>

            {/* Documents */}
            <Card title="Documents" size="small">
              <Table
                dataSource={selectedMigration.documents}
                columns={[
                  { title: 'Document', dataIndex: 'nom', key: 'nom' },
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
                    title: 'Date upload', 
                    dataIndex: 'dateUpload', 
                    key: 'dateUpload',
                    render: (date: string) => date ? new Date(date).toLocaleDateString('fr-FR') : 'Non uploadé'
                  }
                ]}
                pagination={false}
                size="small"
              />
            </Card>

            {/* Actions rapides */}
            <Card title="Actions rapides" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="primary" block icon={<CheckOutlined />}>
                  Approuver la migration
                </Button>
                <Button danger block icon={<CloseOutlined />}>
                  Rejeter la migration
                </Button>
                <Button block icon={<EditOutlined />}>
                  Modifier les détails
                </Button>
                <Button block icon={<PrinterOutlined />}>
                  Imprimer le rapport
                </Button>
                <Button block icon={<DownloadOutlined />}>
                  Télécharger les documents
                </Button>
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Migrations;
