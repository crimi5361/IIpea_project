import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Progress, 
  Table, 
  Tag, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Space, 
  Statistic, 
  Divider,
  Tabs,
  List,
  Avatar,
  Badge,
  Tooltip,
  Alert,
  Timeline,
  Rate
} from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  TrophyOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import PageHeader from '../../Components/PageHeader/PageHeader';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

interface StudentProgress {
  id: string;
  name: string;
  matricule: string;
  level: string;
  department: string;
  overallProgress: number;
  modules: ModuleProgress[];
  evaluations: Evaluation[];
  attendance: number;
  lastUpdate: string;
  status: 'active' | 'warning' | 'critical';
}

interface ModuleProgress {
  id: string;
  name: string;
  progress: number;
  grade: number;
  status: 'completed' | 'in_progress' | 'not_started';
  teacher: string;
  credits: number;
}

interface Evaluation {
  id: string;
  type: 'exam' | 'assignment' | 'project' | 'participation';
  title: string;
  grade: number;
  maxGrade: number;
  date: string;
  feedback: string;
  weight: number;
}

const StudentProgressPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEvaluationModalVisible, setIsEvaluationModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [evaluationForm] = Form.useForm();

  // Mock data
  const students: StudentProgress[] = [
    {
      id: '1',
      name: 'Marie Djabou',
      matricule: '2024-001',
      level: 'L3',
      department: 'Informatique',
      overallProgress: 78,
      attendance: 85,
      lastUpdate: '2024-01-15',
      status: 'active',
      modules: [
        { id: '1', name: 'Programmation Web', progress: 85, grade: 16, status: 'completed', teacher: 'Dr. Koné', credits: 4 },
        { id: '2', name: 'Base de Données', progress: 72, grade: 14, status: 'in_progress', teacher: 'Dr. Traoré', credits: 3 },
        { id: '3', name: 'Réseaux', progress: 65, grade: 12, status: 'in_progress', teacher: 'Dr. Diallo', credits: 3 },
        { id: '4', name: 'Mathématiques', progress: 45, grade: 10, status: 'in_progress', teacher: 'Dr. Ouattara', credits: 2 }
      ],
      evaluations: [
        { id: '1', type: 'exam', title: 'Examen Final Web', grade: 16, maxGrade: 20, date: '2024-01-10', feedback: 'Excellent travail', weight: 60 },
        { id: '2', type: 'assignment', title: 'Projet Base de Données', grade: 14, maxGrade: 20, date: '2024-01-08', feedback: 'Bon travail, quelques améliorations possibles', weight: 30 },
        { id: '3', type: 'participation', title: 'Participation Classe', grade: 18, maxGrade: 20, date: '2024-01-05', feedback: 'Très bonne participation', weight: 10 }
      ]
    },
    {
      id: '2',
      name: 'Ahmed Traoré',
      matricule: '2024-002',
      level: 'L2',
      department: 'Mathématiques',
      overallProgress: 65,
      attendance: 70,
      lastUpdate: '2024-01-14',
      status: 'warning',
      modules: [
        { id: '1', name: 'Analyse Mathématique', progress: 60, grade: 12, status: 'in_progress', teacher: 'Dr. Koné', credits: 4 },
        { id: '2', name: 'Algèbre Linéaire', progress: 55, grade: 11, status: 'in_progress', teacher: 'Dr. Traoré', credits: 3 },
        { id: '3', name: 'Probabilités', progress: 40, grade: 8, status: 'in_progress', teacher: 'Dr. Diallo', credits: 3 }
      ],
      evaluations: [
        { id: '1', type: 'exam', title: 'Examen Analyse', grade: 12, maxGrade: 20, date: '2024-01-12', feedback: 'Besoins d\'amélioration', weight: 60 },
        { id: '2', type: 'assignment', title: 'Devoir Algèbre', grade: 11, maxGrade: 20, date: '2024-01-10', feedback: 'Travail correct', weight: 30 }
      ]
    }
  ];

  const columns = [
    {
      title: 'Étudiant',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: StudentProgress) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">{record.matricule}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Niveau',
      dataIndex: 'level',
      key: 'level',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Département',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Progression',
      dataIndex: 'overallProgress',
      key: 'overallProgress',
      render: (progress: number) => (
        <div>
          <Progress percent={progress} size="small" />
          <div className="text-xs text-gray-500">{progress}%</div>
        </div>
      ),
    },
    {
      title: 'Présence',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (attendance: number) => (
        <div>
          <Progress percent={attendance} size="small" strokeColor={attendance > 80 ? '#52c41a' : attendance > 60 ? '#faad14' : '#f5222d'} />
          <div className="text-xs text-gray-500">{attendance}%</div>
        </div>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          active: 'green',
          warning: 'orange',
          critical: 'red'
        };
        const labels = {
          active: 'Actif',
          warning: 'Attention',
          critical: 'Critique'
        };
        return <Tag color={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: StudentProgress) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Détails
          </Button>
          <Button 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEditProgress(record)}
          >
            Évaluer
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewDetails = (student: StudentProgress) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const handleEditProgress = (student: StudentProgress) => {
    setSelectedStudent(student);
    setIsEvaluationModalVisible(true);
  };

  const handleAddEvaluation = (values: any) => {
    console.log('New evaluation:', values);
    setIsEvaluationModalVisible(false);
    evaluationForm.resetFields();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in_progress': return 'blue';
      case 'not_started': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'not_started': return 'Non commencé';
      default: return 'Inconnu';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return '#52c41a';
    if (grade >= 12) return '#faad14';
    return '#f5222d';
  };

  return (
    <div className="space-y-6">
      <PageHeader />
      
      {/* Statistics Cards */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Étudiants"
              value={students.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Moyenne Progression"
              value={Math.round(students.reduce((acc, s) => acc + s.overallProgress, 0) / students.length)}
              suffix="%"
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Moyenne Présence"
              value={Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}
              suffix="%"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Étudiants Actifs"
              value={students.filter(s => s.status === 'active').length}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Table */}
      <Card title="Progression des Étudiants" extra={
        <Button type="primary" icon={<PlusOutlined />}>
          Ajouter Évaluation
        </Button>
      }>
        <Table 
          columns={columns} 
          dataSource={students} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Student Details Modal */}
      <Modal
        title={`Détails de progression - ${selectedStudent?.name}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1000}
      >
        {selectedStudent && (
          <div className="space-y-6">
            {/* Student Info */}
            <Card>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic title="Progression Globale" value={selectedStudent.overallProgress} suffix="%" />
                </Col>
                <Col span={8}>
                  <Statistic title="Taux de Présence" value={selectedStudent.attendance} suffix="%" />
                </Col>
                <Col span={8}>
                  <Statistic title="Modules Suivis" value={selectedStudent.modules.length} />
                </Col>
              </Row>
            </Card>

            {/* Modules Progress */}
            <Card title="Progression par Module">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Modules" key="1">
                  <div className="space-y-4">
                    {selectedStudent.modules.map(module => (
                      <Card key={module.id} size="small">
                        <Row gutter={16} align="middle">
                          <Col span={8}>
                            <div className="font-medium">{module.name}</div>
                            <div className="text-sm text-gray-500">{module.teacher}</div>
                          </Col>
                          <Col span={4}>
                            <Tag color={getStatusColor(module.status)}>
                              {getStatusLabel(module.status)}
                            </Tag>
                          </Col>
                          <Col span={4}>
                            <div className="text-center">
                              <div className="font-bold" style={{ color: getGradeColor(module.grade) }}>
                                {module.grade}/20
                              </div>
                              <div className="text-xs text-gray-500">{module.credits} crédits</div>
                            </div>
                          </Col>
                          <Col span={8}>
                            <Progress percent={module.progress} size="small" />
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </div>
                </TabPane>
                
                <TabPane tab="Évaluations" key="2">
                  <Timeline>
                    {selectedStudent.evaluations.map(evaluation => (
                      <Timeline.Item 
                        key={evaluation.id}
                        color={evaluation.grade >= 12 ? 'green' : evaluation.grade >= 8 ? 'orange' : 'red'}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{evaluation.title}</div>
                            <div className="text-sm text-gray-500">
                              {evaluation.type === 'exam' ? 'Examen' : 
                               evaluation.type === 'assignment' ? 'Devoir' : 
                               evaluation.type === 'project' ? 'Projet' : 'Participation'}
                            </div>
                            <div className="text-xs text-gray-400">{evaluation.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: getGradeColor(evaluation.grade) }}>
                              {evaluation.grade}/{evaluation.maxGrade}
                            </div>
                            <div className="text-xs text-gray-500">Poids: {evaluation.weight}%</div>
                          </div>
                        </div>
                        {evaluation.feedback && (
                          <div className="mt-2 text-sm text-gray-600">
                            <strong>Feedback:</strong> {evaluation.feedback}
                          </div>
                        )}
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </TabPane>

                <TabPane tab="Graphiques" key="3">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card title="Progression par Module">
                        <div className="space-y-3">
                          {selectedStudent.modules.map(module => (
                            <div key={module.id}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{module.name}</span>
                                <span>{module.progress}%</span>
                              </div>
                              <Progress percent={module.progress} size="small" />
                            </div>
                          ))}
                        </div>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="Notes par Module">
                        <div className="space-y-3">
                          {selectedStudent.modules.map(module => (
                            <div key={module.id}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{module.name}</span>
                                <span style={{ color: getGradeColor(module.grade) }}>
                                  {module.grade}/20
                                </span>
                              </div>
                              <Progress 
                                percent={(module.grade / 20) * 100} 
                                size="small"
                                strokeColor={getGradeColor(module.grade)}
                              />
                            </div>
                          ))}
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </div>
        )}
      </Modal>

      {/* Add Evaluation Modal */}
      <Modal
        title="Ajouter une Évaluation"
        open={isEvaluationModalVisible}
        onCancel={() => setIsEvaluationModalVisible(false)}
        onOk={() => evaluationForm.submit()}
        width={600}
      >
        <Form
          form={evaluationForm}
          layout="vertical"
          onFinish={handleAddEvaluation}
        >
          <Form.Item
            name="student"
            label="Étudiant"
            initialValue={selectedStudent?.name}
          >
            <Input disabled />
          </Form.Item>
          
          <Form.Item
            name="module"
            label="Module"
            rules={[{ required: true, message: 'Veuillez sélectionner un module' }]}
          >
            <Select placeholder="Sélectionner un module">
              {selectedStudent?.modules.map(module => (
                <Option key={module.id} value={module.id}>{module.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="Type d'évaluation"
            rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
          >
            <Select placeholder="Sélectionner le type">
              <Option value="exam">Examen</Option>
              <Option value="assignment">Devoir</Option>
              <Option value="project">Projet</Option>
              <Option value="participation">Participation</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="Titre de l'évaluation"
            rules={[{ required: true, message: 'Veuillez saisir le titre' }]}
          >
            <Input placeholder="Ex: Examen Final, Devoir 1, etc." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="grade"
                label="Note obtenue"
                rules={[{ required: true, message: 'Veuillez saisir la note' }]}
              >
                <Input type="number" min={0} max={20} placeholder="0-20" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxGrade"
                label="Note maximale"
                initialValue={20}
                rules={[{ required: true, message: 'Veuillez saisir la note max' }]}
              >
                <Input type="number" min={1} placeholder="Note max" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="weight"
            label="Poids dans le module (%)"
            rules={[{ required: true, message: 'Veuillez saisir le poids' }]}
          >
            <Input type="number" min={0} max={100} placeholder="0-100" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date d'évaluation"
            rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="feedback"
            label="Feedback/Commentaires"
          >
            <TextArea rows={3} placeholder="Commentaires sur l'évaluation..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentProgressPage;
