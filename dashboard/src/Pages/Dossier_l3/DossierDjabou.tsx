import React, { useState } from 'react';
import { Card, Row, Col, Tag, Button, Progress, Timeline, Descriptions, Divider, Space, Modal, Form, Input, Select, DatePicker, message, Alert, Statistic, Avatar, Tabs } from 'antd';
import { UserOutlined, FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, EditOutlined, SaveOutlined, DownloadOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

interface DossierDjabouData {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  filiere: string;
  niveauActuel: string;
  moyenne: number;
  statut: string;
  priorite: string;
  dateCreation: string;
  dateLimite: string;
  progression: number;
  documents: {
    cv: boolean;
    lettreMotivation: boolean;
    relevesNotes: boolean;
    certificatStage: boolean;
    projetRecherche: boolean;
    recommandations: boolean;
  };
  etapes: Array<{
    titre: string;
    statut: 'completed' | 'processing' | 'waiting';
    date: string;
    commentaire?: string;
  }>;
}

const DossierDjabou = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Données simulées du dossier Djabou
  const dossierData: DossierDjabouData = {
    id: 'DJ-2024-001',
    nom: 'Djabou',
    prenom: 'Ahmed',
    email: 'ahmed.djabou@email.com',
    telephone: '+33 6 12 34 56 78',
    filiere: 'Informatique',
    niveauActuel: 'Bac+2',
    moyenne: 16.5,
    statut: 'En cours',
    priorite: 'Haute',
    dateCreation: '2024-01-15',
    dateLimite: '2024-02-15',
    progression: 75,
    documents: {
      cv: true,
      lettreMotivation: true,
      relevesNotes: true,
      certificatStage: false,
      projetRecherche: false,
      recommandations: true,
    },
    etapes: [
      {
        titre: 'Soumission initiale',
        statut: 'completed',
        date: '2024-01-15',
        commentaire: 'Dossier soumis avec succès'
      },
      {
        titre: 'Vérification des documents',
        statut: 'completed',
        date: '2024-01-18',
        commentaire: 'Documents principaux validés'
      },
      {
        titre: 'Évaluation académique',
        statut: 'processing',
        date: '2024-01-20',
        commentaire: 'En cours d\'évaluation'
      },
      {
        titre: 'Entretien',
        statut: 'waiting',
        date: '2024-01-25',
        commentaire: 'Programmé pour le 25/01'
      },
      {
        titre: 'Décision finale',
        statut: 'waiting',
        date: '2024-01-30',
        commentaire: 'En attente'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'processing';
      case 'Validé': return 'success';
      case 'Rejeté': return 'error';
      case 'En attente': return 'warning';
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

  const handleEdit = () => {
    setIsModalVisible(true);
  };

  const handleSave = async (values: any) => {
    try {
      console.log('Modifications sauvegardées:', values);
      message.success('Modifications sauvegardées avec succès');
      setIsModalVisible(false);
    } catch (error) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  const documentsCompletes = Object.values(dossierData.documents).filter(Boolean).length;
  const totalDocuments = Object.keys(dossierData.documents).length;

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* En-tête du dossier */}
        <Card>
          <Row gutter={16} align="middle">
            <Col span={2}>
              <Avatar size={64} icon={<UserOutlined />} />
            </Col>
            <Col span={16}>
              <h2 className="text-2xl font-bold text-gray-800">
                Dossier {dossierData.nom} {dossierData.prenom}
              </h2>
              <p className="text-gray-600">ID: {dossierData.id}</p>
              <Space className="mt-2">
                <Tag color={getStatusColor(dossierData.statut)}>{dossierData.statut}</Tag>
                <Tag color={getPriorityColor(dossierData.priorite)}>{dossierData.priorite} priorité</Tag>
              </Space>
            </Col>
            <Col span={6} className="text-right">
              <Space>
                <Button icon={<EditOutlined />} onClick={handleEdit}>
                  Modifier
                </Button>
                <Button icon={<DownloadOutlined />}>
                  Exporter
                </Button>
                <Button icon={<PrinterOutlined />}>
                  Imprimer
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Statistiques rapides */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Progression"
                value={dossierData.progression}
                suffix="%"
                valueStyle={{ color: '#3f8600' }}
              />
              <Progress percent={dossierData.progression} showInfo={false} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Documents"
                value={documentsCompletes}
                suffix={`/${totalDocuments}`}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Moyenne"
                value={dossierData.moyenne}
                suffix="/20"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Jours restants"
                value={7}
                suffix="jours"
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Contenu principal */}
        <Row gutter={16}>
          <Col span={16}>
            <Card title="Progression du dossier" className="mb-6">
              <Timeline>
                {dossierData.etapes.map((etape, index) => (
                  <Timeline.Item
                    key={index}
                    color={
                      etape.statut === 'completed' ? 'green' :
                      etape.statut === 'processing' ? 'blue' : 'gray'
                    }
                    dot={
                      etape.statut === 'completed' ? <CheckCircleOutlined /> :
                      etape.statut === 'processing' ? <ClockCircleOutlined /> : <ExclamationCircleOutlined />
                    }
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{etape.titre}</h4>
                        <p className="text-sm text-gray-600">{etape.date}</p>
                        {etape.commentaire && (
                          <p className="text-sm text-gray-500 mt-1">{etape.commentaire}</p>
                        )}
                      </div>
                      <Tag color={
                        etape.statut === 'completed' ? 'success' :
                        etape.statut === 'processing' ? 'processing' : 'default'
                      }>
                        {etape.statut === 'completed' ? 'Terminé' :
                         etape.statut === 'processing' ? 'En cours' : 'En attente'}
                      </Tag>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>

            <Card title="Documents requis">
              <Row gutter={16}>
                <Col span={12}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>CV</span>
                      <Tag color={dossierData.documents.cv ? 'success' : 'error'}>
                        {dossierData.documents.cv ? '✓' : '✗'}
                      </Tag>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Lettre de motivation</span>
                      <Tag color={dossierData.documents.lettreMotivation ? 'success' : 'error'}>
                        {dossierData.documents.lettreMotivation ? '✓' : '✗'}
                      </Tag>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Relevés de notes</span>
                      <Tag color={dossierData.documents.relevesNotes ? 'success' : 'error'}>
                        {dossierData.documents.relevesNotes ? '✓' : '✗'}
                      </Tag>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Certificat de stage</span>
                      <Tag color={dossierData.documents.certificatStage ? 'success' : 'error'}>
                        {dossierData.documents.certificatStage ? '✓' : '✗'}
                      </Tag>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Projet de recherche</span>
                      <Tag color={dossierData.documents.projetRecherche ? 'success' : 'error'}>
                        {dossierData.documents.projetRecherche ? '✓' : '✗'}
                      </Tag>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Lettres de recommandation</span>
                      <Tag color={dossierData.documents.recommandations ? 'success' : 'error'}>
                        {dossierData.documents.recommandations ? '✓' : '✗'}
                      </Tag>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Informations personnelles">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Nom complet">
                  {dossierData.nom} {dossierData.prenom}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {dossierData.email}
                </Descriptions.Item>
                <Descriptions.Item label="Téléphone">
                  {dossierData.telephone}
                </Descriptions.Item>
                <Descriptions.Item label="Filière">
                  {dossierData.filiere}
                </Descriptions.Item>
                <Descriptions.Item label="Niveau actuel">
                  {dossierData.niveauActuel}
                </Descriptions.Item>
                <Descriptions.Item label="Moyenne">
                  {dossierData.moyenne}/20
                </Descriptions.Item>
                <Descriptions.Item label="Date de création">
                  {dossierData.dateCreation}
                </Descriptions.Item>
                <Descriptions.Item label="Date limite">
                  {dossierData.dateLimite}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="Actions rapides" className="mt-4">
              <Space direction="vertical" className="w-full">
                <Button type="primary" block icon={<EyeOutlined />}>
                  Voir les documents
                </Button>
                <Button block icon={<DownloadOutlined />}>
                  Télécharger le dossier
                </Button>
                <Button block icon={<FileTextOutlined />}>
                  Générer rapport
                </Button>
                <Button block icon={<CheckCircleOutlined />}>
                  Valider le dossier
                </Button>
              </Space>
            </Card>

            <Alert
              message="Dossier en cours de traitement"
              description="Le dossier est actuellement en phase d'évaluation académique. La décision finale sera rendue le 30 janvier 2024."
              type="info"
              showIcon
              className="mt-4"
            />
          </Col>
        </Row>
      </div>

      {/* Modal de modification */}
      <Modal
        title="Modifier le dossier"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={dossierData}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="nom" label="Nom">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="prenom" label="Prénom">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="telephone" label="Téléphone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="statut" label="Statut">
                <Select>
                  <Option value="En cours">En cours</Option>
                  <Option value="Validé">Validé</Option>
                  <Option value="Rejeté">Rejeté</Option>
                  <Option value="En attente">En attente</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="priorite" label="Priorité">
                <Select>
                  <Option value="Haute">Haute</Option>
                  <Option value="Normale">Normale</Option>
                  <Option value="Basse">Basse</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="commentaires" label="Commentaires">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Sauvegarder
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default DossierDjabou;
