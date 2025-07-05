import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Badge, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UserOutlined, IdcardOutlined, PrinterOutlined, DownloadOutlined, ReloadOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface CarteEtudiant {
  id: number;
  numeroEtudiant: string;
  nom: string;
  prenom: string;
  filiere: string;
  niveau: string;
  numeroCarte: string;
  statut: string;
  dateEmission: string;
  dateExpiration: string;
  photo: string;
  responsable: string;
  commentaires: string;
  derniereAction: string;
  dateDerniereAction: string;
}

const Cartes = () => {
  const [searchText, setSearchText] = useState('');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [filiereFilter, setFiliereFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCarte, setSelectedCarte] = useState<CarteEtudiant | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les cartes étudiantes
  const cartes: CarteEtudiant[] = [
    {
      id: 1,
      numeroEtudiant: '2024001',
      nom: 'Dupont',
      prenom: 'Jean',
      filiere: 'Informatique',
      niveau: 'L1',
      numeroCarte: 'CART-2024-001',
      statut: 'Active',
      dateEmission: '2023-09-01',
      dateExpiration: '2024-08-31',
      photo: 'https://via.placeholder.com/100x100/1890ff/ffffff?text=JD',
      responsable: 'Marie Martin',
      commentaires: 'Carte émise normalement',
      derniereAction: 'Carte émise',
      dateDerniereAction: '2023-09-01'
    },
    {
      id: 2,
      numeroEtudiant: '2024002',
      nom: 'Bernard',
      prenom: 'Sophie',
      filiere: 'Mathématiques',
      niveau: 'L2',
      numeroCarte: 'CART-2024-002',
      statut: 'Active',
      dateEmission: '2022-09-01',
      dateExpiration: '2024-08-31',
      photo: 'https://via.placeholder.com/100x100/52c41a/ffffff?text=SB',
      responsable: 'Pierre Leroy',
      commentaires: 'Renouvellement annuel',
      derniereAction: 'Carte renouvelée',
      dateDerniereAction: '2023-09-01'
    },
    {
      id: 3,
      numeroEtudiant: '2024003',
      nom: 'Martin',
      prenom: 'Pierre',
      filiere: 'Physique',
      niveau: 'L3',
      numeroCarte: 'CART-2024-003',
      statut: 'Expirée',
      dateEmission: '2021-09-01',
      dateExpiration: '2023-08-31',
      photo: 'https://via.placeholder.com/100x100/faad14/ffffff?text=PM',
      responsable: 'Jean Dupont',
      commentaires: 'Carte expirée, renouvellement en attente',
      derniereAction: 'Carte expirée',
      dateDerniereAction: '2023-09-01'
    },
    {
      id: 4,
      numeroEtudiant: '2024004',
      nom: 'Leroy',
      prenom: 'Marie',
      filiere: 'Chimie',
      niveau: 'M1',
      numeroCarte: 'CART-2024-004',
      statut: 'Suspendue',
      dateEmission: '2020-09-01',
      dateExpiration: '2024-08-31',
      photo: 'https://via.placeholder.com/100x100/ff4d4f/ffffff?text=ML',
      responsable: 'Sophie Bernard',
      commentaires: 'Carte suspendue pour non-paiement',
      derniereAction: 'Carte suspendue',
      dateDerniereAction: '2024-01-15'
    },
    {
      id: 5,
      numeroEtudiant: '2024005',
      nom: 'Dubois',
      prenom: 'Marc',
      filiere: 'Biologie',
      niveau: 'L1',
      numeroCarte: 'CART-2024-005',
      statut: 'En attente',
      dateEmission: '2023-09-01',
      dateExpiration: '2024-08-31',
      photo: 'https://via.placeholder.com/100x100/722ed1/ffffff?text=MD',
      responsable: 'Marie Martin',
      commentaires: 'Photo manquante',
      derniereAction: 'Carte en attente',
      dateDerniereAction: '2023-09-01'
    }
  ];

  const columns = [
    {
      title: 'Étudiant',
      key: 'etudiant',
      render: (_: any, record: CarteEtudiant) => (
        <div className="flex items-center">
          <Avatar src={record.photo} size={40} className="mr-3">
            {record.prenom.charAt(0)}{record.nom.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">{record.prenom} {record.nom}</div>
            <div className="text-sm text-gray-500">#{record.numeroEtudiant}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Formation',
      key: 'formation',
      render: (_: any, record: CarteEtudiant) => (
        <div>
          <div className="font-medium">{record.filiere}</div>
          <div className="text-sm text-gray-500">{record.niveau}</div>
        </div>
      ),
    },
    {
      title: 'Carte',
      key: 'carte',
      render: (_: any, record: CarteEtudiant) => (
        <div>
          <div className="font-medium">{record.numeroCarte}</div>
          <div className="text-sm text-gray-500">
            Émise: {new Date(record.dateEmission).toLocaleDateString('fr-FR')}
          </div>
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: CarteEtudiant) => {
        const statusConfig = {
          'Active': { color: 'green', icon: <CheckCircleOutlined /> },
          'Expirée': { color: 'red', icon: <ExclamationCircleOutlined /> },
          'Suspendue': { color: 'orange', icon: <ExclamationCircleOutlined /> },
          'En attente': { color: 'blue', icon: <ClockCircleOutlined /> },
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
      title: 'Expiration',
      key: 'expiration',
      render: (_: any, record: CarteEtudiant) => {
        const expirationDate = new Date(record.dateExpiration);
        const today = new Date();
        const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        let color = 'green';
        if (daysUntilExpiration < 0) color = 'red';
        else if (daysUntilExpiration < 30) color = 'orange';
        else if (daysUntilExpiration < 90) color = 'blue';
        
        return (
          <div>
            <div className="text-sm">{new Date(record.dateExpiration).toLocaleDateString('fr-FR')}</div>
                         <Tag color={color}>
               {daysUntilExpiration < 0 ? 'Expirée' : 
                daysUntilExpiration < 30 ? `${daysUntilExpiration} jours` :
                daysUntilExpiration < 90 ? 'Expire bientôt' : 'Valide'}
             </Tag>
          </div>
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
      render: (_: any, record: CarteEtudiant) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleView(record)}
          />
          <Button 
            type="text" 
            icon={<PrinterOutlined />} 
            size="small"
            style={{ color: '#1890ff' }}
          />
          <Button 
            type="text" 
            icon={<DownloadOutlined />} 
            size="small"
            style={{ color: '#52c41a' }}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          />
        </Space>
      ),
    },
  ];

  const filteredData = cartes.filter(carte => {
    const matchesSearch = 
      carte.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      carte.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
      carte.numeroEtudiant.toLowerCase().includes(searchText.toLowerCase()) ||
      carte.numeroCarte.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatut = statutFilter === 'all' || carte.statut === statutFilter;
    const matchesFiliere = filiereFilter === 'all' || carte.filiere === filiereFilter;
    
    return matchesSearch && matchesStatut && matchesFiliere;
  });

  // Statistiques
  const totalCartes = cartes.length;
  const actives = cartes.filter(c => c.statut === 'Active').length;
  const expirees = cartes.filter(c => c.statut === 'Expirée').length;
  const suspendues = cartes.filter(c => c.statut === 'Suspendue').length;
  const enAttente = cartes.filter(c => c.statut === 'En attente').length;

  // Cartes expirant bientôt
  const expirantBientot = cartes.filter(carte => {
    const expirationDate = new Date(carte.dateExpiration);
    const today = new Date();
    const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiration > 0 && daysUntilExpiration <= 30;
  }).length;

  const handleView = (carte: CarteEtudiant) => {
    setSelectedCarte(carte);
    setIsModalVisible(true);
  };

  const handleEdit = (carte: CarteEtudiant) => {
    setSelectedCarte(carte);
    form.setFieldsValue({
      ...carte,
      dateEmission: new Date(carte.dateEmission),
      dateExpiration: new Date(carte.dateExpiration)
    });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      message.success('Carte mise à jour avec succès !');
      setIsModalVisible(false);
    } catch (error) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      {/* Alertes */}
      {expirantBientot > 0 && (
        <Alert
          message={`${expirantBientot} cartes expirant dans les 30 prochains jours`}
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
              title="Total Cartes"
              value={totalCartes}
              prefix={<IdcardOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Cartes Actives"
              value={actives}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Cartes Expirées"
              value={expirees}
              valueStyle={{ color: '#ff4d4f' }}
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
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Cartes Étudiantes</h2>
            <p className="text-gray-600 mt-1">Suivi et gestion des cartes d'identité étudiantes</p>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />}>
              Actualiser
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              + Nouvelle carte
            </Button>
          </Space>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher une carte..."
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
            <Option value="Active">Active</Option>
            <Option value="Expirée">Expirée</Option>
            <Option value="Suspendue">Suspendue</Option>
            <Option value="En attente">En attente</Option>
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
              `${range[0]}-${range[1]} sur ${total} cartes`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour voir/modifier une carte */}
      <Modal
        title={selectedCarte ? `Carte ${selectedCarte.numeroCarte}` : 'Nouvelle carte'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        {selectedCarte && (
          <div className="space-y-4">
            <Row gutter={16}>
              <Col span={8}>
                <div className="text-center">
                  <Avatar src={selectedCarte.photo} size={120} className="mb-2">
                    {selectedCarte.prenom.charAt(0)}{selectedCarte.nom.charAt(0)}
                  </Avatar>
                  <div className="font-medium">{selectedCarte.prenom} {selectedCarte.nom}</div>
                  <div className="text-sm text-gray-500">#{selectedCarte.numeroEtudiant}</div>
                </div>
              </Col>
              <Col span={16}>
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="font-medium">Formation</div>
                    <div>{selectedCarte.filiere} - {selectedCarte.niveau}</div>
                  </Col>
                  <Col span={12}>
                    <div className="font-medium">Numéro de carte</div>
                    <div>{selectedCarte.numeroCarte}</div>
                  </Col>
                </Row>
                
                <Row gutter={16} className="mt-4">
                  <Col span={12}>
                    <div className="font-medium">Statut</div>
                    <Tag color={selectedCarte.statut === 'Active' ? 'green' : 'red'}>
                      {selectedCarte.statut}
                    </Tag>
                  </Col>
                  <Col span={12}>
                    <div className="font-medium">Responsable</div>
                    <div>{selectedCarte.responsable}</div>
                  </Col>
                </Row>

                <Row gutter={16} className="mt-4">
                  <Col span={12}>
                    <div className="font-medium">Date d'émission</div>
                    <div>{new Date(selectedCarte.dateEmission).toLocaleDateString('fr-FR')}</div>
                  </Col>
                  <Col span={12}>
                    <div className="font-medium">Date d'expiration</div>
                    <div>{new Date(selectedCarte.dateExpiration).toLocaleDateString('fr-FR')}</div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div>
              <div className="font-medium">Commentaires</div>
              <div className="text-gray-600">{selectedCarte.commentaires}</div>
            </div>

            <div>
              <div className="font-medium">Dernière action</div>
              <div className="text-sm">{selectedCarte.derniereAction}</div>
              <div className="text-xs text-gray-500">
                {new Date(selectedCarte.dateDerniereAction).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Cartes;
