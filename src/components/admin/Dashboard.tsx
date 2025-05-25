import React, { useState, Fragment } from "react"; // Adicionado Fragment
import { Tab, Dialog, Transition } from "@headlessui/react"; // Adicionado Dialog e Transition para o Modal
import {
  UserGroupIcon,
  UsersIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CreditCardIcon,
  BanknotesIcon,
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
  XMarkIcon, // Ícone para fechar
} from "@heroicons/react/24/outline";

// Assumindo que seus hooks exportam funções de criação/atualização também
import { useUsers } from "../../hooks/useUsers";
import { usePlans } from "../../hooks/usePlans";
import { useSubscriptions } from "../../hooks/useSubscriptions";
import { useTracks } from "../../hooks/useTracks";
import { useModules } from "../../hooks/useModules";
// import UserForm from "./UserForm"; // Descomente se for usar componentes separados
// import TrackForm from "./TrackForm"; // Descomente se for usar componentes separados

// --- Tipos (Adapte conforme seus hooks/dados) ---
interface User {
  id: string;
  nome: string;
  email: string;
  tipo_usuario: string;
  ano_escolar?: number;
  responsavel_id?: string;
  // Adicione outros campos se necessário
}
interface Track {
  id: string;
  titulo: string;
  grade: number;
  nivel: string;
  // Adicione outros campos se necessário
}
interface Plan {
  id: string;
  nome: string;
  valor_mensal: number;
  valor_anual: number;
  duracao_dias: number;
  ativo: boolean;
  // Adicione outros campos se necessário
}
interface Subscription {
  id: string;
  users?: { nome: string; email: string }; // Exemplo de dado relacionado
  plans?: { nome: string }; // Exemplo de dado relacionado
  status: string;
  inicio: string;
  fim: string;
  // Adicione outros campos se necessário
}

