import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker, Modal, Form, Steps, Space, Statistic, Progress, Alert, Tooltip, message, Badge, Timeline, Descriptions, Divider, Upload, Checkbox, Rate } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined, EyeOutlined, EditOutlined, SendOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined, FileTextOutlined, UserOutlined, AuditOutlined, PrinterOutlined, DownloadOutlined, TrophyOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface ResultatData {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  filiere: string;
  niveau: string;
  anneeAcademique: string;
  semestre: string;
  moyenne: number;
  statut: string;
  datePublication: string;
  dateValidation: string;
  validateur: string;
  commentaires: string;
  modules: Array<{
    nom: string;
    coefficient: number;
    note: number;
    statut: string;
  }>;
  classement: number;
  totalEtudiants: number;
}

const Resultats = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedResultat, setSelectedResultat] = useState<ResultatData | null>(null);
  const [form] = Form.useForm();

  // Données simulées
  const resultatsData: ResultatData[] = [
    {
      id: 'RES-001',
      matricule: 'ETU-2024-001',
      nom: 'Dubois',
      prenom: 'Marie',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      anneeAcademique: '2023-2024',
      semestre: 'S1',
      moyenne: 16.8,
      statut: 'Validé',
      datePublication: '2024-01-15',
      dateValidation: '2024-01-20',
      validateur: 'Dr. Martin Dupont',
      commentaires: 'Excellent niveau académique',
      modules: [
        { nom: 'Programmation Avancée', coefficient: 3, note: 17.5, statut: 'Validé' },
        { nom: 'Base de données', coefficient: 2, note: 16.0, statut: 'Validé' },
        { nom: 'Réseaux', coefficient: 2, note: 18.0, statut: 'Validé' },
        { nom: 'Mathématiques', coefficient: 1, note: 15.5, statut: 'Validé' }
      ],
      classement: 1,
      totalEtudiants: 45
    },
    {
      id: 'RES-002',
      matricule: 'ETU-2024-002',
      nom: 'Martin',
      prenom: 'Jean',
      filiere: 'Gestion',
      niveau: 'Master 1',
      anneeAcademique: '2023-2024',
      semestre: 'S1',
      moyenne: 14.2,
      statut: 'En cours',
      datePublication: '2024-01-10',
      dateValidation: '',
      validateur: 'Dr. Claire Moreau',
      commentaires: 'En cours de validation',
      modules: [
        { nom: 'Comptabilité', coefficient: 3, note: 14.0, statut: 'En cours' },
        { nom: 'Marketing', coefficient: 2, note: 15.5, statut: 'En cours' },
        { nom: 'Finance', coefficient: 2, note: 13.0, statut: 'En cours' },
        { nom: 'Management', coefficient: 1, note: 14.5, statut: 'En cours' }
      ],
      classement: 8,
      totalEtudiants: 32
    },
    {
      id: 'RES-003',
      matricule: 'ETU-2024-003',
      nom: 'Bernard',
      prenom: 'Sophie',
      filiere: 'Droit',
      niveau: 'Licence 2',
      anneeAcademique: '2023-2024',
      semestre: 'S1',
      moyenne: 12.8,
      statut: 'Rejeté',
      datePublication: '2024-01-08',
      dateValidation: '2024-01-14',
      validateur: 'Dr. Antoine Rousseau',
      commentaires: 'Notes incohérentes, rejeté',
      modules: [
        { nom: 'Droit Civil', coefficient: 3, note: 13.0, statut: 'Rejeté' },
        { nom: 'Droit Pénal', coefficient: 2, note: 12.5, statut: 'Rejeté' },
        { nom: 'Procédure', coefficient: 2, note: 13.5, statut: 'Rejeté' },
        { nom: 'Histoire du droit', coefficient: 1, note: 12.0, statut: 'Rejeté' }
      ],
      classement: 15,
      totalEtudiants: 28
    },
    {
      id: 'RES-004',
      matricule: 'ETU-2024-004',
      nom: 'Petit',
      prenom: 'Pierre',
      filiere: 'Langues',
      niveau: 'Licence 1',
      anneeAcademique: '2023-2024',
      semestre: 'S1',
      moyenne: 15.5,
      statut: 'Validé',
      datePublication: '2024-01-12',
      dateValidation: '2024-01-18',
      validateur: 'Dr. Isabelle Blanc',
      commentaires: 'Bon niveau en langues',
      modules: [
        { nom: 'Anglais', coefficient: 3, note: 16.0, statut: 'Validé' },
        { nom: 'Espagnol', coefficient: 2, note: 15.0, statut: 'Validé' },
        { nom: 'Allemand', coefficient: 2, note: 14.5, statut: 'Validé' },
        { nom: 'Culture générale', coefficient: 1, note: 16.5, statut: 'Validé' }
      ],
      classement: 3,
      totalEtudiants: 38
    },
    {
      id: 'RES-005',
      matricule: 'ETU-2024-005',
      nom: 'Durand',
      prenom: 'Lucie',
      filiere: 'Physique',
      niveau: 'Master 2',
      anneeAcademique: '2023-2024',
      semestre: 'S1',
      moyenne: 17.2,
      statut: 'Validé',
      datePublication: '2024-01-05',
      dateValidation: '2024-01-22',
      validateur: 'Dr. Paul Dubois',
      commentaires: 'Excellente performance académique',
      modules: [
        { nom: 'Mécanique Quantique', coefficient: 3, note: 18.0, statut: 'Validé' },
        { nom: 'Thermodynamique', coefficient: 2, note: 17.5, statut: 'Validé' },
        { nom: 'Optique', coefficient: 2, note: 16.5, statut: 'Validé' },
        { nom: 'Méthodes numériques', coefficient: 1, note: 17.0, statut: 'Validé' }
      ],
      classement: 1,
      totalEtudiants: 25
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

  const getMoyenneColor = (moyenne: number) => {
    if (moyenne >= 16) return '#3f8600';
    if (moyenne >= 14) return '#1890ff';
    if (moyenne >= 12) return '#faad14';
    return '#cf1322';
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
      render: (record: ResultatData) => (
        <div>
          <div className="font-medium">{record.nom} {record.prenom}</div>
          <div className="text-sm text-gray-500">{record.filiere} - {record.niveau}</div>
        </div>
      )
    },
    {
      title: 'Semestre',
      dataIndex: 'semestre',
      key: 'semestre',
    },
    {
      title: 'Moyenne',
      dataIndex: 'moyenne',
      key: 'moyenne',
      render: (moyenne: number) => (
        <span className="font-bold" style={{ color: getMoyenneColor(moyenne) }}>
          {moyenne}/20
        </span>
      )
    },
    {
      title: 'Classement',
      key: 'classement',
      render: (record: ResultatData) => (
        <div>
          <span className="font-medium">{record.classement}</span>
          <span className="text-sm text-gray-500">/{record.totalEtudiants}</span>
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
      title: 'Date publication',
      dataIndex: 'datePublication',
      key: 'datePublication',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      title: 'Validateur',
      dataIndex: 'validateur',
      key: 'validateur',
      render: (validateur: string) => validateur || 'Non assigné'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: ResultatData) => (
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
          <Tooltip title="Modifier">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleViewDetails = (resultat: ResultatData) => {
    setSelectedResultat(resultat);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Résultat créé:', values);
      message.success('Résultat créé avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création du résultat');
    }
  };

  const totalResultats = resultatsData.length;
  const resultatsValides = resultatsData.filter(r => r.statut === 'Validé').length;
  const resultatsEnCours = resultatsData.filter(r => r.statut === 'En cours').length;
  const moyenneGenerale = resultatsData.reduce((sum, r) => sum + r.moyenne, 0) / resultatsData.length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des résultats"
                value={totalResultats}
                valueStyle={{ color: '#1890ff' }}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Résultats validés"
                value={resultatsValides}
                suffix={`/${totalResultats}`}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En cours"
                value={resultatsEnCours}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Moyenne générale"
                value={moyenneGenerale.toFixed(1)}
                suffix="/20"
                valueStyle={{ color: '#722ed1' }}
                prefix={<TrophyOutlined />}
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
              <Select placeholder="Filière" style={{ width: '100%' }}>
                <Option value="all">Toutes les filières</Option>
                <Option value="informatique">Informatique</Option>
                <Option value="gestion">Gestion</Option>
                <Option value="droit">Droit</Option>
                <Option value="langues">Langues</Option>
                <Option value="physique">Physique</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Semestre" style={{ width: '100%' }}>
                <Option value="all">Tous les semestres</Option>
                <Option value="S1">Semestre 1</Option>
                <Option value="S2">Semestre 2</Option>
                <Option value="S3">Semestre 3</Option>
                <Option value="S4">Semestre 4</Option>
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
              <Space>
                <Button type="primary" icon={<FileTextOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouveau résultat
                </Button>
                <Button icon={<BarChartOutlined />}>
                  Statistiques
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des résultats */}
        <Card title="Résultats académiques">
          <Table
            dataSource={resultatsData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: resultatsData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} résultats`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Résultats en attente de validation"
          description="3 résultats sont en attente de validation par les enseignants."
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
        title="Nouveau résultat"
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
                name="semestre"
                label="Semestre"
                rules={[{ required: true, message: 'Veuillez sélectionner le semestre' }]}
              >
                <Select placeholder="Sélectionner le semestre">
                  <Option value="S1">Semestre 1</Option>
                  <Option value="S2">Semestre 2</Option>
                  <Option value="S3">Semestre 3</Option>
                  <Option value="S4">Semestre 4</Option>
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
                name="validateur"
                label="Validateur"
              >
                <Select placeholder="Sélectionner un validateur">
                  <Option value="Dr. Martin Dupont">Dr. Martin Dupont</Option>
                  <Option value="Dr. Claire Moreau">Dr. Claire Moreau</Option>
                  <Option value="Dr. Antoine Rousseau">Dr. Antoine Rousseau</Option>
                  <Option value="Dr. Isabelle Blanc">Dr. Isabelle Blanc</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaires"
                label="Commentaires"
              >
                <TextArea rows={3} placeholder="Commentaires sur les résultats..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer le résultat
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails du résultat"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={900}
      >
        {selectedResultat && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Matricule:</strong> {selectedResultat.matricule}</p>
                  <p><strong>Étudiant:</strong> {selectedResultat.nom} {selectedResultat.prenom}</p>
                  <p><strong>Filière:</strong> {selectedResultat.filiere}</p>
                  <p><strong>Niveau:</strong> {selectedResultat.niveau}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Semestre:</strong> {selectedResultat.semestre}</p>
                  <p><strong>Année académique:</strong> {selectedResultat.anneeAcademique}</p>
                  <p><strong>Statut:</strong> 
                    <Tag color={getStatusColor(selectedResultat.statut)} className="ml-2">
                      {selectedResultat.statut}
                    </Tag>
                  </p>
                  <p><strong>Validateur:</strong> {selectedResultat.validateur || 'Non assigné'}</p>
                </Col>
              </Row>
              <div className="mt-4">
                <p><strong>Commentaires:</strong></p>
                <p className="text-gray-600">{selectedResultat.commentaires}</p>
              </div>
            </Card>

            {/* Détails des modules */}
            <Card title="Détails des modules" size="small">
              <Table
                dataSource={selectedResultat.modules}
                columns={[
                  { title: 'Module', dataIndex: 'nom', key: 'nom' },
                  { title: 'Coefficient', dataIndex: 'coefficient', key: 'coefficient' },
                  { 
                    title: 'Note', 
                    dataIndex: 'note', 
                    key: 'note',
                    render: (note: number) => (
                      <span className="font-medium" style={{ color: getMoyenneColor(note) }}>
                        {note}/20
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
                  }
                ]}
                pagination={false}
                size="small"
              />
              
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic
                      title="Moyenne générale"
                      value={selectedResultat.moyenne}
                      suffix="/20"
                      valueStyle={{ color: getMoyenneColor(selectedResultat.moyenne) }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Classement"
                      value={selectedResultat.classement}
                      suffix={`/${selectedResultat.totalEtudiants}`}
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Pourcentage"
                      value={Math.round((selectedResultat.classement / selectedResultat.totalEtudiants) * 100)}
                      suffix="%"
                      valueStyle={{ color: '#722ed1' }}
                    />
                  </Col>
                </Row>
              </div>
            </Card>

            {/* Actions rapides */}
            <Card title="Actions rapides" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="primary" block icon={<CheckOutlined />}>
                  Valider le résultat
                </Button>
                <Button danger block icon={<CloseOutlined />}>
                  Rejeter le résultat
                </Button>
                <Button block icon={<EditOutlined />}>
                  Modifier les notes
                </Button>
                <Button block icon={<PrinterOutlined />}>
                  Imprimer le bulletin
                </Button>
                <Button block icon={<DownloadOutlined />}>
                  Télécharger le relevé
                </Button>
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Resultats;
