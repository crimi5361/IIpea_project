import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Table, 
  Tag, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Space, 
  Statistic, 
  Progress,
  Steps,
  Alert,
  Divider,
  InputNumber,
  Switch,
  Timeline,
  Descriptions,
  Badge,
  Upload,
  message,
  Avatar,
  Tabs
} from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  FilterOutlined,
  SearchOutlined,
  CalendarOutlined,
  BookOutlined,
  UploadOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface Reinscription {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  niveau: string;
  filiere: string;
  anneePrecedente: string;
  anneeDemandee: string;
  statut: 'en_attente' | 'validee' | 'rejetee' | 'terminee';
  dateDemande: string;
  dateValidation?: string;
  motif: string;
  documents: string[];
  commentaires: string;
  moyenne: number;
  credits: number;
  tauxPresence: number;
}

interface ReinscriptionStats {
  total: number;
  enAttente: number;
  validees: number;
  rejetees: number;
  terminees: number;
  tauxValidation: number;
}

const Reinscription: React.FC = () => {
  const [selectedReinscription, setSelectedReinscription] = useState<Reinscription | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  // Mock data
  const reinscriptions: Reinscription[] = [
    {
      id: '1',
      matricule: '2023-001',
      nom: 'Djabou',
      prenom: 'Marie',
      niveau: 'L3',
      filiere: 'Informatique',
      anneePrecedente: '2022-2023',
      anneeDemandee: '2023-2024',
      statut: 'validee',
      dateDemande: '2023-07-15',
      dateValidation: '2023-07-20',
      motif: 'Poursuite normale des études',
      documents: ['Bulletin de notes', 'Certificat de scolarité', 'Justificatif de paiement'],
      commentaires: 'Dossier complet, validation automatique',
      moyenne: 14.5,
      credits: 120,
      tauxPresence: 85
    },
    {
      id: '2',
      matricule: '2023-002',
      nom: 'Traoré',
      prenom: 'Ahmed',
      niveau: 'L2',
      filiere: 'Mathématiques',
      anneePrecedente: '2022-2023',
      anneeDemandee: '2023-2024',
      statut: 'en_attente',
      dateDemande: '2023-07-18',
      motif: 'Redoublement avec amélioration',
      documents: ['Bulletin de notes', 'Lettre de motivation'],
      commentaires: 'En attente de validation du conseil',
      moyenne: 9.8,
      credits: 60,
      tauxPresence: 65
    },
    {
      id: '3',
      matricule: '2023-003',
      nom: 'Koné',
      prenom: 'Fatou',
      niveau: 'M1',
      filiere: 'Gestion',
      anneePrecedente: '2022-2023',
      anneeDemandee: '2023-2024',
      statut: 'rejetee',
      dateDemande: '2023-07-10',
      dateValidation: '2023-07-25',
      motif: 'Changement de filière',
      documents: ['Bulletin de notes', 'Lettre de motivation'],
      commentaires: 'Changement de filière non autorisé',
      moyenne: 11.2,
      credits: 90,
      tauxPresence: 70
    }
  ];

  const stats: ReinscriptionStats = {
    total: reinscriptions.length,
    enAttente: reinscriptions.filter(r => r.statut === 'en_attente').length,
    validees: reinscriptions.filter(r => r.statut === 'validee').length,
    rejetees: reinscriptions.filter(r => r.statut === 'rejetee').length,
    terminees: reinscriptions.filter(r => r.statut === 'terminee').length,
    tauxValidation: Math.round((reinscriptions.filter(r => r.statut === 'validee').length / reinscriptions.length) * 100)
  };

  const columns = [
    {
      title: 'Étudiant',
      dataIndex: 'nom',
      key: 'nom',
      render: (text: string, record: Reinscription) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.prenom} {text}</div>
            <div className="text-xs text-gray-500">{record.matricule}</div>
          </div>
        </Space>
      ),
      sorter: (a: Reinscription, b: Reinscription) => a.nom.localeCompare(b.nom),
    },
    {
      title: 'Niveau',
      dataIndex: 'niveau',
      key: 'niveau',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
      filters: [
        { text: 'L1', value: 'L1' },
        { text: 'L2', value: 'L2' },
        { text: 'L3', value: 'L3' },
        { text: 'M1', value: 'M1' },
        { text: 'M2', value: 'M2' },
      ],
    },
    {
      title: 'Filière',
      dataIndex: 'filiere',
      key: 'filiere',
      render: (text: string) => <Tag color="green">{text}</Tag>,
    },
    {
      title: 'Année',
      key: 'annee',
      render: (record: Reinscription) => (
        <div className="text-center">
          <div className="text-sm">{record.anneePrecedente}</div>
          <div className="text-xs text-gray-500">→ {record.anneeDemandee}</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut: string) => {
        const colors = {
          en_attente: 'orange',
          validee: 'green',
          rejetee: 'red',
          terminee: 'blue'
        };
        const labels = {
          en_attente: 'En attente',
          validee: 'Validée',
          rejetee: 'Rejetée',
          terminee: 'Terminée'
        };
        return <Tag color={colors[statut as keyof typeof colors]}>{labels[statut as keyof typeof labels]}</Tag>;
      },
      filters: [
        { text: 'En attente', value: 'en_attente' },
        { text: 'Validée', value: 'validee' },
        { text: 'Rejetée', value: 'rejetee' },
        { text: 'Terminée', value: 'terminee' },
      ],
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (record: Reinscription) => (
        <div className="text-center">
          <div className="text-sm font-medium" style={{ 
            color: record.moyenne >= 12 ? '#52c41a' : record.moyenne >= 10 ? '#faad14' : '#f5222d' 
          }}>
            {record.moyenne}/20
          </div>
          <div className="text-xs text-gray-500">{record.credits} crédits</div>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'dateDemande',
      key: 'dateDemande',
      render: (date: string) => (
        <div className="text-sm">{date}</div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Reinscription) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Détails
          </Button>
          {record.statut === 'en_attente' && (
            <Button 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEditReinscription(record)}
          >
            Traiter
          </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleViewDetails = (reinscription: Reinscription) => {
    setSelectedReinscription(reinscription);
    setIsModalVisible(true);
  };

  const handleEditReinscription = (reinscription: Reinscription) => {
    setSelectedReinscription(reinscription);
    form.setFieldsValue(reinscription);
    setIsModalVisible(true);
  };

  const handleAddReinscription = (values: any) => {
    console.log('Nouvelle réinscription:', values);
    message.success('Demande de réinscription créée avec succès');
    setIsAddModalVisible(false);
    addForm.resetFields();
  };

  const handleUpdateReinscription = (values: any) => {
    console.log('Réinscription mise à jour:', values);
    message.success('Statut mis à jour avec succès');
    setIsModalVisible(false);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'orange';
      case 'validee': return 'green';
      case 'rejetee': return 'red';
      case 'terminee': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'en_attente': return <ClockCircleOutlined />;
      case 'validee': return <CheckCircleOutlined />;
      case 'rejetee': return <ExclamationCircleOutlined />;
      case 'terminee': return <CheckCircleOutlined />;
      default: return <ClockCircleOutlined />;
    }
  };

  const filteredReinscriptions = reinscriptions.filter(reinscription => {
    const matchesSearch = 
      reinscription.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      reinscription.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
      reinscription.matricule.includes(searchText);
    
    const matchesFilters = Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      return reinscription[key as keyof Reinscription] === filters[key];
    });

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="space-y-6">
      <PageHeader />
      
      {/* Statistics Cards */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Demandes"
              value={stats.total}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En attente"
              value={stats.enAttente}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Validées"
              value={stats.validees}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Taux de validation"
              value={stats.tauxValidation}
              suffix="%"
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card>
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Input
              placeholder="Rechercher par nom, prénom ou matricule..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Niveau"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => setFilters({ ...filters, niveau: value })}
            >
              <Option value="L1">L1</Option>
              <Option value="L2">L2</Option>
              <Option value="L3">L3</Option>
              <Option value="M1">M1</Option>
              <Option value="M2">M2</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Statut"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => setFilters({ ...filters, statut: value })}
            >
              <Option value="en_attente">En attente</Option>
              <Option value="validee">Validée</Option>
              <Option value="rejetee">Rejetée</Option>
              <Option value="terminee">Terminée</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>
                Nouvelle Demande
              </Button>
              <Button icon={<ExportOutlined />}>
                Exporter
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Main Table */}
      <Card title="Gestion des Réinscriptions" extra={
        <Space>
          <Button icon={<FilterOutlined />}>
            Filtres Avancés
          </Button>
          <Button icon={<ImportOutlined />}>
            Importer
          </Button>
        </Space>
      }>
        <Table 
          columns={columns} 
          dataSource={filteredReinscriptions} 
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} demandes`
          }}
        />
      </Card>

      {/* Reinscription Details Modal */}
      <Modal
        title={`Détails de la réinscription - ${selectedReinscription?.prenom} ${selectedReinscription?.nom}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={900}
      >
        {selectedReinscription && (
          <div className="space-y-6">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Informations Générales" key="1">
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="Matricule">{selectedReinscription.matricule}</Descriptions.Item>
                  <Descriptions.Item label="Niveau">{selectedReinscription.niveau}</Descriptions.Item>
                  <Descriptions.Item label="Filière">{selectedReinscription.filiere}</Descriptions.Item>
                  <Descriptions.Item label="Année précédente">{selectedReinscription.anneePrecedente}</Descriptions.Item>
                  <Descriptions.Item label="Année demandée">{selectedReinscription.anneeDemandee}</Descriptions.Item>
                  <Descriptions.Item label="Date de demande">{selectedReinscription.dateDemande}</Descriptions.Item>
                  {selectedReinscription.dateValidation && (
                    <Descriptions.Item label="Date de validation">{selectedReinscription.dateValidation}</Descriptions.Item>
                  )}
                  <Descriptions.Item label="Moyenne">{selectedReinscription.moyenne}/20</Descriptions.Item>
                  <Descriptions.Item label="Crédits acquis">{selectedReinscription.credits}</Descriptions.Item>
                  <Descriptions.Item label="Taux de présence">{selectedReinscription.tauxPresence}%</Descriptions.Item>
                </Descriptions>
                
                <Divider />
                
                <div>
                  <h4 className="font-medium mb-2">Motif de la réinscription</h4>
                  <p className="text-gray-600">{selectedReinscription.motif}</p>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Documents fournis</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedReinscription.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
                
                {selectedReinscription.commentaires && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Commentaires</h4>
                    <p className="text-gray-600">{selectedReinscription.commentaires}</p>
                  </div>
                )}
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Processus" key="2">
                <Steps current={selectedReinscription.statut === 'en_attente' ? 0 : 
                               selectedReinscription.statut === 'validee' ? 1 : 
                               selectedReinscription.statut === 'terminee' ? 2 : 0}>
                  <Step title="Demande soumise" description={selectedReinscription.dateDemande} />
                  <Step title="Validation" description={selectedReinscription.dateValidation || 'En cours'} />
                  <Step title="Terminée" description="Processus terminé" />
                </Steps>
                
                <Divider />
                
                <Timeline>
                  <Timeline.Item dot={getStatusIcon(selectedReinscription.statut)}>
                    <div className="font-medium">Demande de réinscription soumise</div>
                    <div className="text-sm text-gray-500">{selectedReinscription.dateDemande}</div>
                  </Timeline.Item>
                  
                  {selectedReinscription.statut !== 'en_attente' && (
                    <Timeline.Item dot={<CheckCircleOutlined />}>
                      <div className="font-medium">Demande traitée</div>
                      <div className="text-sm text-gray-500">{selectedReinscription.dateValidation}</div>
                      <div className="text-sm">
                        Statut: {selectedReinscription.statut === 'validee' ? 'Validée' : 
                                selectedReinscription.statut === 'rejetee' ? 'Rejetée' : 'Terminée'}
                      </div>
                    </Timeline.Item>
                  )}
                </Timeline>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Traiter" key="3">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateReinscription}
                  initialValues={selectedReinscription}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="statut" label="Statut" rules={[{ required: true }]}>
                        <Select>
                          <Option value="en_attente">En attente</Option>
                          <Option value="validee">Validée</Option>
                          <Option value="rejetee">Rejetée</Option>
                          <Option value="terminee">Terminée</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="dateValidation" label="Date de validation">
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="commentaires" label="Commentaires">
                        <TextArea rows={3} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <Button type="primary" htmlType="submit">
                      Mettre à jour
                    </Button>
                  </div>
                </Form>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </Modal>

      {/* Add Reinscription Modal */}
      <Modal
        title="Nouvelle demande de réinscription"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={() => addForm.submit()}
        width={700}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddReinscription}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="prenom" label="Prénom" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="matricule" label="Matricule" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="niveau" label="Niveau" rules={[{ required: true }]}>
                <Select>
                  <Option value="L1">L1</Option>
                  <Option value="L2">L2</Option>
                  <Option value="L3">L3</Option>
                  <Option value="M1">M1</Option>
                  <Option value="M2">M2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="filiere" label="Filière" rules={[{ required: true }]}>
                <Select>
                  <Option value="Informatique">Informatique</Option>
                  <Option value="Mathématiques">Mathématiques</Option>
                  <Option value="Gestion">Gestion</Option>
                  <Option value="Droit">Droit</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="anneeDemandee" label="Année demandée" rules={[{ required: true }]}>
                <Select>
                  <Option value="2023-2024">2023-2024</Option>
                  <Option value="2024-2025">2024-2025</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="moyenne" label="Moyenne" rules={[{ required: true }]}>
                <InputNumber min={0} max={20} step={0.1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="credits" label="Crédits acquis" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="motif" label="Motif de la réinscription" rules={[{ required: true }]}>
                <TextArea rows={3} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="documents" label="Documents à fournir">
                <Upload>
                  <Button icon={<UploadOutlined />}>Télécharger des documents</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Reinscription;
