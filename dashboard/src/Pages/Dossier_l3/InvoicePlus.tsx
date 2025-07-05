import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker, Modal, Form, InputNumber, Space, Statistic, Progress, Alert, Badge, Tooltip, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownloadOutlined, PrinterOutlined, EyeOutlined, DollarOutlined, CreditCardOutlined, BankOutlined, WalletOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface InvoiceData {
  id: string;
  numero: string;
  etudiant: string;
  dossier: string;
  montant: number;
  montantPaye: number;
  statut: string;
  dateEmission: string;
  dateEcheance: string;
  methodePaiement: string;
  type: string;
  description: string;
}

const InvoicePlus = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
  const [form] = Form.useForm();
  const [paymentForm] = Form.useForm();

  // Données simulées
  const invoicesData: InvoiceData[] = [
    {
      id: 'INV-001',
      numero: 'FAC-2024-001',
      etudiant: 'Ahmed Djabou',
      dossier: 'DJ-2024-001',
      montant: 2500,
      montantPaye: 2500,
      statut: 'Payé',
      dateEmission: '2024-01-15',
      dateEcheance: '2024-02-15',
      methodePaiement: 'Carte bancaire',
      type: 'Frais d\'inscription',
      description: 'Frais d\'inscription pour la Licence 3 Informatique'
    },
    {
      id: 'INV-002',
      numero: 'FAC-2024-002',
      etudiant: 'Marie Dubois',
      dossier: 'DB-2024-001',
      montant: 1800,
      montantPaye: 900,
      statut: 'Partiellement payé',
      dateEmission: '2024-01-20',
      dateEcheance: '2024-02-20',
      methodePaiement: 'Virement bancaire',
      type: 'Frais de scolarité',
      description: 'Premier semestre - Licence 3 Gestion'
    },
    {
      id: 'INV-003',
      numero: 'FAC-2024-003',
      etudiant: 'Jean Martin',
      dossier: 'MT-2024-001',
      montant: 3200,
      montantPaye: 0,
      statut: 'En attente',
      dateEmission: '2024-01-25',
      dateEcheance: '2024-02-25',
      methodePaiement: '-',
      type: 'Frais d\'inscription',
      description: 'Frais d\'inscription pour la Licence 3 Droit'
    },
    {
      id: 'INV-004',
      numero: 'FAC-2024-004',
      etudiant: 'Sophie Bernard',
      dossier: 'BR-2024-001',
      montant: 1500,
      montantPaye: 1500,
      statut: 'Payé',
      dateEmission: '2024-01-10',
      dateEcheance: '2024-02-10',
      methodePaiement: 'Espèces',
      type: 'Frais de dossier',
      description: 'Frais de traitement du dossier L3'
    },
    {
      id: 'INV-005',
      numero: 'FAC-2024-005',
      etudiant: 'Pierre Durand',
      dossier: 'DR-2024-001',
      montant: 2800,
      montantPaye: 1400,
      statut: 'Partiellement payé',
      dateEmission: '2024-01-30',
      dateEcheance: '2024-02-30',
      methodePaiement: 'Chèque',
      type: 'Frais de scolarité',
      description: 'Deuxième semestre - Licence 3 Langues'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payé': return 'success';
      case 'Partiellement payé': return 'warning';
      case 'En attente': return 'error';
      case 'En retard': return 'error';
      default: return 'default';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Carte bancaire': return <CreditCardOutlined />;
      case 'Virement bancaire': return <BankOutlined />;
      case 'Espèces': return <WalletOutlined />;
      case 'Chèque': return <DollarOutlined />;
      default: return <DollarOutlined />;
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
      title: 'Étudiant',
      dataIndex: 'etudiant',
      key: 'etudiant',
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
      title: 'Payé',
      dataIndex: 'montantPaye',
      key: 'montantPaye',
      render: (paid: number, record: InvoiceData) => (
        <div>
          <span className="font-medium text-blue-600">
            {paid.toLocaleString('fr-FR')} €
          </span>
          <Progress 
            percent={Math.round((paid / record.montant) * 100)} 
            size="small" 
            showInfo={false}
            className="mt-1"
          />
        </div>
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
      title: 'Échéance',
      dataIndex: 'dateEcheance',
      key: 'dateEcheance',
      render: (date: string) => {
        const echeance = new Date(date);
        const today = new Date();
        const isOverdue = echeance < today;
        
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
      render: (record: InvoiceData) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Enregistrer un paiement">
            <Button 
              type="primary" 
              size="small"
              onClick={() => handlePayment(record)}
              disabled={record.statut === 'Payé'}
            >
              Payer
            </Button>
          </Tooltip>
          <Tooltip title="Télécharger">
            <Button type="text" icon={<DownloadOutlined />} size="small" />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handlePayment = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalVisible(true);
  };

  const handlePaymentSubmit = async (values: any) => {
    try {
      console.log('Paiement enregistré:', values);
      message.success('Paiement enregistré avec succès');
      setIsPaymentModalVisible(false);
      paymentForm.resetFields();
    } catch (error) {
      message.error('Erreur lors de l\'enregistrement du paiement');
    }
  };

  const totalMontant = invoicesData.reduce((sum, invoice) => sum + invoice.montant, 0);
  const totalPaye = invoicesData.reduce((sum, invoice) => sum + invoice.montantPaye, 0);
  const totalEnAttente = totalMontant - totalPaye;
  const tauxRecouvrement = Math.round((totalPaye / totalMontant) * 100);

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="space-y-6">
        {/* Statistiques */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total des factures"
                value={totalMontant}
                suffix="€"
                valueStyle={{ color: '#1890ff' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Montant perçu"
                value={totalPaye}
                suffix="€"
                valueStyle={{ color: '#3f8600' }}
                prefix={<CreditCardOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="En attente"
                value={totalEnAttente}
                suffix="€"
                valueStyle={{ color: '#cf1322' }}
                prefix={<BankOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Taux de recouvrement"
                value={tauxRecouvrement}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
                prefix={<WalletOutlined />}
              />
              <Progress percent={tauxRecouvrement} showInfo={false} />
            </Card>
          </Col>
        </Row>

        {/* Filtres et actions */}
        <Card>
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Input
                placeholder="Rechercher une facture..."
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={4}>
              <Select placeholder="Statut" style={{ width: '100%' }}>
                <Option value="all">Tous les statuts</Option>
                <Option value="paye">Payé</Option>
                <Option value="partiel">Partiellement payé</Option>
                <Option value="attente">En attente</Option>
                <Option value="retard">En retard</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Type" style={{ width: '100%' }}>
                <Option value="all">Tous les types</Option>
                <Option value="inscription">Frais d'inscription</Option>
                <Option value="scolarite">Frais de scolarité</Option>
                <Option value="dossier">Frais de dossier</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} placeholder={['Date début', 'Date fin']} />
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>
                  Nouvelle facture
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tableau des factures */}
        <Card title="Factures et paiements">
          <Table
            dataSource={invoicesData}
            columns={columns}
            rowKey="id"
            pagination={{
              total: invoicesData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} sur ${total} factures`
            }}
          />
        </Card>

        {/* Alertes */}
        <Alert
          message="Factures en retard"
          description="3 factures ont dépassé leur date d'échéance. Veuillez contacter les étudiants concernés."
          type="warning"
          showIcon
          action={
            <Button size="small" type="link">
              Voir les détails
            </Button>
          }
        />
      </div>

      {/* Modal de paiement */}
      <Modal
        title="Enregistrer un paiement"
        open={isPaymentModalVisible}
        onCancel={() => setIsPaymentModalVisible(false)}
        footer={null}
        width={500}
      >
        {selectedInvoice && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Facture sélectionnée</h4>
            <p><strong>Numéro:</strong> {selectedInvoice.numero}</p>
            <p><strong>Étudiant:</strong> {selectedInvoice.etudiant}</p>
            <p><strong>Montant total:</strong> {selectedInvoice.montant.toLocaleString('fr-FR')} €</p>
            <p><strong>Déjà payé:</strong> {selectedInvoice.montantPaye.toLocaleString('fr-FR')} €</p>
            <p><strong>Reste à payer:</strong> {(selectedInvoice.montant - selectedInvoice.montantPaye).toLocaleString('fr-FR')} €</p>
          </div>
        )}

        <Form
          form={paymentForm}
          layout="vertical"
          onFinish={handlePaymentSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="montant"
                label="Montant du paiement"
                rules={[{ required: true, message: 'Veuillez saisir le montant' }]}
              >
                <InputNumber
                  min={0}
                  max={selectedInvoice ? selectedInvoice.montant - selectedInvoice.montantPaye : 0}
                  placeholder="Montant"
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="methodePaiement"
                label="Méthode de paiement"
                rules={[{ required: true, message: 'Veuillez sélectionner la méthode' }]}
              >
                <Select placeholder="Sélectionner la méthode">
                  <Option value="Carte bancaire">Carte bancaire</Option>
                  <Option value="Virement bancaire">Virement bancaire</Option>
                  <Option value="Espèces">Espèces</Option>
                  <Option value="Chèque">Chèque</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="datePaiement"
                label="Date de paiement"
                rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="reference"
                label="Référence de paiement"
              >
                <Input placeholder="Référence (optionnel)" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="commentaire"
                label="Commentaire"
              >
                <Input.TextArea rows={3} placeholder="Commentaire sur le paiement..." />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsPaymentModalVisible(false)}>
              Annuler
            </Button>
            <Button type="primary" htmlType="submit">
              Enregistrer le paiement
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default InvoicePlus;
