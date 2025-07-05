import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, DatePicker } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Contrat {
  id: number;
  numero: string;
  enseignant: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  salaire: number;
  heures: number;
  departement: string;
  responsable: string;
  dateSignature: string;
  renouvelable: boolean;
}

const Contrat = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContrat, setEditingContrat] = useState<Contrat | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les contrats
  const contrats: Contrat[] = [
    {
      id: 1,
      numero: 'CON-2024-001',
      enseignant: 'Jean Dupont',
      type: 'CDI',
      dateDebut: '2024-01-15',
      dateFin: '2026-01-15',
      statut: 'Actif',
      salaire: 45000,
      heures: 192,
      departement: 'Informatique',
      responsable: 'Marie Martin',
      dateSignature: '2024-01-10',
      renouvelable: true
    },
    {
      id: 2,
      numero: 'CON-2024-002',
      enseignant: 'Sophie Bernard',
      type: 'CDD',
      dateDebut: '2024-02-01',
      dateFin: '2024-08-31',
      statut: 'Actif',
      salaire: 38000,
      heures: 192,
      departement: 'Mathématiques',
      responsable: 'Pierre Leroy',
      dateSignature: '2024-01-25',
      renouvelable: false
    },
    {
      id: 3,
      numero: 'CON-2024-003',
      enseignant: 'Pierre Martin',
      type: 'Vacation',
      dateDebut: '2024-03-01',
      dateFin: '2024-06-30',
      statut: 'En attente',
      salaire: 25000,
      heures: 96,
      departement: 'Physique',
      responsable: 'Jean Dupont',
      dateSignature: '2024-02-15',
      renouvelable: true
    },
    {
      id: 4,
      numero: 'CON-2023-015',
      enseignant: 'Marie Dubois',
      type: 'CDI',
      dateDebut: '2023-09-01',
      dateFin: '2025-09-01',
      statut: 'Terminé',
      salaire: 52000,
      heures: 192,
      departement: 'Chimie',
      responsable: 'Sophie Bernard',
      dateSignature: '2023-08-20',
      renouvelable: true
    }
  ];

  const columns = [
    {
      title: 'Contrat',
      key: 'contrat',
      render: (_: any, record: Contrat) => (
        <div>
          <div className="font-medium">{record.numero}</div>
          <div className="text-sm text-gray-500">{record.enseignant}</div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'CDI' ? 'green' : type === 'CDD' ? 'blue' : 'orange'}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Période',
      key: 'periode',
      render: (_: any, record: Contrat) => (
        <div>
          <div className="text-sm">
            <CalendarOutlined className="mr-1" />
            {new Date(record.dateDebut).toLocaleDateString('fr-FR')}
          </div>
          <div className="text-sm text-gray-500">
            au {new Date(record.dateFin).toLocaleDateString('fr-FR')}
          </div>
        </div>
      ),
    },
    {
      title: 'Salaire',
      dataIndex: 'salaire',
      key: 'salaire',
      render: (salaire: number) => (
        <span className="font-semibold text-green-600">
          {salaire.toLocaleString('fr-FR')} €
        </span>
      ),
    },
    {
      title: 'Heures',
      dataIndex: 'heures',
      key: 'heures',
      render: (heures: number) => (
        <span>{heures}h/an</span>
      ),
    },
    {
      title: 'Département',
      dataIndex: 'departement',
      key: 'departement',
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Contrat) => {
        const statusConfig = {
          'Actif': { color: 'green' },
          'En attente': { color: 'orange' },
          'Terminé': { color: 'red' },
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
      render: (_: any, record: Contrat) => (
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

  const filteredData = contrats.filter(contrat => {
    const matchesSearch = 
      contrat.numero.toLowerCase().includes(searchText.toLowerCase()) ||
      contrat.enseignant.toLowerCase().includes(searchText.toLowerCase()) ||
      contrat.departement.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contrat.statut === statusFilter;
    const matchesType = typeFilter === 'all' || contrat.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const contratsActifs = contrats.filter(c => c.statut === 'Actif').length;
  const contratsEnAttente = contrats.filter(c => c.statut === 'En attente').length;
  const totalSalaire = contrats.reduce((sum, c) => sum + c.salaire, 0);

  const handleEdit = (contrat: Contrat) => {
    setEditingContrat(contrat);
    form.setFieldsValue({
      ...contrat,
      dateDebut: new Date(contrat.dateDebut),
      dateFin: new Date(contrat.dateFin),
      dateSignature: new Date(contrat.dateSignature)
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingContrat(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingContrat) {
        message.success('Contrat modifié avec succès !');
      } else {
        message.success('Contrat ajouté avec succès !');
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
              title="Total Contrats"
              value={contrats.length}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Contrats Actifs"
              value={contratsActifs}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En Attente"
              value={contratsEnAttente}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Masse Salariale"
              value={totalSalaire}
              valueStyle={{ color: '#722ed1' }}
              suffix="€"
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Contrats</h2>
            <p className="text-gray-600 mt-1">Suivi de tous les contrats d'enseignants</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouveau contrat
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un contrat..."
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
            <Option value="Actif">Actif</Option>
            <Option value="En attente">En attente</Option>
            <Option value="Terminé">Terminé</Option>
          </Select>
          <Select
            placeholder="Type"
            value={typeFilter}
            onChange={setTypeFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les types</Option>
            <Option value="CDI">CDI</Option>
            <Option value="CDD">CDD</Option>
            <Option value="Vacation">Vacation</Option>
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
              `${range[0]}-${range[1]} sur ${total} contrats`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un contrat */}
      <Modal
        title={editingContrat ? 'Modifier le contrat' : 'Nouveau contrat'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: 'CDI',
            statut: 'Actif',
            renouvelable: true
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="numero"
                label="Numéro de contrat"
                rules={[{ required: true, message: 'Veuillez saisir le numéro' }]}
              >
                <Input placeholder="CON-2024-001" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="enseignant"
                label="Enseignant"
                rules={[{ required: true, message: 'Veuillez saisir l\'enseignant' }]}
              >
                <Input placeholder="Nom de l'enseignant" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type de contrat"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select>
                  <Option value="CDI">CDI</Option>
                  <Option value="CDD">CDD</Option>
                  <Option value="Vacation">Vacation</Option>
                  <Option value="Stage">Stage</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="departement"
                label="Département"
                rules={[{ required: true, message: 'Veuillez sélectionner le département' }]}
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
                name="dateDebut"
                label="Date de début"
                rules={[{ required: true, message: 'Veuillez sélectionner la date de début' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateFin"
                label="Date de fin"
                rules={[{ required: true, message: 'Veuillez sélectionner la date de fin' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salaire"
                label="Salaire annuel"
                rules={[{ required: true, message: 'Veuillez saisir le salaire' }]}
              >
                <Input type="number" placeholder="45000" suffix="€" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="heures"
                label="Heures annuelles"
                rules={[{ required: true, message: 'Veuillez saisir les heures' }]}
              >
                <Input type="number" placeholder="192" suffix="h" />
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
                  <Option value="En attente">En attente</Option>
                  <Option value="Terminé">Terminé</Option>
                </Select>
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
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Contrat;
