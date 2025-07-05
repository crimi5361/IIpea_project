import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker, Modal, Form, Steps, Space, Statistic, Progress, Alert, Tooltip, message, Badge, Timeline, Descriptions, Divider, Upload, Checkbox } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined, EyeOutlined, EditOutlined, SendOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined, FileTextOutlined, UserOutlined, AuditOutlined, PrinterOutlined, DownloadOutlined, FolderOutlined, FileTextOutlined as FileTextIcon } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface DossierData {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  filiere: string;
  niveau: string;
  typeDossier: string;
  statut: string;
  dateCreation: string;
  dateValidation: string;
  responsable: string;
  priorite: string;
  commentaires: string;
  documents: Array<{
    nom: string;
    type: string;
    statut: string;
    dateUpload: string;
    taille: string;
  }>;
  etapes: Array<{
    etape: string;
    statut: string;
    date: string;
    commentaire: string;
  }>;
}

const Dossiers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState<DossierData | null>(null);
  const [form] = Form.useForm();

  // Données simulées
  const dossiersData: DossierData[] = [
    {
      id: 'DOS-001',
      matricule: 'ETU-2024-001',
      nom: 'Dubois',
      prenom: 'Marie',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      typeDossier: 'Dossier d\'inscription',
      statut: 'En cours',
      dateCreation: '2024-01-15',
      dateValidation: '',
      responsable: 'Dr. Martin Dupont',
      priorite: 'Normale',
      commentaires: 'Dossier en cours de traitement',
      documents: [
        { nom: 'Carte d\'identité', type: 'Pièce d\'identité', statut: 'Validé', dateUpload: '2024-01-15', taille: '2.1 MB' },
        { nom: 'Diplôme Bac', type: 'Diplôme', statut: 'Validé', dateUpload: '2024-01-15', taille: '1.8 MB' },
        { nom: 'Relevé de notes', type: 'Académique', statut: 'En attente', dateUpload: '2024-01-16', taille: '3.2 MB' },
        { nom: 'Certificat médical', type: 'Médical', statut: 'Rejeté', dateUpload: '2024-01-17', taille: '1.5 MB' }
      ],
      etapes: [
        { etape: 'Création', statut: 'Terminé', date: '2024-01-15', commentaire: 'Dossier créé' },
        { etape: 'Vérification documents', statut: 'En cours', date: '2024-01-16', commentaire: 'En cours de vérification' },
        { etape: 'Validation académique', statut: 'En attente', date: '', commentaire: '' },
        { etape: 'Approbation finale', statut: 'En attente', date: '', commentaire: '' }
      ]
    },
    {
      id: 'DOS-002',
      matricule: 'ETU-2024-002',
      nom: 'Martin',
      prenom: 'Jean',
      filiere: 'Gestion',
      niveau: 'Master 1',
      typeDossier: 'Dossier de réinscription',
      statut: 'Validé',
      dateCreation: '2024-01-10',
      dateValidation: '2024-01-20',
      responsable: 'Dr. Claire Moreau',
      priorite: 'Urgente',
      commentaires: 'Dossier validé avec succès',
      documents: [
        { nom: 'Carte d\'identité', type: 'Pièce d\'identité', statut: 'Validé', dateUpload: '2024-01-10', taille: '2.0 MB' },
        { nom: 'Relevé de notes', type: 'Académique', statut: 'Validé', dateUpload: '2024-01-10', taille: '2.8 MB' },
        { nom: 'Certificat médical', type: 'Médical', statut: 'Validé', dateUpload: '2024-01-11', taille: '1.6 MB' },
        { nom: 'Justificatif de paiement', type: 'Financier', statut: 'Validé', dateUpload: '2024-01-12', taille: '1.2 MB' }
      ],
      etapes: [
        { etape: 'Création', statut: 'Terminé', date: '2024-01-10', commentaire: 'Dossier créé' },
        { etape: 'Vérification documents', statut: 'Terminé', date: '2024-01-12', commentaire: 'Documents vérifiés' },
        { etape: 'Validation académique', statut: 'Terminé', date: '2024-01-18', commentaire: 'Validation OK' },
        { etape: 'Approbation finale', statut: 'Terminé', date: '2024-01-20', commentaire: 'Approuvé' }
      ]
    },
    {
      id: 'DOS-003',
      matricule: 'ETU-2024-003',
      nom: 'Bernard',
      prenom: 'Sophie',
      filiere: 'Droit',
      niveau: 'Licence 2',
      typeDossier: 'Dossier de transfert',
      statut: 'Rejeté',
      dateCreation: '2024-01-08',
      dateValidation: '2024-01-14',
      responsable: 'Dr. Antoine Rousseau',
      priorite: 'Normale',
      commentaires: 'Dossier rejeté pour documents incomplets',
      documents: [
        { nom: 'Carte d\'identité', type: 'Pièce d\'identité', statut: 'Validé', dateUpload: '2024-01-08', taille: '2.3 MB' },
        { nom: 'Relevé de notes', type: 'Académique', statut: 'Rejeté', dateUpload: '2024-01-08', taille: '2.1 MB' },
        { nom: 'Lettre de motivation', type: 'Administratif', statut: 'Rejeté', dateUpload: '2024-01-08', taille: '0.8 MB' },
        { nom: 'Certificat médical', type: 'Médical', statut: 'Manquant', dateUpload: '', taille: '0 MB' }
      ],
      etapes: [
        { etape: 'Création', statut: 'Terminé', date: '2024-01-08', commentaire: 'Dossier créé' },
        { etape: 'Vérification documents', statut: 'Terminé', date: '2024-01-09', commentaire: 'Documents incomplets' },
        { etape: 'Validation académique', statut: 'Rejeté', date: '2024-01-14', commentaire: 'Rejeté pour documents manquants' },
        { etape: 'Approbation finale', statut: 'Rejeté', date: '2024-01-14', commentaire: 'Rejeté' }
      ]
    },
    {
      id: 'DOS-004',
      matricule: 'ETU-2024-004',
      nom: 'Petit',
      prenom: 'Pierre',
      filiere: 'Langues',
      niveau: 'Licence 1',
      typeDossier: 'Dossier d\'inscription',
      statut: 'En attente',
      dateCreation: '2024-01-20',
      dateValidation: '',
      responsable: '',
      priorite: 'Normale',
      commentaires: 'En attente d\'assignation',
      documents: [
        { nom: 'Carte d\'identité', type: 'Pièce d\'identité', statut: 'En attente', dateUpload: '2024-01-20', taille: '2.0 MB' },
        { nom: 'Diplôme Bac', type: 'Diplôme', statut: 'En attente', dateUpload: '2024-01-20', taille: '1.9 MB' },
        { nom: 'Certificat médical', type: 'Médical', statut: 'En attente', dateUpload: '2024-01-20', taille: '1.4 MB' }
      ],
      etapes: [
        { etape: 'Création', statut: 'Terminé', date: '2024-01-20', commentaire: 'Dossier créé' },
        { etape: 'Vérification documents', statut: 'En attente', date: '', commentaire: 'En attente d\'assignation' },
        { etape: 'Validation académique', statut: 'En attente', date: '', commentaire: '' },
        { etape: 'Approbation finale', statut: 'En attente', date: '', commentaire: '' }
      ]
    },
    {
      id: 'DOS-005',
      matricule: 'ETU-2024-005',
      nom: 'Durand',
      prenom: 'Lucie',
      filiere: 'Physique',
      niveau: 'Master 2',
      typeDossier: 'Dossier de diplôme',
      statut: 'Validé',
      dateCreation: '2024-01-05',
      dateValidation: '2024-01-25',
      responsable: 'Dr. Paul Dubois',
      priorite: 'Critique',
      commentaires: 'Dossier de diplôme validé avec excellence',
      documents: [
        { nom: 'Carte d\'identité', type: 'Pièce d\'identité', statut: 'Validé', dateUpload: '2024-01-05', taille: '2.2 MB' },
        { nom: 'Relevé de notes', type: 'Académique', statut: 'Validé', dateUpload: '2024-01-05', taille: '3.5 MB' },
        { nom: 'Mémoire de recherche', type: 'Académique', statut: 'Validé', dateUpload: '2024-01-06', taille: '8.2 MB' },
        { nom: 'Certificat médical', type: 'Médical', statut: 'Validé', dateUpload: '2024-01-06', taille: '1.7 MB' },
        { nom: 'Attestation de stage', type: 'Professionnel', statut: 'Validé', dateUpload: '2024-01-07', taille: '2.1 MB' }
      ],
      etapes: [
        { etape: 'Création', statut: 'Terminé', date: '2024-01-05', commentaire: 'Dossier créé' },
        { etape: 'Vérification documents', statut: 'Terminé', date: '2024-01-10', commentaire: 'Documents vérifiés' },
        { etape: 'Validation académique', statut: 'Terminé', date: '2024-01-20', commentaire: 'Validation OK' },
        { etape: 'Approbation finale', statut: 'Terminé', date: '2024-01-25', commentaire: 'Approuvé' }
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
      case 'Dossier d\'inscription': return 'blue';
      case 'Dossier de réinscription': return 'green';
      case 'Dossier de transfert': return 'purple';
      case 'Dossier de diplôme': return 'orange';
      case 'Dossier de stage': return 'cyan';
      default: return 'default';
    }
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'Critique': return 'red';
      case 'Urgente': return 'orange';
      case 'Normale': return 'blue';
      case 'Basse': return 'green';
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
      render: (record: DossierData) => (
        <div>
          <div className="font-medium">{record.nom} {record.prenom}</div>
          <div className="text-sm text-gray-500">{record.filiere} - {record.niveau}</div>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'typeDossier',
      key: 'typeDossier',
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>
          {type}
        </Tag>
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
      title: 'Priorité',
      dataIndex: 'priorite',
      key: 'priorite',
      render: (priorite: string) => (
        <Tag color={getPrioriteColor(priorite)}>
          {priorite}
        </Tag>
      )
    },
    {
      title: 'Date création',
      dataIndex: 'dateCreation',
      key: 'dateCreation',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
      render: (responsable: string) => responsable || 'Non assigné'
    },
    {
      title: 'Progression',
      key: 'progression',
      render: (record: DossierData) => {
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
      render: (record: DossierData) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Valider">
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

  const handleViewDetails = (dossier: DossierData) => {
    setSelectedDossier(dossier);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Dossier créé:', values);
      message.success('Dossier créé avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création du dossier');
    }
  };

  const totalDossiers = dossiersData.length;
  const dossiersValides = dossiersData.filter(d => d.statut === 'Validé').length;
  const dossiersEnCours = dossiersData.filter(d => d.statut === 'En cours').length;
  const dossiersEnAttente = dossiersData.filter(d => d.statut === 'En attente').length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des dossiers"
                value={totalDossiers}
                valueStyle={{ color: '#1890ff' }}
                prefix={<FolderOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Dossiers validés"
                value={dossiersValides}
                suffix={`/${totalDossiers}`}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En cours"
                value={dossiersEnCours}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En attente"
                value={dossiersEnAttente}
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
                <Option value="inscription">Dossier d'inscription</Option>
                <Option value="reinscription">Dossier de réinscription</Option>
                <Option value="transfert">Dossier de transfert</Option>
                <Option value="diplome">Dossier de diplôme</Option>
                <Option value="stage">Dossier de stage</Option>
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
                <Button type="primary" icon={<FolderOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouveau dossier
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des dossiers */}
        <Card title="Dossiers étudiants">
          <Table
            dataSource={dossiersData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: dossiersData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} dossiers`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Dossiers en attente d'assignation"
          description="2 dossiers sont en attente d'assignation à un responsable."
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
        title="Nouveau dossier"
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
                name="typeDossier"
                label="Type de dossier"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select placeholder="Sélectionner le type">
                  <Option value="Dossier d'inscription">Dossier d'inscription</Option>
                  <Option value="Dossier de réinscription">Dossier de réinscription</Option>
                  <Option value="Dossier de transfert">Dossier de transfert</Option>
                  <Option value="Dossier de diplôme">Dossier de diplôme</Option>
                  <Option value="Dossier de stage">Dossier de stage</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="responsable"
                label="Responsable assigné"
              >
                <Select placeholder="Sélectionner un responsable">
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
                  <Option value="Basse">Basse</Option>
                  <Option value="Normale">Normale</Option>
                  <Option value="Urgente">Urgente</Option>
                  <Option value="Critique">Critique</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaires"
                label="Commentaires"
              >
                <TextArea rows={3} placeholder="Commentaires sur le dossier..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer le dossier
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails du dossier"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={900}
      >
        {selectedDossier && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Matricule:</strong> {selectedDossier.matricule}</p>
                  <p><strong>Étudiant:</strong> {selectedDossier.nom} {selectedDossier.prenom}</p>
                  <p><strong>Filière:</strong> {selectedDossier.filiere}</p>
                  <p><strong>Niveau:</strong> {selectedDossier.niveau}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Type:</strong> 
                    <Tag color={getTypeColor(selectedDossier.typeDossier)} className="ml-2">
                      {selectedDossier.typeDossier}
                    </Tag>
                  </p>
                  <p><strong>Statut:</strong> 
                    <Tag color={getStatusColor(selectedDossier.statut)} className="ml-2">
                      {selectedDossier.statut}
                    </Tag>
                  </p>
                  <p><strong>Priorité:</strong> 
                    <Tag color={getPrioriteColor(selectedDossier.priorite)} className="ml-2">
                      {selectedDossier.priorite}
                    </Tag>
                  </p>
                  <p><strong>Responsable:</strong> {selectedDossier.responsable || 'Non assigné'}</p>
                </Col>
              </Row>
              <div className="mt-4">
                <p><strong>Commentaires:</strong></p>
                <p className="text-gray-600">{selectedDossier.commentaires}</p>
              </div>
            </Card>

            {/* Workflow des étapes */}
            <Card title="Workflow du dossier" size="small">
              <Steps direction="vertical" current={selectedDossier.etapes.findIndex(etape => etape.statut === 'En cours')}>
                {selectedDossier.etapes.map((etape, index) => (
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
                dataSource={selectedDossier.documents}
                columns={[
                  { title: 'Document', dataIndex: 'nom', key: 'nom' },
                  { title: 'Type', dataIndex: 'type', key: 'type' },
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
                  { title: 'Taille', dataIndex: 'taille', key: 'taille' },
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
                  Valider le dossier
                </Button>
                <Button danger block icon={<CloseOutlined />}>
                  Rejeter le dossier
                </Button>
                <Button block icon={<EditOutlined />}>
                  Modifier les détails
                </Button>
                <Button block icon={<PrinterOutlined />}>
                  Imprimer le dossier
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

export default Dossiers;
