import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Select, DatePicker, InputNumber, Steps, message, Divider, Space, Tag, Upload, Checkbox } from 'antd';
import { PlusOutlined, SaveOutlined, ArrowRightOutlined, ArrowLeftOutlined, UploadOutlined, FileTextOutlined, TrophyOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface DiplomeFormData {
  // Informations générales
  code: string;
  nom: string;
  niveau: string;
  duree: string;
  credits: number;
  description: string;
  
  // Responsabilité et validation
  responsable: string;
  coResponsable: string;
  dateCreation: any;
  dateValidation: any;
  
  // Capacités et effectifs
  capacite: number;
  effectifsInitiaux: number;
  tauxReussiteCible: number;
  
  // Spécialités et modules
  specialites: string[];
  modules: string[];
  
  // Conditions d'admission
  conditionsAdmission: string[];
  prerequis: string;
  
  // Débouchés et insertion
  debouches: string[];
  tauxInsertionCible: number;
  
  // Documents et références
  documents: any[];
  references: string;
  
  // Validation et statut
  statut: string;
  commentaires: string;
}

const NouveauDiplome = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Informations générales',
      icon: <TrophyOutlined />,
    },
    {
      title: 'Responsabilité',
      icon: <UserOutlined />,
    },
    {
      title: 'Capacités',
      icon: <FileTextOutlined />,
    },
    {
      title: 'Spécialités',
      icon: <PlusOutlined />,
    },
    {
      title: 'Admission',
      icon: <CalendarOutlined />,
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

  const handleSubmit = async (values: DiplomeFormData) => {
    try {
      console.log('Données du diplôme:', values);
      message.success('Diplôme créé avec succès !');
      form.resetFields();
      setCurrentStep(0);
    } catch (error) {
      message.error('Erreur lors de la création du diplôme');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card title="Informations générales" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="code"
                  label="Code du diplôme"
                  rules={[{ required: true, message: 'Veuillez saisir le code' }]}
                >
                  <Input placeholder="DIP-001" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nom"
                  label="Nom du diplôme"
                  rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
                >
                  <Input placeholder="Licence en Informatique" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="niveau"
                  label="Niveau"
                  rules={[{ required: true, message: 'Veuillez sélectionner le niveau' }]}
                >
                  <Select placeholder="Sélectionner le niveau">
                    <Option value="Licence">Licence</Option>
                    <Option value="Master">Master</Option>
                    <Option value="Doctorat">Doctorat</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="duree"
                  label="Durée"
                  rules={[{ required: true, message: 'Veuillez saisir la durée' }]}
                >
                  <Input placeholder="3 ans" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="credits"
                  label="Crédits ECTS"
                  rules={[{ required: true, message: 'Veuillez saisir les crédits' }]}
                >
                  <InputNumber min={0} max={300} placeholder="180" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Veuillez saisir la description' }]}
                >
                  <TextArea rows={4} placeholder="Description détaillée du diplôme..." />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 1:
        return (
          <Card title="Responsabilité et validation" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="responsable"
                  label="Responsable principal"
                  rules={[{ required: true, message: 'Veuillez saisir le responsable' }]}
                >
                  <Input placeholder="Dr. Nom Prénom" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="coResponsable"
                  label="Co-responsable"
                >
                  <Input placeholder="Dr. Nom Prénom (optionnel)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateCreation"
                  label="Date de création"
                  rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateValidation"
                  label="Date de validation"
                  rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 2:
        return (
          <Card title="Capacités et effectifs" className="mb-6">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="capacite"
                  label="Capacité maximale"
                  rules={[{ required: true, message: 'Veuillez saisir la capacité' }]}
                >
                  <InputNumber min={1} placeholder="100" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="effectifsInitiaux"
                  label="Effectifs initiaux"
                  rules={[{ required: true, message: 'Veuillez saisir les effectifs' }]}
                >
                  <InputNumber min={0} placeholder="0" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="tauxReussiteCible"
                  label="Taux de réussite cible (%)"
                  rules={[{ required: true, message: 'Veuillez saisir le taux' }]}
                >
                  <InputNumber min={0} max={100} placeholder="80" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 3:
        return (
          <Card title="Spécialités et modules" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="specialites"
                  label="Spécialités"
                  rules={[{ required: true, message: 'Veuillez sélectionner les spécialités' }]}
                >
                  <Select mode="tags" placeholder="Ajouter des spécialités">
                    <Option value="Développement Web">Développement Web</Option>
                    <Option value="Intelligence Artificielle">Intelligence Artificielle</Option>
                    <Option value="Sécurité">Sécurité</Option>
                    <Option value="Finance">Finance</Option>
                    <Option value="Marketing">Marketing</Option>
                    <Option value="Ressources Humaines">Ressources Humaines</Option>
                    <Option value="Droit des Affaires">Droit des Affaires</Option>
                    <Option value="Droit International">Droit International</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="modules"
                  label="Modules principaux"
                  rules={[{ required: true, message: 'Veuillez sélectionner les modules' }]}
                >
                  <Select mode="tags" placeholder="Ajouter des modules">
                    <Option value="Mathématiques">Mathématiques</Option>
                    <Option value="Programmation">Programmation</Option>
                    <Option value="Base de données">Base de données</Option>
                    <Option value="Réseaux">Réseaux</Option>
                    <Option value="Gestion de projet">Gestion de projet</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 4:
        return (
          <Card title="Conditions d'admission et débouchés" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="conditionsAdmission"
                  label="Conditions d'admission"
                  rules={[{ required: true, message: 'Veuillez sélectionner les conditions' }]}
                >
                  <Select mode="tags" placeholder="Ajouter des conditions">
                    <Option value="Baccalauréat">Baccalauréat</Option>
                    <Option value="Licence">Licence</Option>
                    <Option value="Master">Master</Option>
                    <Option value="Entretien">Entretien</Option>
                    <Option value="Test d'aptitude">Test d'aptitude</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tauxInsertionCible"
                  label="Taux d'insertion cible (%)"
                  rules={[{ required: true, message: 'Veuillez saisir le taux' }]}
                >
                  <InputNumber min={0} max={100} placeholder="85" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="prerequis"
                  label="Prérequis détaillés"
                >
                  <TextArea rows={3} placeholder="Prérequis spécifiques..." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="debouches"
                  label="Débouchés professionnels"
                  rules={[{ required: true, message: 'Veuillez sélectionner les débouchés' }]}
                >
                  <Select mode="tags" placeholder="Ajouter des débouchés">
                    <Option value="Développeur">Développeur</Option>
                    <Option value="Chef de projet">Chef de projet</Option>
                    <Option value="Data Scientist">Data Scientist</Option>
                    <Option value="Consultant">Consultant</Option>
                    <Option value="Enseignant">Enseignant</Option>
                    <Option value="Chercheur">Chercheur</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );

      case 5:
        return (
          <Card title="Validation et documents" className="mb-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="statut"
                  label="Statut initial"
                  rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
                >
                  <Select placeholder="Sélectionner le statut">
                    <Option value="Actif">Actif</Option>
                    <Option value="En révision">En révision</Option>
                    <Option value="Suspendu">Suspendu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="documents"
                  label="Documents requis"
                >
                  <Upload>
                    <Button icon={<UploadOutlined />}>Télécharger des documents</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="references"
                  label="Références et sources"
                >
                  <TextArea rows={3} placeholder="Références bibliographiques, sources..." />
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
          <h2 className="text-2xl font-bold text-gray-800">Création d'un nouveau diplôme</h2>
          <p className="text-gray-600 mt-1">Formulaire de création d'un nouveau programme d'études</p>
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
            statut: 'Actif',
            niveau: 'Licence',
            tauxReussiteCible: 80,
            tauxInsertionCible: 85
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
                  Créer le diplôme
                </Button>
              )}
            </Space>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NouveauDiplome;
