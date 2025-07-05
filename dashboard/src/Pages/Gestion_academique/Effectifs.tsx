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
  Avatar,
  Badge,
  Tooltip,
  Alert,
  Timeline,
  Divider,
  InputNumber,
  Switch
} from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  BarChartOutlined, 
  PieChartOutlined,
  LineChartOutlined,
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
  TrophyOutlined
} from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface Effectif {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  niveau: string;
  filiere: string;
  classe: string;
  anneeAcademique: string;
  statut: 'actif' | 'inactif' | 'suspendu' | 'diplome';
  dateInscription: string;
  dernierePresence: string;
  tauxPresence: number;
  moyenne: number;
  credits: number;
  photo?: string;
}

interface EffectifStats {
  total: number;
  actifs: number;
  inactifs: number;
  suspendus: number;
  diplomes: number;
  tauxPresenceMoyen: number;
  moyenneGenerale: number;
}

const Effectifs: React.FC = () => {
  const [selectedEffectif, setSelectedEffectif] = useState<Effectif | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  // Mock data
  const effectifs: Effectif[] = [
    {
      id: '1',
      matricule: '2024-001',
      nom: 'Djabou',
      prenom: 'Marie',
      niveau: 'L3',
      filiere: 'Informatique',
      classe: 'L3-INFO-A',
      anneeAcademique: '2023-2024',
      statut: 'actif',
      dateInscription: '2023-09-15',
      dernierePresence: '2024-01-15',
      tauxPresence: 85,
      moyenne: 14.5,
      credits: 120
    },
    {
      id: '2',
      matricule: '2024-002',
      nom: 'Traoré',
      prenom: 'Ahmed',
      niveau: 'L2',
      filiere: 'Mathématiques',
      classe: 'L2-MATH-B',
      anneeAcademique: '2023-2024',
      statut: 'actif',
      dateInscription: '2023-09-10',
      dernierePresence: '2024-01-14',
      tauxPresence: 72,
      moyenne: 12.8,
      credits: 90
    },
    {
      id: '3',
      matricule: '2024-003',
      nom: 'Koné',
      prenom: 'Fatou',
      niveau: 'M1',
      filiere: 'Gestion',
      classe: 'M1-GEST-A',
      anneeAcademique: '2023-2024',
      statut: 'suspendu',
      dateInscription: '2023-09-20',
      dernierePresence: '2024-01-10',
      tauxPresence: 45,
      moyenne: 9.2,
      credits: 60
    },
    {
      id: '4',
      matricule: '2023-001',
      nom: 'Diallo',
      prenom: 'Moussa',
      niveau: 'L3',
      filiere: 'Droit',
      classe: 'L3-DROIT-A',
      anneeAcademique: '2022-2023',
      statut: 'diplome',
      dateInscription: '2022-09-15',
      dernierePresence: '2023-06-30',
      tauxPresence: 88,
      moyenne: 16.2,
      credits: 180
    }
  ];

  const stats: EffectifStats = {
    total: effectifs.length,
    actifs: effectifs.filter(e => e.statut === 'actif').length,
    inactifs: effectifs.filter(e => e.statut === 'inactif').length,
    suspendus: effectifs.filter(e => e.statut === 'suspendu').length,
    diplomes: effectifs.filter(e => e.statut === 'diplome').length,
    tauxPresenceMoyen: Math.round(effectifs.reduce((acc, e) => acc + e.tauxPresence, 0) / effectifs.length),
    moyenneGenerale: Math.round((effectifs.reduce((acc, e) => acc + e.moyenne, 0) / effectifs.length) * 10) / 10
  };

  const columns = [
    {
      title: 'Étudiant',
      dataIndex: 'nom',
      key: 'nom',
      render: (text: string, record: Effectif) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.prenom} {text}</div>
            <div className="text-xs text-gray-500">{record.matricule}</div>
          </div>
        </Space>
      ),
      sorter: (a: Effectif, b: Effectif) => a.nom.localeCompare(b.nom),
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
      title: 'Classe',
      dataIndex: 'classe',
      key: 'classe',
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut: string) => {
        const colors = {
          actif: 'green',
          inactif: 'gray',
          suspendu: 'orange',
          diplome: 'blue'
        };
        const labels = {
          actif: 'Actif',
          inactif: 'Inactif',
          suspendu: 'Suspendu',
          diplome: 'Diplômé'
        };
        return <Tag color={colors[statut as keyof typeof colors]}>{labels[statut as keyof typeof labels]}</Tag>;
      },
      filters: [
        { text: 'Actif', value: 'actif' },
        { text: 'Inactif', value: 'inactif' },
        { text: 'Suspendu', value: 'suspendu' },
        { text: 'Diplômé', value: 'diplome' },
      ],
    },
    {
      title: 'Présence',
      dataIndex: 'tauxPresence',
      key: 'tauxPresence',
      render: (taux: number) => (
        <div>
          <Progress percent={taux} size="small" strokeColor={taux > 80 ? '#52c41a' : taux > 60 ? '#faad14' : '#f5222d'} />
          <div className="text-xs text-gray-500">{taux}%</div>
        </div>
      ),
      sorter: (a: Effectif, b: Effectif) => a.tauxPresence - b.tauxPresence,
    },
    {
      title: 'Moyenne',
      dataIndex: 'moyenne',
      key: 'moyenne',
      render: (moyenne: number) => (
        <div className="text-center">
          <div className="font-bold" style={{ color: moyenne >= 14 ? '#52c41a' : moyenne >= 10 ? '#faad14' : '#f5222d' }}>
            {moyenne}/20
          </div>
        </div>
      ),
      sorter: (a: Effectif, b: Effectif) => a.moyenne - b.moyenne,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Effectif) => (
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
            onClick={() => handleEditEffectif(record)}
          >
            Modifier
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewDetails = (effectif: Effectif) => {
    setSelectedEffectif(effectif);
    setIsModalVisible(true);
  };

  const handleEditEffectif = (effectif: Effectif) => {
    setSelectedEffectif(effectif);
    form.setFieldsValue(effectif);
    setIsModalVisible(true);
  };

  const handleAddEffectif = (values: any) => {
    console.log('Nouvel effectif:', values);
    setIsAddModalVisible(false);
    addForm.resetFields();
  };

  const handleUpdateEffectif = (values: any) => {
    console.log('Effectif mis à jour:', values);
    setIsModalVisible(false);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'actif': return 'green';
      case 'inactif': return 'gray';
      case 'suspendu': return 'orange';
      case 'diplome': return 'blue';
      default: return 'gray';
    }
  };

  const filteredEffectifs = effectifs.filter(effectif => {
    const matchesSearch = 
      effectif.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      effectif.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
      effectif.matricule.includes(searchText);
    
    const matchesFilters = Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      return effectif[key as keyof Effectif] === filters[key];
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
              title="Total Effectifs"
              value={stats.total}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Étudiants Actifs"
              value={stats.actifs}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Taux de Présence Moyen"
              value={stats.tauxPresenceMoyen}
              suffix="%"
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Moyenne Générale"
              value={stats.moyenneGenerale}
              suffix="/20"
              prefix={<TrophyOutlined />}
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
              placeholder="Statut"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => setFilters({ ...filters, statut: value })}
            >
              <Option value="actif">Actif</Option>
              <Option value="inactif">Inactif</Option>
              <Option value="suspendu">Suspendu</Option>
              <Option value="diplome">Diplômé</Option>
            </Select>
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
              placeholder="Filière"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => setFilters({ ...filters, filiere: value })}
            >
              <Option value="Informatique">Informatique</Option>
              <Option value="Mathématiques">Mathématiques</Option>
              <Option value="Gestion">Gestion</Option>
              <Option value="Droit">Droit</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>
                Ajouter
              </Button>
              <Button icon={<ExportOutlined />}>
                Exporter
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Main Table */}
      <Card title="Liste des Effectifs" extra={
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
          dataSource={filteredEffectifs} 
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} effectifs`
          }}
        />
      </Card>

      {/* Effectif Details Modal */}
      <Modal
        title={`Détails de l'effectif - ${selectedEffectif?.prenom} ${selectedEffectif?.nom}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedEffectif && (
          <div className="space-y-6">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Informations Générales" key="1">
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="space-y-4">
                      <div>
                        <label className="font-medium">Matricule:</label>
                        <div className="text-gray-600">{selectedEffectif.matricule}</div>
                      </div>
                      <div>
                        <label className="font-medium">Niveau:</label>
                        <div className="text-gray-600">{selectedEffectif.niveau}</div>
                      </div>
                      <div>
                        <label className="font-medium">Filière:</label>
                        <div className="text-gray-600">{selectedEffectif.filiere}</div>
                      </div>
                      <div>
                        <label className="font-medium">Classe:</label>
                        <div className="text-gray-600">{selectedEffectif.classe}</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="space-y-4">
                      <div>
                        <label className="font-medium">Année Académique:</label>
                        <div className="text-gray-600">{selectedEffectif.anneeAcademique}</div>
                      </div>
                      <div>
                        <label className="font-medium">Date d'inscription:</label>
                        <div className="text-gray-600">{selectedEffectif.dateInscription}</div>
                      </div>
                      <div>
                        <label className="font-medium">Dernière présence:</label>
                        <div className="text-gray-600">{selectedEffectif.dernierePresence}</div>
                      </div>
                      <div>
                        <label className="font-medium">Crédits acquis:</label>
                        <div className="text-gray-600">{selectedEffectif.credits}</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              
              <TabPane tab="Performance" key="2">
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="Taux de Présence">
                      <Progress 
                        type="circle" 
                        percent={selectedEffectif.tauxPresence}
                        strokeColor={selectedEffectif.tauxPresence > 80 ? '#52c41a' : selectedEffectif.tauxPresence > 60 ? '#faad14' : '#f5222d'}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Moyenne Générale">
                      <div className="text-center">
                        <div className="text-3xl font-bold" style={{ 
                          color: selectedEffectif.moyenne >= 14 ? '#52c41a' : selectedEffectif.moyenne >= 10 ? '#faad14' : '#f5222d' 
                        }}>
                          {selectedEffectif.moyenne}/20
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Modifier" key="3">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateEffectif}
                  initialValues={selectedEffectif}
                >
                  <Row gutter={16}>
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
                      <Form.Item name="classe" label="Classe" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="statut" label="Statut" rules={[{ required: true }]}>
                        <Select>
                          <Option value="actif">Actif</Option>
                          <Option value="inactif">Inactif</Option>
                          <Option value="suspendu">Suspendu</Option>
                          <Option value="diplome">Diplômé</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="tauxPresence" label="Taux de Présence (%)" rules={[{ required: true }]}>
                        <InputNumber min={0} max={100} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="moyenne" label="Moyenne" rules={[{ required: true }]}>
                        <InputNumber min={0} max={20} step={0.1} style={{ width: '100%' }} />
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

      {/* Add Effectif Modal */}
      <Modal
        title="Ajouter un nouvel effectif"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={() => addForm.submit()}
        width={600}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddEffectif}
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
              <Form.Item name="classe" label="Classe" rules={[{ required: true }]}>
                <Input />
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
              <Form.Item name="dateInscription" label="Date d'inscription" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Effectifs;
