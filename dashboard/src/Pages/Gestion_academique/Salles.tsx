import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, EnvironmentOutlined, HomeOutlined, UserOutlined, CalendarOutlined, ToolOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface Salle {
  id: number;
  code: string;
  nom: string;
  type: string;
  capacite: number;
  batiment: string;
  etage: string;
  statut: string;
  equipements: string[];
  responsable: string;
  horaires: string;
  commentaires: string;
  dateCreation: string;
}

const Salles = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [batimentFilter, setBatimentFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSalle, setEditingSalle] = useState<Salle | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les salles
  const salles: Salle[] = [
    {
      id: 1,
      code: 'SAL-101',
      nom: 'Salle 101',
      type: 'Amphithéâtre',
      capacite: 120,
      batiment: 'Bâtiment A',
      etage: 'Rez-de-chaussée',
      statut: 'Disponible',
      equipements: ['Projecteur', 'Tableau blanc', 'Système audio'],
      responsable: 'Marie Martin',
      horaires: 'Lundi-Vendredi 8h-20h',
      commentaires: 'Salle principale pour les cours magistraux',
      dateCreation: '2020-09-01'
    },
    {
      id: 2,
      code: 'SAL-102',
      nom: 'Salle 102',
      type: 'Salle de cours',
      capacite: 40,
      batiment: 'Bâtiment A',
      etage: 'Rez-de-chaussée',
      statut: 'Occupée',
      equipements: ['Projecteur', 'Tableau blanc'],
      responsable: 'Pierre Leroy',
      horaires: 'Lundi-Vendredi 8h-18h',
      commentaires: 'Salle pour travaux dirigés',
      dateCreation: '2020-09-01'
    },
    {
      id: 3,
      code: 'LAB-201',
      nom: 'Laboratoire 201',
      type: 'Laboratoire',
      capacite: 25,
      batiment: 'Bâtiment B',
      etage: '1er étage',
      statut: 'Maintenance',
      equipements: ['Ordinateurs', 'Équipements scientifiques', 'Ventilation'],
      responsable: 'Jean Dupont',
      horaires: 'Lundi-Vendredi 9h-17h',
      commentaires: 'Laboratoire informatique',
      dateCreation: '2020-09-01'
    },
    {
      id: 4,
      code: 'CONF-301',
      nom: 'Salle de conférence 301',
      type: 'Salle de conférence',
      capacite: 80,
      batiment: 'Bâtiment C',
      etage: '2ème étage',
      statut: 'Disponible',
      equipements: ['Projecteur HD', 'Système audio', 'Microphones', 'Écran tactile'],
      responsable: 'Sophie Bernard',
      horaires: 'Lundi-Vendredi 8h-22h',
      commentaires: 'Salle pour conférences et événements',
      dateCreation: '2020-09-01'
    },
    {
      id: 5,
      code: 'BIB-001',
      nom: 'Salle de bibliothèque',
      type: 'Bibliothèque',
      capacite: 60,
      batiment: 'Bâtiment A',
      etage: 'Rez-de-chaussée',
      statut: 'Disponible',
      equipements: ['Ordinateurs', 'Imprimantes', 'Scanner'],
      responsable: 'Marc Dubois',
      horaires: 'Lundi-Samedi 8h-20h',
      commentaires: 'Espace de travail et de recherche',
      dateCreation: '2020-09-01'
    }
  ];

  const columns = [
    {
      title: 'Salle',
      key: 'salle',
      render: (_: any, record: Salle) => (
        <div>
          <div className="font-medium">{record.nom}</div>
          <div className="text-sm text-gray-500">#{record.code}</div>
        </div>
      ),
    },
    {
      title: 'Type',
      key: 'type',
      render: (_: any, record: Salle) => {
        const typeConfig = {
          'Amphithéâtre': { color: 'blue' },
          'Salle de cours': { color: 'green' },
          'Laboratoire': { color: 'orange' },
          'Salle de conférence': { color: 'purple' },
          'Bibliothèque': { color: 'cyan' },
        };
        const config = typeConfig[record.type as keyof typeof typeConfig];
        return (
          <Tag color={config?.color}>
            {record.type}
          </Tag>
        );
      },
    },
    {
      title: 'Capacité',
      dataIndex: 'capacite',
      key: 'capacite',
      render: (capacite: number) => (
        <div className="text-center">
          <div className="font-medium">{capacite}</div>
          <div className="text-xs text-gray-500">places</div>
        </div>
      ),
    },
    {
      title: 'Localisation',
      key: 'localisation',
      render: (_: any, record: Salle) => (
        <div>
          <div className="font-medium">{record.batiment}</div>
          <div className="text-sm text-gray-500">{record.etage}</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Salle) => {
        const statusConfig = {
          'Disponible': { color: 'green' },
          'Occupée': { color: 'orange' },
          'Maintenance': { color: 'red' },
          'Réservée': { color: 'blue' },
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
      title: 'Équipements',
      key: 'equipements',
      render: (_: any, record: Salle) => (
        <div>
          {record.equipements.slice(0, 2).map((equip, index) => (
            <Tag key={index} className="mb-1">
              {equip}
            </Tag>
          ))}
          {record.equipements.length > 2 && (
            <Tag>+{record.equipements.length - 2}</Tag>
          )}
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
      render: (_: any, record: Salle) => (
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

  const filteredData = salles.filter(salle => {
    const matchesSearch = 
      salle.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      salle.code.toLowerCase().includes(searchText.toLowerCase()) ||
      salle.responsable.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesType = typeFilter === 'all' || salle.type === typeFilter;
    const matchesStatut = statutFilter === 'all' || salle.statut === statutFilter;
    const matchesBatiment = batimentFilter === 'all' || salle.batiment === batimentFilter;
    
    return matchesSearch && matchesType && matchesStatut && matchesBatiment;
  });

  // Statistiques
  const totalSalles = salles.length;
  const disponibles = salles.filter(s => s.statut === 'Disponible').length;
  const occupees = salles.filter(s => s.statut === 'Occupée').length;
  const maintenance = salles.filter(s => s.statut === 'Maintenance').length;
  const totalCapacite = salles.reduce((sum, s) => sum + s.capacite, 0);

  const handleView = (salle: Salle) => {
    setEditingSalle(salle);
    setIsModalVisible(true);
  };

  const handleEdit = (salle: Salle) => {
    setEditingSalle(salle);
    form.setFieldsValue({
      ...salle,
      dateCreation: new Date(salle.dateCreation)
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingSalle(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingSalle) {
        message.success('Salle modifiée avec succès !');
      } else {
        message.success('Salle ajoutée avec succès !');
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
      {maintenance > 0 && (
        <Alert
          message={`${maintenance} salles en maintenance nécessitent une attention`}
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
              title="Total Salles"
              value={totalSalles}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Salles Disponibles"
              value={disponibles}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Salles Occupées"
              value={occupees}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Capacité"
              value={totalCapacite}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Salles</h2>
            <p className="text-gray-600 mt-1">Organisation et suivi des salles de cours et laboratoires</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouvelle salle
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher une salle..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
          <Select
            placeholder="Type"
            value={typeFilter}
            onChange={setTypeFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les types</Option>
            <Option value="Amphithéâtre">Amphithéâtre</Option>
            <Option value="Salle de cours">Salle de cours</Option>
            <Option value="Laboratoire">Laboratoire</Option>
            <Option value="Salle de conférence">Salle de conférence</Option>
            <Option value="Bibliothèque">Bibliothèque</Option>
          </Select>
          <Select
            placeholder="Statut"
            value={statutFilter}
            onChange={setStatutFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Disponible">Disponible</Option>
            <Option value="Occupée">Occupée</Option>
            <Option value="Maintenance">Maintenance</Option>
            <Option value="Réservée">Réservée</Option>
          </Select>
          <Select
            placeholder="Bâtiment"
            value={batimentFilter}
            onChange={setBatimentFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les bâtiments</Option>
            <Option value="Bâtiment A">Bâtiment A</Option>
            <Option value="Bâtiment B">Bâtiment B</Option>
            <Option value="Bâtiment C">Bâtiment C</Option>
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
              `${range[0]}-${range[1]} sur ${total} salles`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier une salle */}
      <Modal
        title={editingSalle ? 'Modifier la salle' : 'Nouvelle salle'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'Disponible'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Code de la salle"
                rules={[{ required: true, message: 'Veuillez saisir le code' }]}
              >
                <Input placeholder="SAL-101" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom de la salle"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Salle 101" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type de salle"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select>
                  <Option value="Amphithéâtre">Amphithéâtre</Option>
                  <Option value="Salle de cours">Salle de cours</Option>
                  <Option value="Laboratoire">Laboratoire</Option>
                  <Option value="Salle de conférence">Salle de conférence</Option>
                  <Option value="Bibliothèque">Bibliothèque</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacite"
                label="Capacité"
                rules={[{ required: true, message: 'Veuillez saisir la capacité' }]}
              >
                <Input type="number" placeholder="40" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="batiment"
                label="Bâtiment"
                rules={[{ required: true, message: 'Veuillez saisir le bâtiment' }]}
              >
                <Input placeholder="Bâtiment A" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="etage"
                label="Étage"
                rules={[{ required: true, message: 'Veuillez saisir l\'étage' }]}
              >
                <Input placeholder="Rez-de-chaussée" />
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
                  <Option value="Disponible">Disponible</Option>
                  <Option value="Occupée">Occupée</Option>
                  <Option value="Maintenance">Maintenance</Option>
                  <Option value="Réservée">Réservée</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="horaires"
                label="Horaires d'ouverture"
                rules={[{ required: true, message: 'Veuillez saisir les horaires' }]}
              >
                <Input placeholder="Lundi-Vendredi 8h-20h" />
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

export default Salles;
