import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, TeamOutlined, BookOutlined, UserOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface Classe {
  id: number;
  code: string;
  nom: string;
  filiere: string;
  niveau: string;
  anneeAcademique: string;
  effectif: number;
  capacite: number;
  responsable: string;
  salle: string;
  horaires: string;
  statut: string;
  dateCreation: string;
  commentaires: string;
}

const Classes = () => {
  const [searchText, setSearchText] = useState('');
  const [filiereFilter, setFiliereFilter] = useState<string>('all');
  const [niveauFilter, setNiveauFilter] = useState<string>('all');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClasse, setEditingClasse] = useState<Classe | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les classes
  const classes: Classe[] = [
    {
      id: 1,
      code: 'INFO-L1-A',
      nom: 'Informatique L1 Groupe A',
      filiere: 'Informatique',
      niveau: 'L1',
      anneeAcademique: '2023-2024',
      effectif: 35,
      capacite: 40,
      responsable: 'Marie Martin',
      salle: 'Salle 101',
      horaires: 'Lundi 8h-12h, Mercredi 14h-18h',
      statut: 'Active',
      dateCreation: '2023-09-01',
      commentaires: 'Classe principale'
    },
    {
      id: 2,
      code: 'INFO-L1-B',
      nom: 'Informatique L1 Groupe B',
      filiere: 'Informatique',
      niveau: 'L1',
      anneeAcademique: '2023-2024',
      effectif: 32,
      capacite: 40,
      responsable: 'Pierre Leroy',
      salle: 'Salle 102',
      horaires: 'Mardi 8h-12h, Jeudi 14h-18h',
      statut: 'Active',
      dateCreation: '2023-09-01',
      commentaires: 'Classe secondaire'
    },
    {
      id: 3,
      code: 'MATH-L2-A',
      nom: 'Mathématiques L2 Groupe A',
      filiere: 'Mathématiques',
      niveau: 'L2',
      anneeAcademique: '2023-2024',
      effectif: 28,
      capacite: 35,
      responsable: 'Jean Dupont',
      salle: 'Salle 201',
      horaires: 'Lundi 14h-18h, Vendredi 8h-12h',
      statut: 'Active',
      dateCreation: '2023-09-01',
      commentaires: 'Classe spécialisée'
    },
    {
      id: 4,
      code: 'PHYS-L3-A',
      nom: 'Physique L3 Groupe A',
      filiere: 'Physique',
      niveau: 'L3',
      anneeAcademique: '2023-2024',
      effectif: 25,
      capacite: 30,
      responsable: 'Sophie Bernard',
      salle: 'Salle 301',
      horaires: 'Mardi 14h-18h, Jeudi 8h-12h',
      statut: 'Active',
      dateCreation: '2023-09-01',
      commentaires: 'Classe avancée'
    },
    {
      id: 5,
      code: 'CHIM-M1-A',
      nom: 'Chimie M1 Groupe A',
      filiere: 'Chimie',
      niveau: 'M1',
      anneeAcademique: '2023-2024',
      effectif: 20,
      capacite: 25,
      responsable: 'Marc Dubois',
      salle: 'Salle 401',
      horaires: 'Mercredi 8h-12h, Vendredi 14h-18h',
      statut: 'Inactive',
      dateCreation: '2023-09-01',
      commentaires: 'Classe en pause'
    }
  ];

  const columns = [
    {
      title: 'Classe',
      key: 'classe',
      render: (_: any, record: Classe) => (
        <div>
          <div className="font-medium">{record.nom}</div>
          <div className="text-sm text-gray-500">#{record.code}</div>
        </div>
      ),
    },
    {
      title: 'Formation',
      key: 'formation',
      render: (_: any, record: Classe) => (
        <div>
          <div className="font-medium">{record.filiere}</div>
          <div className="text-sm text-gray-500">{record.niveau}</div>
        </div>
      ),
    },
    {
      title: 'Effectif',
      key: 'effectif',
      render: (_: any, record: Classe) => (
        <div>
          <div className="font-medium">{record.effectif}/{record.capacite}</div>
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
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Classe) => {
        const statusConfig = {
          'Active': { color: 'green' },
          'Inactive': { color: 'red' },
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
      title: 'Salle',
      key: 'salle',
      render: (_: any, record: Classe) => (
        <div>
          <div className="font-medium">{record.salle}</div>
          <div className="text-xs text-gray-500">{record.horaires}</div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Classe) => (
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

  const filteredData = classes.filter(classe => {
    const matchesSearch = 
      classe.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      classe.code.toLowerCase().includes(searchText.toLowerCase()) ||
      classe.responsable.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFiliere = filiereFilter === 'all' || classe.filiere === filiereFilter;
    const matchesNiveau = niveauFilter === 'all' || classe.niveau === niveauFilter;
    const matchesStatut = statutFilter === 'all' || classe.statut === statutFilter;
    
    return matchesSearch && matchesFiliere && matchesNiveau && matchesStatut;
  });

  // Statistiques
  const totalClasses = classes.length;
  const actives = classes.filter(c => c.statut === 'Active').length;
  const totalEffectif = classes.reduce((sum, c) => sum + c.effectif, 0);
  const totalCapacite = classes.reduce((sum, c) => sum + c.capacite, 0);
  const tauxRemplissage = Math.round((totalEffectif / totalCapacite) * 100);

  // Classes pleines
  const classesPleines = classes.filter(c => c.effectif >= c.capacite).length;

  const handleView = (classe: Classe) => {
    setEditingClasse(classe);
    setIsModalVisible(true);
  };

  const handleEdit = (classe: Classe) => {
    setEditingClasse(classe);
    form.setFieldsValue({
      ...classe,
      dateCreation: new Date(classe.dateCreation)
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingClasse(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingClasse) {
        message.success('Classe modifiée avec succès !');
      } else {
        message.success('Classe ajoutée avec succès !');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      {/* Alertes */}
      {classesPleines > 0 && (
        <Alert
          message={`${classesPleines} classes sont pleines et nécessitent une attention`}
          type="warning"
          showIcon
          className="mb-4"
        />
      )}
      
      {/* Statistiques */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Classes"
              value={totalClasses}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Classes Actives"
              value={actives}
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
              title="Taux de remplissage"
              value={tauxRemplissage}
              suffix="%"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Classes</h2>
            <p className="text-gray-600 mt-1">Organisation et suivi des classes par formation</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouvelle classe
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher une classe..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
          <Select
            placeholder="Filière"
            value={filiereFilter}
            onChange={setFiliereFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Toutes les filières</Option>
            <Option value="Informatique">Informatique</Option>
            <Option value="Mathématiques">Mathématiques</Option>
            <Option value="Physique">Physique</Option>
            <Option value="Chimie">Chimie</Option>
            <Option value="Biologie">Biologie</Option>
          </Select>
          <Select
            placeholder="Niveau"
            value={niveauFilter}
            onChange={setNiveauFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les niveaux</Option>
            <Option value="L1">Licence 1</Option>
            <Option value="L2">Licence 2</Option>
            <Option value="L3">Licence 3</Option>
            <Option value="M1">Master 1</Option>
            <Option value="M2">Master 2</Option>
          </Select>
          <Select
            placeholder="Statut"
            value={statutFilter}
            onChange={setStatutFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
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
              `${range[0]}-${range[1]} sur ${total} classes`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier une classe */}
      <Modal
        title={editingClasse ? 'Modifier la classe' : 'Nouvelle classe'}
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
            anneeAcademique: '2023-2024'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Code de la classe"
                rules={[{ required: true, message: 'Veuillez saisir le code' }]}
              >
                <Input placeholder="INFO-L1-A" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom de la classe"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Informatique L1 Groupe A" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="filiere"
                label="Filière"
                rules={[{ required: true, message: 'Veuillez sélectionner la filière' }]}
              >
                <Select>
                  <Option value="Informatique">Informatique</Option>
                  <Option value="Mathématiques">Mathématiques</Option>
                  <Option value="Physique">Physique</Option>
                  <Option value="Chimie">Chimie</Option>
                  <Option value="Biologie">Biologie</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="niveau"
                label="Niveau"
                rules={[{ required: true, message: 'Veuillez sélectionner le niveau' }]}
              >
                <Select>
                  <Option value="L1">Licence 1</Option>
                  <Option value="L2">Licence 2</Option>
                  <Option value="L3">Licence 3</Option>
                  <Option value="M1">Master 1</Option>
                  <Option value="M2">Master 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="effectif"
                label="Effectif actuel"
                rules={[{ required: true, message: 'Veuillez saisir l\'effectif' }]}
              >
                <Input type="number" placeholder="35" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacite"
                label="Capacité maximale"
                rules={[{ required: true, message: 'Veuillez saisir la capacité' }]}
              >
                <Input type="number" placeholder="40" />
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
                name="salle"
                label="Salle"
                rules={[{ required: true, message: 'Veuillez saisir la salle' }]}
              >
                <Input placeholder="Salle 101" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="horaires"
                label="Horaires"
                rules={[{ required: true, message: 'Veuillez saisir les horaires' }]}
              >
                <Input placeholder="Lundi 8h-12h, Mercredi 14h-18h" />
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
                  <Option value="Inactive">Inactive</Option>
                  <Option value="En cours">En cours</Option>
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

export default Classes; 
