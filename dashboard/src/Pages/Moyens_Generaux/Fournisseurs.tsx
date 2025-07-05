import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, Modal, Form, InputNumber, Space, Statistic, Progress, Alert, Tooltip, message, Rate, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, PhoneOutlined, MailOutlined, GlobalOutlined, UserOutlined, StarOutlined, DollarOutlined, ShoppingOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;

interface FournisseurData {
  id: string;
  nom: string;
  contact: string;
  email: string;
  telephone: string;
  adresse: string;
  specialite: string;
  statut: string;
  note: number;
  commandesTotal: number;
  montantTotal: number;
  derniereCommande: string;
  delaiMoyen: number;
}

const Fournisseurs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedFournisseur, setSelectedFournisseur] = useState<FournisseurData | null>(null);
  const [form] = Form.useForm();

  // Données simulées
  const fournisseursData: FournisseurData[] = [
    {
      id: 'FRN-001',
      nom: 'Fournitures Pro',
      contact: 'Jean Dupont',
      email: 'contact@fournitures-pro.fr',
      telephone: '+33 1 23 45 67 89',
      adresse: '123 Rue de la Paix, 75001 Paris',
      specialite: 'Fournitures de bureau',
      statut: 'Actif',
      note: 4.5,
      commandesTotal: 25,
      montantTotal: 45000,
      derniereCommande: '2024-01-15',
      delaiMoyen: 3
    },
    {
      id: 'FRN-002',
      nom: 'Tech Solutions',
      contact: 'Marie Martin',
      email: 'info@tech-solutions.com',
      telephone: '+33 1 98 76 54 32',
      adresse: '456 Avenue des Champs, 75008 Paris',
      specialite: 'Équipements informatiques',
      statut: 'Actif',
      note: 4.8,
      commandesTotal: 18,
      montantTotal: 125000,
      derniereCommande: '2024-01-20',
      delaiMoyen: 5
    },
    {
      id: 'FRN-003',
      nom: 'Mobilier Office',
      contact: 'Pierre Durand',
      email: 'contact@mobilier-office.fr',
      telephone: '+33 1 45 67 89 01',
      adresse: '789 Boulevard Saint-Germain, 75006 Paris',
      specialite: 'Mobilier de bureau',
      statut: 'Actif',
      note: 4.2,
      commandesTotal: 12,
      montantTotal: 32000,
      derniereCommande: '2024-01-25',
      delaiMoyen: 7
    },
    {
      id: 'FRN-004',
      nom: 'Sécurité Plus',
      contact: 'Sophie Bernard',
      email: 'info@securite-plus.com',
      telephone: '+33 1 12 34 56 78',
      adresse: '321 Rue de Rivoli, 75001 Paris',
      specialite: 'Équipements de sécurité',
      statut: 'Actif',
      note: 4.6,
      commandesTotal: 8,
      montantTotal: 18000,
      derniereCommande: '2024-01-30',
      delaiMoyen: 4
    },
    {
      id: 'FRN-005',
      nom: 'Nettoyage Pro',
      contact: 'Luc Petit',
      email: 'contact@nettoyage-pro.fr',
      telephone: '+33 1 87 65 43 21',
      adresse: '654 Rue du Commerce, 75015 Paris',
      specialite: 'Produits d\'entretien',
      statut: 'Inactif',
      note: 3.8,
      commandesTotal: 15,
      montantTotal: 8500,
      derniereCommande: '2023-12-15',
      delaiMoyen: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'success';
      case 'Inactif': return 'error';
      case 'En attente': return 'warning';
      default: return 'default';
    }
  };

  const getSpecialiteColor = (specialite: string) => {
    switch (specialite) {
      case 'Fournitures de bureau': return 'blue';
      case 'Équipements informatiques': return 'purple';
      case 'Mobilier de bureau': return 'green';
      case 'Équipements de sécurité': return 'red';
      case 'Produits d\'entretien': return 'orange';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Fournisseur',
      dataIndex: 'nom',
      key: 'nom',
      render: (text: string, record: FournisseurData) => (
        <div className="flex items-center space-x-3">
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-sm text-gray-500">{record.contact}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Spécialité',
      dataIndex: 'specialite',
      key: 'specialite',
      render: (specialite: string) => (
        <Tag color={getSpecialiteColor(specialite)}>
          {specialite}
        </Tag>
      )
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      render: (note: number) => (
                 <div className="flex items-center space-x-2">
           <Rate disabled defaultValue={note} />
           <span className="text-sm text-gray-600">({note})</span>
         </div>
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
      title: 'Commandes',
      dataIndex: 'commandesTotal',
      key: 'commandesTotal',
      render: (commandes: number) => (
        <span className="font-medium text-blue-600">
          {commandes}
        </span>
      )
    },
    {
      title: 'Montant total',
      dataIndex: 'montantTotal',
      key: 'montantTotal',
      render: (montant: number) => (
        <span className="font-medium text-green-600">
          {montant.toLocaleString('fr-FR')} €
        </span>
      )
    },
    {
      title: 'Délai moyen',
      dataIndex: 'delaiMoyen',
      key: 'delaiMoyen',
      render: (delai: number) => (
        <span className="font-medium">
          {delai} jours
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: FournisseurData) => (
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

  const handleViewDetails = (fournisseur: FournisseurData) => {
    setSelectedFournisseur(fournisseur);
    setIsDetailModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log('Fournisseur créé:', values);
      message.success('Fournisseur créé avec succès');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Erreur lors de la création du fournisseur');
    }
  };

  const totalFournisseurs = fournisseursData.length;
  const fournisseursActifs = fournisseursData.filter(f => f.statut === 'Actif').length;
  const totalCommandes = fournisseursData.reduce((sum, f) => sum + f.commandesTotal, 0);
  const totalMontant = fournisseursData.reduce((sum, f) => sum + f.montantTotal, 0);
  const noteMoyenne = fournisseursData.reduce((sum, f) => sum + f.note, 0) / totalFournisseurs;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des fournisseurs"
                value={totalFournisseurs}
                valueStyle={{ color: '#1890ff' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Fournisseurs actifs"
                value={fournisseursActifs}
                suffix={`/${totalFournisseurs}`}
                valueStyle={{ color: '#3f8600' }}
                prefix={<StarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des commandes"
                value={totalCommandes}
                valueStyle={{ color: '#722ed1' }}
                prefix={<ShoppingOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Montant total"
                value={totalMontant}
                suffix="€"
                valueStyle={{ color: '#cf1322' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Note moyenne */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Note moyenne des fournisseurs</h3>
              <p className="text-gray-600">Basée sur {totalFournisseurs} fournisseurs</p>
            </div>
            <div className="flex items-center space-x-2">
              <Rate disabled defaultValue={noteMoyenne} />
              <span className="text-lg font-medium">({noteMoyenne.toFixed(1)})</span>
            </div>
          </div>
        </Card>

        {/* Filtres et actions */}
        <Card>
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Input
                placeholder="Rechercher un fournisseur..."
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4}>
              <Select placeholder="Statut" style={{ width: '100%' }}>
                <Option value="all">Tous les statuts</Option>
                <Option value="actif">Actif</Option>
                <Option value="inactif">Inactif</Option>
                <Option value="attente">En attente</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Spécialité" style={{ width: '100%' }}>
                <Option value="all">Toutes les spécialités</Option>
                <Option value="fournitures">Fournitures de bureau</Option>
                <Option value="informatique">Équipements informatiques</Option>
                <Option value="mobilier">Mobilier de bureau</Option>
                <Option value="securite">Équipements de sécurité</Option>
                <Option value="entretien">Produits d'entretien</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select placeholder="Note minimale" style={{ width: '100%' }}>
                <Option value="all">Toutes les notes</Option>
                <Option value="5">5 étoiles</Option>
                <Option value="4">4+ étoiles</Option>
                <Option value="3">3+ étoiles</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                  Nouveau fournisseur
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des fournisseurs */}
        <Card title="Fournisseurs">
          <Table
            dataSource={fournisseursData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: fournisseursData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} fournisseurs`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Fournisseur inactif"
          description="Le fournisseur 'Nettoyage Pro' est inactif depuis plus de 30 jours. Considérez le réactiver ou le supprimer."
          type="warning"
          showIcon
          action={
            <Button size="small" type="link">
              Gérer
            </Button>
          }
        />
      </div>

      {/* Modal de création/modification */}
      <Modal
        title="Nouveau fournisseur"
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
                label="Nom du fournisseur"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input placeholder="Nom du fournisseur" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contact"
                label="Contact principal"
                rules={[{ required: true, message: 'Veuillez saisir le contact' }]}
              >
                <Input placeholder="Nom du contact" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Veuillez saisir l\'email' },
                  { type: 'email', message: 'Email invalide' }
                ]}
              >
                <Input placeholder="email@exemple.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="telephone"
                label="Téléphone"
                rules={[{ required: true, message: 'Veuillez saisir le téléphone' }]}
              >
                <Input placeholder="+33 1 23 45 67 89" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="specialite"
                label="Spécialité"
                rules={[{ required: true, message: 'Veuillez sélectionner la spécialité' }]}
              >
                <Select placeholder="Sélectionner la spécialité">
                  <Option value="Fournitures de bureau">Fournitures de bureau</Option>
                  <Option value="Équipements informatiques">Équipements informatiques</Option>
                  <Option value="Mobilier de bureau">Mobilier de bureau</Option>
                  <Option value="Équipements de sécurité">Équipements de sécurité</Option>
                  <Option value="Produits d'entretien">Produits d'entretien</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="statut"
                label="Statut"
                rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
              >
                <Select placeholder="Sélectionner le statut">
                  <Option value="Actif">Actif</Option>
                  <Option value="Inactif">Inactif</Option>
                  <Option value="En attente">En attente</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="adresse"
                label="Adresse"
                rules={[{ required: true, message: 'Veuillez saisir l\'adresse' }]}
              >
                <TextArea rows={3} placeholder="Adresse complète..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Créer le fournisseur
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal de détails */}
      <Modal
        title="Détails du fournisseur"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedFournisseur && (
          <div className="space-y-6">
            {/* Informations générales */}
            <Card title="Informations générales" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Nom:</strong> {selectedFournisseur.nom}</p>
                  <p><strong>Contact:</strong> {selectedFournisseur.contact}</p>
                  <p><strong>Email:</strong> {selectedFournisseur.email}</p>
                  <p><strong>Téléphone:</strong> {selectedFournisseur.telephone}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Spécialité:</strong> 
                    <Tag color={getSpecialiteColor(selectedFournisseur.specialite)} className="ml-2">
                      {selectedFournisseur.specialite}
                    </Tag>
                  </p>
                  <p><strong>Statut:</strong> 
                    <Tag color={getStatusColor(selectedFournisseur.statut)} className="ml-2">
                      {selectedFournisseur.statut}
                    </Tag>
                  </p>
                                     <p><strong>Note:</strong> 
                     <Rate disabled defaultValue={selectedFournisseur.note} className="ml-2" />
                     <span className="ml-2">({selectedFournisseur.note})</span>
                   </p>
                </Col>
              </Row>
              <div className="mt-4">
                <p><strong>Adresse:</strong></p>
                <p className="text-gray-600">{selectedFournisseur.adresse}</p>
              </div>
            </Card>

            {/* Statistiques */}
            <Card title="Statistiques" size="small">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Commandes totales"
                    value={selectedFournisseur.commandesTotal}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Montant total"
                    value={selectedFournisseur.montantTotal}
                    suffix="€"
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Délai moyen"
                    value={selectedFournisseur.delaiMoyen}
                    suffix="jours"
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Col>
              </Row>
            </Card>

            {/* Actions rapides */}
            <Card title="Actions rapides" size="small">
              <Space direction="vertical" className="w-full">
                <Button type="primary" block icon={<ShoppingOutlined />}>
                  Nouvelle commande
                </Button>
                <Button block icon={<PhoneOutlined />}>
                  Appeler le fournisseur
                </Button>
                <Button block icon={<MailOutlined />}>
                  Envoyer un email
                </Button>
                <Button block icon={<GlobalOutlined />}>
                  Visiter le site web
                </Button>
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Fournisseurs;
