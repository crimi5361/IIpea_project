import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Timeline } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CheckOutlined, ClockCircleOutlined, ExclamationCircleOutlined, UserOutlined, FileTextOutlined, WarningOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;

interface InscriptionAttente {
  id: number;
  numeroDossier: string;
  nom: string;
  prenom: string;
  filiere: string;
  niveau: string;
  dateDemande: string;
  statut: string;
  motifAttente: string;
  documentsManquants: string[];
  priorite: string;
  responsable: string;
  commentaires: string;
  derniereAction: string;
  dateDerniereAction: string;
}

const Inscription_attentes = () => {
  const [searchText, setSearchText] = useState('');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [filiereFilter, setFiliereFilter] = useState<string>('all');
  const [prioriteFilter, setPrioriteFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInscription, setSelectedInscription] = useState<InscriptionAttente | null>(null);
  const [form] = Form.useForm();

  // Données fictives pour les inscriptions en attente
  const inscriptions: InscriptionAttente[] = [
    {
      id: 1,
      numeroDossier: 'INS-2024-001',
      nom: 'Dupont',
      prenom: 'Jean',
      filiere: 'Informatique',
      niveau: 'L1',
      dateDemande: '2024-01-15',
      statut: 'En attente documents',
      motifAttente: 'Certificat médical manquant',
      documentsManquants: ['Certificat médical', 'Photo d\'identité'],
      priorite: 'Haute',
      responsable: 'Marie Martin',
      commentaires: 'Étudiant motivé, dossier prioritaire',
      derniereAction: 'Relance envoyée',
      dateDerniereAction: '2024-02-01'
    },
    {
      id: 2,
      numeroDossier: 'INS-2024-002',
      nom: 'Bernard',
      prenom: 'Sophie',
      filiere: 'Mathématiques',
      niveau: 'L2',
      dateDemande: '2024-01-20',
      statut: 'En attente paiement',
      motifAttente: 'Frais d\'inscription non payés',
      documentsManquants: ['Justificatif de paiement'],
      priorite: 'Moyenne',
      responsable: 'Pierre Leroy',
      commentaires: 'Attente du virement bancaire',
      derniereAction: 'Rappel de paiement',
      dateDerniereAction: '2024-02-05'
    },
    {
      id: 3,
      numeroDossier: 'INS-2024-003',
      nom: 'Martin',
      prenom: 'Pierre',
      filiere: 'Physique',
      niveau: 'L3',
      dateDemande: '2024-01-25',
      statut: 'En attente validation',
      motifAttente: 'Dossier en cours d\'examen',
      documentsManquants: [],
      priorite: 'Basse',
      responsable: 'Jean Dupont',
      commentaires: 'Dossier complet, en attente de validation académique',
      derniereAction: 'Dossier transmis au comité',
      dateDerniereAction: '2024-02-10'
    },
    {
      id: 4,
      numeroDossier: 'INS-2024-004',
      nom: 'Leroy',
      prenom: 'Marie',
      filiere: 'Chimie',
      niveau: 'M1',
      dateDemande: '2024-01-30',
      statut: 'En attente documents',
      motifAttente: 'Lettre de recommandation manquante',
      documentsManquants: ['Lettre de recommandation', 'CV'],
      priorite: 'Haute',
      responsable: 'Sophie Bernard',
      commentaires: 'Candidat excellent, dossier prioritaire',
      derniereAction: 'Demande de lettre envoyée',
      dateDerniereAction: '2024-02-08'
    },
    {
      id: 5,
      numeroDossier: 'INS-2024-005',
      nom: 'Dubois',
      prenom: 'Marc',
      filiere: 'Biologie',
      niveau: 'L1',
      dateDemande: '2024-02-01',
      statut: 'En attente paiement',
      motifAttente: 'Échelonnement de paiement non validé',
      documentsManquants: ['Plan d\'échelonnement'],
      priorite: 'Moyenne',
      responsable: 'Marie Martin',
      commentaires: 'Demande d\'échelonnement en cours',
      derniereAction: 'Validation échelonnement',
      dateDerniereAction: '2024-02-12'
    }
  ];

  const columns = [
    {
      title: 'Dossier',
      key: 'dossier',
      render: (_: any, record: InscriptionAttente) => (
        <div>
          <div className="font-medium">{record.prenom} {record.nom}</div>
          <div className="text-sm text-gray-500">#{record.numeroDossier}</div>
        </div>
      ),
    },
    {
      title: 'Formation',
      key: 'formation',
      render: (_: any, record: InscriptionAttente) => (
        <div>
          <div className="font-medium">{record.filiere}</div>
          <div className="text-sm text-gray-500">{record.niveau}</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: InscriptionAttente) => {
        const statusConfig = {
          'En attente documents': { color: 'orange', icon: <FileTextOutlined /> },
          'En attente paiement': { color: 'red', icon: <ExclamationCircleOutlined /> },
          'En attente validation': { color: 'blue', icon: <ClockCircleOutlined /> },
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
      title: 'Priorité',
      key: 'priorite',
      render: (_: any, record: InscriptionAttente) => {
        const priorityConfig = {
          'Haute': { color: 'red' },
          'Moyenne': { color: 'orange' },
          'Basse': { color: 'green' },
        };
        const config = priorityConfig[record.priorite as keyof typeof priorityConfig];
        return (
          <Tag color={config?.color}>
            {record.priorite}
          </Tag>
        );
      },
    },
    {
      title: 'Motif d\'attente',
      dataIndex: 'motifAttente',
      key: 'motifAttente',
      render: (motif: string) => (
        <span className="text-sm">{motif}</span>
      ),
    },
    {
      title: 'Documents manquants',
      key: 'documents',
      render: (_: any, record: InscriptionAttente) => (
        <div>
          {record.documentsManquants.length > 0 ? (
            record.documentsManquants.map((doc, index) => (
              <Tag key={index} className="mb-1">
                {doc}
              </Tag>
            ))
          ) : (
            <span className="text-gray-400 text-sm">Aucun</span>
          )}
        </div>
      ),
    },
    {
      title: 'Dernière action',
      key: 'derniereAction',
      render: (_: any, record: InscriptionAttente) => (
        <div>
          <div className="text-sm">{record.derniereAction}</div>
          <div className="text-xs text-gray-500">
            {new Date(record.dateDerniereAction).toLocaleDateString('fr-FR')}
          </div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: InscriptionAttente) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleView(record)}
          />
          <Button 
            type="text" 
            icon={<CheckOutlined />} 
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

  const filteredData = inscriptions.filter(inscription => {
    const matchesSearch = 
      inscription.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      inscription.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
      inscription.numeroDossier.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatut = statutFilter === 'all' || inscription.statut === statutFilter;
    const matchesFiliere = filiereFilter === 'all' || inscription.filiere === filiereFilter;
    const matchesPriorite = prioriteFilter === 'all' || inscription.priorite === prioriteFilter;
    
    return matchesSearch && matchesStatut && matchesFiliere && matchesPriorite;
  });

  const enAttenteDocuments = inscriptions.filter(i => i.statut === 'En attente documents').length;
  const enAttentePaiement = inscriptions.filter(i => i.statut === 'En attente paiement').length;
  const enAttenteValidation = inscriptions.filter(i => i.statut === 'En attente validation').length;
  const hautePriorite = inscriptions.filter(i => i.priorite === 'Haute').length;

  const handleView = (inscription: InscriptionAttente) => {
    setSelectedInscription(inscription);
    setIsModalVisible(true);
  };

  const handleEdit = (inscription: InscriptionAttente) => {
    setSelectedInscription(inscription);
    form.setFieldsValue({
      ...inscription,
      dateDemande: new Date(inscription.dateDemande)
    });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      message.success('Inscription mise à jour avec succès !');
      setIsModalVisible(false);
    } catch (error) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      {/* Alertes */}
      <Alert
        message={`${hautePriorite} dossiers en haute priorité nécessitent une attention immédiate`}
        type="warning"
        showIcon
        icon={<WarningOutlined />}
        className="mb-4"
      />
      
      {/* Statistiques */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total en attente"
              value={inscriptions.length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En attente documents"
              value={enAttenteDocuments}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En attente paiement"
              value={enAttentePaiement}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En attente validation"
              value={enAttenteValidation}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tableau principal */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Inscriptions en Attente</h2>
            <p className="text-gray-600 mt-1">Suivi des dossiers d'inscription en cours de traitement</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />}>
            + Nouvelle inscription
          </Button>
        </div>

        {/* Filtres */}
        <div className="mb-4 flex gap-4 items-center">
          <Search
            placeholder="Rechercher un dossier..."
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
            <Option value="En attente documents">En attente documents</Option>
            <Option value="En attente paiement">En attente paiement</Option>
            <Option value="En attente validation">En attente validation</Option>
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
          <Select
            placeholder="Priorité"
            value={prioriteFilter}
            onChange={setPrioriteFilter}
            style={{ width: 150 }}
          >
            <Option value="all">Toutes les priorités</Option>
            <Option value="Haute">Haute</Option>
            <Option value="Moyenne">Moyenne</Option>
            <Option value="Basse">Basse</Option>
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
              `${range[0]}-${range[1]} sur ${total} dossiers`,
          }}
          className="custom-table"
        />
      </div>

      {/* Modal pour voir/modifier une inscription */}
      <Modal
        title={selectedInscription ? `Dossier ${selectedInscription.numeroDossier}` : 'Nouvelle inscription'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        {selectedInscription && (
          <div className="space-y-4">
            <Row gutter={16}>
              <Col span={12}>
                <div className="font-medium">Étudiant</div>
                <div>{selectedInscription.prenom} {selectedInscription.nom}</div>
              </Col>
              <Col span={12}>
                <div className="font-medium">Formation</div>
                <div>{selectedInscription.filiere} - {selectedInscription.niveau}</div>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <div className="font-medium">Statut</div>
                <Tag color="orange">{selectedInscription.statut}</Tag>
              </Col>
              <Col span={12}>
                <div className="font-medium">Priorité</div>
                <Tag color="red">{selectedInscription.priorite}</Tag>
              </Col>
            </Row>

            <div>
              <div className="font-medium">Motif d'attente</div>
              <div className="text-gray-600">{selectedInscription.motifAttente}</div>
            </div>

            <div>
              <div className="font-medium">Documents manquants</div>
              <div className="mt-2">
                {selectedInscription.documentsManquants.length > 0 ? (
                  selectedInscription.documentsManquants.map((doc, index) => (
                    <Tag key={index} className="mb-1">
                      {doc}
                    </Tag>
                  ))
                ) : (
                  <span className="text-gray-400">Aucun document manquant</span>
                )}
              </div>
            </div>

            <div>
              <div className="font-medium">Commentaires</div>
              <div className="text-gray-600">{selectedInscription.commentaires}</div>
            </div>

            <div>
              <div className="font-medium">Historique des actions</div>
              <Timeline className="mt-2">
                <Timeline.Item>
                  <div className="text-sm">{selectedInscription.derniereAction}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(selectedInscription.dateDerniereAction).toLocaleDateString('fr-FR')}
                  </div>
                </Timeline.Item>
                <Timeline.Item>
                  <div className="text-sm">Dossier créé</div>
                  <div className="text-xs text-gray-500">
                    {new Date(selectedInscription.dateDemande).toLocaleDateString('fr-FR')}
                  </div>
                </Timeline.Item>
              </Timeline>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Inscription_attentes;
