import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Button, Modal, Form, Input, message, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface CampusData {
  id: number;
  nom: string;
  localisation: string;
}

const Campus: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [campusData, setCampusData] = useState<CampusData[]>([]);

  const columns: TableColumn<CampusData>[] = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Nom',
      selector: (row) => row.nom,
      sortable: true,
    },
    {
      name: 'Localisation',
      selector: (row) => row.localisation,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <Space size="middle">
          <Tooltip title="Modifier">
            <EditOutlined
              style={{ color: '#1890ff', cursor: 'pointer' }}
              onClick={() => handleEdit(row)}
            />
          </Tooltip>
          <Tooltip title="Supprimer">
            <DeleteOutlined
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => handleDelete(row.id)}
            />
          </Tooltip>
        </Space>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

// 🖊️ Modifier
const handleEdit = (row: CampusData) => {
  form.setFieldsValue(row);
  setIsModalVisible(true);
};

// 🗑️ Supprimer
const handleDelete = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3001/api/campus/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      message.success('Campus supprimé avec succès');
      fetchCampus();
    } else {
      message.error('Erreur lors de la suppression');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    message.error('Erreur serveur');
  }
};





  // 🔁 Charger les campus au démarrage
  const fetchCampus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/campus');
      const data = await response.json();
      setCampusData(data);
    } catch (error) {
      console.error('Erreur lors du chargement des campus', error);
      message.error('Erreur de chargement');
    }
  };

  useEffect(() => {
    fetchCampus();
  }, []);

  // 📨 Ajouter un campus via API
  const handleAddCampus = async (values: Omit<CampusData, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3001/api/campus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Campus ajouté avec succès');
        fetchCampus(); // Recharge les données
        handleCancel();
      } else {
        message.error("Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error('Erreur lors de la requête', error);
      message.error('Erreur réseau');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#B56910]">Liste des Campus</h2>
        <Button type="primary" onClick={showModal}>
          + Ajouter un Campus
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={campusData}
        pagination
        highlightOnHover
        striped
      />

      <Modal
        title="Ajouter un Campus"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleAddCampus}>
          <Form.Item
            label="Nom du campus"
            name="nom"
            rules={[{ required: true, message: 'Veuillez entrer le nom du campus' }]}
          >
            <Input placeholder="Nom du campus" />
          </Form.Item>

          <Form.Item
            label="Localisation"
            name="localisation"
            rules={[{ required: true, message: 'Veuillez entrer la localisation' }]}
          >
            <Input placeholder="Localisation" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Ajouter
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Campus;
