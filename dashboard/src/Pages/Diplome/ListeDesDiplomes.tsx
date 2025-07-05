import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, TrophyOutlined, UserOutlined, CalendarOutlined, FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface Diplome {
  id: number;
  code: string;
  nom: string;
  niveau: string;
  duree: string;
  credits: number;
  responsable: string;
  statut: string;
  dateCreation: string;
  dateValidation: string;
  effectifs: number;
  capacite: number;
  tauxReussite: number;
  description: string;
  specialites: string[];
  commentaires: string;
}

const ListeDesDiplomes = () => {
  const [searchText, setSearchText] = useState('');
  const [niveauFilter, setNiveauFilter] = useState<string>('all');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDiplome, setEditingDiplome] = useState<Diplome | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les diplômes
  const diplomes: Diplome[] = [
    {
      id: 1,
      code: 'DIP-001',
      nom: 'Licence en Informatique',
      niveau: 'Licence',
      duree: '3 ans',
      credits: 180,
      responsable: 'Dr. Martin',
      statut: 'Actif',
      dateCreation: '2020-01-01',
      dateValidation: '2023-06-30',
      effectifs: 85,
      capacite: 100,
      tauxReussite: 78,
      description: 'Formation en informatique avec spécialisation en développement',
      specialites: ['Développement Web', 'Intelligence Artificielle', 'Sécurité'],
      commentaires: 'Diplôme très demandé par les entreprises'
    },
    {
      id: 2,
      code: 'DIP-002',
      nom: 'Master en Gestion',
      niveau: 'Master',
      duree: '2 ans',
      credits: 120,
      responsable: 'Dr. Bernard',
      statut: 'Actif',
      dateCreation: '2019-01-01',
      dateValidation: '2024-06-30',
      effectifs: 45,
      capacite: 60,
      tauxReussite: 85,
      description: 'Formation en gestion d\'entreprise et management',
      specialites: ['Finance', 'Marketing', 'Ressources Humaines'],
      commentaires: 'Excellent taux d\'insertion professionnelle'
    },
    {
      id: 3,
      code: 'DIP-003',
      nom: 'Doctorat en Physique',
      niveau: 'Doctorat',
      duree: '3 ans',
      credits: 180,
      responsable: 'Dr. Leroy',
      statut: 'En révision',
      dateCreation: '2022-01-01',
      dateValidation: '2025-06-30',
      effectifs: 12,
      capacite: 20,
      tauxReussite: 92,
      description: 'Recherche en physique théorique et appliquée',
      specialites: ['Physique Quantique', 'Astrophysique', 'Matériaux'],
      commentaires: 'Programme en cours de révision pour amélioration'
    },
    {
      id: 4,
      code: 'DIP-004',
      nom: 'Licence en Langues',
      niveau: 'Licence',
      duree: '3 ans',
      credits: 180,
      responsable: 'Dr. Dubois',
      statut: 'Actif',
      dateCreation: '2021-01-01',
      dateValidation: '2024-06-30',
      effectifs: 65,
      capacite: 80,
      tauxReussite: 82,
      description: 'Formation en langues étrangères et traduction',
      specialites: ['Anglais', 'Espagnol', 'Allemand'],
      commentaires: 'Diplôme adapté aux besoins internationaux'
    },
    {
      id: 5,
      code: 'DIP-005',
      nom: 'Master en Droit',
      niveau: 'Master',
      duree: '2 ans',
      credits: 120,
      responsable: 'Dr. Moreau',
      statut: 'Suspendu',
      dateCreation: '2020-01-01',
      dateValidation: '2023-06-30',
      effectifs: 0,
      capacite: 50,
      tauxReussite: 0,
      description: 'Formation en droit des affaires et international',
      specialites: ['Droit des Affaires', 'Droit International', 'Droit Civil'],
      commentaires: 'Programme temporairement suspendu pour restructuration'
    }
  ];

  const columns = [
    {
      title: 'Diplôme',
      key: 'diplome',
      render: (_: any, record: Diplome) => (
        <div>
          <div className="font-medium">{record.nom}</div>
          <div className="text-sm text-gray-500">#{record.code}</div>
        </div>
      ),
    },
    {
      title: 'Niveau',
      key: 'niveau',
      render: (_: any, record: Diplome) => {
        const niveauConfig = {
          'Licence': { color: 'blue' },
          'Master': { color: 'green' },
          'Doctorat': { color: 'purple' },
        };
        const config = niveauConfig[record.niveau as keyof typeof niveauConfig];
        return (
          <Tag color={config?.color}>
            {record.niveau}
          </Tag>
        );
      },
    },
    {
      title: 'Durée/Crédits',
      key: 'dureeCredits',
      render: (_: any, record: Diplome) => (
        <div className="text-center">
          <div className="font-medium">{record.duree}</div>
          <div className="text-xs text-gray-500">{record.credits} crédits</div>
        </div>
      ),
    },
    {
      title: 'Effectifs',
      key: 'effectifs',
      render: (_: any, record: Diplome) => (
        <div>
          <div className="font-medium">{record.effectifs}/{record.capacite}</div>
          <Progress 
            percent={Math.round((record.effectifs / record.capacite) * 100)} 
            size="small" 
            showInfo={false}
            strokeColor={record.effectifs / record.capacite > 0.9 ? '#ff4d4f' : '#52c41a'}
          />
        </div>
      ),
    },
    {
      title: 'Taux de réussite',
      key: 'tauxReussite',
      render: (_: any, record: Diplome) => (
        <div className="text-center">
          <div className="font-medium">{record.tauxReussite}%</div>
          <div className="text-xs text-gray-500">Taux de réussite</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Diplome) => {
        const statusConfig = {
          'Actif': { color: 'green', icon: <CheckCircleOutlined /> },
          'En révision': { color: 'orange', icon: <ClockCircleOutlined /> },
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
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Diplome) => (
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

  const filteredData = diplomes.filter(diplome => {
    const matchesSearch = 
      diplome.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      diplome.code.toLowerCase().includes(searchText.toLowerCase()) ||
      diplome.description.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesNiveau = niveauFilter === 'all' || diplome.niveau === niveauFilter;
    const matchesStatut = statutFilter === 'all' || diplome.statut === statutFilter;
    
    return matchesSearch && matchesNiveau && matchesStatut;
  });

  // Statistiques
  const totalDiplomes = diplomes.length;
  const actifs = diplomes.filter(d => d.statut === 'Actif').length;
  const totalEffectifs = diplomes.reduce((sum, d) => sum + d.effectifs, 0);
  const totalCapacite = diplomes.reduce((sum, d) => sum + d.capacite, 0);

  // Diplômes en surcharge
  const surcharges = diplomes.filter(d => d.effectifs / d.capacite > 0.9).length;

  const handleView = (diplome: Diplome) => {
    setEditingDiplome(diplome);
    setIsModalVisible(true);
  };

  const handleEdit = (diplome: Diplome) => {
    setEditingDiplome(diplome);
    form.setFieldsValue({
      ...diplome,
      dateCreation: new Date(diplome.dateCreation),
      dateValidation: new Date(diplome.dateValidation),
      specialites: diplome.specialites
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingDiplome(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingDiplome) {
        message.success('Diplôme modifié avec succès !');
      } else {
        message.success('Diplôme ajouté avec succès !');
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
          message={`${surcharges} diplômes sont en surcharge et nécessitent une attention`}
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
              title="Total Diplômes"
              value={totalDiplomes}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Diplômes Actifs"
              value={actifs}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Effectifs"
              value={totalEffectifs}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Taux d'Occupation"
              value={Math.round((totalEffectifs / totalCapacite) * 100)}
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
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Diplômes</h2>
            <p className="text-gray-600 mt-1">Catalogue des formations et programmes d'études</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouveau diplôme
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un diplôme..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
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
          <Select
            placeholder="Statut"
            value={statutFilter}
            onChange={setStatutFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Actif">Actif</Option>
            <Option value="En révision">En révision</Option>
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
              `${range[0]}-${range[1]} sur ${total} diplômes`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un diplôme */}
      <Modal
        title={editingDiplome ? 'Modifier le diplôme' : 'Nouveau diplôme'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'Actif',
            niveau: 'Licence'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Code du diplôme"
                rules={[{ required: true, message: 'Veuillez saisir le code' }]}
              >
                <Input placeholder="DIP-001" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom du diplôme"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Licence en Informatique" />
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
                name="duree"
                label="Durée"
                rules={[{ required: true, message: 'Veuillez saisir la durée' }]}
              >
                <Input placeholder="3 ans" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="credits"
                label="Crédits ECTS"
                rules={[{ required: true, message: 'Veuillez saisir les crédits' }]}
              >
                <Input type="number" placeholder="180" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="responsable"
                label="Responsable"
                rules={[{ required: true, message: 'Veuillez saisir le responsable' }]}
              >
                <Input placeholder="Dr. Nom Prénom" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="effectifs"
                label="Effectifs actuels"
                rules={[{ required: true, message: 'Veuillez saisir les effectifs' }]}
              >
                <Input type="number" placeholder="85" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacite"
                label="Capacité maximale"
                rules={[{ required: true, message: 'Veuillez saisir la capacité' }]}
              >
                <Input type="number" placeholder="100" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tauxReussite"
                label="Taux de réussite (%)"
                rules={[{ required: true, message: 'Veuillez saisir le taux' }]}
              >
                <Input type="number" placeholder="78" />
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
                  <Option value="En révision">En révision</Option>
                  <Option value="Suspendu">Suspendu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateCreation"
                label="Date de création"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateValidation"
                label="Date de validation"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Veuillez saisir la description' }]}
              >
                <Input.TextArea rows={3} placeholder="Description du diplôme..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="specialites"
                label="Spécialités"
                rules={[{ required: true, message: 'Veuillez saisir les spécialités' }]}
              >
                <Select mode="tags" placeholder="Ajouter des spécialités">
                  <Option value="Développement Web">Développement Web</Option>
                  <Option value="Intelligence Artificielle">Intelligence Artificielle</Option>
                  <Option value="Sécurité">Sécurité</Option>
                  <Option value="Finance">Finance</Option>
                  <Option value="Marketing">Marketing</Option>
                  <Option value="Ressources Humaines">Ressources Humaines</Option>
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

export default ListeDesDiplomes;