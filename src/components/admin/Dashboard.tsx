
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { 
  UserGroupIcon, UsersIcon, AcademicCapIcon, 
  BookOpenIcon, CreditCardIcon, BanknotesIcon,
  PlusCircleIcon, TrashIcon, PencilIcon
} from '@heroicons/react/24/outline';

// Mock data - replace with real data later
const mockTeachers = [
  { id: 1, name: 'João Silva', email: 'joao@escola.com', status: 'ativo' },
  { id: 2, name: 'Maria Santos', email: 'maria@escola.com', status: 'inativo' },
];

const mockParents = [
  { id: 1, name: 'Carlos Pereira', email: 'carlos@email.com', linkedStudents: 2 },
  { id: 2, name: 'Ana Oliveira', email: 'ana@email.com', linkedStudents: 1 },
];

const mockStudents = [
  { id: 1, name: 'Pedro Pereira', grade: '5º ano', track: 'Lógica Básica', parent: 'Carlos Pereira' },
  { id: 2, name: 'Julia Oliveira', grade: '6º ano', track: 'Programação Web', parent: 'Ana Oliveira' },
];

const mockTracks = [
  { id: 1, name: 'Lógica Básica', grade: '5º ano', level: 'Iniciante', active: true },
  { id: 2, name: 'Programação Web', grade: '6º ano', level: 'Intermediário', active: true },
];

const mockPlans = [
  { id: 1, name: 'Individual', price: 89.90, period: 'mensal', discount: 0 },
  { id: 2, name: 'Familiar I', price: 149.90, period: 'mensal', discount: 10 },
];

const mockPayments = [
  { id: 1, parent: 'Carlos Pereira', plan: 'Familiar I', status: 'ativo', date: '2024-01-15' },
  { id: 2, parent: 'Ana Oliveira', plan: 'Individual', status: 'pendente', date: '2024-01-14' },
];

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Estado para formulários de adição/edição
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');

  const showAddForm = (type: string) => {
    setFormType(type);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de salvamento
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-primary-100 p-1 mb-6">
          {[
            { name: 'Professores', icon: UserGroupIcon },
            { name: 'Responsáveis', icon: UsersIcon },
            { name: 'Alunos', icon: AcademicCapIcon },
            { name: 'Trilhas', icon: BookOpenIcon },
            { name: 'Planos', icon: CreditCardIcon },
            { name: 'Pagamentos', icon: BanknotesIcon },
          ].map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `flex items-center space-x-2 w-full rounded-lg py-2.5 px-3 text-sm font-medium leading-5
                ${selected
                  ? 'bg-white text-primary-700 shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-primary-600'
                }`
              }
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* Professores */}
          <Tab.Panel>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Professores</h2>
              <button
                onClick={() => showAddForm('professor')}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Adicionar Professor
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="px-6 py-4">{teacher.name}</td>
                      <td className="px-6 py-4">{teacher.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          teacher.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>

          {/* Responsáveis */}
          <Tab.Panel>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Responsáveis</h2>
              <button
                onClick={() => showAddForm('responsavel')}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Adicionar Responsável
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alunos Vinculados</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockParents.map((parent) => (
                    <tr key={parent.id}>
                      <td className="px-6 py-4">{parent.name}</td>
                      <td className="px-6 py-4">{parent.email}</td>
                      <td className="px-6 py-4">{parent.linkedStudents}</td>
                      <td className="px-6 py-4">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>

          {/* Alunos */}
          <Tab.Panel>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Alunos</h2>
              <button
                onClick={() => showAddForm('aluno')}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Adicionar Aluno
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ano Escolar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trilha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.grade}</td>
                      <td className="px-6 py-4">{student.track}</td>
                      <td className="px-6 py-4">{student.parent}</td>
                      <td className="px-6 py-4">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>

          {/* Trilhas */}
          <Tab.Panel>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Trilhas Educacionais</h2>
              <button
                onClick={() => showAddForm('trilha')}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Adicionar Trilha
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ano Escolar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nível</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockTracks.map((track) => (
                    <tr key={track.id}>
                      <td className="px-6 py-4">{track.name}</td>
                      <td className="px-6 py-4">{track.grade}</td>
                      <td className="px-6 py-4">{track.level}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          track.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {track.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>

          {/* Planos */}
          <Tab.Panel>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Planos de Pagamento</h2>
              <button
                onClick={() => showAddForm('plano')}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Adicionar Plano
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Período</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Desconto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockPlans.map((plan) => (
                    <tr key={plan.id}>
                      <td className="px-6 py-4">{plan.name}</td>
                      <td className="px-6 py-4">R$ {plan.price.toFixed(2)}</td>
                      <td className="px-6 py-4">{plan.period}</td>
                      <td className="px-6 py-4">{plan.discount}%</td>
                      <td className="px-6 py-4">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>

          {/* Pagamentos */}
          <Tab.Panel>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Controle de Pagamentos</h2>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plano</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4">{payment.parent}</td>
                      <td className="px-6 py-4">{payment.plan}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === 'ativo' ? 'bg-green-100 text-green-800' : 
                          payment.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(payment.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Modal de formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {formType === 'professor' && 'Adicionar Professor'}
              {formType === 'responsavel' && 'Adicionar Responsável'}
              {formType === 'aluno' && 'Adicionar Aluno'}
              {formType === 'trilha' && 'Adicionar Trilha'}
              {formType === 'plano' && 'Adicionar Plano'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              {/* Campos específicos para cada tipo de formulário */}
              {['professor', 'responsavel'].includes(formType) && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input type="text" className="w-full p-2 border rounded" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full p-2 border rounded" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Senha</label>
                    <input type="password" className="w-full p-2 border rounded" required />
                  </div>
                </>
              )}

              {formType === 'aluno' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input type="text" className="w-full p-2 border rounded" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Ano Escolar</label>
                    <select className="w-full p-2 border rounded" required>
                      <option value="">Selecione...</option>
                      <option value="5">5º ano</option>
                      <option value="6">6º ano</option>
                      <option value="7">7º ano</option>
                      <option value="8">8º ano</option>
                      <option value="9">9º ano</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Responsável</label>
                    <select className="w-full p-2 border rounded" required>
                      <option value="">Selecione...</option>
                      {mockParents.map(parent => (
                        <option key={parent.id} value={parent.id}>{parent.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {formType === 'trilha' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nome da Trilha</label>
                    <input type="text" className="w-full p-2 border rounded" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <textarea className="w-full p-2 border rounded" rows={3} required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Ano Escolar</label>
                    <select className="w-full p-2 border rounded" required>
                      <option value="">Selecione...</option>
                      <option value="5">5º ano</option>
                      <option value="6">6º ano</option>
                      <option value="7">7º ano</option>
                      <option value="8">8º ano</option>
                      <option value="9">9º ano</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nível</label>
                    <select className="w-full p-2 border rounded" required>
                      <option value="">Selecione...</option>
                      <option value="iniciante">Iniciante</option>
                      <option value="intermediario">Intermediário</option>
                      <option value="avancado">Avançado</option>
                    </select>
                  </div>
                </>
              )}

              {formType === 'plano' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nome do Plano</label>
                    <input type="text" className="w-full p-2 border rounded" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Preço</label>
                    <input type="number" step="0.01" className="w-full p-2 border rounded" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Período</label>
                    <select className="w-full p-2 border rounded" required>
                      <option value="mensal">Mensal</option>
                      <option value="anual">Anual</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Desconto (%)</label>
                    <input type="number" min="0" max="100" className="w-full p-2 border rounded" required />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
