import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CarOutlined, EnvironmentOutlined, ClockCircleOutlined, UserOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface Itineraire {
  id: number;
  code: string;
  nom: string;
  depart: string;
  arrivee: string;
  type: string;
  duree: number;
  distance: number;
  frequence: string;
  statut: string;
  chauffeur: string;
  vehicule: string;
  capacite: number;
  passagers: number;
  horaires: string;
  commentaires: string;
  dateCreation: string;
}

const Itineraires = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItineraire, setEditingItineraire] = useState<Itineraire | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les itinéraires
  const itineraires: Itineraire[] = [
    {
      id: 1,
      code: 'ITI-001',
      nom: 'Campus - Centre-ville',
      depart: 'Campus universitaire',
      arrivee: 'Place du centre-ville',
      type: 'Navette',
      duree: 25,
      distance: 8.5,
      frequence: 'Toutes les 30 minutes',
      statut: 'Actif',
      chauffeur: 'Jean Dupont',
      vehicule: 'Bus-001',
      capacite: 50,
      passagers: 35,
      horaires: '7h-22h',
      commentaires: 'Navette principale du campus',
      dateCreation: '2024-01-01'
    },
    {
      id: 2,
      code: 'ITI-002',
      nom: 'Campus - Gare SNCF',
      depart: 'Campus universitaire',
      arrivee: 'Gare SNCF',
      type: 'Navette',
      duree: 15,
      distance: 5.2,
      frequence: 'Toutes les 20 minutes',
      statut: 'Actif',
      chauffeur: 'Marie Martin',
      vehicule: 'Bus-002',
      capacite: 40,
      passagers: 28,
      horaires: '6h-23h',
      commentaires: 'Liaison avec les transports ferroviaires',
      dateCreation: '2024-01-01'
    },
    {
      id: 3,
      code: 'ITI-003',
      nom: 'Campus - Zone industrielle',
      depart: 'Campus universitaire',
      arrivee: 'Zone industrielle Nord',
      type: 'Express',
      duree: 45,
      distance: 15.8,
      frequence: 'Toutes les heures',
      statut: 'Maintenance',
      chauffeur: 'Pierre Leroy',
      vehicule: 'Bus-003',
      capacite: 30,
      passagers: 0,
      horaires: '8h-18h',
      commentaires: 'Service temporairement suspendu',
      dateCreation: '2024-01-01'
    },
    {
      id: 4,
      code: 'ITI-004',
      nom: 'Campus - Aéroport',
      depart: 'Campus universitaire',
      arrivee: 'Aéroport international',
      type: 'Express',
      duree: 60,
      distance: 25.3,
      frequence: 'Toutes les 2 heures',
      statut: 'Actif',
      chauffeur: 'Sophie Bernard',
      vehicule: 'Bus-004',
      capacite: 35,
      passagers: 12,
      horaires: '5h-23h',
      commentaires: 'Service aéroportuaire',
      dateCreation: '2024-01-01'
    },
    {
      id: 5,
      code: 'ITI-005',
      nom: 'Campus - Résidences étudiantes',
      depart: 'Campus universitaire',
      arrivee: 'Résidences universitaires',
      type: 'Navette',
      duree: 10,
      distance: 3.1,
      frequence: 'Toutes les 15 minutes',
      statut: 'Actif',
      chauffeur: 'Marc Dubois',
      vehicule: 'Bus-005',
      capacite: 25,
      passagers: 22,
      horaires: '6h-24h',
      commentaires: 'Service résidences étudiantes',
      dateCreation: '2024-01-01'
    }
  ];

  const columns = [
    {
      title: 'Itinéraire',
      key: 'itineraire',
      render: (_: any, record: Itineraire) => (
        <div>
          <div className="font-medium">{record.nom}</div>
          <div className="text-sm text-gray-500">#{record.code}</div>
        </div>
      ),
    },
    {
      title: 'Trajet',
      key: 'trajet',
      render: (_: any, record: Itineraire) => (
        <div>
          <div className="text-sm">{record.depart}</div>
          <div className="text-xs text-gray-500">→ {record.arrivee}</div>
        </div>
      ),
    },
    {
      title: 'Type',
      key: 'type',
      render: (_: any, record: Itineraire) => {
        const typeConfig = {
          'Navette': { color: 'blue' },
          'Express': { color: 'green' },
          'Spécial': { color: 'orange' },
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
      title: 'Durée/Distance',
      key: 'dureeDistance',
      render: (_: any, record: Itineraire) => (
        <div className="text-center">
          <div className="font-medium">{record.duree} min</div>
          <div className="text-xs text-gray-500">{record.distance} km</div>
        </div>
      ),
    },
    {
      title: 'Fréquence',
      dataIndex: 'frequence',
      key: 'frequence',
      render: (frequence: string) => (
        <span className="text-sm">{frequence}</span>
      ),
    },
    {
      title: 'Occupation',
      key: 'occupation',
      render: (_: any, record: Itineraire) => (
        <div>
          <div className="font-medium">{record.passagers}/{record.capacite}</div>
          <Progress 
            percent={Math.round((record.passagers / record.capacite) * 100)} 
            size="small" 
            showInfo={false}
            strokeColor={record.passagers / record.capacite > 0.8 ? '#ff4d4f' : '#52c41a'}
          />
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Itineraire) => {
        const statusConfig = {
          'Actif': { color: 'green', icon: <CheckCircleOutlined /> },
          'Maintenance': { color: 'orange', icon: <ExclamationCircleOutlined /> },
          'Suspendu': { color: 'red', icon: <ExclamationCircleOutlined /> },
        };
        const config = statusConfig[record.statut as keyof typeof statusConfig];
        return (
          <Tag color={config?.color} icon={config?.icon}>
            {record.statut}
          </Tag>
        );
      },
    },
    {
      title: 'Chauffeur',
      dataIndex: 'chauffeur',
      key: 'chauffeur',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Itineraire) => (
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

  const filteredData = itineraires.filter(itineraire => {
    const matchesSearch = 
      itineraire.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      itineraire.code.toLowerCase().includes(searchText.toLowerCase()) ||
      itineraire.depart.toLowerCase().includes(searchText.toLowerCase()) ||
      itineraire.arrivee.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesType = typeFilter === 'all' || itineraire.type === typeFilter;
    const matchesStatut = statutFilter === 'all' || itineraire.statut === statutFilter;
    
    return matchesSearch && matchesType && matchesStatut;
  });

  // Statistiques
  const totalItineraires = itineraires.length;
  const actifs = itineraires.filter(i => i.statut === 'Actif').length;
  const maintenance = itineraires.filter(i => i.statut === 'Maintenance').length;
  const totalDistance = itineraires.reduce((sum, i) => sum + i.distance, 0);
  const totalPassagers = itineraires.reduce((sum, i) => sum + i.passagers, 0);

  // Itinéraires surchargés
  const surcharges = itineraires.filter(i => i.passagers / i.capacite > 0.8).length;

  const handleView = (itineraire: Itineraire) => {
    setEditingItineraire(itineraire);
    setIsModalVisible(true);
  };

  const handleEdit = (itineraire: Itineraire) => {
    setEditingItineraire(itineraire);
    form.setFieldsValue({
      ...itineraire,
      dateCreation: new Date(itineraire.dateCreation)
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingItineraire(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingItineraire) {
        message.success('Itinéraire modifié avec succès !');
      } else {
        message.success('Itinéraire ajouté avec succès !');
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
      {surcharges > 0 && (
        <Alert
          message={`${surcharges} itinéraires sont surchargés et nécessitent une attention`}
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
          className="mb-4"
        />
      )}
      
      {/* Statistiques */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Itinéraires"
              value={totalItineraires}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Itinéraires Actifs"
              value={actifs}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Distance Totale"
              value={totalDistance}
              suffix="km"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Passagers"
              value={totalPassagers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Itinéraires</h2>
            <p className="text-gray-600 mt-1">Organisation et suivi des itinéraires de transport</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouvel itinéraire
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un itinéraire..."
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
            <Option value="Navette">Navette</Option>
            <Option value="Express">Express</Option>
            <Option value="Spécial">Spécial</Option>
          </Select>
          <Select
            placeholder="Statut"
            value={statutFilter}
            onChange={setStatutFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Actif">Actif</Option>
            <Option value="Maintenance">Maintenance</Option>
            <Option value="Suspendu">Suspendu</Option>
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
              `${range[0]}-${range[1]} sur ${total} itinéraires`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un itinéraire */}
      <Modal
        title={editingItineraire ? 'Modifier l\'itinéraire' : 'Nouvel itinéraire'}
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
            type: 'Navette'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Code de l'itinéraire"
                rules={[{ required: true, message: 'Veuillez saisir le code' }]}
              >
                <Input placeholder="ITI-001" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom de l'itinéraire"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Campus - Centre-ville" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="depart"
                label="Point de départ"
                rules={[{ required: true, message: 'Veuillez saisir le départ' }]}
              >
                <Input placeholder="Campus universitaire" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="arrivee"
                label="Point d'arrivée"
                rules={[{ required: true, message: 'Veuillez saisir l\'arrivée' }]}
              >
                <Input placeholder="Place du centre-ville" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type d'itinéraire"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select>
                  <Option value="Navette">Navette</Option>
                  <Option value="Express">Express</Option>
                  <Option value="Spécial">Spécial</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duree"
                label="Durée (minutes)"
                rules={[{ required: true, message: 'Veuillez saisir la durée' }]}
              >
                <Input type="number" placeholder="25" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="distance"
                label="Distance (km)"
                rules={[{ required: true, message: 'Veuillez saisir la distance' }]}
              >
                <Input type="number" step="0.1" placeholder="8.5" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="frequence"
                label="Fréquence"
                rules={[{ required: true, message: 'Veuillez saisir la fréquence' }]}
              >
                <Input placeholder="Toutes les 30 minutes" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="chauffeur"
                label="Chauffeur"
                rules={[{ required: true, message: 'Veuillez saisir le chauffeur' }]}
              >
                <Input placeholder="Nom du chauffeur" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vehicule"
                label="Véhicule"
                rules={[{ required: true, message: 'Veuillez saisir le véhicule' }]}
              >
                <Input placeholder="Bus-001" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacite"
                label="Capacité"
                rules={[{ required: true, message: 'Veuillez saisir la capacité' }]}
              >
                <Input type="number" placeholder="50" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="passagers"
                label="Passagers actuels"
                rules={[{ required: true, message: 'Veuillez saisir le nombre de passagers' }]}
              >
                <Input type="number" placeholder="35" />
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
                  <Option value="Maintenance">Maintenance</Option>
                  <Option value="Suspendu">Suspendu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="horaires"
                label="Horaires de service"
                rules={[{ required: true, message: 'Veuillez saisir les horaires' }]}
              >
                <Input placeholder="7h-22h" />
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

export default Itineraires;
