import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, Modal, Form, InputNumber, Space, Statistic, Progress, Alert, Tooltip, message, Badge } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ToolOutlined, InboxOutlined, DollarOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;

interface KitData {
  id: string;
  nom: string;
  categorie: string;
  description: string;
  quantiteDisponible: number;
  quantiteTotale: number;
  prixUnitaire: number;
  statut: string;
  localisation: string;
  dateAjout: string;
  derniereUtilisation: string;
  accessoires: Array<{
    nom: string;
    quantite: number;
    statut: string;
  }>;
}

const KitEtAccessoires = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedKit, setSelectedKit] = useState<KitData | null>(null);
  const [form] = Form.useForm();

  // Données simulées
  const kitsData: KitData[] = [
    {
      id: 'KIT-001',
      nom: 'Kit de réparation informatique',
      categorie: 'Informatique',
      description: 'Kit complet pour la maintenance informatique',
      quantiteDisponible: 8,
      quantiteTotale: 10,
      prixUnitaire: 150,
      statut: 'Disponible',
      localisation: 'Salle technique A',
      dateAjout: '2024-01-15',
      derniereUtilisation: '2024-01-20',
      accessoires: [
        { nom: 'Tournevis', quantite: 2, statut: 'Disponible' },
        { nom: 'Pinces', quantite: 1, statut: 'Disponible' },
        { nom: 'Câbles USB', quantite: 5, statut: 'Disponible' },
        { nom: 'Clés USB', quantite: 2, statut: 'En réparation' }
      ]
    },
    {
      id: 'KIT-002',
      nom: 'Kit de nettoyage',
      categorie: 'Entretien',
      description: 'Kit de nettoyage pour les salles de classe',
      quantiteDisponible: 15,
      quantiteTotale: 20,
      prixUnitaire: 45,
      statut: 'Disponible',
      localisation: 'Entrepôt principal',
      dateAjout: '2024-01-10',
      derniereUtilisation: '2024-01-18',
      accessoires: [
        { nom: 'Chiffons', quantite: 10, statut: 'Disponible' },
        { nom: 'Sprays nettoyants', quantite: 5, statut: 'Disponible' },
        { nom: 'Balais', quantite: 3, statut: 'Disponible' },
        { nom: 'Seaux', quantite: 2, statut: 'Disponible' }
      ]
    },
    {
      id: 'KIT-003',
      nom: 'Kit de sécurité',
      categorie: 'Sécurité',
      description: 'Équipements de sécurité d\'urgence',
      quantiteDisponible: 3,
      quantiteTotale: 5,
      prixUnitaire: 200,
      statut: 'Limité',
      localisation: 'Salle de sécurité',
      dateAjout: '2024-01-05',
      derniereUtilisation: '2024-01-25',
      accessoires: [
        { nom: 'Extincteurs', quantite: 2, statut: 'Disponible' },
        { nom: 'Masques', quantite: 10, statut: 'Disponible' },
        { nom: 'Gants', quantite: 5, statut: 'Disponible' },
        { nom: 'Lampes de poche', quantite: 3, statut: 'En maintenance' }
      ]
    },
    {
      id: 'KIT-004',
      nom: 'Kit de projection',
      categorie: 'Audiovisuel',
      description: 'Équipements pour projections et présentations',
      quantiteDisponible: 0,
      quantiteTotale: 3,
      prixUnitaire: 300,
      statut: 'Indisponible',
      localisation: 'Salle de conférence',
      dateAjout: '2024-01-20',
      derniereUtilisation: '2024-01-22',
      accessoires: [
        { nom: 'Projecteurs', quantite: 0, statut: 'En prêt' },
        { nom: 'Écrans', quantite: 1, statut: 'Disponible' },
        { nom: 'Câbles HDMI', quantite: 2, statut: 'Disponible' },
        { nom: 'Télécommandes', quantite: 0, statut: 'En prêt' }
      ]
    },
    {
      id: 'KIT-005',
      nom: 'Kit de jardinage',
      categorie: 'Extérieur',
      description: 'Outils pour l\'entretien des espaces verts',
      quantiteDisponible: 12,
      quantiteTotale: 15,
      prixUnitaire: 80,
      statut: 'Disponible',
      localisation: 'Hangar extérieur',
      dateAjout: '2024-01-12',
      derniereUtilisation: '2024-01-19',
      accessoires: [
        { nom: 'Râteaux', quantite: 3, statut: 'Disponible' },
        { nom: 'Pelles', quantite: 2, statut: 'Disponible' },
        { nom: 'Sécateurs', quantite: 4, statut: 'Disponible' },
        { nom: 'Arrosoirs', quantite: 3, statut: 'Disponible' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'success';
      case 'Limité': return 'warning';
      case 'Indisponible': return 'error';
      case 'En maintenance': return 'processing';
      default: return 'default';
    }
  };

  const getCategorieColor = (categorie: string) => {
    switch (categorie) {
      case 'Informatique': return 'blue';
      case 'Entretien': return 'green';
      case 'Sécurité': return 'red';
      case 'Audiovisuel': return 'purple';
      case 'Extérieur': return 'orange';
      default: return 'default';
    }
  };

  const getStockLevel = (disponible: number, total: number) => {
    const pourcentage = (disponible / total) * 100;
    if (pourcentage === 0) return 'error';
    if (pourcentage <= 25) return 'warning';
    return 'success';
  };

  const columns = [
    {
      title: 'Kit',
      dataIndex: 'nom',
      key: 'nom',
      render: (text: string, record: KitData) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.description}</div>
        </div>
      )
    },
    {
      title: 'Catégorie',
      dataIndex: 'categorie',
      key: 'categorie',
      render: (categorie: string) => (
        <Tag color={getCategorieColor(categorie)}>
          {categorie}
        </Tag>
      )
    },
    {
      title: 'Stock',
      key: 'stock',
      render: (record: KitData) => (
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{record.quantiteDisponible}/{record.quantiteTotale}</span>
            <Badge status={getStockLevel(record.quantiteDisponible, record.quantiteTotale)} />
          </div>
          <Progress 
            percent={Math.round((record.quantiteDisponible / record.quantiteTotale) * 100)} 
            size="small" 
            showInfo={false}
            className="mt-1"
          />
        </div>
      )
    },
    {
      title: 'Prix unitaire',
      dataIndex: 'prixUnitaire',
      key: 'prixUnitaire',
      render: (prix: number) => (
        <span className="font-medium text-green-600">
          {prix.toLocaleString('fr-FR')} €
        </span>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut: string) => (
        <Tag color={getStatusColor(statut)}>
          {statut}
        </Tag>
      )
    },
    {
      title: 'Localisation',
      dataIndex: 'localisation',
      key: 'localisation',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: KitData) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Supprimer">
            <Button type="text" icon={<DeleteOutlined />} size="small" danger />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleViewDetails = (kit: KitData) => {
    setSelectedKit(kit);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Kit créé:', values);
      message.success('Kit créé avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création du kit');
    }
  };

  const totalKits = kitsData.length;
  const kitsDisponibles = kitsData.filter(k => k.statut === 'Disponible').length;
  const totalAccessoires = kitsData.reduce((sum, kit) => sum + kit.accessoires.length, 0);
  const valeurTotale = kitsData.reduce((sum, kit) => sum + (kit.prixUnitaire * kit.quantiteTotale), 0);

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des kits"
                value={totalKits}
                valueStyle={{ color: '#1890ff' }}
                prefix={<InboxOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Kits disponibles"
                value={kitsDisponibles}
                suffix={`/${totalKits}`}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des accessoires"
                value={totalAccessoires}
                valueStyle={{ color: '#722ed1' }}
                prefix={<ToolOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Valeur totale"
                value={valeurTotale}
                suffix="€"
                valueStyle={{ color: '#cf1322' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Filtres et actions */}
        <Card>
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Input
                placeholder="Rechercher un kit..."
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4}>
              <Select placeholder="Statut" style={{ width: '100%' }}>
                <Option value="all">Tous les statuts</Option>
                <Option value="disponible">Disponible</Option>
                <Option value="limite">Limité</Option>
                <Option value="indisponible">Indisponible</Option>
                <Option value="maintenance">En maintenance</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Catégorie" style={{ width: '100%' }}>
                <Option value="all">Toutes les catégories</Option>
                <Option value="informatique">Informatique</Option>
                <Option value="entretien">Entretien</Option>
                <Option value="securite">Sécurité</Option>
                <Option value="audiovisuel">Audiovisuel</Option>
                <Option value="exterieur">Extérieur</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select placeholder="Niveau de stock" style={{ width: '100%' }}>
                <Option value="all">Tous les niveaux</Option>
                <Option value="disponible">Disponible</Option>
                <Option value="limite">Limité</Option>
                <Option value="epuise">Épuisé</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouveau kit
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des kits */}
        <Card title="Kits et accessoires">
          <Table
            dataSource={kitsData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: kitsData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} kits`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Stock faible"
          description="3 kits ont un niveau de stock faible. Veuillez réapprovisionner."
          type="warning"
          showIcon
          action={
            <Button size="small" type="link">
              Voir les détails
            </Button>
          }
        />
      </div>

      {/* Modal de création/modification */}
      <Modal
        title="Nouveau kit"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom du kit"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Nom du kit" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categorie"
                label="Catégorie"
                rules={[{ required: true, message: 'Veuillez sélectionner la catégorie' }]}
              >
                <Select placeholder="Sélectionner la catégorie">
                  <Option value="Informatique">Informatique</Option>
                  <Option value="Entretien">Entretien</Option>
                  <Option value="Sécurité">Sécurité</Option>
                  <Option value="Audiovisuel">Audiovisuel</Option>
                  <Option value="Extérieur">Extérieur</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantiteTotale"
                label="Quantité totale"
                rules={[{ required: true, message: 'Veuillez saisir la quantité' }]}
              >
                <InputNumber min={1} placeholder="Quantité" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="prixUnitaire"
                label="Prix unitaire"
                rules={[{ required: true, message: 'Veuillez saisir le prix' }]}
              >
                <InputNumber min={0} placeholder="Prix" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="statut"
                label="Statut"
                rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
              >
                <Select placeholder="Sélectionner le statut">
                  <Option value="Disponible">Disponible</Option>
                  <Option value="Limité">Limité</Option>
                  <Option value="Indisponible">Indisponible</Option>
                  <Option value="En maintenance">En maintenance</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="localisation"
                label="Localisation"
                rules={[{ required: true, message: 'Veuillez saisir la localisation' }]}
              >
                <Input placeholder="Localisation" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Veuillez saisir la description' }]}
              >
                <TextArea rows={3} placeholder="Description du kit..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer le kit
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails du kit"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedKit && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Nom:</strong> {selectedKit.nom}</p>
                  <p><strong>Catégorie:</strong> 
                    <Tag color={getCategorieColor(selectedKit.categorie)} className="ml-2">
                      {selectedKit.categorie}
                    </Tag>
                  </p>
                  <p><strong>Statut:</strong> 
                    <Tag color={getStatusColor(selectedKit.statut)} className="ml-2">
                      {selectedKit.statut}
                    </Tag>
                  </p>
                  <p><strong>Localisation:</strong> {selectedKit.localisation}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Stock:</strong> {selectedKit.quantiteDisponible}/{selectedKit.quantiteTotale}</p>
                  <p><strong>Prix unitaire:</strong> {selectedKit.prixUnitaire.toLocaleString('fr-FR')} €</p>
                  <p><strong>Date d'ajout:</strong> {new Date(selectedKit.dateAjout).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Dernière utilisation:</strong> {new Date(selectedKit.derniereUtilisation).toLocaleDateString('fr-FR')}</p>
                </Col>
              </Row>
              <div className="mt-4">
                <p><strong>Description:</strong></p>
                <p className="text-gray-600">{selectedKit.description}</p>
              </div>
            </Card>

            {/* Accessoires */}
            <Card title="Accessoires inclus" size="small">
              <Table
                dataSource={selectedKit.accessoires}
                columns={[
                  { title: 'Accessoire', dataIndex: 'nom', key: 'nom' },
                  { title: 'Quantité', dataIndex: 'quantite', key: 'quantite' },
                  { 
                    title: 'Statut', 
                    dataIndex: 'statut', 
                    key: 'statut',
                    render: (statut: string) => (
                      <Tag color={getStatusColor(statut)}>
                        {statut}
                      </Tag>
                    )
                  }
                ]}
                pagination={false}
                size="small"
              />
            </Card>

            {/* Actions rapides */}
            <Card title="Actions rapides" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="primary" block icon={<PlusOutlined />}>
                  Ajouter des accessoires
                </Button>
                <Button block icon={<EditOutlined />}>
                  Modifier le kit
                </Button>
                <Button block icon={<ToolOutlined />}>
                  Demander maintenance
                </Button>
                <Button block icon={<InboxOutlined />}>
                  Vérifier l'inventaire
                </Button>
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default KitEtAccessoires;
