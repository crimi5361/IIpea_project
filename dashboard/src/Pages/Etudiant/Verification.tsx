import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker, Modal, Form, Steps, Space, Statistic, Progress, Alert, Tooltip, message, Badge, Timeline, Descriptions, Divider, Upload, Checkbox } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined, EyeOutlined, EditOutlined, SendOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined, FileTextOutlined, UserOutlined, AuditOutlined, PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;
const { RangePicker } = DatePicker;

interface VerificationData {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  filiere: string;
  niveau: string;
  typeVerification: string;
  statut: string;
  dateSoumission: string;
  dateVerification: string;
  verificateur: string;
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

const Verification = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState<VerificationData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  // Données simulées
  const verificationsData: VerificationData[] = [
    {
      id: 'VER-001',
      matricule: 'ETU-2024-001',
      nom: 'Dubois',
      prenom: 'Marie',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      typeVerification: 'Vérification complète',
      statut: 'En cours',
      dateSoumission: '2024-01-15',
      dateVerification: '',
      verificateur: 'Dr. Martin Dupont',
      commentaires: 'Vérification en cours des documents',
      documents: [
        { nom: 'Carte d\'identité', statut: 'Validé', dateUpload: '2024-01-15' },
        { nom: 'Diplôme Bac', statut: 'Validé', dateUpload: '2024-01-15' },
        { nom: 'Relevé de notes', statut: 'En attente', dateUpload: '2024-01-16' },
        { nom: 'Certificat médical', statut: 'Rejeté', dateUpload: '2024-01-17' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-15', commentaire: 'Dossier soumis' },
        { etape: 'Vérification documents', statut: 'En cours', date: '2024-01-16', commentaire: 'En cours de vérification' },
        { etape: 'Validation académique', statut: 'En attente', date: '', commentaire: '' },
        { etape: 'Approbation finale', statut: 'En attente', date: '', commentaire: '' }
      ]
    },
    {
      id: 'VER-002',
      matricule: 'ETU-2024-002',
      nom: 'Martin',
      prenom: 'Jean',
      filiere: 'Gestion',
      niveau: 'Master 1',
      typeVerification: 'Vérification rapide',
      statut: 'Validé',
      dateSoumission: '2024-01-10',
      dateVerification: '2024-01-12',
      verificateur: 'Dr. Claire Moreau',
      commentaires: 'Tous les documents sont conformes',
      documents: [
        { nom: 'Carte d\'identité', statut: 'Validé', dateUpload: '2024-01-10' },
        { nom: 'Diplôme Licence', statut: 'Validé', dateUpload: '2024-01-10' },
        { nom: 'Relevé de notes', statut: 'Validé', dateUpload: '2024-01-10' },
        { nom: 'Certificat médical', statut: 'Validé', dateUpload: '2024-01-11' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-10', commentaire: 'Dossier soumis' },
        { etape: 'Vérification documents', statut: 'Terminé', date: '2024-01-11', commentaire: 'Documents vérifiés' },
        { etape: 'Validation académique', statut: 'Terminé', date: '2024-01-12', commentaire: 'Validation académique OK' },
        { etape: 'Approbation finale', statut: 'Terminé', date: '2024-01-12', commentaire: 'Approuvé' }
      ]
    },
    {
      id: 'VER-003',
      matricule: 'ETU-2024-003',
      nom: 'Bernard',
      prenom: 'Sophie',
      filiere: 'Droit',
      niveau: 'Licence 2',
      typeVerification: 'Vérification complète',
      statut: 'Rejeté',
      dateSoumission: '2024-01-08',
      dateVerification: '2024-01-14',
      verificateur: 'Dr. Antoine Rousseau',
      commentaires: 'Documents incomplets et non conformes',
      documents: [
        { nom: 'Carte d\'identité', statut: 'Validé', dateUpload: '2024-01-08' },
        { nom: 'Diplôme Bac', statut: 'Rejeté', dateUpload: '2024-01-08' },
        { nom: 'Relevé de notes', statut: 'Rejeté', dateUpload: '2024-01-08' },
        { nom: 'Certificat médical', statut: 'Manquant', dateUpload: '' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-08', commentaire: 'Dossier soumis' },
        { etape: 'Vérification documents', statut: 'Terminé', date: '2024-01-09', commentaire: 'Documents incomplets' },
        { etape: 'Validation académique', statut: 'Rejeté', date: '2024-01-14', commentaire: 'Rejeté pour documents manquants' },
        { etape: 'Approbation finale', statut: 'Rejeté', date: '2024-01-14', commentaire: 'Rejeté' }
      ]
    },
    {
      id: 'VER-004',
      matricule: 'ETU-2024-004',
      nom: 'Petit',
      prenom: 'Pierre',
      filiere: 'Langues',
      niveau: 'Licence 1',
      typeVerification: 'Vérification rapide',
      statut: 'En attente',
      dateSoumission: '2024-01-20',
      dateVerification: '',
      verificateur: '',
      commentaires: 'En attente d\'assignation',
      documents: [
        { nom: 'Carte d\'identité', statut: 'En attente', dateUpload: '2024-01-20' },
        { nom: 'Diplôme Bac', statut: 'En attente', dateUpload: '2024-01-20' },
        { nom: 'Relevé de notes', statut: 'En attente', dateUpload: '2024-01-20' },
        { nom: 'Certificat médical', statut: 'En attente', dateUpload: '2024-01-20' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-20', commentaire: 'Dossier soumis' },
        { etape: 'Vérification documents', statut: 'En attente', date: '', commentaire: 'En attente d\'assignation' },
        { etape: 'Validation académique', statut: 'En attente', date: '', commentaire: '' },
        { etape: 'Approbation finale', statut: 'En attente', date: '', commentaire: '' }
      ]
    },
    {
      id: 'VER-005',
      matricule: 'ETU-2024-005',
      nom: 'Durand',
      prenom: 'Lucie',
      filiere: 'Physique',
      niveau: 'Master 2',
      typeVerification: 'Vérification complète',
      statut: 'Validé',
      dateSoumission: '2024-01-05',
      dateVerification: '2024-01-18',
      verificateur: 'Dr. Isabelle Blanc',
      commentaires: 'Validation réussie avec quelques observations',
      documents: [
        { nom: 'Carte d\'identité', statut: 'Validé', dateUpload: '2024-01-05' },
        { nom: 'Diplôme Master 1', statut: 'Validé', dateUpload: '2024-01-05' },
        { nom: 'Relevé de notes', statut: 'Validé', dateUpload: '2024-01-05' },
        { nom: 'Certificat médical', statut: 'Validé', dateUpload: '2024-01-06' },
        { nom: 'Lettre de motivation', statut: 'Validé', dateUpload: '2024-01-06' }
      ],
      etapes: [
        { etape: 'Soumission', statut: 'Terminé', date: '2024-01-05', commentaire: 'Dossier soumis' },
        { etape: 'Vérification documents', statut: 'Terminé', date: '2024-01-16', commentaire: 'Documents vérifiés' },
        { etape: 'Validation académique', statut: 'Terminé', date: '2024-01-17', commentaire: 'Validation académique OK' },
        { etape: 'Approbation finale', statut: 'Terminé', date: '2024-01-18', commentaire: 'Approuvé avec observations' }
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
      case 'Vérification complète': return 'blue';
      case 'Vérification rapide': return 'green';
      case 'Vérification spéciale': return 'purple';
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
      render: (record: VerificationData) => (
        <div>
          <div className="font-medium">{record.nom} {record.prenom}</div>
          <div className="text-sm text-gray-500">{record.filiere} - {record.niveau}</div>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'typeVerification',
      key: 'typeVerification',
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
      title: 'Date soumission',
      dataIndex: 'dateSoumission',
      key: 'dateSoumission',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      title: 'Vérificateur',
      dataIndex: 'verificateur',
      key: 'verificateur',
      render: (verificateur: string) => verificateur || 'Non assigné'
    },
    {
      title: 'Progression',
      key: 'progression',
      render: (record: VerificationData) => {
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
      render: (record: VerificationData) => (
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

  const handleViewDetails = (verification: VerificationData) => {
    setSelectedVerification(verification);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Vérification créée:', values);
      message.success('Vérification créée avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création de la vérification');
    }
  };

  const totalVerifications = verificationsData.length;
  const verificationsValidees = verificationsData.filter(v => v.statut === 'Validé').length;
  const verificationsEnCours = verificationsData.filter(v => v.statut === 'En cours').length;
  const verificationsEnAttente = verificationsData.filter(v => v.statut === 'En attente').length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des vérifications"
                value={totalVerifications}
                valueStyle={{ color: '#1890ff' }}
                prefix={<AuditOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Vérifications validées"
                value={verificationsValidees}
                suffix={`/${totalVerifications}`}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En cours"
                value={verificationsEnCours}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En attente"
                value={verificationsEnAttente}
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
                <Option value="complete">Vérification complète</Option>
                <Option value="rapide">Vérification rapide</Option>
                <Option value="speciale">Vérification spéciale</Option>
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
                <Button type="primary" icon={<AuditOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouvelle vérification
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des vérifications */}
        <Card title="Vérifications des dossiers étudiants">
          <Table
            dataSource={verificationsData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: verificationsData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} vérifications`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Vérifications en attente d'assignation"
          description="2 vérifications sont en attente d'assignation à un vérificateur."
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
        title="Nouvelle vérification"
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
                name="typeVerification"
                label="Type de vérification"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select placeholder="Sélectionner le type">
                  <Option value="Vérification complète">Vérification complète</Option>
                  <Option value="Vérification rapide">Vérification rapide</Option>
                  <Option value="Vérification spéciale">Vérification spéciale</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="verificateur"
                label="Vérificateur assigné"
              >
                <Select placeholder="Sélectionner un vérificateur">
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
                name="commentaires"
                label="Commentaires initiaux"
              >
                <TextArea rows={3} placeholder="Commentaires sur la vérification..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer la vérification
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails de la vérification"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={900}
      >
        {selectedVerification && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Matricule:</strong> {selectedVerification.matricule}</p>
                  <p><strong>Étudiant:</strong> {selectedVerification.nom} {selectedVerification.prenom}</p>
                  <p><strong>Filière:</strong> {selectedVerification.filiere}</p>
                  <p><strong>Niveau:</strong> {selectedVerification.niveau}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Type:</strong> 
                    <Tag color={getTypeColor(selectedVerification.typeVerification)} className="ml-2">
                      {selectedVerification.typeVerification}
                    </Tag>
                  </p>
                  <p><strong>Statut:</strong> 
                    <Tag color={getStatusColor(selectedVerification.statut)} className="ml-2">
                      {selectedVerification.statut}
                    </Tag>
                  </p>
                  <p><strong>Vérificateur:</strong> {selectedVerification.verificateur || 'Non assigné'}</p>
                  <p><strong>Date soumission:</strong> {new Date(selectedVerification.dateSoumission).toLocaleDateString('fr-FR')}</p>
                </Col>
              </Row>
              <div className="mt-4">
                <p><strong>Commentaires:</strong></p>
                <p className="text-gray-600">{selectedVerification.commentaires}</p>
              </div>
            </Card>

            {/* Workflow des étapes */}
            <Card title="Workflow de vérification" size="small">
              <Steps direction="vertical" current={selectedVerification.etapes.findIndex(etape => etape.statut === 'En cours')}>
                {selectedVerification.etapes.map((etape, index) => (
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
                dataSource={selectedVerification.documents}
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
                  Valider la vérification
                </Button>
                <Button danger block icon={<CloseOutlined />}>
                  Rejeter la vérification
                </Button>
                <Button block icon={<EditOutlined />}>
                  Modifier les commentaires
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

export default Verification;
