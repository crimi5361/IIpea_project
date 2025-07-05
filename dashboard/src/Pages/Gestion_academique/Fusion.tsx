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
  Tabs
} from 'antd';
import { 
  MergeCellsOutlined, 
  TeamOutlined, 
  BookOutlined, 
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  FilterOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface FusionRequest {
  id: string;
  type: 'classe' | 'filiere';
  source1: string;
  source2: string;
  destination: string;
  statut: 'en_attente' | 'en_cours' | 'terminee' | 'annulee';
  dateCreation: string;
  dateExecution?: string;
  initiateur: string;
  effectifsSource1: number;
  effectifsSource2: number;
  effectifsDestination: number;
  commentaires: string;
  raison: string;
}

interface FusionStats {
  total: number;
  enAttente: number;
  enCours: number;
  terminees: number;
  annulees: number;
  effectifsFusionnes: number;
}

const Fusion: React.FC = () => {
  const [selectedFusion, setSelectedFusion] = useState<FusionRequest | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  // Mock data
  const fusions: FusionRequest[] = [
    {
      id: '1',
      type: 'classe',
      source1: 'L3-INFO-A',
      source2: 'L3-INFO-B',
      destination: 'L3-INFO-UNIFIED',
      statut: 'terminee',
      dateCreation: '2024-01-10',
      dateExecution: '2024-01-15',
      initiateur: 'Dr. Koné',
      effectifsSource1: 25,
      effectifsSource2: 22,
      effectifsDestination: 47,
      commentaires: 'Fusion réussie, tous les étudiants transférés',
      raison: 'Optimisation des effectifs et des ressources'
    },
    {
      id: '2',
      type: 'filiere',
      source1: 'Informatique',
      source2: 'Mathématiques Appliquées',
      destination: 'Informatique et Mathématiques',
      statut: 'en_cours',
      dateCreation: '2024-01-12',
      initiateur: 'Dr. Traoré',
      effectifsSource1: 120,
      effectifsSource2: 85,
      effectifsDestination: 0,
      commentaires: 'Processus en cours de validation',
      raison: 'Création d\'une filière interdisciplinaire'
    },
    {
      id: '3',
      type: 'classe',
      source1: 'M1-GEST-A',
      source2: 'M1-GEST-B',
      destination: 'M1-GEST-UNIFIED',
      statut: 'en_attente',
      dateCreation: '2024-01-14',
      initiateur: 'Dr. Diallo',
      effectifsSource1: 18,
      effectifsSource2: 15,
      effectifsDestination: 0,
      commentaires: 'En attente d\'approbation du conseil',
      raison: 'Réduction du nombre de classes'
    }
  ];

  const stats: FusionStats = {
    total: fusions.length,
    enAttente: fusions.filter(f => f.statut === 'en_attente').length,
    enCours: fusions.filter(f => f.statut === 'en_cours').length,
    terminees: fusions.filter(f => f.statut === 'terminee').length,
    annulees: fusions.filter(f => f.statut === 'annulee').length,
    effectifsFusionnes: fusions.filter(f => f.statut === 'terminee').reduce((acc, f) => acc + f.effectifsDestination, 0)
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'classe' ? 'blue' : 'green'}>
          {type === 'classe' ? 'Classe' : 'Filière'}
        </Tag>
      ),
      filters: [
        { text: 'Classe', value: 'classe' },
        { text: 'Filière', value: 'filiere' },
      ],
    },
    {
      title: 'Sources',
      key: 'sources',
      render: (record: FusionRequest) => (
        <div>
          <div className="text-sm">{record.source1}</div>
          <div className="text-sm text-gray-500">+ {record.source2}</div>
        </div>
      ),
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut: string) => {
        const colors = {
          en_attente: 'orange',
          en_cours: 'blue',
          terminee: 'green',
          annulee: 'red'
        };
        const labels = {
          en_attente: 'En attente',
          en_cours: 'En cours',
          terminee: 'Terminée',
          annulee: 'Annulée'
        };
        return <Tag color={colors[statut as keyof typeof colors]}>{labels[statut as keyof typeof labels]}</Tag>;
      },
      filters: [
        { text: 'En attente', value: 'en_attente' },
        { text: 'En cours', value: 'en_cours' },
        { text: 'Terminée', value: 'terminee' },
        { text: 'Annulée', value: 'annulee' },
      ],
    },
    {
      title: 'Effectifs',
      key: 'effectifs',
      render: (record: FusionRequest) => (
        <div className="text-center">
          <div className="text-sm">
            {record.effectifsSource1} + {record.effectifsSource2}
          </div>
          <div className="text-xs text-gray-500">
            → {record.effectifsDestination || 'En cours'}
          </div>
        </div>
      ),
    },
    {
      title: 'Initié par',
      dataIndex: 'initiateur',
      key: 'initiateur',
    },
    {
      title: 'Date',
      dataIndex: 'dateCreation',
      key: 'dateCreation',
      render: (date: string) => (
        <div className="text-sm">{date}</div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: FusionRequest) => (
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
            onClick={() => handleEditFusion(record)}
          >
            Modifier
          </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleViewDetails = (fusion: FusionRequest) => {
    setSelectedFusion(fusion);
    setIsModalVisible(true);
  };

  const handleEditFusion = (fusion: FusionRequest) => {
    setSelectedFusion(fusion);
    form.setFieldsValue(fusion);
    setIsModalVisible(true);
  };

  const handleAddFusion = (values: any) => {
    console.log('Nouvelle fusion:', values);
    setIsAddModalVisible(false);
    addForm.resetFields();
  };

  const handleUpdateFusion = (values: any) => {
    console.log('Fusion mise à jour:', values);
    setIsModalVisible(false);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'orange';
      case 'en_cours': return 'blue';
      case 'terminee': return 'green';
      case 'annulee': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'en_attente': return <ClockCircleOutlined />;
      case 'en_cours': return <ExclamationCircleOutlined />;
      case 'terminee': return <CheckCircleOutlined />;
      case 'annulee': return <ExclamationCircleOutlined />;
      default: return <ClockCircleOutlined />;
    }
  };

  const filteredFusions = fusions.filter(fusion => {
    const matchesSearch = 
      fusion.source1.toLowerCase().includes(searchText.toLowerCase()) ||
      fusion.source2.toLowerCase().includes(searchText.toLowerCase()) ||
      fusion.destination.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFilters = Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      return fusion[key as keyof FusionRequest] === filters[key];
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
              title="Total Fusions"
              value={stats.total}
              prefix={<MergeCellsOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En cours"
              value={stats.enCours}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Terminées"
              value={stats.terminees}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Effectifs Fusionnés"
              value={stats.effectifsFusionnes}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card>
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Input
              placeholder="Rechercher par source ou destination..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Type"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => setFilters({ ...filters, type: value })}
            >
              <Option value="classe">Classe</Option>
              <Option value="filiere">Filière</Option>
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
              <Option value="en_cours">En cours</Option>
              <Option value="terminee">Terminée</Option>
              <Option value="annulee">Annulée</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>
                Nouvelle Fusion
              </Button>
              <Button icon={<ExportOutlined />}>
                Exporter
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Main Table */}
      <Card title="Gestion des Fusions" extra={
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
          dataSource={filteredFusions} 
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} fusions`
          }}
        />
      </Card>

      {/* Fusion Details Modal */}
      <Modal
        title={`Détails de la fusion - ${selectedFusion?.source1} + ${selectedFusion?.source2}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={900}
      >
        {selectedFusion && (
          <div className="space-y-6">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Informations Générales" key="1">
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="Type de fusion">
                    <Tag color={selectedFusion.type === 'classe' ? 'blue' : 'green'}>
                      {selectedFusion.type === 'classe' ? 'Classe' : 'Filière'}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Statut">
                    <Tag color={getStatusColor(selectedFusion.statut)}>
                      {selectedFusion.statut === 'en_attente' ? 'En attente' : 
                       selectedFusion.statut === 'en_cours' ? 'En cours' : 
                       selectedFusion.statut === 'terminee' ? 'Terminée' : 'Annulée'}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Source 1">{selectedFusion.source1}</Descriptions.Item>
                  <Descriptions.Item label="Source 2">{selectedFusion.source2}</Descriptions.Item>
                  <Descriptions.Item label="Destination">{selectedFusion.destination}</Descriptions.Item>
                  <Descriptions.Item label="Initié par">{selectedFusion.initiateur}</Descriptions.Item>
                  <Descriptions.Item label="Date de création">{selectedFusion.dateCreation}</Descriptions.Item>
                  {selectedFusion.dateExecution && (
                    <Descriptions.Item label="Date d'exécution">{selectedFusion.dateExecution}</Descriptions.Item>
                  )}
                  <Descriptions.Item label="Effectifs Source 1">{selectedFusion.effectifsSource1}</Descriptions.Item>
                  <Descriptions.Item label="Effectifs Source 2">{selectedFusion.effectifsSource2}</Descriptions.Item>
                  <Descriptions.Item label="Effectifs Destination">{selectedFusion.effectifsDestination || 'En cours'}</Descriptions.Item>
                </Descriptions>
                
                <Divider />
                
                <div>
                  <h4 className="font-medium mb-2">Raison de la fusion</h4>
                  <p className="text-gray-600">{selectedFusion.raison}</p>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Commentaires</h4>
                  <p className="text-gray-600">{selectedFusion.commentaires}</p>
                </div>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="Processus" key="2">
                <Steps current={selectedFusion.statut === 'en_attente' ? 0 : 
                               selectedFusion.statut === 'en_cours' ? 1 : 
                               selectedFusion.statut === 'terminee' ? 2 : 0}>
                  <Step title="Demande créée" description={selectedFusion.dateCreation} />
                  <Step title="Validation en cours" description="En cours de validation" />
                  <Step title="Fusion terminée" description={selectedFusion.dateExecution} />
                </Steps>
                
                <Divider />
                
                <Timeline>
                  <Timeline.Item dot={getStatusIcon(selectedFusion.statut)}>
                    <div className="font-medium">Demande de fusion créée</div>
                    <div className="text-sm text-gray-500">{selectedFusion.dateCreation}</div>
                    <div className="text-sm">Par {selectedFusion.initiateur}</div>
                  </Timeline.Item>
                  
                  {selectedFusion.statut !== 'en_attente' && (
                    <Timeline.Item dot={<ExclamationCircleOutlined />}>
                      <div className="font-medium">Validation approuvée</div>
                      <div className="text-sm text-gray-500">Processus de fusion lancé</div>
                    </Timeline.Item>
                  )}
                  
                  {selectedFusion.statut === 'terminee' && (
                    <Timeline.Item dot={<CheckCircleOutlined />}>
                      <div className="font-medium">Fusion terminée</div>
                      <div className="text-sm text-gray-500">{selectedFusion.dateExecution}</div>
                      <div className="text-sm">{selectedFusion.effectifsDestination} étudiants transférés</div>
                    </Timeline.Item>
                  )}
                </Timeline>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Modifier" key="3">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateFusion}
                  initialValues={selectedFusion}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="destination" label="Destination" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="statut" label="Statut" rules={[{ required: true }]}>
                        <Select>
                          <Option value="en_attente">En attente</Option>
                          <Option value="en_cours">En cours</Option>
                          <Option value="terminee">Terminée</Option>
                          <Option value="annulee">Annulée</Option>
                        </Select>
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

      {/* Add Fusion Modal */}
      <Modal
        title="Nouvelle demande de fusion"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={() => addForm.submit()}
        width={700}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddFusion}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="Type de fusion" rules={[{ required: true }]}>
                <Select>
                  <Option value="classe">Classe</Option>
                  <Option value="filiere">Filière</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="initiateur" label="Initié par" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="source1" label="Source 1" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="source2" label="Source 2" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="destination" label="Destination" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="effectifsSource1" label="Effectifs Source 1" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="effectifsSource2" label="Effectifs Source 2" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="raison" label="Raison de la fusion" rules={[{ required: true }]}>
                <TextArea rows={3} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="commentaires" label="Commentaires">
                <TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Fusion;