// --- Componente ---
const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null); // Para edição

  // --- Estado para o formulário de Professor (Exemplo) ---
  const [profName, setProfName] = useState("");
  const [profEmail, setProfEmail] = useState("");
  const [profPassword, setProfPassword] = useState("");

  // --- Hooks de Dados ---
  const {
    users: teachers,
    loading: teachersLoading,
    error: teachersError,
    deleteUser: deleteTeacher,
    createUser, // Assumindo que existe
    updateUser, // Assumindo que existe
  } = useUsers("professor");
  const {
    users: parents,
    loading: parentsLoading,
    error: parentsError,
    deleteUser: deleteParent,
  } = useUsers("responsavel");
  const {
    users: students,
    loading: studentsLoading,
    error: studentsError,
    deleteUser: deleteStudent,
  } = useUsers("aluno");
  const {
    plans,
    loading: plansLoading,
    error: plansError,
    deletePlan,
    createPlan, // Assumindo que existe
  } = usePlans();
  const {
    subscriptions,
    loading: subscriptionsLoading,
    error: subscriptionsError,
  } = useSubscriptions();
  const { tracks, loading: tracksLoading, error: tracksError } = useTracks();
  // const { modules, loading: modulesLoading, error: modulesError } = useModules(); // Descomente se precisar

  // --- Funções de Ação ---
  const openFormModal = (type: string, item: any | null = null) => {
    setFormType(type);
    setSelectedItem(item); // Se item existir, é edição
    setShowForm(true);

    // Se for edição, preencha os campos (Exemplo para professor)
    if (item && type === "professor") {
        setProfName(item.nome);
        setProfEmail(item.email);
        setProfPassword(""); // Senha não deve ser preenchida na edição
    } else {
        // Limpa campos para adição
        setProfName("");
        setProfEmail("");
        setProfPassword("");
    }
    // Adicione lógicas similares para outros tipos
  };

  const closeFormModal = () => {
    setShowForm(false);
    setFormType("");
    setSelectedItem(null);
  };

  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este item?")) return;

    try {
      switch (type) {
        case "professor": await deleteTeacher(id); break;
        case "responsavel": await deleteParent(id); break;
        case "aluno": await deleteStudent(id); break;
        case "plano": await deletePlan(id); break;
        // Adicione casos para trilha e módulo
      }
      alert("Item deletado com sucesso!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Erro ao deletar item.");
    }
  };

  // --- Lógica de Submissão ---
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Submetendo formulário: ${formType}`);

    try {
        switch (formType) {
            case "professor":
                const profData = {
                    nome: profName,
                    email: profEmail,
                    password: profPassword, // CUIDADO: Enviar senha assim não é seguro! Use Supabase Auth.
                    tipo_usuario: 'professor'
                };
                if (selectedItem) {
                    // await updateUser(selectedItem.id, profData); // Chamar função de update
                } else {
                    await createUser(profData); // Chamar função de create
                }
                alert("Professor salvo com sucesso!");
                break;
            // Adicione casos para "responsavel", "aluno", "trilha", "plano"
            default:
                console.warn("Tipo de formulário não reconhecido:", formType);
                break;
        }
        closeFormModal(); // Fecha o modal após sucesso
    } catch(err) {
        console.error("Erro ao salvar:", err);
        alert("Erro ao salvar os dados.");
    }
  };

  // --- Função para Renderizar Tabela (Exemplo Genérico) ---
  const renderTable = (title: string, data: any[], columns: { header: string; accessor: string | ((item: any) => React.ReactNode) }[], type: string, loading: boolean, error: Error | null) => (
    <Tab.Panel key={type}>
        <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
                onClick={() => openFormModal(type)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Adicionar {title.slice(0, -1)} {/* Simples pluralização */}
            </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading && <p className="p-4">Carregando...</p>}
            {error && <p className="p-4 text-red-600">Erro: {error.message}</p>}
            {!loading && !error && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    {col.header}
                                </th>
                            ))}
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data && data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id}>
                                    {columns.map((col) => (
                                        <td key={`${item.id}-${col.header}`} className="px-6 py-4 whitespace-nowrap">
                                            {typeof col.accessor === 'function'
                                                ? col.accessor(item)
                                                : item[col.accessor] || 'N/A'}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => openFormModal(type, item)}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                            title="Editar"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(type, item.id)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Deletar"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                           <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500">
                                    Nenhum dado encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    </Tab.Panel>
  );

  // --- Definições das Colunas ---
  const teacherColumns = [ { header: 'Nome', accessor: 'nome' }, { header: 'Email', accessor: 'email' } ];
  const parentColumns = [ { header: 'Nome', accessor: 'nome' }, { header: 'Email', accessor: 'email' }, /* Adicionar alunos vinculados aqui */ ];
  const studentColumns = [ { header: 'Nome', accessor: 'nome' }, { header: 'Email', accessor: 'email' }, { header: 'Ano Escolar', accessor: 'ano_escolar' } ];
  const trackColumns = [ { header: 'Título', accessor: 'titulo' }, { header: 'Grade', accessor: 'grade' }, { header: 'Nível', accessor: 'nivel' } ];
  const planColumns = [ { header: 'Nome', accessor: 'nome' }, { header: 'Mensal', accessor: (item: Plan) => `R$ ${item.valor_mensal?.toFixed(2)}` }, { header: 'Anual', accessor: (item: Plan) => `R$ ${item.valor_anual?.toFixed(2)}` }, { header: 'Ativo', accessor: (item: Plan) => item.ativo ? 'Sim' : 'Não' } ];
  const subscriptionColumns = [
      { header: 'Usuário', accessor: (item: Subscription) => item.users?.nome || 'N/A' },
      { header: 'Plano', accessor: (item: Subscription) => item.plans?.nome || 'N/A' },
      { header: 'Status', accessor: 'status' },
      { header: 'Início', accessor: (item: Subscription) => item.inicio ? new Date(item.inicio).toLocaleDateString("pt-BR") : '—' },
      { header: 'Fim', accessor: (item: Subscription) => item.fim ? new Date(item.fim).toLocaleDateString("pt-BR") : '—' },
  ];


  // --- Renderização ---
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-100 p-1 mb-6 overflow-x-auto"> {/* Adicionado overflow */}
          {[
            { name: "Professores", icon: UserGroupIcon, type: "professor", data: teachers, cols: teacherColumns, loading: teachersLoading, error: teachersError },
            { name: "Responsáveis", icon: UsersIcon, type: "responsavel", data: parents, cols: parentColumns, loading: parentsLoading, error: parentsError },
            { name: "Alunos", icon: AcademicCapIcon, type: "aluno", data: students, cols: studentColumns, loading: studentsLoading, error: studentsError },
            { name: "Trilhas", icon: BookOpenIcon, type: "trilha", data: tracks, cols: trackColumns, loading: tracksLoading, error: tracksError },
            { name: "Planos", icon: CreditCardIcon, type: "plano", data: plans, cols: planColumns, loading: plansLoading, error: plansError },
            { name: "Pagamentos", icon: BanknotesIcon, type: "pagamento", data: subscriptions, cols: subscriptionColumns, loading: subscriptionsLoading, error: subscriptionsError },
          ].map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `flex items-center space-x-2 w-full rounded-lg py-2.5 px-3 text-sm font-medium leading-5 whitespace-nowrap
                ${selected ? "bg-white text-blue-700 shadow" : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-600"}`
              }
            >
              <tab.icon className="h-5 w-5 flex-shrink-0" /> {/* Adicionado flex-shrink-0 */}
              <span>{tab.name}</span>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
            {renderTable("Professores", teachers, teacherColumns, "professor", teachersLoading, teachersError)}
            {renderTable("Responsáveis", parents, parentColumns, "responsavel", parentsLoading, parentsError)}
            {renderTable("Alunos", students, studentColumns, "aluno", studentsLoading, studentsError)}
            {renderTable("Trilhas", tracks, trackColumns, "trilha", tracksLoading, tracksError)}
            {renderTable("Planos", plans, planColumns, "plano", plansLoading, plansError)}
            {renderTable("Pagamentos", subscriptions, subscriptionColumns, "pagamento", subscriptionsLoading, subscriptionsError)}
            {/* Pagamentos não tem botão "Adicionar" geralmente, pode ajustar a função renderTable para isso */}
        </Tab.Panels>
      </Tab.Group>

      {/* --- Modal de Formulário --- */}
      <Transition appear show={showForm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeFormModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                    <span>
                       {selectedItem ? 'Editar' : 'Adicionar'} {
                           formType === "professor" ? "Professor" :
                           formType === "responsavel" ? "Responsável" :
                           formType === "aluno" ? "Aluno" :
                           formType === "trilha" ? "Trilha" :
                           formType === "plano" ? "Plano" : ''
                       }
                    </span>
                     <button onClick={closeFormModal} className="text-gray-400 hover:text-gray-600">
                         <XMarkIcon className="h-6 w-6" />
                     </button>
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="mt-4">
                    {/* --- Renderização Condicional dos Campos --- */}

                    {/* Exemplo para Professor */}
                    {formType === "professor" && (
                      <>
                        <div className="mb-4">
                          <label htmlFor="profName" className="block text-sm font-medium mb-1">Nome</label>
                          <input id="profName" type="text" value={profName} onChange={(e) => setProfName(e.target.value)} className="w-full p-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                           <label htmlFor="profEmail" className="block text-sm font-medium mb-1">Email</label>
                           <input id="profEmail" type="email" value={profEmail} onChange={(e) => setProfEmail(e.target.value)} className="w-full p-2 border rounded" required />
                        </div>
                        {!selectedItem && ( // Só mostra senha ao criar
                            <div className="mb-4">
                                <label htmlFor="profPassword" className="block text-sm font-medium mb-1">Senha</label>
                                <input id="profPassword" type="password" value={profPassword} onChange={(e) => setProfPassword(e.target.value)} className="w-full p-2 border rounded" required />
                            </div>
                        )}
                      </>
                    )}

                    {/* Exemplo para Responsável (similar ao professor) */}
                    {(formType === "responsavel") && (
                         <p>Formulário de Responsável aqui...</p>
                         // Adicione os campos necessários, usando useState
                    )}

                    {/* Exemplo para Aluno */}
                    {formType === "aluno" && (
                        <>
                           <p>Formulário de Aluno aqui...</p>
                           {/* Adicione os campos Nome, Ano Escolar */}
                           <div className="mb-4">
                               <label className="block text-sm font-medium mb-1">Responsável</label>
                               <select className="w-full p-2 border rounded" required>
                                   <option value="">Selecione...</option>
                                   {parentsLoading && <option disabled>Carregando...</option>}
                                   {parents && parents.map((parent) => (
                                       <option key={parent.id} value={parent.id}>
                                           {parent.nome} ({parent.email})
                                       </option>
                                   ))}
                               </select>
                           </div>
                        </>
                    )}

                    {/* Adicione os formulários para Trilha e Plano */}
                    {formType === "trilha" && <p>Formulário de Trilha aqui...</p>}
                    {formType === "plano" && <p>Formulário de Plano aqui...</p>}


                    {/* --- Botões --- */}
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={closeFormModal}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AdminDashboard;