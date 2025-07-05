import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Select, DatePicker, InputNumber, Steps, message, Divider, Space, Tag, Upload, Checkbox, Radio } from 'antd';
import { PlusOutlined, SaveOutlined, ArrowRightOutlined, ArrowLeftOutlined, UploadOutlined, FileTextOutlined, UserOutlined, CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface DossierL3FormData {
  // Informations personnelles
  nom: string;
  prenom: string;
  dateNaissance: any;
  email: string;
  telephone: string;
  adresse: string;
  
  // Informations académiques
  filiere: string;
  niveauActuel: string;
  etablissementPrecedent: string;
  moyenne: number;
  
  // Documents requis
  cv: any[];
  lettreMotivation: any[];
  relevesNotes: any[];
  certificatStage: any[];
  projetRecherche: any[];
  recommandations: any[];
  
  // Informations supplémentaires
  experienceProfessionnelle: string;
  langues: string[];
  competences: string[];
  
  // Validation et statut
  priorite: string;
  commentaires: string;
  statut: string;
}

const Nouveau = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Informations personnelles',
      icon: <UserOutlined />,
    },
    {
      title: 'Informations académiques',
      icon: <FileTextOutlined />,
    },
    {
      title: 'Documents',
      icon: <UploadOutlined />,
    },
    {
      title: 'Expérience et compétences',
      icon: <CheckCircleOutlined />,
    },
    {
      title: 'Validation',
      icon: <SaveOutlined />,
    },
  ];

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error('Veuillez remplir tous les champs obligatoires');
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values: DossierL3FormData) => {
    try {
      console.log('Données du dossier L3:', values);
      message.success('Dossier L3 créé avec succès !');
      form.resetFields();
      setCurrentStep(0);
    } catch (error) {
      message.error('Erreur lors de la création du dossier');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card title="Informations personnelles" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="nom"
                  label="Nom de famille"
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
                  name="dateNaissance"
                  label="Date de naissance"
                  rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
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
              <Col span={24}>
                <Form.Item
                  name="adresse"
                  label="Adresse complète"
                  rules={[{ required: true, message: 'Veuillez saisir l\'adresse' }]}
                >
                  <TextArea rows={3} placeholder="Adresse complète..." />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 1:
        return (
          <Card title="Informations académiques" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="filiere"
                  label="Filière souhaitée"
                  rules={[{ required: true, message: 'Veuillez sélectionner la filière' }]}
                >
                  <Select placeholder="Sélectionner la filière">
                    <Option value="Informatique">Informatique</Option>
                    <Option value="Gestion">Gestion</Option>
                    <Option value="Langues">Langues</Option>
                    <Option value="Droit">Droit</Option>
                    <Option value="Physique">Physique</Option>
                    <Option value="Chimie">Chimie</Option>
                    <Option value="Mathématiques">Mathématiques</Option>
                    <Option value="Biologie">Biologie</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="niveauActuel"
                  label="Niveau actuel"
                  rules={[{ required: true, message: 'Veuillez sélectionner le niveau' }]}
                >
                  <Select placeholder="Sélectionner le niveau">
                    <Option value="Bac+2">Bac+2 (DUT, BTS)</Option>
                    <Option value="Bac+3">Bac+3 (Licence)</Option>
                    <Option value="Bac+4">Bac+4 (Master 1)</Option>
                    <Option value="Bac+5">Bac+5 (Master 2)</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="etablissementPrecedent"
                  label="Établissement précédent"
                  rules={[{ required: true, message: 'Veuillez saisir l\'établissement' }]}
                >
                  <Input placeholder="Nom de l'établissement" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="moyenne"
                  label="Moyenne générale"
                  rules={[{ required: true, message: 'Veuillez saisir la moyenne' }]}
                >
                  <InputNumber 
                    min={0} 
                    max={20} 
                    step={0.1}
                    placeholder="15.5" 
                    style={{ width: '100%' }} 
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 2:
        return (
          <Card title="Documents requis" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="cv"
                  label="CV"
                  rules={[{ required: true, message: 'Veuillez télécharger votre CV' }]}
                >
                  <Upload>
                    <Button icon={<UploadOutlined />}>Télécharger CV</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lettreMotivation"
                  label="Lettre de motivation"
                  rules={[{ required: true, message: 'Veuillez télécharger votre lettre' }]}
                >
                  <Upload>
                    <Button icon={<UploadOutlined />}>Télécharger lettre</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="relevesNotes"
                  label="Relevés de notes"
                  rules={[{ required: true, message: 'Veuillez télécharger vos relevés' }]}
                >
                  <Upload>
                    <Button icon={<UploadOutlined />}>Télécharger relevés</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="certificatStage"
                  label="Certificat de stage (optionnel)"
                >
                  <Upload>
                    <Button icon={<UploadOutlined />}>Télécharger certificat</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="projetRecherche"
                  label="Projet de recherche (optionnel)"
                >
                  <Upload>
                    <Button icon={<UploadOutlined />}>Télécharger projet</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="recommandations"
                  label="Lettres de recommandation (optionnel)"
                >
                  <Upload multiple>
                    <Button icon={<UploadOutlined />}>Télécharger recommandations</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 3:
        return (
          <Card title="Expérience et compétences" className="mb-6">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="experienceProfessionnelle"
                  label="Expérience professionnelle"
                >
                  <TextArea rows={4} placeholder="Décrivez votre expérience professionnelle..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="langues"
                  label="Langues maîtrisées"
                >
                  <Select mode="tags" placeholder="Ajouter des langues">
                    <Option value="Français">Français</Option>
                    <Option value="Anglais">Anglais</Option>
                    <Option value="Espagnol">Espagnol</Option>
                    <Option value="Allemand">Allemand</Option>
                    <Option value="Italien">Italien</Option>
                    <Option value="Chinois">Chinois</Option>
                    <Option value="Arabe">Arabe</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="competences"
                  label="Compétences techniques"
                >
                  <Select mode="tags" placeholder="Ajouter des compétences">
                    <Option value="Programmation">Programmation</Option>
                    <Option value="Gestion de projet">Gestion de projet</Option>
                    <Option value="Analyse de données">Analyse de données</Option>
                    <Option value="Communication">Communication</Option>
                    <Option value="Travail en équipe">Travail en équipe</Option>
                    <Option value="Leadership">Leadership</Option>
                    <Option value="Résolution de problèmes">Résolution de problèmes</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 4:
        return (
          <Card title="Validation et finalisation" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="priorite"
                  label="Priorité de traitement"
                  rules={[{ required: true, message: 'Veuillez sélectionner la priorité' }]}
                >
                  <Radio.Group>
                    <Radio value="Haute">Haute priorité</Radio>
                    <Radio value="Normale">Priorité normale</Radio>
                    <Radio value="Basse">Basse priorité</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="statut"
                  label="Statut initial"
                  rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
                >
                  <Select placeholder="Sélectionner le statut">
                    <Option value="En cours">En cours</Option>
                    <Option value="En attente">En attente</Option>
                    <Option value="Validé">Validé</Option>
                    <Option value="Rejeté">Rejeté</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="commentaires"
                  label="Commentaires additionnels"
                >
                  <TextArea rows={4} placeholder="Commentaires, observations, notes..." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Informations importantes</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Tous les documents doivent être au format PDF</li>
                    <li>• La taille maximale par fichier est de 5 MB</li>
                    <li>• Votre dossier sera traité dans les 15 jours ouvrés</li>
                    <li>• Vous recevrez une confirmation par email</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Création d'un nouveau dossier L3</h2>
          <p className="text-gray-600 mt-1">Formulaire de candidature pour la Licence 3</p>
        </div>

        <Steps current={currentStep} className="mb-8">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} icon={step.icon} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            priorite: 'Normale',
            statut: 'En cours'
          }}
        >
          {renderStepContent()}

          <Divider />

          <div className="flex justify-between">
            <Button
              onClick={handlePrev}
              disabled={currentStep === 0}
              icon={<ArrowLeftOutlined />}
            >
              Précédent
            </Button>
            
            <Space>
              {currentStep < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleNext}
                  icon={<ArrowRightOutlined />}
                >
                  Suivant
                </Button>
              )}
              
              {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  Créer le dossier
                </Button>
              )}
            </Space>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Nouveau;
