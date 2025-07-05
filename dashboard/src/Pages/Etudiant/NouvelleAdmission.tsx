import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Select, DatePicker, Upload, message, Steps, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, UploadOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

interface AdmissionForm {
  // Informations personnelles
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  nationalite: string;
  genre: string;
  
  // Informations de contact
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  
  // Informations académiques
  filiere: string;
  niveau: string;
  anneeAcademique: string;
  diplomePrecedent: string;
  etablissementPrecedent: string;
  
  // Informations administratives
  numeroEtudiant: string;
  dateAdmission: string;
  statut: string;
  notes: string;
}

const NouvelleAdmission = () => {
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
      title: 'Informations académiques',
      content: 'academic',
    },
    {
      title: 'Validation',
      content: 'validation',
    },
  ];

  const onFinish = async (values: AdmissionForm) => {
    setLoading(true);
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Admission créée avec succès !');
      form.resetFields();
      setCurrentStep(0);
    } catch (error) {
      message.error('Erreur lors de la création de l\'admission');
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
                <Select placeholder="Sélectionner le genre">
                  <Option value="homme">Homme</Option>
                  <Option value="femme">Femme</Option>
                  <Option value="autre">Autre</Option>
                </Select>
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
                name="filiere"
                label="Filière"
                rules={[{ required: true, message: 'Veuillez sélectionner la filière' }]}
              >
                <Select placeholder="Sélectionner la filière">
                  <Option value="informatique">Informatique</Option>
                  <Option value="mathematiques">Mathématiques</Option>
                  <Option value="physique">Physique</Option>
                  <Option value="chimie">Chimie</Option>
                  <Option value="biologie">Biologie</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="niveau"
                label="Niveau"
                rules={[{ required: true, message: 'Veuillez sélectionner le niveau' }]}
              >
                <Select placeholder="Sélectionner le niveau">
                  <Option value="licence1">Licence 1</Option>
                  <Option value="licence2">Licence 2</Option>
                  <Option value="licence3">Licence 3</Option>
                  <Option value="master1">Master 1</Option>
                  <Option value="master2">Master 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="anneeAcademique"
                label="Année académique"
                rules={[{ required: true, message: 'Veuillez sélectionner l\'année académique' }]}
              >
                <Select placeholder="Sélectionner l'année académique">
                  <Option value="2024-2025">2024-2025</Option>
                  <Option value="2023-2024">2023-2024</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="diplomePrecedent"
                label="Diplôme précédent"
              >
                <Input placeholder="Diplôme obtenu" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="etablissementPrecedent"
                label="Établissement précédent"
              >
                <Input placeholder="Nom de l'établissement précédent" />
              </Form.Item>
            </Col>
          </Row>
        );

      case 3:
        return (
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Récapitulatif de l'admission</h3>
              <p className="text-gray-600">Vérifiez les informations avant de valider l'admission</p>
            </div>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="numeroEtudiant"
                  label="Numéro d'étudiant"
                >
                  <Input placeholder="Généré automatiquement" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateAdmission"
                  label="Date d'admission"
                >
                  <DatePicker style={{ width: '100%' }} disabled />
                </Form.Item>
              </Col>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Nouvelle Admission Étudiant</h2>
          <p className="text-gray-600">Créez un nouveau dossier d'admission pour un étudiant</p>
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
          initialValues={{
            dateAdmission: new Date(),
            numeroEtudiant: `2024${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          }}
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
                  Créer l'admission
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default NouvelleAdmission;
