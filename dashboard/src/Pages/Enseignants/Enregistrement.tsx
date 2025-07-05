import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Select, DatePicker, Upload, message, Steps, Divider, Radio } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, UploadOutlined, SaveOutlined, IdcardOutlined, BookOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface EnregistrementForm {
  // Informations personnelles
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  nationalite: string;
  genre: string;
  numeroSecu: string;
  
  // Informations de contact
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  
  // Informations professionnelles
  departement: string;
  specialite: string;
  grade: string;
  dateEmbauche: string;
  typeContrat: string;
  salaire: number;
  
  // Informations académiques
  diplome: string;
  etablissement: string;
  anneeDiplome: string;
  experience: number;
  
  // Documents
  cv: any;
  lettreMotivation: any;
  diplomes: any;
}

const Enregistrement = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      title: 'Informations personnelles',
      content: 'personal',
    },
    {
      title: 'Contact',
      content: 'contact',
    },
    {
      title: 'Informations professionnelles',
      content: 'professional',
    },
    {
      title: 'Documents',
      content: 'documents',
    },
    {
      title: 'Validation',
      content: 'validation',
    },
  ];

  const onFinish = async (values: EnregistrementForm) => {
    setLoading(true);
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Enregistrement créé avec succès !');
      form.resetFields();
      setCurrentStep(0);
    } catch (error) {
      message.error('Erreur lors de la création de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nom"
                label="Nom de famille"
                rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nom de famille" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="prenom"
                label="Prénom"
                rules={[{ required: true, message: 'Veuillez saisir le prénom' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Prénom" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateNaissance"
                label="Date de naissance"
                rules={[{ required: true, message: 'Veuillez sélectionner la date de naissance' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="Date de naissance" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lieuNaissance"
                label="Lieu de naissance"
                rules={[{ required: true, message: 'Veuillez saisir le lieu de naissance' }]}
              >
                <Input placeholder="Lieu de naissance" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nationalite"
                label="Nationalité"
                rules={[{ required: true, message: 'Veuillez sélectionner la nationalité' }]}
              >
                <Select placeholder="Sélectionner la nationalité">
                  <Option value="francaise">Française</Option>
                  <Option value="etrangere">Étrangère</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="genre"
                label="Genre"
                rules={[{ required: true, message: 'Veuillez sélectionner le genre' }]}
              >
                <Radio.Group>
                  <Radio value="homme">Homme</Radio>
                  <Radio value="femme">Femme</Radio>
                  <Radio value="autre">Autre</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="numeroSecu"
                label="Numéro de sécurité sociale"
                rules={[{ required: true, message: 'Veuillez saisir le numéro de sécurité sociale' }]}
              >
                <Input prefix={<IdcardOutlined />} placeholder="1234567890123" />
              </Form.Item>
            </Col>
          </Row>
        );

      case 1:
        return (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Veuillez saisir l\'email' },
                  { type: 'email', message: 'Email invalide' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="email@exemple.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="telephone"
                label="Téléphone"
                rules={[{ required: true, message: 'Veuillez saisir le téléphone' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="01 23 45 67 89" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="adresse"
                label="Adresse"
                rules={[{ required: true, message: 'Veuillez saisir l\'adresse' }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="Adresse complète" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ville"
                label="Ville"
                rules={[{ required: true, message: 'Veuillez saisir la ville' }]}
              >
                <Input placeholder="Ville" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="codePostal"
                label="Code postal"
                rules={[{ required: true, message: 'Veuillez saisir le code postal' }]}
              >
                <Input placeholder="75001" />
              </Form.Item>
            </Col>
          </Row>
        );

      case 2:
        return (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="departement"
                label="Département"
                rules={[{ required: true, message: 'Veuillez sélectionner le département' }]}
              >
                <Select placeholder="Sélectionner le département">
                  <Option value="informatique">Informatique</Option>
                  <Option value="mathematiques">Mathématiques</Option>
                  <Option value="physique">Physique</Option>
                  <Option value="chimie">Chimie</Option>
                  <Option value="biologie">Biologie</Option>
                  <Option value="langues">Langues</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="specialite"
                label="Spécialité"
                rules={[{ required: true, message: 'Veuillez saisir la spécialité' }]}
              >
                <Input placeholder="Spécialité principale" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="grade"
                label="Grade"
                rules={[{ required: true, message: 'Veuillez sélectionner le grade' }]}
              >
                <Select placeholder="Sélectionner le grade">
                  <Option value="maitre_conferences">Maître de conférences</Option>
                  <Option value="professeur">Professeur</Option>
                  <Option value="charge_cours">Chargé de cours</Option>
                  <Option value="vacataire">Vacataire</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateEmbauche"
                label="Date d'embauche"
                rules={[{ required: true, message: 'Veuillez sélectionner la date d\'embauche' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="Date d'embauche" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="typeContrat"
                label="Type de contrat"
                rules={[{ required: true, message: 'Veuillez sélectionner le type de contrat' }]}
              >
                <Select placeholder="Sélectionner le type de contrat">
                  <Option value="cdi">CDI</Option>
                  <Option value="cdd">CDD</Option>
                  <Option value="vacation">Vacation</Option>
                  <Option value="stage">Stage</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salaire"
                label="Salaire brut annuel"
                rules={[{ required: true, message: 'Veuillez saisir le salaire' }]}
              >
                <Input type="number" placeholder="45000" suffix="€" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="diplome"
                label="Diplôme le plus élevé"
                rules={[{ required: true, message: 'Veuillez saisir le diplôme' }]}
              >
                <Input prefix={<BookOutlined />} placeholder="Doctorat, Master, etc." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="etablissement"
                label="Établissement d'obtention"
                rules={[{ required: true, message: 'Veuillez saisir l\'établissement' }]}
              >
                <Input placeholder="Université, École, etc." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="anneeDiplome"
                label="Année d'obtention"
                rules={[{ required: true, message: 'Veuillez saisir l\'année' }]}
              >
                <Input type="number" placeholder="2020" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="experience"
                label="Années d'expérience"
                rules={[{ required: true, message: 'Veuillez saisir les années d\'expérience' }]}
              >
                <Input type="number" placeholder="5" suffix="années" />
              </Form.Item>
            </Col>
          </Row>
        );

      case 3:
        return (
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="cv"
                label="CV (PDF)"
                rules={[{ required: true, message: 'Veuillez télécharger le CV' }]}
              >
                <Upload
                  beforeUpload={() => false}
                  accept=".pdf"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Télécharger CV</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="lettreMotivation"
                label="Lettre de motivation (PDF)"
                rules={[{ required: true, message: 'Veuillez télécharger la lettre de motivation' }]}
              >
                <Upload
                  beforeUpload={() => false}
                  accept=".pdf"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Télécharger lettre</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="diplomes"
                label="Copies des diplômes (PDF)"
                rules={[{ required: true, message: 'Veuillez télécharger les diplômes' }]}
              >
                <Upload
                  beforeUpload={() => false}
                  accept=".pdf"
                  multiple
                >
                  <Button icon={<UploadOutlined />}>Télécharger diplômes</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Récapitulatif de l'enregistrement</h3>
              <p className="text-gray-600">Vérifiez les informations avant de valider l'enregistrement</p>
            </div>
            
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="notes"
                  label="Notes additionnelles"
                >
                  <TextArea rows={4} placeholder="Informations complémentaires..." />
                </Form.Item>
              </Col>
            </Row>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <Card>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enregistrement d'un Enseignant</h2>
          <p className="text-gray-600">Créez un nouveau profil d'enseignant</p>
        </div>

        <Steps current={currentStep} className="mb-8">
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="min-h-96">
            {renderStepContent()}
          </div>

          <Divider />

          <div className="flex justify-between">
            <Button 
              disabled={currentStep === 0} 
              onClick={prev}
            >
              Précédent
            </Button>
            
            <div className="space-x-2">
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  Suivant
                </Button>
              )}
              
              {currentStep === steps.length - 1 && (
                <Button 
                  type="primary" 
                  icon={<SaveOutlined />}
                  loading={loading}
                  onClick={() => form.submit()}
                >
                  Créer l'enregistrement
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Enregistrement;
