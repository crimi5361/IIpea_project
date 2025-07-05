import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Card, Row, Col, Statistic, Select, Modal, Form, message, Progress, Alert, Tabs, Badge } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UserOutlined, TeamOutlined, BookOutlined, BarChartOutlined, PieChartOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface EffectifEtudiant {
  id: number;
  numeroEtudiant: string;
  nom: string;
  prenom: string;
  filiere: string;
  niveau: string;
  anneeAcademique: string;
  statut: string;
  genre: string;
  dateNaissance: string;
  nationalite: string;
  email: string;
  telephone: string;
  adresse: string;
  dateInscription: string;
  responsable: string;
  notes: string;
}

const EffectifsEtudiant = () => {
  const [searchText, setSearchText] = useState('');
  const [filiereFilter, setFiliereFilter] = useState<string>('all');
  const [niveauFilter, setNiveauFilter] = useState<string>('all');
  const [statutFilter, setStatutFilter] = useState<string>('all');
  const [anneeFilter, setAnneeFilter] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEtudiant, setSelectedEtudiant] = useState<EffectifEtudiant | null>(null);
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();

  // Données fictives pour les effectifs
  const effectifs: EffectifEtudiant[] = [
    {
      id: 1,
      numeroEtudiant: '2024001',
      nom: 'Dupont',
      prenom: 'Jean',
      filiere: 'Informatique',
      niveau: 'L1',
      anneeAcademique: '2023-2024',
      statut: 'Actif',
      genre: 'M',
      dateNaissance: '2000-05-15',
      nationalite: 'Française',
      email: 'jean.dupont@email.com',
      telephone: '06 12 34 56 78',
      adresse: '123 Rue de la Paix, Paris',
      dateInscription: '2023-09-01',
      responsable: 'Marie Martin',
      notes: 'Étudiant assidu'
    },
    {
      id: 2,
      numeroEtudiant: '2024002',
      nom: 'Bernard',
      prenom: 'Sophie',
      filiere: 'Mathématiques',
      niveau: 'L2',
      anneeAcademique: '2023-2024',
      statut: 'Actif',
      genre: 'F',
      dateNaissance: '1999-08-22',
      nationalite: 'Française',
      email: 'sophie.bernard@email.com',
      telephone: '06 98 76 54 32',
      adresse: '456 Avenue des Champs, Lyon',
      dateInscription: '2022-09-01',
      responsable: 'Pierre Leroy',
      notes: 'Excellente étudiante'
    },
    {
      id: 3,
      numeroEtudiant: '2024003',
      nom: 'Martin',
      prenom: 'Pierre',
      filiere: 'Physique',
      niveau: 'L3',
      anneeAcademique: '2023-2024',
      statut: 'Actif',
      genre: 'M',
      dateNaissance: '1998-12-10',
      nationalite: 'Française',
      email: 'pierre.martin@email.com',
      telephone: '06 11 22 33 44',
      adresse: '789 Boulevard Central, Marseille',
      dateInscription: '2021-09-01',
      responsable: 'Jean Dupont',
      notes: 'Étudiant sérieux'
    },
    {
      id: 4,
      numeroEtudiant: '2024004',
      nom: 'Leroy',
      prenom: 'Marie',
      filiere: 'Chimie',
      niveau: 'M1',
      anneeAcademique: '2023-2024',
      statut: 'Actif',
      genre: 'F',
      dateNaissance: '1997-03-18',
      nationalite: 'Française',
      email: 'marie.leroy@email.com',
      telephone: '06 55 66 77 88',
      adresse: '321 Rue du Commerce, Toulouse',
      dateInscription: '2020-09-01',
      responsable: 'Sophie Bernard',
      notes: 'Étudiante brillante'
    },
    {
      id: 5,
      numeroEtudiant: '2024005',
      nom: 'Dubois',
      prenom: 'Marc',
      filiere: 'Biologie',
      niveau: 'L1',
      anneeAcademique: '2023-2024',
      statut: 'Inactif',
      genre: 'M',
      dateNaissance: '2001-07-05',
      nationalite: 'Française',
      email: 'marc.dubois@email.com',
      telephone: '06 99 88 77 66',
      adresse: '654 Avenue de la République, Nice',
      dateInscription: '2023-09-01',
      responsable: 'Marie Martin',
      notes: 'Étudiant en difficulté'
    }
  ];

  const columns = [
    {
      title: 'Étudiant',
      key: 'etudiant',
      render: (_: any, record: EffectifEtudiant) => (
        <div>
          <div className="font-medium">{record.prenom} {record.nom}</div>
          <div className="text-sm text-gray-500">#{record.numeroEtudiant}</div>
        </div>
      ),
    },
    {
      title: 'Formation',
      key: 'formation',
      render: (_: any, record: EffectifEtudiant) => (
        <div>
          <div className="font-medium">{record.filiere}</div>
          <div className="text-sm text-gray-500">{record.niveau}</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: EffectifEtudiant) => {
        const statusConfig = {
          'Actif': { color: 'green' },
          'Inactif': { color: 'red' },
          'Suspendu': { color: 'orange' },
        };
        const config = statusConfig[record.statut as keyof typeof statusConfig];
        return (
          <Tag color={config?.color}>
            {record.statut}
          </Tag>
        );
      },
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      render: (genre: string) => (
        <Tag color={genre === 'M' ? 'blue' : 'pink'}>
          {genre === 'M' ? 'Masculin' : 'Féminin'}
        </Tag>
      ),
    },
    {
      title: 'Année académique',
      dataIndex: 'anneeAcademique',
      key: 'anneeAcademique',
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_: any, record: EffectifEtudiant) => (
        <div>
          <div className="text-sm">{record.email}</div>
          <div className="text-xs text-gray-500">{record.telephone}</div>
        </div>
      ),
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: EffectifEtudiant) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleView(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  const filteredData = effectifs.filter(etudiant => {
    const matchesSearch = 
      etudiant.nom.toLowerCase().includes(searchText.toLowerCase()) ||
      etudiant.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
      etudiant.numeroEtudiant.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFiliere = filiereFilter === 'all' || etudiant.filiere === filiereFilter;
    const matchesNiveau = niveauFilter === 'all' || etudiant.niveau === niveauFilter;
    const matchesStatut = statutFilter === 'all' || etudiant.statut === statutFilter;
    const matchesAnnee = anneeFilter === 'all' || etudiant.anneeAcademique === anneeFilter;
    
    return matchesSearch && matchesFiliere && matchesNiveau && matchesStatut && matchesAnnee;
  });

  // Statistiques
  const totalEtudiants = effectifs.length;
  const actifs = effectifs.filter(e => e.statut === 'Actif').length;
  const inactifs = effectifs.filter(e => e.statut === 'Inactif').length;
  const masculins = effectifs.filter(e => e.genre === 'M').length;
  const feminins = effectifs.filter(e => e.genre === 'F').length;

  // Répartition par filière
  const repartitionFiliere = effectifs.reduce((acc, etudiant) => {
    acc[etudiant.filiere] = (acc[etudiant.filiere] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Répartition par niveau
  const repartitionNiveau = effectifs.reduce((acc, etudiant) => {
    acc[etudiant.niveau] = (acc[etudiant.niveau] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleView = (etudiant: EffectifEtudiant) => {
    setSelectedEtudiant(etudiant);
    setIsModalVisible(true);
  };

  const handleEdit = (etudiant: EffectifEtudiant) => {
    setSelectedEtudiant(etudiant);
    form.setFieldsValue({
      ...etudiant,
      dateNaissance: new Date(etudiant.dateNaissance),
      dateInscription: new Date(etudiant.dateInscription)
    });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      message.success('Étudiant mis à jour avec succès !');
      setIsModalVisible(false);
    } catch (error) {
      message.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Vue d'ensemble" key="1">
          {/* Statistiques principales */}
          <Row gutter={16} className="mb-6">
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Étudiants"
                  value={totalEtudiants}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Étudiants Actifs"
                  value={actifs}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Étudiants Inactifs"
                  value={inactifs}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Taux d'activité"
                  value={Math.round((actifs / totalEtudiants) * 100)}
                  suffix="%"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Répartition par genre */}
          <Row gutter={16} className="mb-6">
            <Col span={12}>
              <Card title="Répartition par genre" className="h-64">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">{masculins}</div>
                    <div className="text-sm text-gray-600">Masculin</div>
                  </div>
                  <div className="mx-8 text-2xl text-gray-300">|</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-500">{feminins}</div>
                    <div className="text-sm text-gray-600">Féminin</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Répartition par filière" className="h-64">
                <div className="space-y-2">
                  {Object.entries(repartitionFiliere).map(([filiere, count]) => (
                    <div key={filiere} className="flex justify-between items-center">
                      <span className="text-sm">{filiere}</span>
                      <div className="flex items-center">
                        <Progress 
                          percent={Math.round((count / totalEtudiants) * 100)} 
                          size="small" 
                          className="mr-2"
                          showInfo={false}
                        />
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          {/* Répartition par niveau */}
          <Card title="Répartition par niveau" className="mb-6">
            <Row gutter={16}>
              {Object.entries(repartitionNiveau).map(([niveau, count]) => (
                <Col span={4} key={niveau}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{count}</div>
                    <div className="text-sm text-gray-600">{niveau}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </TabPane>

        <TabPane tab="Liste détaillée" key="2">
          {/* Tableau principal */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Effectifs Étudiants</h2>
                <p className="text-gray-600 mt-1">Gestion complète des effectifs étudiants</p>
              </div>
              <Button type="primary" icon={<PlusOutlined />}>
                + Nouvel étudiant
              </Button>
            </div>

            {/* Filtres */}
            <div className="mb-4 flex gap-4 items-center">
              <Search
                placeholder="Rechercher un étudiant..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="max-w-md"
              />
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
                placeholder="Niveau"
                value={niveauFilter}
                onChange={setNiveauFilter}
                style={{ width: 150 }}
              >
                <Option value="all">Tous les niveaux</Option>
                <Option value="L1">Licence 1</Option>
                <Option value="L2">Licence 2</Option>
                <Option value="L3">Licence 3</Option>
                <Option value="M1">Master 1</Option>
                <Option value="M2">Master 2</Option>
              </Select>
              <Select
                placeholder="Statut"
                value={statutFilter}
                onChange={setStatutFilter}
                style={{ width: 150 }}
              >
                <Option value="all">Tous les statuts</Option>
                <Option value="Actif">Actif</Option>
                <Option value="Inactif">Inactif</Option>
                <Option value="Suspendu">Suspendu</Option>
              </Select>
              <Select
                placeholder="Année"
                value={anneeFilter}
                onChange={setAnneeFilter}
                style={{ width: 150 }}
              >
                <Option value="all">Toutes les années</Option>
                <Option value="2023-2024">2023-2024</Option>
                <Option value="2022-2023">2022-2023</Option>
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
                  `${range[0]}-${range[1]} sur ${total} étudiants`,
              }}
              className="custom-table"
            />
          </div>
        </TabPane>
      </Tabs>

      {/* Modal pour voir/modifier un étudiant */}
      <Modal
        title={selectedEtudiant ? `Étudiant ${selectedEtudiant.numeroEtudiant}` : 'Nouvel étudiant'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        {selectedEtudiant && (
          <div className="space-y-4">
            <Row gutter={16}>
              <Col span={12}>
                <div className="font-medium">Étudiant</div>
                <div>{selectedEtudiant.prenom} {selectedEtudiant.nom}</div>
              </Col>
              <Col span={12}>
                <div className="font-medium">Formation</div>
                <div>{selectedEtudiant.filiere} - {selectedEtudiant.niveau}</div>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <div className="font-medium">Statut</div>
                <Tag color={selectedEtudiant.statut === 'Actif' ? 'green' : 'red'}>
                  {selectedEtudiant.statut}
                </Tag>
              </Col>
              <Col span={12}>
                <div className="font-medium">Genre</div>
                <Tag color={selectedEtudiant.genre === 'M' ? 'blue' : 'pink'}>
                  {selectedEtudiant.genre === 'M' ? 'Masculin' : 'Féminin'}
                </Tag>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <div className="font-medium">Date de naissance</div>
                <div>{new Date(selectedEtudiant.dateNaissance).toLocaleDateString('fr-FR')}</div>
              </Col>
              <Col span={12}>
                <div className="font-medium">Nationalité</div>
                <div>{selectedEtudiant.nationalite}</div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <div className="font-medium">Email</div>
                <div>{selectedEtudiant.email}</div>
              </Col>
              <Col span={12}>
                <div className="font-medium">Téléphone</div>
                <div>{selectedEtudiant.telephone}</div>
              </Col>
            </Row>

            <div>
              <div className="font-medium">Adresse</div>
              <div className="text-gray-600">{selectedEtudiant.adresse}</div>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <div className="font-medium">Date d'inscription</div>
                <div>{new Date(selectedEtudiant.dateInscription).toLocaleDateString('fr-FR')}</div>
              </Col>
              <Col span={12}>
                <div className="font-medium">Responsable</div>
                <div>{selectedEtudiant.responsable}</div>
              </Col>
            </Row>

            <div>
              <div className="font-medium">Notes</div>
              <div className="text-gray-600">{selectedEtudiant.notes}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EffectifsEtudiant;
