import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Avatar, Dropdown, Menu } from 'antd';
import { SearchOutlined, MoreOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Search } = Input;

interface Enseignant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  departement: string;
  statut: string;
  dateEmbauche: string;
  specialite: string;
  avatar: string;
}

const Liste = () => {
  const [searchText, setSearchText] = useState('');

  // Données fictives pour les enseignants
  const enseignants: Enseignant[] = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@universite.fr',
      telephone: '01 23 45 67 89',
      departement: 'Informatique',
      statut: 'Actif',
      dateEmbauche: '2020-09-01',
      specialite: 'Développement Web',
      avatar: 'https://joeschmoe.io/api/v1/1'
    },
    {
      id: 2,
      nom: 'Martin',
      prenom: 'Marie',
      email: 'marie.martin@universite.fr',
      telephone: '01 98 76 54 32',
      departement: 'Mathématiques',
      statut: 'Actif',
      dateEmbauche: '2019-03-15',
      specialite: 'Algèbre',
      avatar: 'https://joeschmoe.io/api/v1/2'
    },
    {
      id: 3,
      nom: 'Bernard',
      prenom: 'Pierre',
      email: 'pierre.bernard@universite.fr',
      telephone: '01 45 67 89 12',
      departement: 'Physique',
      statut: 'Inactif',
      dateEmbauche: '2018-11-20',
      specialite: 'Mécanique quantique',
      avatar: 'https://joeschmoe.io/api/v1/3'
    },
    {
      id: 4,
      nom: 'Petit',
      prenom: 'Sophie',
      email: 'sophie.petit@universite.fr',
      telephone: '01 34 56 78 90',
      departement: 'Chimie',
      statut: 'Actif',
      dateEmbauche: '2021-01-10',
      specialite: 'Chimie organique',
      avatar: 'https://joeschmoe.io/api/v1/4'
    }
  ];

  const columns = [
    {
      title: 'Enseignant',
      key: 'enseignant',
      render: (_: any, record: Enseignant) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.avatar} size={40} />
          <div>
            <div className="font-medium">{record.prenom} {record.nom}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Département',
      dataIndex: 'departement',
      key: 'departement',
    },
    {
      title: 'Spécialité',
      dataIndex: 'specialite',
      key: 'specialite',
    },
    {
      title: 'Téléphone',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'Statut',
      key: 'statut',
      render: (_: any, record: Enseignant) => (
        <Tag color={record.statut === 'Actif' ? 'green' : 'red'}>
          {record.statut}
        </Tag>
      ),
    },
    {
      title: 'Date d\'embauche',
      dataIndex: 'dateEmbauche',
      key: 'dateEmbauche',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Enseignant) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view" icon={<EyeOutlined />}>
                Voir détails
              </Menu.Item>
              <Menu.Item key="edit" icon={<EditOutlined />}>
                Modifier
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                Supprimer
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const filteredData = enseignants.filter(enseignant =>
    enseignant.nom.toLowerCase().includes(searchText.toLowerCase()) ||
    enseignant.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
    enseignant.email.toLowerCase().includes(searchText.toLowerCase()) ||
    enseignant.departement.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <PageHeader />
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Liste des Enseignants</h2>
            <p className="text-gray-600 mt-1">Gérez tous les enseignants de l'institution</p>
          </div>
          <Button type="primary" size="large">
            + Ajouter un enseignant
          </Button>
        </div>

        <div className="mb-4">
          <Search
            placeholder="Rechercher un enseignant..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
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
              `${range[0]}-${range[1]} sur ${total} enseignants`,
          }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default Liste;
