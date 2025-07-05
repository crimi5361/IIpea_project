import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CarOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface Vehicule {
  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  annee: number;
  capacite: number;
  statut: string;
  chauffeur: string;
  kilometrage: number;
  dernierEntretien: string;
  prochainEntretien: string;
  typeCarburant: string;
  couleur: string;
}

const Vehicules = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVehicule, setEditingVehicule] = useState<Vehicule | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les véhicules
  const vehicules: Vehicule[] = [
    {
      id: 1,
      immatriculation: 'AB-123-CD',
      marque: 'Renault',
      modele: 'Master',
      annee: 2020,
      capacite: 15,
      statut: 'En service',
      chauffeur: 'Jean Dupont',
      kilometrage: 45000,
      dernierEntretien: '2024-01-15',
      prochainEntretien: '2024-04-15',
      typeCarburant: 'Diesel',
      couleur: 'Blanc'
    },
    {
      id: 2,
      immatriculation: 'EF-456-GH',
      marque: 'Peugeot',
      modele: 'Boxer',
      annee: 2019,
      capacite: 12,
      statut: 'En maintenance',
      chauffeur: 'Marie Martin',
      kilometrage: 62000,
      dernierEntretien: '2024-02-01',
      prochainEntretien: '2024-05-01',
      typeCarburant: 'Diesel',
      couleur: 'Gris'
    },
    {
      id: 3,
      immatriculation: 'IJ-789-KL',
      marque: 'Ford',
      modele: 'Transit',
      annee: 2021,
      capacite: 9,
      statut: 'En service',
      chauffeur: 'Pierre Bernard',
      kilometrage: 28000,
      dernierEntretien: '2024-01-30',
      prochainEntretien: '2024-04-30',
      typeCarburant: 'Essence',
      couleur: 'Bleu'
    },
    {
      id: 4,
      immatriculation: 'MN-012-OP',
      marque: 'Mercedes',
      modele: 'Sprinter',
      annee: 2018,
      capacite: 18,
      statut: 'Hors service',
      chauffeur: 'Sophie Leroy',
      kilometrage: 85000,
      dernierEntretien: '2023-12-15',
      prochainEntretien: '2024-03-15',
      typeCarburant: 'Diesel',
      couleur: 'Noir'
    }
  ];

  const columns = [
    {
      title: 'Véhicule',
      key: 'vehicule',
      render: (_: any, record: Vehicule) => (
        <div>
          <div className="font-medium">{record.marque} {record.modele}</div>
          <div className="text-sm text-gray-500">{record.immatriculation}</div>
        </div>
      ),
    },
    {
      title: 'Année',
      dataIndex: 'annee',
      key: 'annee',
    },
    {
      title: 'Capacité',
      dataIndex: 'capacite',
      key: 'capacite',
      render: (capacite: number) => (
        <span className="font-semibold">{capacite} places</span>
      ),
    },
    {
      title: 'Kilométrage',
      dataIndex: 'kilometrage',
      key: 'kilometrage',
      render: (kilometrage: number) => (
        <span>{kilometrage.toLocaleString('fr-FR')} km</span>
      ),
    },
    {
      title: 'Chauffeur',
      dataIndex: 'chauffeur',
      key: 'chauffeur',
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Vehicule) => {
        const statusConfig = {
          'En service': { color: 'green' },
          'En maintenance': { color: 'orange' },
          'Hors service': { color: 'red' },
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
      title: 'Prochain entretien',
      dataIndex: 'prochainEntretien',
      key: 'prochainEntretien',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Vehicule) => (
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

  const filteredData = vehicules.filter(vehicule => {
    const matchesSearch = 
      vehicule.immatriculation.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicule.marque.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicule.modele.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicule.chauffeur.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicule.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const vehiculesEnService = vehicules.filter(v => v.statut === 'En service').length;
  const vehiculesEnMaintenance = vehicules.filter(v => v.statut === 'En maintenance').length;
  const totalKilometrage = vehicules.reduce((sum, v) => sum + v.kilometrage, 0);

  const handleEdit = (vehicule: Vehicule) => {
    setEditingVehicule(vehicule);
    form.setFieldsValue(vehicule);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingVehicule(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingVehicule) {
        message.success('Véhicule modifié avec succès !');
      } else {
        message.success('Véhicule ajouté avec succès !');
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
              title="Total Véhicules"
              value={vehicules.length}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En Service"
              value={vehiculesEnService}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En Maintenance"
              value={vehiculesEnMaintenance}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Kilométrage Total"
              value={totalKilometrage}
              valueStyle={{ color: '#722ed1' }}
              suffix="km"
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Véhicules</h2>
            <p className="text-gray-600 mt-1">Suivi de la flotte de transport</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Ajouter un véhicule
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un véhicule..."
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
            <Option value="En service">En service</Option>
            <Option value="En maintenance">En maintenance</Option>
            <Option value="Hors service">Hors service</Option>
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
              `${range[0]}-${range[1]} sur ${total} véhicules`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un véhicule */}
      <Modal
        title={editingVehicule ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'En service',
            typeCarburant: 'Diesel'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="immatriculation"
                label="Immatriculation"
                rules={[{ required: true, message: 'Veuillez saisir l\'immatriculation' }]}
              >
                <Input placeholder="AB-123-CD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="marque"
                label="Marque"
                rules={[{ required: true, message: 'Veuillez saisir la marque' }]}
              >
                <Input placeholder="Renault" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="modele"
                label="Modèle"
                rules={[{ required: true, message: 'Veuillez saisir le modèle' }]}
              >
                <Input placeholder="Master" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="annee"
                label="Année"
                rules={[{ required: true, message: 'Veuillez saisir l\'année' }]}
              >
                <Input type="number" placeholder="2020" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacite"
                label="Capacité"
                rules={[{ required: true, message: 'Veuillez saisir la capacité' }]}
              >
                <Input type="number" placeholder="15" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="chauffeur"
                label="Chauffeur"
                rules={[{ required: true, message: 'Veuillez saisir le chauffeur' }]}
              >
                <Input placeholder="Jean Dupont" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="statut"
                label="Statut"
                rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
              >
                <Select>
                  <Option value="En service">En service</Option>
                  <Option value="En maintenance">En maintenance</Option>
                  <Option value="Hors service">Hors service</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="typeCarburant"
                label="Type de carburant"
                rules={[{ required: true, message: 'Veuillez sélectionner le type de carburant' }]}
              >
                <Select>
                  <Option value="Diesel">Diesel</Option>
                  <Option value="Essence">Essence</Option>
                  <Option value="Électrique">Électrique</Option>
                  <Option value="Hybride">Hybride</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Vehicules;
