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
  Tabs,
  List,
  Avatar,
  Badge,
  Tooltip,
  Alert,
  Timeline,
  Divider,
  InputNumber,
  Switch,
  Tree,
  Collapse
} from 'antd';
import { 
  BookOutlined, 
  FileTextOutlined, 
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
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FolderOutlined,
  FileOutlined
} from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface Maquette {
  id: string;
  nom: string;
  filiere: string;
  niveau: string;
  anneeAcademique: string;
  statut: 'active' | 'inactive' | 'en_revision' | 'archivee';
  dateCreation: string;
  dateValidation?: string;
  responsable: string;
  credits: number;
  modules: Module[];
  description: string;
  version: string;
}

interface Module {
  id: string;
  nom: string;
  code: string;
  credits: number;
  semestre: number;
  enseignant: string;
  heuresCM: number;
  heuresTD: number;
  heuresTP: number;
  coefficient: number;
  statut: 'obligatoire' | 'optionnel' | 'complementaire';
}

interface MaquetteStats {
  total: number;
  actives: number;
  enRevision: number;
  archivees: number;
  totalCredits: number;
  totalModules: number;
}

const Maquettes: React.FC = () => {
  const [selectedMaquette, setSelectedMaquette] = useState<Maquette | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  // Mock data
  const maquettes: Maquette[] = [
    {
      id: '1',
      nom: 'Maquette Licence Informatique 2023-2024',
      filiere: 'Informatique',
      niveau: 'Licence',
      anneeAcademique: '2023-2024',
      statut: 'active',
      dateCreation: '2023-06-15',
      dateValidation: '2023-07-01',
      responsable: 'Dr. Koné',
      credits: 180,
      version: '1.0',
      description: 'Maquette pédagogique pour la licence en informatique',
      modules: [
        {
          id: '1',
          nom: 'Programmation Web',
          code: 'INFO-301',
          credits: 4,
          semestre: 5,
          enseignant: 'Dr. Traoré',
          heuresCM: 20,
          heuresTD: 30,
          heuresTP: 20,
          coefficient: 2,
          statut: 'obligatoire'
        },
        {
          id: '2',
          nom: 'Base de Données',
          code: 'INFO-302',
          credits: 3,
          semestre: 5,
          enseignant: 'Dr. Diallo',
          heuresCM: 15,
          heuresTD: 25,
          heuresTP: 15,
          coefficient: 1.5,
          statut: 'obligatoire'
        },
        {
          id: '3',
          nom: 'Intelligence Artificielle',
          code: 'INFO-303',
          credits: 3,
          semestre: 6,
          enseignant: 'Dr. Ouattara',
          heuresCM: 20,
          heuresTD: 20,
          heuresTP: 10,
          coefficient: 1.5,
          statut: 'optionnel'
        }
      ]
    },
    {
      id: '2',
      nom: 'Maquette Master Gestion 2023-2024',
      filiere: 'Gestion',
      niveau: 'Master',
      anneeAcademique: '2023-2024',
      statut: 'en_revision',
      dateCreation: '2023-05-20',
      responsable: 'Dr. Traoré',
      credits: 120,
      version: '2.1',
      description: 'Maquette pédagogique pour le master en gestion',
      modules: [
        {
          id: '1',
          nom: 'Gestion de Projet',
          code: 'GEST-401',
          credits: 4,
          semestre: 7,
          enseignant: 'Dr. Koné',
          heuresCM: 25,
          heuresTD: 35,
          heuresTP: 20,
          coefficient: 2,
          statut: 'obligatoire'
        }
      ]
    }
  ];

  const stats: MaquetteStats = {
    total: maquettes.length,
    actives: maquettes.filter(m => m.statut === 'active').length,
    enRevision: maquettes.filter(m => m.statut === 'en_revision').length,
    archivees: maquettes.filter(m => m.statut === 'archivee').length,
    totalCredits: maquettes.reduce((acc, m) => acc + m.credits, 0),
    totalModules: maquettes.reduce((acc, m) => acc + m.modules.length, 0)
  };

  const columns = [
    {
      title: 'Maquette',
      dataIndex: 'nom',
      key: 'nom',
      render: (text: string, record: Maquette) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">v{record.version}</div>
        </div>
      ),
      sorter: (a: Maquette, b: Maquette) => a.nom.localeCompare(b.nom),
    },
    {
      title: 'Filière',
      dataIndex: 'filiere',
      key: 'filiere',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
      filters: [
        { text: 'Informatique', value: 'Informatique' },
        { text: 'Gestion', value: 'Gestion' },
        { text: 'Mathématiques', value: 'Mathématiques' },
        { text: 'Droit', value: 'Droit' },
      ],
    },
    {
      title: 'Niveau',
      dataIndex: 'niveau',
      key: 'niveau',
      render: (text: string) => <Tag color="green">{text}</Tag>,
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut: string) => {
        const colors = {
          active: 'green',
          inactive: 'gray',
          en_revision: 'orange',
          archivee: 'red'
        };
        const labels = {
          active: 'Active',
          inactive: 'Inactive',
          en_revision: 'En révision',
          archivee: 'Archivée'
        };
        return <Tag color={colors[statut as keyof typeof colors]}>{labels[statut as keyof typeof labels]}</Tag>;
      },
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'En révision', value: 'en_revision' },
        { text: 'Archivée', value: 'archivee' },
      ],
    },
    {
      title: 'Crédits',
      dataIndex: 'credits',
      key: 'credits',
      render: (credits: number) => (
        <div className="text-center">
          <div className="font-bold">{credits}</div>
          <div className="text-xs text-gray-500">ECTS</div>
        </div>
      ),
      sorter: (a: Maquette, b: Maquette) => a.credits - b.credits,
    },
    {
      title: 'Modules',
      key: 'modules',
      render: (record: Maquette) => (
        <div className="text-center">
          <div className="font-bold">{record.modules.length}</div>
          <div className="text-xs text-gray-500">modules</div>
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
      render: (record: Maquette) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Détails
          </Button>
          <Button 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEditMaquette(record)}
          >
            Modifier
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewDetails = (maquette: Maquette) => {
    setSelectedMaquette(maquette);
    setIsModalVisible(true);
  };

  const handleEditMaquette = (maquette: Maquette) => {
    setSelectedMaquette(maquette);
    form.setFieldsValue(maquette);
    setIsModalVisible(true);
  };

  const handleAddMaquette = (values: any) => {
    console.log('Nouvelle maquette:', values);
    setIsAddModalVisible(false);
    addForm.resetFields();
  };

  const handleUpdateMaquette = (values: any) => {
    console.log('Maquette mise à jour:', values);
    setIsModalVisible(false);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'active': return 'green';
      case 'inactive': return 'gray';
      case 'en_revision': return 'orange';
      case 'archivee': return 'red';
      default: return 'gray';
    }
  };

  const getModuleStatusColor = (statut: string) => {
    switch (statut) {
      case 'obligatoire': return 'red';
      case 'optionnel': return 'blue';
      case 'complementaire': return 'green';
      default: return 'gray';
    }
  };

  const filteredMaquettes = maquettes.filter(maquette => {
    const matchesSearch = 
      maquette.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      maquette.filiere.toLowerCase().includes(searchText.toLowerCase()) ||
      maquette.responsable.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFilters = Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      return maquette[key as keyof Maquette] === filters[key];
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
              title="Total Maquettes"
              value={stats.total}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Maquettes Actives"
              value={stats.actives}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Crédits"
              value={stats.totalCredits}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Modules"
              value={stats.totalModules}
              prefix={<FolderOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card>
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Input
              placeholder="Rechercher par nom, filière ou responsable..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Filière"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => setFilters({ ...filters, filiere: value })}
            >
              <Option value="Informatique">Informatique</Option>
              <Option value="Gestion">Gestion</Option>
              <Option value="Mathématiques">Mathématiques</Option>
              <Option value="Droit">Droit</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Statut"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => setFilters({ ...filters, statut: value })}
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="en_revision">En révision</Option>
              <Option value="archivee">Archivée</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>
                Nouvelle Maquette
              </Button>
              <Button icon={<ExportOutlined />}>
                Exporter
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Main Table */}
      <Card title="Gestion des Maquettes Pédagogiques" extra={
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
          dataSource={filteredMaquettes} 
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} maquettes`
          }}
        />
      </Card>

      {/* Maquette Details Modal */}
      <Modal
        title={`Détails de la maquette - ${selectedMaquette?.nom}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1000}
      >
        {selectedMaquette && (
          <div className="space-y-6">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Informations Générales" key="1">
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="space-y-4">
                      <div>
                        <label className="font-medium">Filière:</label>
                        <div className="text-gray-600">{selectedMaquette.filiere}</div>
                      </div>
                      <div>
                        <label className="font-medium">Niveau:</label>
                        <div className="text-gray-600">{selectedMaquette.niveau}</div>
                      </div>
                      <div>
                        <label className="font-medium">Année Académique:</label>
                        <div className="text-gray-600">{selectedMaquette.anneeAcademique}</div>
                      </div>
                      <div>
                        <label className="font-medium">Version:</label>
                        <div className="text-gray-600">{selectedMaquette.version}</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="space-y-4">
                      <div>
                        <label className="font-medium">Responsable:</label>
                        <div className="text-gray-600">{selectedMaquette.responsable}</div>
                      </div>
                      <div>
                        <label className="font-medium">Date de création:</label>
                        <div className="text-gray-600">{selectedMaquette.dateCreation}</div>
                      </div>
                      {selectedMaquette.dateValidation && (
                        <div>
                          <label className="font-medium">Date de validation:</label>
                          <div className="text-gray-600">{selectedMaquette.dateValidation}</div>
                        </div>
                      )}
                      <div>
                        <label className="font-medium">Crédits totaux:</label>
                        <div className="text-gray-600">{selectedMaquette.credits} ECTS</div>
                      </div>
                    </div>
                  </Col>
                </Row>
                
                <Divider />
                
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-600">{selectedMaquette.description}</p>
                </div>
              </TabPane>
              
              <TabPane tab="Modules" key="2">
                <Collapse defaultActiveKey={['1']}>
                  {selectedMaquette.modules.map((module, index) => (
                    <Panel 
                      header={
                        <div className="flex justify-between items-center">
                          <span>{module.nom}</span>
                          <Tag color={getModuleStatusColor(module.statut)}>
                            {module.statut === 'obligatoire' ? 'Obligatoire' : 
                             module.statut === 'optionnel' ? 'Optionnel' : 'Complémentaire'}
                          </Tag>
                        </div>
                      } 
                      key={index + 1}
                    >
                      <Row gutter={16}>
                        <Col span={8}>
                          <div className="space-y-2">
                            <div><strong>Code:</strong> {module.code}</div>
                            <div><strong>Crédits:</strong> {module.credits} ECTS</div>
                            <div><strong>Semestre:</strong> {module.semestre}</div>
                            <div><strong>Coefficient:</strong> {module.coefficient}</div>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="space-y-2">
                            <div><strong>Enseignant:</strong> {module.enseignant}</div>
                            <div><strong>Heures CM:</strong> {module.heuresCM}h</div>
                            <div><strong>Heures TD:</strong> {module.heuresTD}h</div>
                            <div><strong>Heures TP:</strong> {module.heuresTP}h</div>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="text-right">
                            <Button size="small" icon={<EditOutlined />}>
                              Modifier
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Panel>
                  ))}
                </Collapse>
                
                <div className="mt-4 text-right">
                  <Button type="primary" icon={<PlusOutlined />}>
                    Ajouter un module
                  </Button>
                </div>
              </TabPane>

              <TabPane tab="Modifier" key="3">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateMaquette}
                  initialValues={selectedMaquette}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="nom" label="Nom de la maquette" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="filiere" label="Filière" rules={[{ required: true }]}>
                        <Select>
                          <Option value="Informatique">Informatique</Option>
                          <Option value="Gestion">Gestion</Option>
                          <Option value="Mathématiques">Mathématiques</Option>
                          <Option value="Droit">Droit</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="niveau" label="Niveau" rules={[{ required: true }]}>
                        <Select>
                          <Option value="Licence">Licence</Option>
                          <Option value="Master">Master</Option>
                          <Option value="Doctorat">Doctorat</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="statut" label="Statut" rules={[{ required: true }]}>
                        <Select>
                          <Option value="active">Active</Option>
                          <Option value="inactive">Inactive</Option>
                          <Option value="en_revision">En révision</Option>
                          <Option value="archivee">Archivée</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="credits" label="Crédits totaux" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="responsable" label="Responsable" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="description" label="Description">
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
              </TabPane>
            </Tabs>
          </div>
        )}
      </Modal>

      {/* Add Maquette Modal */}
      <Modal
        title="Nouvelle maquette pédagogique"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={() => addForm.submit()}
        width={700}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddMaquette}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="nom" label="Nom de la maquette" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="filiere" label="Filière" rules={[{ required: true }]}>
                <Select>
                  <Option value="Informatique">Informatique</Option>
                  <Option value="Gestion">Gestion</Option>
                  <Option value="Mathématiques">Mathématiques</Option>
                  <Option value="Droit">Droit</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="niveau" label="Niveau" rules={[{ required: true }]}>
                <Select>
                  <Option value="Licence">Licence</Option>
                  <Option value="Master">Master</Option>
                  <Option value="Doctorat">Doctorat</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="anneeAcademique" label="Année Académique" rules={[{ required: true }]}>
                <Select>
                  <Option value="2023-2024">2023-2024</Option>
                  <Option value="2024-2025">2024-2025</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="credits" label="Crédits totaux" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="responsable" label="Responsable" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Maquettes;
