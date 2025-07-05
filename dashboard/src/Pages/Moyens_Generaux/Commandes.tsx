import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker, Modal, Form, InputNumber, Space, Statistic, Progress, Alert, Badge, Tooltip, message, Steps } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, ShoppingCartOutlined, TruckOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Step } = Steps;

interface CommandeData {
  id: string;
  numero: string;
  fournisseur: string;
  dateCommande: string;
  dateLivraisonPrevue: string;
  montant: number;
  statut: string;
  priorite: string;
  type: string;
  description: string;
  articles: Array<{
    nom: string;
    quantite: number;
    prixUnitaire: number;
    total: number;
  }>;
}

const Commandes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState<CommandeData | null>(null);
  const [form] = Form.useForm();

  // Données simulées
  const commandesData: CommandeData[] = [
    {
      id: 'CMD-001',
      numero: 'CMD-2024-001',
      fournisseur: 'Fournitures Pro',
      dateCommande: '2024-01-15',
      dateLivraisonPrevue: '2024-01-25',
      montant: 2500,
      statut: 'En cours',
      priorite: 'Haute',
      type: 'Fournitures',
      description: 'Commande de fournitures de bureau',
      articles: [
        { nom: 'Stylos', quantite: 100, prixUnitaire: 2.5, total: 250 },
        { nom: 'Cahiers', quantite: 50, prixUnitaire: 5, total: 250 },
        { nom: 'Agendas', quantite: 30, prixUnitaire: 15, total: 450 }
      ]
    },
    {
      id: 'CMD-002',
      numero: 'CMD-2024-002',
      fournisseur: 'Tech Solutions',
      dateCommande: '2024-01-20',
      dateLivraisonPrevue: '2024-02-05',
      montant: 8500,
      statut: 'Livrée',
      priorite: 'Normale',
      type: 'Équipement',
      description: 'Commande d\'équipements informatiques',
      articles: [
        { nom: 'Ordinateurs portables', quantite: 5, prixUnitaire: 1200, total: 6000 },
        { nom: 'Imprimantes', quantite: 2, prixUnitaire: 800, total: 1600 },
        { nom: 'Scanners', quantite: 1, prixUnitaire: 900, total: 900 }
      ]
    },
    {
      id: 'CMD-003',
      numero: 'CMD-2024-003',
      fournisseur: 'Mobilier Office',
      dateCommande: '2024-01-25',
      dateLivraisonPrevue: '2024-02-10',
      montant: 3200,
      statut: 'En attente',
      priorite: 'Basse',
      type: 'Mobilier',
      description: 'Commande de mobilier de bureau',
      articles: [
        { nom: 'Bureaux', quantite: 10, prixUnitaire: 200, total: 2000 },
        { nom: 'Chaises', quantite: 10, prixUnitaire: 120, total: 1200 }
      ]
    },
    {
      id: 'CMD-004',
      numero: 'CMD-2024-004',
      fournisseur: 'Sécurité Plus',
      dateCommande: '2024-01-30',
      dateLivraisonPrevue: '2024-02-15',
      montant: 1800,
      statut: 'En cours',
      priorite: 'Haute',
      type: 'Sécurité',
      description: 'Commande d\'équipements de sécurité',
      articles: [
        { nom: 'Extincteurs', quantite: 8, prixUnitaire: 150, total: 1200 },
        { nom: 'Détecteurs de fumée', quantite: 12, prixUnitaire: 50, total: 600 }
      ]
    },
    {
      id: 'CMD-005',
      numero: 'CMD-2024-005',
      fournisseur: 'Nettoyage Pro',
      dateCommande: '2024-02-01',
      dateLivraisonPrevue: '2024-02-08',
      montant: 950,
      statut: 'Livrée',
      priorite: 'Normale',
      type: 'Entretien',
      description: 'Commande de produits d\'entretien',
      articles: [
        { nom: 'Détergents', quantite: 20, prixUnitaire: 25, total: 500 },
        { nom: 'Papier toilette', quantite: 50, prixUnitaire: 9, total: 450 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livrée': return 'success';
      case 'En cours': return 'processing';
      case 'En attente': return 'warning';
      case 'Annulée': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'red';
      case 'Normale': return 'blue';
      case 'Basse': return 'green';
      default: return 'default';
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'En attente': return 0;
      case 'En cours': return 1;
      case 'Livrée': return 2;
      default: return 0;
    }
  };

  const columns = [
    {
      title: 'Numéro',
      dataIndex: 'numero',
      key: 'numero',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Fournisseur',
      dataIndex: 'fournisseur',
      key: 'fournisseur',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      render: (amount: number) => (
        <span className="font-medium text-green-600">
          {amount.toLocaleString('fr-FR')} €
        </span>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Priorité',
      dataIndex: 'priorite',
      key: 'priorite',
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>
          {priority}
        </Tag>
      )
    },
    {
      title: 'Livraison prévue',
      dataIndex: 'dateLivraisonPrevue',
      key: 'dateLivraisonPrevue',
      render: (date: string) => {
        const livraison = new Date(date);
        const today = new Date();
        const isOverdue = livraison < today && getStatusStep(getStatusStep(date) === 0 ? 'En attente' : 'En cours') < 2;
        
        return (
          <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
            {new Date(date).toLocaleDateString('fr-FR')}
            {isOverdue && <Badge status="error" className="ml-2" />}
          </span>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: CommandeData) => (
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

  const handleViewDetails = (commande: CommandeData) => {
    setSelectedCommande(commande);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Commande créée:', values);
      message.success('Commande créée avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création de la commande');
    }
  };

  const totalCommandes = commandesData.length;
  const totalMontant = commandesData.reduce((sum, commande) => sum + commande.montant, 0);
  const commandesLivrees = commandesData.filter(c => c.statut === 'Livrée').length;
  const commandesEnCours = commandesData.filter(c => c.statut === 'En cours').length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des commandes"
                value={totalCommandes}
                valueStyle={{ color: '#1890ff' }}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Montant total"
                value={totalMontant}
                suffix="€"
                valueStyle={{ color: '#3f8600' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Commandes livrées"
                value={commandesLivrees}
                suffix={`/${totalCommandes}`}
                valueStyle={{ color: '#722ed1' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En cours"
                value={commandesEnCours}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Filtres et actions */}
        <Card>
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Input
                placeholder="Rechercher une commande..."
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4}>
              <Select placeholder="Statut" style={{ width: '100%' }}>
                <Option value="all">Tous les statuts</Option>
                <Option value="livree">Livrée</Option>
                <Option value="en_cours">En cours</Option>
                <Option value="en_attente">En attente</Option>
                <Option value="annulee">Annulée</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Type" style={{ width: '100%' }}>
                <Option value="all">Tous les types</Option>
                <Option value="fournitures">Fournitures</Option>
                <Option value="equipement">Équipement</Option>
                <Option value="mobilier">Mobilier</Option>
                <Option value="securite">Sécurité</Option>
                <Option value="entretien">Entretien</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} placeholder={['Date début', 'Date fin']} />
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouvelle commande
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des commandes */}
        <Card title="Commandes">
          <Table
            dataSource={commandesData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: commandesData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} commandes`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Livraisons en retard"
          description="2 commandes ont dépassé leur date de livraison prévue. Veuillez contacter les fournisseurs concernés."
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
        title="Nouvelle commande"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fournisseur"
                label="Fournisseur"
                rules={[{ required: true, message: 'Veuillez sélectionner le fournisseur' }]}
              >
                <Select placeholder="Sélectionner le fournisseur">
                  <Option value="Fournitures Pro">Fournitures Pro</Option>
                  <Option value="Tech Solutions">Tech Solutions</Option>
                  <Option value="Mobilier Office">Mobilier Office</Option>
                  <Option value="Sécurité Plus">Sécurité Plus</Option>
                  <Option value="Nettoyage Pro">Nettoyage Pro</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type de commande"
                rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
              >
                <Select placeholder="Sélectionner le type">
                  <Option value="Fournitures">Fournitures</Option>
                  <Option value="Équipement">Équipement</Option>
                  <Option value="Mobilier">Mobilier</Option>
                  <Option value="Sécurité">Sécurité</Option>
                  <Option value="Entretien">Entretien</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateLivraisonPrevue"
                label="Date de livraison prévue"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priorite"
                label="Priorité"
                rules={[{ required: true, message: 'Veuillez sélectionner la priorité' }]}
              >
                <Select placeholder="Sélectionner la priorité">
                  <Option value="Haute">Haute</Option>
                  <Option value="Normale">Normale</Option>
                  <Option value="Basse">Basse</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Veuillez saisir la description' }]}
              >
                <TextArea rows={3} placeholder="Description de la commande..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer la commande
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails de la commande"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedCommande && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Numéro:</strong> {selectedCommande.numero}</p>
                  <p><strong>Fournisseur:</strong> {selectedCommande.fournisseur}</p>
                  <p><strong>Type:</strong> {selectedCommande.type}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Date de commande:</strong> {new Date(selectedCommande.dateCommande).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Livraison prévue:</strong> {new Date(selectedCommande.dateLivraisonPrevue).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Montant total:</strong> {selectedCommande.montant.toLocaleString('fr-FR')} €</p>
                </Col>
              </Row>
            </Card>

            {/* Statut */}
            <Card title="Statut de la commande" size="small">
              <Steps current={getStatusStep(selectedCommande.statut)}>
                <Step title="Commande" description="Commande passée" />
                <Step title="En cours" description="En préparation" />
                <Step title="Livrée" description="Livraison effectuée" />
              </Steps>
            </Card>

            {/* Articles */}
            <Card title="Articles commandés" size="small">
              <Table
                dataSource={selectedCommande.articles}
                columns={[
                  { title: 'Article', dataIndex: 'nom', key: 'nom' },
                  { title: 'Quantité', dataIndex: 'quantite', key: 'quantite' },
                  { 
                    title: 'Prix unitaire', 
                    dataIndex: 'prixUnitaire', 
                    key: 'prixUnitaire',
                    render: (price: number) => `${price.toLocaleString('fr-FR')} €`
                  },
                  { 
                    title: 'Total', 
                    dataIndex: 'total', 
                    key: 'total',
                    render: (total: number) => (
                      <span className="font-medium text-green-600">
                        {total.toLocaleString('fr-FR')} €
                      </span>
                    )
                  }
                ]}
                pagination={false}
                size="small"
              />
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Commandes;
