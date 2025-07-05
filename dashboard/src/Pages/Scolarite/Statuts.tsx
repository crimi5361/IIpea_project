import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UserOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface StatutEtudiant {
  id: number;
  numeroEtudiant: string;
  nom: string;
  prenom: string;
  filiere: string;
  niveau: string;
  statut: string;
  dateStatut: string;
  motif: string;
  responsable: string;
  commentaires: string;
  documents: string[];
}

const Statuts = () => {
  const [searchText, setSearchText] = useState('');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [filiereFilter, setFiliereFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStatut, setEditingStatut] = useState<StatutEtudiant | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les statuts
  const statuts: StatutEtudiant[] = [
    {
      id: 1,
      numeroEtudiant: '2024001',
      nom: 'Dupont',
      prenom: 'Jean',
      filiere: 'Informatique',
      niveau: 'L1',
      statut: 'Inscrit',
      dateStatut: '2024-01-15',
      motif: 'Inscription normale',
      responsable: 'Marie Martin',
      commentaires: 'Étudiant régulier',
      documents: ['Carte étudiant', 'Certificat de scolarité']
    },
    {
      id: 2,
      numeroEtudiant: '2024002',
      nom: 'Bernard',
      prenom: 'Sophie',
      filiere: 'Mathématiques',
      niveau: 'L2',
      statut: 'En attente',
      dateStatut: '2024-02-01',
      motif: 'Documents manquants',
      responsable: 'Pierre Leroy',
      commentaires: 'Attente du certificat médical',
      documents: ['Carte étudiant']
    },
    {
      id: 3,
      numeroEtudiant: '2024003',
      nom: 'Martin',
      prenom: 'Pierre',
      filiere: 'Physique',
      niveau: 'L3',
      statut: 'Suspendu',
      dateStatut: '2024-01-20',
      motif: 'Retard de paiement',
      responsable: 'Jean Dupont',
      commentaires: 'Suspendu jusqu\'au paiement des frais',
      documents: ['Avertissement']
    },
    {
      id: 4,
      numeroEtudiant: '2024004',
      nom: 'Leroy',
      prenom: 'Marie',
      filiere: 'Chimie',
      niveau: 'M1',
      statut: 'Inscrit',
      dateStatut: '2024-01-10',
      motif: 'Inscription normale',
      responsable: 'Sophie Bernard',
      commentaires: 'Étudiante excellente',
      documents: ['Carte étudiant', 'Certificat de scolarité', 'Attestation d\'assurance']
    },
    {
      id: 5,
      numeroEtudiant: '2024005',
      nom: 'Dubois',
      prenom: 'Marc',
      filiere: 'Biologie',
      niveau: 'L1',
      statut: 'Radié',
      dateStatut: '2024-02-15',
      motif: 'Absence prolongée',
      responsable: 'Marie Martin',
      commentaires: 'Radié pour absence non justifiée',
      documents: ['Notification de radiation']
    }
  ];

  const columns = [
    {
      title: 'Étudiant',
      key: 'etudiant',
      render: (_: any, record: StatutEtudiant) => (
        <div>
          <div className="font-medium">{record.prenom} {record.nom}</div>
          <div className="text-sm text-gray-500">#{record.numeroEtudiant}</div>
        </div>
      ),
    },
    {
      title: 'Formation',
      key: 'formation',
      render: (_: any, record: StatutEtudiant) => (
        <div>
          <div className="font-medium">{record.filiere}</div>
          <div className="text-sm text-gray-500">{record.niveau}</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: StatutEtudiant) => {
        const statusConfig = {
          'Inscrit': { color: 'green', icon: <CheckCircleOutlined /> },
          'En attente': { color: 'orange', icon: <ClockCircleOutlined /> },
          'Suspendu': { color: 'red', icon: <ExclamationCircleOutlined /> },
          'Radié': { color: 'red', icon: <ExclamationCircleOutlined /> },
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
      title: 'Date du statut',
      dataIndex: 'dateStatut',
      key: 'dateStatut',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Motif',
      dataIndex: 'motif',
      key: 'motif',
      render: (motif: string) => (
        <span className="text-sm">{motif}</span>
      ),
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Documents',
      key: 'documents',
      render: (_: any, record: StatutEtudiant) => (
        <div>
          {record.documents.map((doc, index) => (
            <Tag key={index} className="mb-1">
              {doc}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: StatutEtudiant) => (
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

  const filteredData = statuts.filter(statut => {
    const matchesSearch = 
      statut.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      statut.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
      statut.numeroEtudiant.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatut = statutFilter === 'all' || statut.statut === statutFilter;
    const matchesFiliere = filiereFilter === 'all' || statut.filiere === filiereFilter;
    
    return matchesSearch && matchesStatut && matchesFiliere;
  });

  const inscrits = statuts.filter(s => s.statut === 'Inscrit').length;
  const enAttente = statuts.filter(s => s.statut === 'En attente').length;
  const suspendus = statuts.filter(s => s.statut === 'Suspendu').length;
  const radies = statuts.filter(s => s.statut === 'Radié').length;

  const handleEdit = (statut: StatutEtudiant) => {
    setEditingStatut(statut);
    form.setFieldsValue({
      ...statut,
      dateStatut: new Date(statut.dateStatut)
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingStatut(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingStatut) {
        message.success('Statut modifié avec succès !');
      } else {
        message.success('Statut ajouté avec succès !');
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
              title="Total Étudiants"
              value={statuts.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Inscrits"
              value={inscrits}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En attente"
              value={enAttente}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Suspendus/Radiés"
              value={suspendus + radies}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Statuts</h2>
            <p className="text-gray-600 mt-1">Suivi des statuts d'inscription des étudiants</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Nouveau statut
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un étudiant..."
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
            <Option value="Inscrit">Inscrit</Option>
            <Option value="En attente">En attente</Option>
            <Option value="Suspendu">Suspendu</Option>
            <Option value="Radié">Radié</Option>
          </Select>
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
              `${range[0]}-${range[1]} sur ${total} étudiants`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un statut */}
      <Modal
        title={editingStatut ? 'Modifier le statut' : 'Nouveau statut'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'Inscrit'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="numeroEtudiant"
                label="Numéro d'étudiant"
                rules={[{ required: true, message: 'Veuillez saisir le numéro' }]}
              >
                <Input placeholder="2024001" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Nom de famille" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="prenom"
                label="Prénom"
                rules={[{ required: true, message: 'Veuillez saisir le prénom' }]}
              >
                <Input placeholder="Prénom" />
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
                name="statut"
                label="Statut"
                rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
              >
                <Select>
                  <Option value="Inscrit">Inscrit</Option>
                  <Option value="En attente">En attente</Option>
                  <Option value="Suspendu">Suspendu</Option>
                  <Option value="Radié">Radié</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateStatut"
                label="Date du statut"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <Input type="date" />
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
            <Col span={24}>
              <Form.Item
                name="motif"
                label="Motif"
                rules={[{ required: true, message: 'Veuillez saisir le motif' }]}
              >
                <Input placeholder="Motif du statut" />
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

export default Statuts;
