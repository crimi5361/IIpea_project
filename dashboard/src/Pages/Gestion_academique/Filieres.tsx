import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, BookOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

interface Filiere {
  id: number;
  nom: string;
  code: string;
  responsable: string;
  effectif: number;
  capacite: number;
  tauxReussite: number;
  statut: string;
  niveau: string;
  duree: number;
  description: string;
  dateCreation: string;
}

const Filieres = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [niveauFilter, setNiveauFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFiliere, setEditingFiliere] = useState<Filiere | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les filières
  const filieres: Filiere[] = [
    {
      id: 1,
      nom: 'Informatique',
      code: 'INFO',
      responsable: 'Dr. Jean Dupont',
      effectif: 156,
      capacite: 180,
      tauxReussite: 85.2,
      statut: 'Active',
      niveau: 'Licence',
      duree: 3,
      description: 'Formation en informatique avec spécialisation en développement web et mobile',
      dateCreation: '2020-09-01'
    },
    {
      id: 2,
      nom: 'Mathématiques',
      code: 'MATH',
      responsable: 'Dr. Marie Martin',
      effectif: 134,
      capacite: 150,
      tauxReussite: 82.1,
      statut: 'Active',
      niveau: 'Licence',
      duree: 3,
      description: 'Formation en mathématiques appliquées et théoriques',
      dateCreation: '2019-09-01'
    },
    {
      id: 3,
      nom: 'Physique',
      code: 'PHYS',
      responsable: 'Dr. Pierre Bernard',
      effectif: 98,
      capacite: 120,
      tauxReussite: 79.8,
      statut: 'Active',
      niveau: 'Licence',
      duree: 3,
      description: 'Formation en physique fondamentale et appliquée',
      dateCreation: '2018-09-01'
    },
    {
      id: 4,
      nom: 'Chimie',
      code: 'CHIM',
      responsable: 'Dr. Sophie Leroy',
      effectif: 76,
      capacite: 100,
      tauxReussite: 91.2,
      statut: 'Active',
      niveau: 'Master',
      duree: 2,
      description: 'Formation en chimie organique et inorganique',
      dateCreation: '2021-09-01'
    },
    {
      id: 5,
      nom: 'Biologie',
      code: 'BIO',
      responsable: 'Dr. Marc Dubois',
      effectif: 142,
      capacite: 160,
      tauxReussite: 81.3,
      statut: 'En développement',
      niveau: 'Licence',
      duree: 3,
      description: 'Formation en biologie moléculaire et cellulaire',
      dateCreation: '2022-09-01'
    }
  ];

  const columns = [
    {
      title: 'Filière',
      key: 'filiere',
      render: (_: any, record: Filiere) => (
        <div>
          <div className="font-medium">{record.nom}</div>
          <div className="text-sm text-gray-500">Code: {record.code}</div>
        </div>
      ),
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Effectif',
      key: 'effectif',
      render: (_: any, record: Filiere) => (
        <div>
          <div className="font-semibold">{record.effectif}/{record.capacite}</div>
          <Progress 
            percent={Math.round((record.effectif / record.capacite) * 100)} 
            size="small" 
            showInfo={false}
            strokeColor={record.effectif / record.capacite > 0.9 ? '#ff4d4f' : '#52c41a'}
          />
        </div>
      ),
    },
    {
      title: 'Taux de réussite',
      dataIndex: 'tauxReussite',
      key: 'tauxReussite',
      render: (taux: number) => (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{taux}%</span>
          <Progress percent={taux} size="small" showInfo={false} />
        </div>
      ),
    },
    {
      title: 'Niveau',
      dataIndex: 'niveau',
      key: 'niveau',
      render: (niveau: string) => (
        <Tag color={niveau === 'Master' ? 'blue' : 'green'}>
          {niveau}
        </Tag>
      ),
    },
    {
      title: 'Durée',
      dataIndex: 'duree',
      key: 'duree',
      render: (duree: number) => (
        <span>{duree} an(s)</span>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Filiere) => {
        const statusConfig = {
          'Active': { color: 'green' },
          'En développement': { color: 'orange' },
          'Suspendue': { color: 'red' },
        };
        const config = statusConfig[record.statut as keyof typeof statusConfig];
        return (
          <Tag color={config?.color}>
            {record.statut}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Filiere) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} size="small" />
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

  const filteredData = filieres.filter(filiere => {
    const matchesSearch = 
      filiere.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      filiere.code.toLowerCase().includes(searchText.toLowerCase()) ||
      filiere.responsable.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || filiere.statut === statusFilter;
    const matchesNiveau = niveauFilter === 'all' || filiere.niveau === niveauFilter;
    
    return matchesSearch && matchesStatus && matchesNiveau;
  });

  const totalEffectif = filieres.reduce((sum, f) => sum + f.effectif, 0);
  const totalCapacite = filieres.reduce((sum, f) => sum + f.capacite, 0);
  const moyenneReussite = filieres.reduce((sum, f) => sum + f.tauxReussite, 0) / filieres.length;
  const filieresActives = filieres.filter(f => f.statut === 'Active').length;

  const handleEdit = (filiere: Filiere) => {
    setEditingFiliere(filiere);
    form.setFieldsValue(filiere);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingFiliere(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingFiliere) {
        message.success('Filière modifiée avec succès !');
      } else {
        message.success('Filière ajoutée avec succès !');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      {/* Statistiques */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Filières"
              value={filieres.length}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Effectif"
              value={totalEffectif}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Taux de réussite moyen"
              value={moyenneReussite.toFixed(1)}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Taux d'occupation"
              value={Math.round((totalEffectif / totalCapacite) * 100)}
              valueStyle={{ color: '#722ed1' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Filières</h2>
            <p className="text-gray-600 mt-1">Administration des formations proposées</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouvelle filière
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher une filière..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
          <Select
            placeholder="Statut"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Active">Active</Option>
            <Option value="En développement">En développement</Option>
            <Option value="Suspendue">Suspendue</Option>
          </Select>
          <Select
            placeholder="Niveau"
            value={niveauFilter}
            onChange={setNiveauFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les niveaux</Option>
            <Option value="Licence">Licence</Option>
            <Option value="Master">Master</Option>
            <Option value="Doctorat">Doctorat</Option>
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
              `${range[0]}-${range[1]} sur ${total} filières`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier une filière */}
      <Modal
        title={editingFiliere ? 'Modifier la filière' : 'Nouvelle filière'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'Active',
            niveau: 'Licence',
            duree: 3
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom de la filière"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Informatique" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Code de la filière"
                rules={[{ required: true, message: 'Veuillez saisir le code' }]}
              >
                <Input placeholder="INFO" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="responsable"
                label="Responsable"
                rules={[{ required: true, message: 'Veuillez saisir le responsable' }]}
              >
                <Input placeholder="Dr. Jean Dupont" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="niveau"
                label="Niveau"
                rules={[{ required: true, message: 'Veuillez sélectionner le niveau' }]}
              >
                <Select>
                  <Option value="Licence">Licence</Option>
                  <Option value="Master">Master</Option>
                  <Option value="Doctorat">Doctorat</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacite"
                label="Capacité d'accueil"
                rules={[{ required: true, message: 'Veuillez saisir la capacité' }]}
              >
                <Input type="number" placeholder="180" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duree"
                label="Durée (années)"
                rules={[{ required: true, message: 'Veuillez saisir la durée' }]}
              >
                <Input type="number" placeholder="3" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="statut"
                label="Statut"
                rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
              >
                <Select>
                  <Option value="Active">Active</Option>
                  <Option value="En développement">En développement</Option>
                  <Option value="Suspendue">Suspendue</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Veuillez saisir la description' }]}
              >
                <TextArea rows={3} placeholder="Description de la filière..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Filieres;
