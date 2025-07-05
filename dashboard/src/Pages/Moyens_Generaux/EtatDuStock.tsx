import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface StockItem {
  id: number;
  nom: string;
  categorie: string;
  quantite: number;
  quantiteMin: number;
  unite: string;
  prixUnitaire: number;
  fournisseur: string;
  dateDerniereCommande: string;
  statut: string;
  localisation: string;
  codeBarre: string;
}

const EtatDuStock = () => {
  const [searchText, setSearchText] = useState('');
  const [categorieFilter, setCategorieFilter] = useState<string>('all');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour le stock
  const stockItems: StockItem[] = [
    {
      id: 1,
      nom: 'Ordinateurs portables',
      categorie: 'Informatique',
      quantite: 45,
      quantiteMin: 10,
      unite: 'unités',
      prixUnitaire: 800,
      fournisseur: 'TechCorp',
      dateDerniereCommande: '2024-01-15',
      statut: 'Normal',
      localisation: 'Entrepôt A - Rayon 1',
      codeBarre: 'PC001'
    },
    {
      id: 2,
      nom: 'Papier A4',
      categorie: 'Fournitures',
      quantite: 5,
      quantiteMin: 20,
      unite: 'rames',
      prixUnitaire: 5,
      fournisseur: 'OfficePlus',
      dateDerniereCommande: '2024-02-01',
      statut: 'Rupture',
      localisation: 'Entrepôt B - Rayon 3',
      codeBarre: 'PAP002'
    },
    {
      id: 3,
      nom: 'Projecteurs',
      categorie: 'Audiovisuel',
      quantite: 12,
      quantiteMin: 5,
      unite: 'unités',
      prixUnitaire: 1200,
      fournisseur: 'AVTech',
      dateDerniereCommande: '2024-01-20',
      statut: 'Normal',
      localisation: 'Entrepôt A - Rayon 2',
      codeBarre: 'PROJ003'
    },
    {
      id: 4,
      nom: 'Chaises de bureau',
      categorie: 'Mobilier',
      quantite: 8,
      quantiteMin: 15,
      unite: 'unités',
      prixUnitaire: 150,
      fournisseur: 'MobilierPro',
      dateDerniereCommande: '2024-01-30',
      statut: 'Faible',
      localisation: 'Entrepôt C - Rayon 1',
      codeBarre: 'CHAIR004'
    },
    {
      id: 5,
      nom: 'Imprimantes',
      categorie: 'Informatique',
      quantite: 25,
      quantiteMin: 8,
      unite: 'unités',
      prixUnitaire: 300,
      fournisseur: 'PrintTech',
      dateDerniereCommande: '2024-02-10',
      statut: 'Normal',
      localisation: 'Entrepôt A - Rayon 1',
      codeBarre: 'PRINT005'
    }
  ];

  const columns = [
    {
      title: 'Article',
      key: 'article',
      render: (_: any, record: StockItem) => (
        <div>
          <div className="font-medium">{record.nom}</div>
          <div className="text-sm text-gray-500">Code: {record.codeBarre}</div>
        </div>
      ),
    },
    {
      title: 'Catégorie',
      dataIndex: 'categorie',
      key: 'categorie',
      render: (categorie: string) => (
        <Tag color="blue">{categorie}</Tag>
      ),
    },
    {
      title: 'Stock',
      key: 'stock',
      render: (_: any, record: StockItem) => {
        const pourcentage = (record.quantite / record.quantiteMin) * 100;
        const isLow = record.quantite <= record.quantiteMin;
        const isCritical = record.quantite < record.quantiteMin * 0.5;
        
        return (
          <div>
            <div className="font-semibold">
              {record.quantite} {record.unite}
            </div>
            <div className="text-sm text-gray-500">
              Min: {record.quantiteMin} {record.unite}
            </div>
            <Progress 
              percent={Math.min(pourcentage, 100)} 
              size="small" 
              showInfo={false}
              strokeColor={isCritical ? '#ff4d4f' : isLow ? '#faad14' : '#52c41a'}
            />
          </div>
        );
      },
    },
    {
      title: 'Prix unitaire',
      dataIndex: 'prixUnitaire',
      key: 'prixUnitaire',
      render: (prix: number) => (
        <span className="font-semibold text-green-600">
          {prix.toLocaleString('fr-FR')} €
        </span>
      ),
    },
    {
      title: 'Valeur totale',
      key: 'valeur',
      render: (_: any, record: StockItem) => (
        <span className="font-semibold">
          {(record.quantite * record.prixUnitaire).toLocaleString('fr-FR')} €
        </span>
      ),
    },
    {
      title: 'Fournisseur',
      dataIndex: 'fournisseur',
      key: 'fournisseur',
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: StockItem) => {
        const statusConfig = {
          'Normal': { color: 'green', icon: <CheckCircleOutlined /> },
          'Faible': { color: 'orange', icon: <WarningOutlined /> },
          'Rupture': { color: 'red', icon: <ExclamationCircleOutlined /> },
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
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: StockItem) => (
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

  const filteredData = stockItems.filter(item => {
    const matchesSearch = 
      item.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      item.codeBarre.toLowerCase().includes(searchText.toLowerCase()) ||
      item.fournisseur.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesCategorie = categorieFilter === 'all' || item.categorie === categorieFilter;
    const matchesStatut = statutFilter === 'all' || item.statut === statutFilter;
    
    return matchesSearch && matchesCategorie && matchesStatut;
  });

  const totalValeur = stockItems.reduce((sum, item) => sum + (item.quantite * item.prixUnitaire), 0);
  const itemsEnRupture = stockItems.filter(item => item.statut === 'Rupture').length;
  const itemsFaibles = stockItems.filter(item => item.statut === 'Faible').length;
  const totalArticles = stockItems.reduce((sum, item) => sum + item.quantite, 0);

  const handleEdit = (item: StockItem) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingItem) {
        message.success('Article modifié avec succès !');
      } else {
        message.success('Article ajouté avec succès !');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  const alertes = stockItems.filter(item => item.statut === 'Rupture' || item.statut === 'Faible');

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      {/* Alertes */}
      {alertes.length > 0 && (
        <Alert
          message={`${alertes.length} article(s) nécessitent une attention immédiate`}
          description={`${itemsEnRupture} en rupture de stock et ${itemsFaibles} en stock faible`}
          type="warning"
          showIcon
          action={
            <Button size="small" type="primary">
              Commander
            </Button>
          }
        />
      )}
      
      {/* Statistiques */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Valeur totale du stock"
              value={totalValeur}
              precision={0}
              valueStyle={{ color: '#1890ff' }}
              suffix="€"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total articles"
              value={totalArticles}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En rupture"
              value={itemsEnRupture}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Stock faible"
              value={itemsFaibles}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">État du Stock</h2>
            <p className="text-gray-600 mt-1">Gestion et suivi des articles en stock</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            + Ajouter un article
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un article..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
          <Select
            placeholder="Catégorie"
            value={categorieFilter}
            onChange={setCategorieFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Toutes les catégories</Option>
            <Option value="Informatique">Informatique</Option>
            <Option value="Fournitures">Fournitures</Option>
            <Option value="Audiovisuel">Audiovisuel</Option>
            <Option value="Mobilier">Mobilier</Option>
          </Select>
          <Select
            placeholder="Statut"
            value={statutFilter}
            onChange={setStatutFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Tous les statuts</Option>
            <Option value="Normal">Normal</Option>
            <Option value="Faible">Faible</Option>
            <Option value="Rupture">Rupture</Option>
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
              `${range[0]}-${range[1]} sur ${total} articles`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour ajouter/modifier un article */}
      <Modal
        title={editingItem ? 'Modifier l\'article' : 'Nouvel article'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            statut: 'Normal',
            unite: 'unités'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom de l'article"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Nom de l'article" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="codeBarre"
                label="Code-barres"
                rules={[{ required: true, message: 'Veuillez saisir le code-barres' }]}
              >
                <Input placeholder="CODE001" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categorie"
                label="Catégorie"
                rules={[{ required: true, message: 'Veuillez sélectionner la catégorie' }]}
              >
                <Select>
                  <Option value="Informatique">Informatique</Option>
                  <Option value="Fournitures">Fournitures</Option>
                  <Option value="Audiovisuel">Audiovisuel</Option>
                  <Option value="Mobilier">Mobilier</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fournisseur"
                label="Fournisseur"
                rules={[{ required: true, message: 'Veuillez saisir le fournisseur' }]}
              >
                <Input placeholder="Nom du fournisseur" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="quantite"
                label="Quantité en stock"
                rules={[{ required: true, message: 'Veuillez saisir la quantité' }]}
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="quantiteMin"
                label="Quantité minimum"
                rules={[{ required: true, message: 'Veuillez saisir la quantité minimum' }]}
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="unite"
                label="Unité"
                rules={[{ required: true, message: 'Veuillez saisir l\'unité' }]}
              >
                <Select>
                  <Option value="unités">Unités</Option>
                  <Option value="rames">Rames</Option>
                  <Option value="kg">Kilogrammes</Option>
                  <Option value="litres">Litres</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="prixUnitaire"
                label="Prix unitaire"
                rules={[{ required: true, message: 'Veuillez saisir le prix' }]}
              >
                <Input type="number" placeholder="0" suffix="€" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="localisation"
                label="Localisation"
                rules={[{ required: true, message: 'Veuillez saisir la localisation' }]}
              >
                <Input placeholder="Entrepôt - Rayon" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="statut"
                label="Statut"
                rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
              >
                <Select>
                  <Option value="Normal">Normal</Option>
                  <Option value="Faible">Faible</Option>
                  <Option value="Rupture">Rupture</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default EtatDuStock;
