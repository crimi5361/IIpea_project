import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, TeamOutlined, BookOutlined, UserOutlined, TrophyOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface Niveau {
  id: number;
  code: string;
  nom: string;
  description: string;
  duree: number;
  credits: number;
  filieres: string[];
  effectif: number;
  statut: string;
  responsable: string;
  dateCreation: string;
  commentaires: string;
}

const Niviaux = () => {
  const [searchText, setSearchText] = useState('');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNiveau, setEditingNiveau] = useState<Niveau | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les niveaux
  const niveaux: Niveau[] = [
    {
      id: 1,
      code: 'L1',
      nom: 'Licence 1',
      description: 'Première année de licence - Formation de base',
      duree: 1,
      credits: 60,
      filieres: ['Informatique', 'Mathématiques', 'Physique', 'Chimie', 'Biologie'],
      effectif: 150,
      statut: 'Actif',
      responsable: 'Marie Martin',
      dateCreation: '2020-09-01',
      commentaires: 'Niveau d\'entrée principal'
    },
    {
      id: 2,
      code: 'L2',
      nom: 'Licence 2',
      description: 'Deuxième année de licence - Approfondissement',
      duree: 1,
      credits: 60,
      filieres: ['Informatique', 'Mathématiques', 'Physique', 'Chimie', 'Biologie'],
      effectif: 120,
      statut: 'Actif',
      responsable: 'Pierre Leroy',
      dateCreation: '2020-09-01',
      commentaires: 'Niveau intermédiaire'
    },
    {
      id: 3,
      code: 'L3',
      nom: 'Licence 3',
      description: 'Troisième année de licence - Spécialisation',
      duree: 1,
      credits: 60,
      filieres: ['Informatique', 'Mathématiques', 'Physique', 'Chimie', 'Biologie'],
      effectif: 95,
      statut: 'Actif',
      responsable: 'Jean Dupont',
      dateCreation: '2020-09-01',
      commentaires: 'Niveau de spécialisation'
    },
    {
      id: 4,
      code: 'M1',
      nom: 'Master 1',
      description: 'Première année de master - Recherche et professionnel',
      duree: 1,
      credits: 60,
      filieres: ['Informatique', 'Mathématiques', 'Physique', 'Chimie', 'Biologie'],
      effectif: 75,
      statut: 'Actif',
      responsable: 'Sophie Bernard',
      dateCreation: '2020-09-01',
      commentaires: 'Niveau de recherche'
    },
    {
      id: 5,
      code: 'M2',
      nom: 'Master 2',
      description: 'Deuxième année de master - Finalisation',
      duree: 1,
      credits: 60,
      filieres: ['Informatique', 'Mathématiques', 'Physique', 'Chimie', 'Biologie'],
      effectif: 60,
      statut: 'Actif',
      responsable: 'Marc Dubois',
      dateCreation: '2020-09-01',
      commentaires: 'Niveau de finalisation'
    }
  ];

  const columns = [
    {
      title: 'Niveau',
      key: 'niveau',
      render: (_: any, record: Niveau) => (
        <div>
          <div className="font-medium">{record.nom}</div>
          <div className="text-sm text-gray-500">#{record.code}</div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <span className="text-sm">{description}</span>
      ),
    },
    {
      title: 'Filières',
      key: 'filieres',
      render: (_: any, record: Niveau) => (
        <div>
          {record.filieres.map((filiere, index) => (
            <Tag key={index} className="mb-1">
              {filiere}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Effectif',
      key: 'effectif',
      render: (_: any, record: Niveau) => (
        <div className="text-center">
          <div className="font-medium">{record.effectif}</div>
          <div className="text-xs text-gray-500">étudiants</div>
        </div>
      ),
    },
    {
      title: 'Crédits',
      dataIndex: 'credits',
      key: 'credits',
      render: (credits: number) => (
        <div className="text-center">
          <div className="font-medium">{credits}</div>
          <div className="text-xs text-gray-500">ECTS</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Niveau) => {
        const statusConfig = {
          'Actif': { color: 'green' },
          'Inactif': { color: 'red' },
          'En cours': { color: 'blue' },
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
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Niveau) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleView(record)}
          />
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

  const filteredData = niveaux.filter(niveau => {
    const matchesSearch = 
      niveau.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      niveau.code.toLowerCase().includes(searchText.toLowerCase()) ||
      niveau.description.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatut = statutFilter === 'all' || niveau.statut === statutFilter;
    
    return matchesSearch && matchesStatut;
  });

  // Statistiques
  const totalNiveaux = niveaux.length;
  const actifs = niveaux.filter(n => n.statut === 'Actif').length;
  const totalEffectif = niveaux.reduce((sum, n) => sum + n.effectif, 0);
  const totalCredits = niveaux.reduce((sum, n) => sum + n.credits, 0);

  const handleView = (niveau: Niveau) => {
    setEditingNiveau(niveau);
    setIsModalVisible(true);
  };

  const handleEdit = (niveau: Niveau) => {
    setEditingNiveau(niveau);
    form.setFieldsValue({
      ...niveau,
      dateCreation: new Date(niveau.dateCreation)
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingNiveau(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingNiveau) {
        message.success('Niveau modifié avec succès !');
      } else {
        message.success('Niveau ajouté avec succès !');
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
              title="Total Niveaux"
              value={totalNiveaux}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Niveaux Actifs"
              value={actifs}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Effectif"
              value={totalEffectif}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Crédits"
              value={totalCredits}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Niveaux</h2>
            <p className="text-gray-600 mt-1">Organisation des niveaux académiques et des formations</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouveau niveau
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un niveau..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
          <Select
            placeholder="Statut"
            value={statutFilter}
            onChange={setStatutFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Actif">Actif</Option>
            <Option value="Inactif">Inactif</Option>
            <Option value="En cours">En cours</Option>
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
              `${range[0]}-${range[1]} sur ${total} niveaux`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un niveau */}
      <Modal
        title={editingNiveau ? 'Modifier le niveau' : 'Nouveau niveau'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'Actif',
            duree: 1,
            credits: 60
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Code du niveau"
                rules={[{ required: true, message: 'Veuillez saisir le code' }]}
              >
                <Input placeholder="L1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom du niveau"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Licence 1" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Veuillez saisir la description' }]}
              >
                <Input.TextArea rows={3} placeholder="Description du niveau..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duree"
                label="Durée (années)"
                rules={[{ required: true, message: 'Veuillez saisir la durée' }]}
              >
                <Input type="number" placeholder="1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="credits"
                label="Crédits ECTS"
                rules={[{ required: true, message: 'Veuillez saisir les crédits' }]}
              >
                <Input type="number" placeholder="60" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="effectif"
                label="Effectif actuel"
                rules={[{ required: true, message: 'Veuillez saisir l\'effectif' }]}
              >
                <Input type="number" placeholder="150" />
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
                label="Statut"
                rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
              >
                <Select>
                  <Option value="Actif">Actif</Option>
                  <Option value="Inactif">Inactif</Option>
                  <Option value="En cours">En cours</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaires"
                label="Commentaires"
              >
                <Input.TextArea rows={3} placeholder="Commentaires additionnels..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Niviaux;
