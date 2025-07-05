import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker, Modal, Form, InputNumber, Space, Statistic, Progress, Alert, Tooltip, message, Badge, Steps } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, TruckOutlined, InboxOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Step } = Steps;

interface ReceptionData {
  id: string;
  numeroCommande: string;
  fournisseur: string;
  dateCommande: string;
  dateLivraisonPrevue: string;
  dateReception: string;
  montant: number;
  statut: string;
  priorite: string;
  articles: Array<{
    nom: string;
    quantiteCommande: number;
    quantiteRecue: number;
    prixUnitaire: number;
    statut: string;
  }>;
  commentaires: string;
}

const ReceptionCommande = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedReception, setSelectedReception] = useState<ReceptionData | null>(null);
  const [form] = Form.useForm();

  // Données simulées
  const receptionsData: ReceptionData[] = [
    {
      id: 'REC-001',
      numeroCommande: 'CMD-2024-001',
      fournisseur: 'Fournitures Pro',
      dateCommande: '2024-01-15',
      dateLivraisonPrevue: '2024-01-25',
      dateReception: '2024-01-24',
      montant: 2500,
      statut: 'Réceptionnée',
      priorite: 'Haute',
      articles: [
        { nom: 'Stylos', quantiteCommande: 100, quantiteRecue: 100, prixUnitaire: 2.5, statut: 'Complet' },
        { nom: 'Cahiers', quantiteCommande: 50, quantiteRecue: 48, prixUnitaire: 5, statut: 'Partiel' },
        { nom: 'Agendas', quantiteCommande: 30, quantiteRecue: 30, prixUnitaire: 15, statut: 'Complet' }
      ],
      commentaires: 'Livraison conforme, 2 cahiers manquants'
    },
    {
      id: 'REC-002',
      numeroCommande: 'CMD-2024-002',
      fournisseur: 'Tech Solutions',
      dateCommande: '2024-01-20',
      dateLivraisonPrevue: '2024-02-05',
      dateReception: '2024-02-03',
      montant: 8500,
      statut: 'Réceptionnée',
      priorite: 'Normale',
      articles: [
        { nom: 'Ordinateurs portables', quantiteCommande: 5, quantiteRecue: 5, prixUnitaire: 1200, statut: 'Complet' },
        { nom: 'Imprimantes', quantiteCommande: 2, quantiteRecue: 2, prixUnitaire: 800, statut: 'Complet' },
        { nom: 'Scanners', quantiteCommande: 1, quantiteRecue: 1, prixUnitaire: 900, statut: 'Complet' }
      ],
      commentaires: 'Livraison parfaite, tous les articles conformes'
    },
    {
      id: 'REC-003',
      numeroCommande: 'CMD-2024-003',
      fournisseur: 'Mobilier Office',
      dateCommande: '2024-01-25',
      dateLivraisonPrevue: '2024-02-10',
      dateReception: '',
      montant: 3200,
      statut: 'En attente',
      priorite: 'Basse',
      articles: [
        { nom: 'Bureaux', quantiteCommande: 10, quantiteRecue: 0, prixUnitaire: 200, statut: 'En attente' },
        { nom: 'Chaises', quantiteCommande: 10, quantiteRecue: 0, prixUnitaire: 120, statut: 'En attente' }
      ],
      commentaires: 'Livraison prévue pour le 10 février'
    },
    {
      id: 'REC-004',
      numeroCommande: 'CMD-2024-004',
      fournisseur: 'Sécurité Plus',
      dateCommande: '2024-01-30',
      dateLivraisonPrevue: '2024-02-15',
      dateReception: '2024-02-12',
      montant: 1800,
      statut: 'Réceptionnée',
      priorite: 'Haute',
      articles: [
        { nom: 'Extincteurs', quantiteCommande: 8, quantiteRecue: 8, prixUnitaire: 150, statut: 'Complet' },
        { nom: 'Détecteurs de fumée', quantiteCommande: 12, quantiteRecue: 10, prixUnitaire: 50, statut: 'Partiel' }
      ],
      commentaires: '2 détecteurs de fumée manquants, à réclamer'
    },
    {
      id: 'REC-005',
      numeroCommande: 'CMD-2024-005',
      fournisseur: 'Nettoyage Pro',
      dateCommande: '2024-02-01',
      dateLivraisonPrevue: '2024-02-08',
      dateReception: '2024-02-07',
      montant: 950,
      statut: 'Réceptionnée',
      priorite: 'Normale',
      articles: [
        { nom: 'Détergents', quantiteCommande: 20, quantiteRecue: 20, prixUnitaire: 25, statut: 'Complet' },
        { nom: 'Papier toilette', quantiteCommande: 50, quantiteRecue: 50, prixUnitaire: 9, statut: 'Complet' }
      ],
      commentaires: 'Livraison conforme'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Réceptionnée': return 'success';
      case 'En attente': return 'warning';
      case 'En retard': return 'error';
      case 'Partiellement reçue': return 'processing';
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

  const getArticleStatusColor = (status: string) => {
    switch (status) {
      case 'Complet': return 'success';
      case 'Partiel': return 'warning';
      case 'En attente': return 'default';
      case 'Manquant': return 'error';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Commande',
      dataIndex: 'numeroCommande',
      key: 'numeroCommande',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Fournisseur',
      dataIndex: 'fournisseur',
      key: 'fournisseur',
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
      render: (statut: string) => (
        <Tag color={getStatusColor(statut)}>
          {statut}
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
      render: (date: string, record: ReceptionData) => {
        const livraison = new Date(date);
        const today = new Date();
        const isOverdue = livraison < today && record.statut !== 'Réceptionnée';
        
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
      render: (record: ReceptionData) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Réceptionner">
            <Button 
              type="primary" 
              size="small"
              disabled={record.statut === 'Réceptionnée'}
            >
              Réceptionner
            </Button>
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleViewDetails = (reception: ReceptionData) => {
    setSelectedReception(reception);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Réception créée:', values);
      message.success('Réception créée avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création de la réception');
    }
  };

  const totalReceptions = receptionsData.length;
  const receptionsCompletees = receptionsData.filter(r => r.statut === 'Réceptionnée').length;
  const totalMontant = receptionsData.reduce((sum, reception) => sum + reception.montant, 0);
  const receptionsEnRetard = receptionsData.filter(r => {
    const livraison = new Date(r.dateLivraisonPrevue);
    const today = new Date();
    return livraison < today && r.statut !== 'Réceptionnée';
  }).length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des réceptions"
                value={totalReceptions}
                valueStyle={{ color: '#1890ff' }}
                prefix={<InboxOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Réceptions complétées"
                value={receptionsCompletees}
                suffix={`/${totalReceptions}`}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Montant total"
                value={totalMontant}
                suffix="€"
                valueStyle={{ color: '#722ed1' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En retard"
                value={receptionsEnRetard}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ExclamationCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Filtres et actions */}
        <Card>
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Input
                placeholder="Rechercher une réception..."
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4}>
              <Select placeholder="Statut" style={{ width: '100%' }}>
                <Option value="all">Tous les statuts</Option>
                <Option value="receptionnee">Réceptionnée</Option>
                <Option value="en_attente">En attente</Option>
                <Option value="en_retard">En retard</Option>
                <Option value="partielle">Partiellement reçue</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Priorité" style={{ width: '100%' }}>
                <Option value="all">Toutes les priorités</Option>
                <Option value="haute">Haute</Option>
                <Option value="normale">Normale</Option>
                <Option value="basse">Basse</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} placeholder={['Date début', 'Date fin']} />
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouvelle réception
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des réceptions */}
        <Card title="Réceptions de commandes">
          <Table
            dataSource={receptionsData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: receptionsData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} réceptions`
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
        title="Nouvelle réception"
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
                name="numeroCommande"
                label="Numéro de commande"
                rules={[{ required: true, message: 'Veuillez saisir le numéro' }]}
              >
                <Input placeholder="CMD-2024-XXX" />
              </Form.Item>
            </Col>
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
                name="commentaires"
                label="Commentaires"
              >
                <TextArea rows={3} placeholder="Commentaires sur la réception..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer la réception
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails de la réception"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedReception && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Numéro de commande:</strong> {selectedReception.numeroCommande}</p>
                  <p><strong>Fournisseur:</strong> {selectedReception.fournisseur}</p>
                  <p><strong>Date de commande:</strong> {new Date(selectedReception.dateCommande).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Livraison prévue:</strong> {new Date(selectedReception.dateLivraisonPrevue).toLocaleDateString('fr-FR')}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Statut:</strong> 
                    <Tag color={getStatusColor(selectedReception.statut)} className="ml-2">
                      {selectedReception.statut}
                    </Tag>
                  </p>
                  <p><strong>Priorité:</strong> 
                    <Tag color={getPriorityColor(selectedReception.priorite)} className="ml-2">
                      {selectedReception.priorite}
                    </Tag>
                  </p>
                  <p><strong>Montant total:</strong> {selectedReception.montant.toLocaleString('fr-FR')} €</p>
                  {selectedReception.dateReception && (
                    <p><strong>Date de réception:</strong> {new Date(selectedReception.dateReception).toLocaleDateString('fr-FR')}</p>
                  )}
                </Col>
              </Row>
            </Card>

            {/* Progression */}
            <Card title="Progression de la réception" size="small">
              <Steps current={selectedReception.statut === 'Réceptionnée' ? 2 : selectedReception.statut === 'En attente' ? 0 : 1}>
                <Step title="Commande passée" description="Commande validée" />
                <Step title="En livraison" description="En cours de livraison" />
                <Step title="Réceptionnée" description="Livraison reçue" />
              </Steps>
            </Card>

            {/* Articles */}
            <Card title="Articles reçus" size="small">
              <Table
                dataSource={selectedReception.articles}
                columns={[
                  { title: 'Article', dataIndex: 'nom', key: 'nom' },
                  { title: 'Quantité commandée', dataIndex: 'quantiteCommande', key: 'quantiteCommande' },
                  { title: 'Quantité reçue', dataIndex: 'quantiteRecue', key: 'quantiteRecue' },
                  { 
                    title: 'Prix unitaire', 
                    dataIndex: 'prixUnitaire', 
                    key: 'prixUnitaire',
                    render: (price: number) => `${price.toLocaleString('fr-FR')} €`
                  },
                  { 
                    title: 'Statut', 
                    dataIndex: 'statut', 
                    key: 'statut',
                    render: (statut: string) => (
                      <Tag color={getArticleStatusColor(statut)}>
                        {statut}
                      </Tag>
                    )
                  }
                ]}
                pagination={false}
                size="small"
              />
            </Card>

            {/* Commentaires */}
            {selectedReception.commentaires && (
              <Card title="Commentaires" size="small">
                <p className="text-gray-700">{selectedReception.commentaires}</p>
              </Card>
            )}

            {/* Actions rapides */}
            <Card title="Actions rapides" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="primary" block icon={<CheckCircleOutlined />}>
                  Marquer comme reçue
                </Button>
                <Button block icon={<FileTextOutlined />}>
                  Générer bon de réception
                </Button>
                <Button block icon={<ExclamationCircleOutlined />}>
                  Signaler un problème
                </Button>
                <Button block icon={<TruckOutlined />}>
                  Suivre la livraison
                </Button>
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReceptionCommande;
