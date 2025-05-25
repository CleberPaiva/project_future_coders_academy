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

    // --- NOVOS ESTADOS PARA O FORMULÁRIO DE ALUNO ---
    const [alunoNome, setAlunoNome] = useState("");
    const [alunoEmail, setAlunoEmail] = useState(""); // Email para o aluno, se ele for ter login próprio
    const [alunoSenha, setAlunoSenha] = useState(""); // Senha inicial para o aluno
    const [alunoAnoEscolar, setAlunoAnoEscolar] = useState<number | string>(""); // Pode ser string para o <select>
    const [alunoResponsavelId, setAlunoResponsavelId] = useState<string>("");

    // --- NOVOS ESTADOS PARA O FORMULÁRIO DE PLANO ---
    const [planoNome, setPlanoNome] = useState("");
    const [planoDescricao, setPlanoDescricao] = useState("");
    const [planoValorMensal, setPlanoValorMensal] = useState<string>(""); // Usar string para input number
    const [planoValorAnual, setPlanoValorAnual] = useState<string>(""); // Usar string para input number
    const [planoDuracaoDias, setPlanoDuracaoDias] = useState<string>(""); // Usar string para input number
    const [planoAtivo, setPlanoAtivo] = useState(true); // Booleano, default true

    // --- Hooks de Dados ---
    const {
        users: teachers,
        loading: teachersLoading,
        error: teachersError,
        deleteUser: deleteTeacher,
        signUpUser,
        updateUser,
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
        if (!window.confirm("Tem certeza que deseja deletar este item?"))
            return;

        try {
            switch (type) {
                case "professor":
                    await deleteTeacher(id);
                    break;
                case "responsavel":
                    await deleteParent(id);
                    break;
                case "aluno":
                    await deleteStudent(id);
                    break;
                case "plano":
                    await deletePlan(id);
                    break;
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
        console.log(`Submetendo formulário: ${formType}`); // Isso está funcionando!

        try {
            switch (formType) {
                case "professor":
                    if (selectedItem) {
                        // Lógica de Edição (implementar depois)
                        console.log("Atualização...");
                        await updateUser(selectedItem.id, {
                            nome: profName,
                            email: profEmail,
                        }); // Exemplo de update
                        alert("Professor atualizado com sucesso!");
                    } else {
                        // Lógica de Criação (USANDO signUpUser)
                        if (!signUpUser) {
                            console.error(
                                "ERRO FATAL: A função signUpUser não foi encontrada!",
                            );
                            alert("Erro interno, contate o suporte.");
                            return; // Para a execução
                        }
                        // ESTA é a chamada correta que substitui a linha 179
                        await signUpUser(profEmail, profPassword, {
                            nome: profName,
                            tipo_usuario: "professor",
                        });
                        alert("Professor cadastrado com sucesso!");
                    }
                    break; // Fim do case "professor"
                case "responsavel":
                    if (selectedItem) {
                        // Lógica de Edição para Responsável
                        await updateUser(selectedItem.id, {
                            nome: profName,
                            email: profEmail,
                        }); // Exemplo, assumindo que profName/profEmail são usados
                        alert("Responsável atualizado com sucesso!");
                    } else {
                        // Lógica de Criação para Responsável
                        if (!signUpUser) {
                            console.error(
                                "ERRO FATAL: A função signUpUser não foi encontrada!",
                            );
                            alert("Erro interno, contate o suporte.");
                            return;
                        }
                        await signUpUser(profEmail, profPassword, {
                            // Assumindo que profName, profEmail, profPassword são usados para o formulário
                            nome: profName,
                            tipo_usuario: "responsavel", // Apenas muda o tipo aqui
                        });
                        alert(
                            "Responsável cadastrado com sucesso! Verifique o e-mail para confirmação, se aplicável.",
                        );
                    }
                    break;
                case "aluno":
                    if (!selectedItem) {
                        // Criando novo aluno
                        if (!signUpUser) {
                            console.error(
                                "ERRO FATAL: A função signUpUser não foi importada ou definida no hook useUsers!",
                            );
                            alert(
                                "Erro interno: A função de cadastro não está disponível.",
                            );
                            return;
                        }

                        // Log para verificar os valores dos estados ANTES da validação
                        console.log(
                            "[Dashboard.tsx handleSubmit - Aluno] Valores dos estados ANTES da validação:",
                            {
                                nome: alunoNome,
                                email: alunoEmail,
                                senha: alunoSenha, // Não faça .trim() na senha para checar existência
                                anoEscolar: alunoAnoEscolar,
                                responsavelId: alunoResponsavelId,
                            },
                        );

                        // Validação dos campos
                        if (
                            !alunoNome.trim() ||
                            !alunoEmail.trim() ||
                            !alunoSenha || // Senha não deve ser vazia
                            !alunoAnoEscolar || // anoEscolar não deve ser vazio (value="" do select)
                            !alunoResponsavelId // responsavelId não deve ser vazio (value="" do select)
                        ) {
                            alert(
                                "Por favor, preencha todos os campos obrigatórios para o aluno.",
                            );
                            return; // Interrompe se algum campo estiver vazio
                        }

                        // Se passou na validação, monta o objeto de dados adicionais
                        const additionalDataParaAluno = {
                            nome: alunoNome.trim(),
                            tipo_usuario: "aluno",
                            ano_escolar: parseInt(
                                alunoAnoEscolar as string,
                                10,
                            ),
                            responsavel_id: alunoResponsavelId,
                        };

                        // Log dos dados que efetivamente serão enviados para a função signUpUser
                        console.log(
                            "[Dashboard.tsx handleSubmit - Aluno] Dados que serão enviados para signUpUser:",
                            {
                                email: alunoEmail.trim(),
                                // NUNCA logue a senha em produção. Para depuração, tenha cuidado.
                                // senha: alunoSenha, // Descomente APENAS para depuração local e remova depois.
                                additionalData: additionalDataParaAluno,
                            },
                        );

                        await signUpUser(
                            alunoEmail.trim(),
                            alunoSenha, // A senha é passada diretamente
                            additionalDataParaAluno,
                        );
                        alert("Aluno cadastrado com sucesso!");
                    } else {
                        // Editando aluno existente
                        if (!updateUser) {
                            console.error(
                                "ERRO FATAL: A função updateUser não foi importada ou definida no hook useUsers!",
                            );
                            alert(
                                "Erro interno: A função de atualização não está disponível.",
                            );
                            return;
                        }

                        // Log para verificar os valores dos estados ANTES da validação para UPDATE
                        console.log(
                            "[Dashboard.tsx handleSubmit - Aluno UPDATE] Valores dos estados ANTES da validação:",
                            {
                                id: selectedItem.id,
                                nome: alunoNome,
                                email: alunoEmail,
                                anoEscolar: alunoAnoEscolar,
                                responsavelId: alunoResponsavelId,
                            },
                        );

                        // Validação para atualização (senha não é obrigatória aqui)
                        if (
                            !alunoNome.trim() ||
                            !alunoEmail.trim() ||
                            !alunoAnoEscolar ||
                            !alunoResponsavelId
                        ) {
                            alert(
                                "Por favor, preencha todos os campos obrigatórios para atualizar o aluno.",
                            );
                            return;
                        }

                        const dadosAtualizadosAluno = {
                            nome: alunoNome.trim(),
                            email: alunoEmail.trim(), // Se o email do aluno puder ser atualizado
                            ano_escolar: parseInt(
                                alunoAnoEscolar as string,
                                10,
                            ),
                            responsavel_id: alunoResponsavelId,
                            // Não atualizamos tipo_usuario aqui.
                            // A atualização de senha deve ser um processo separado e seguro.
                        };

                        console.log(
                            "[Dashboard.tsx handleSubmit - Aluno UPDATE] Dados que serão enviados para updateUser:",
                            dadosAtualizadosAluno,
                        );

                        await updateUser(
                            selectedItem.id,
                            dadosAtualizadosAluno,
                        );
                        alert("Aluno atualizado com sucesso!");
                    }
                    break;
                case "plano": // <<<<<<<<<<<<<<<<<<<< NOVO CASE AQUI
                    if (
                        !createPlan /* && !updatePlan - se for implementar edição */
                    ) {
                        console.error(
                            "ERRO: createPlan (ou updatePlan) não foi importado ou definido no hook usePlans!",
                        );
                        alert(
                            "Erro interno: A função de gerenciamento de planos não está disponível.",
                        );
                        return;
                    }

                    const dadosDoPlano = {
                        nome: planoNome.trim(),
                        descricao: planoDescricao.trim(),
                        valor_mensal: parseFloat(planoValorMensal),
                        valor_anual: parseFloat(planoValorAnual),
                        duracao_dias: parseInt(planoDuracaoDias, 10),
                        ativo: planoAtivo,
                    };

                    // Validação básica
                    if (
                        !dadosDoPlano.nome ||
                        isNaN(dadosDoPlano.valor_mensal) ||
                        isNaN(dadosDoPlano.valor_anual) ||
                        isNaN(dadosDoPlano.duracao_dias)
                    ) {
                        alert(
                            "Por favor, preencha todos os campos obrigatórios do plano com valores válidos.",
                        );
                        return;
                    }

                    console.log(
                        "[Dashboard.tsx handleSubmit - Plano] Dados que serão enviados:",
                        dadosDoPlano,
                    );

                    if (selectedItem) {
                        // Editando plano existente
                        // await updatePlan(selectedItem.id, dadosDoPlano); // Você precisaria de updatePlan
                        alert(
                            "Plano atualizado com sucesso! (Lógica de update a ser implementada no hook)",
                        );
                    } else {
                        // Criando novo plano
                        await createPlan(dadosDoPlano);
                        alert("Plano cadastrado com sucesso!");
                    }
                    break;
                // ... Adicione seus outros cases aqui ...

                default:
                    console.warn(
                        "Tipo de formulário não reconhecido:",
                        formType,
                    );
                    break;
            }
            closeFormModal(); // Fecha o modal após sucesso
        } catch (err) {
            // O erro que você está vendo AGORA acontece ANTES de chegar aqui.
            // Este catch pegará erros DENTRO de signUpUser se eles acontecerem.
            console.error("Erro ao salvar:", err); // <<<<<<<< O erro que você viu antes de me dar o detalhe.
            alert("Erro ao salvar os dados.");
        }
    };

    // --- Função para Renderizar Tabela (Exemplo Genérico) ---
    const renderTable = (
        title: string,
        data: any[],
        columns: {
            header: string;
            accessor: string | ((item: any) => React.ReactNode);
        }[],
        type: string,
        loading: boolean,
        error: Error | null,
    ) => (
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
                {error && (
                    <p className="p-4 text-red-600">Erro: {error.message}</p>
                )}
                {!loading && !error && (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.header}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                    >
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
                                            <td
                                                key={`${item.id}-${col.header}`}
                                                className="px-6 py-4 whitespace-nowrap"
                                            >
                                                {typeof col.accessor ===
                                                "function"
                                                    ? col.accessor(item)
                                                    : item[col.accessor] ||
                                                      "N/A"}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() =>
                                                    openFormModal(type, item)
                                                }
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                                title="Editar"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(type, item.id)
                                                }
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
                                    <td
                                        colSpan={columns.length + 1}
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
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
    const teacherColumns = [
        { header: "Nome", accessor: "nome" },
        { header: "Email", accessor: "email" },
    ];
    const parentColumns = [
        { header: "Nome", accessor: "nome" },
        {
            header: "Email",
            accessor: "email",
        } /* Adicionar alunos vinculados aqui */,
    ];
    const studentColumns = [
        { header: "Nome", accessor: "nome" },
        { header: "Email", accessor: "email" },
        { header: "Ano Escolar", accessor: "ano_escolar" },
    ];
    const trackColumns = [
        { header: "Título", accessor: "titulo" },
        { header: "Grade", accessor: "grade" },
        { header: "Nível", accessor: "nivel" },
    ];
    const planColumns = [
        { header: "Nome", accessor: "nome" },
        {
            header: "Mensal",
            accessor: (item: Plan) => `R$ ${item.valor_mensal?.toFixed(2)}`,
        },
        {
            header: "Anual",
            accessor: (item: Plan) => `R$ ${item.valor_anual?.toFixed(2)}`,
        },
        {
            header: "Ativo",
            accessor: (item: Plan) => (item.ativo ? "Sim" : "Não"),
        },
    ];
    const subscriptionColumns = [
        {
            header: "Usuário",
            accessor: (item: Subscription) => item.users?.nome || "N/A",
        },
        {
            header: "Plano",
            accessor: (item: Subscription) => item.plans?.nome || "N/A",
        },
        { header: "Status", accessor: "status" },
        {
            header: "Início",
            accessor: (item: Subscription) =>
                item.inicio
                    ? new Date(item.inicio).toLocaleDateString("pt-BR")
                    : "—",
        },
        {
            header: "Fim",
            accessor: (item: Subscription) =>
                item.fim ? new Date(item.fim).toLocaleDateString("pt-BR") : "—",
        },
    ];

    // --- Renderização ---
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>

            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-100 p-1 mb-6 overflow-x-auto">
                    {" "}
                    {/* Adicionado overflow */}
                    {[
                        {
                            name: "Professores",
                            icon: UserGroupIcon,
                            type: "professor",
                            data: teachers,
                            cols: teacherColumns,
                            loading: teachersLoading,
                            error: teachersError,
                        },
                        {
                            name: "Responsáveis",
                            icon: UsersIcon,
                            type: "responsavel",
                            data: parents,
                            cols: parentColumns,
                            loading: parentsLoading,
                            error: parentsError,
                        },
                        {
                            name: "Alunos",
                            icon: AcademicCapIcon,
                            type: "aluno",
                            data: students,
                            cols: studentColumns,
                            loading: studentsLoading,
                            error: studentsError,
                        },
                        {
                            name: "Trilhas",
                            icon: BookOpenIcon,
                            type: "trilha",
                            data: tracks,
                            cols: trackColumns,
                            loading: tracksLoading,
                            error: tracksError,
                        },
                        {
                            name: "Planos",
                            icon: CreditCardIcon,
                            type: "plano",
                            data: plans,
                            cols: planColumns,
                            loading: plansLoading,
                            error: plansError,
                        },
                        {
                            name: "Pagamentos",
                            icon: BanknotesIcon,
                            type: "pagamento",
                            data: subscriptions,
                            cols: subscriptionColumns,
                            loading: subscriptionsLoading,
                            error: subscriptionsError,
                        },
                    ].map((tab) => (
                        <Tab
                            key={tab.name}
                            className={({ selected }) =>
                                `flex items-center space-x-2 w-full rounded-lg py-2.5 px-3 text-sm font-medium leading-5 whitespace-nowrap
                ${selected ? "bg-white text-blue-700 shadow" : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-600"}`
                            }
                        >
                            <tab.icon className="h-5 w-5 flex-shrink-0" />{" "}
                            {/* Adicionado flex-shrink-0 */}
                            <span>{tab.name}</span>
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    {renderTable(
                        "Professores",
                        teachers,
                        teacherColumns,
                        "professor",
                        teachersLoading,
                        teachersError,
                    )}
                    {renderTable(
                        "Responsáveis",
                        parents,
                        parentColumns,
                        "responsavel",
                        parentsLoading,
                        parentsError,
                    )}
                    {renderTable(
                        "Alunos",
                        students,
                        studentColumns,
                        "aluno",
                        studentsLoading,
                        studentsError,
                    )}
                    {renderTable(
                        "Trilhas",
                        tracks,
                        trackColumns,
                        "trilha",
                        tracksLoading,
                        tracksError,
                    )}
                    {renderTable(
                        "Planos",
                        plans,
                        planColumns,
                        "plano",
                        plansLoading,
                        plansError,
                    )}
                    {renderTable(
                        "Pagamentos",
                        subscriptions,
                        subscriptionColumns,
                        "pagamento",
                        subscriptionsLoading,
                        subscriptionsError,
                    )}
                    {/* Pagamentos não tem botão "Adicionar" geralmente, pode ajustar a função renderTable para isso */}
                </Tab.Panels>
            </Tab.Group>

            {/* --- Modal de Formulário --- */}
            <Transition appear show={showForm} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeFormModal}
                >
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
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                                    >
                                        <span>
                                            {selectedItem
                                                ? "Editar"
                                                : "Adicionar"}{" "}
                                            {formType === "professor"
                                                ? "Professor"
                                                : formType === "responsavel"
                                                  ? "Responsável"
                                                  : formType === "aluno"
                                                    ? "Aluno"
                                                    : formType === "trilha"
                                                      ? "Trilha"
                                                      : formType === "plano"
                                                        ? "Plano"
                                                        : ""}
                                        </span>
                                        <button
                                            onClick={closeFormModal}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </Dialog.Title>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-4"
                                    >
                                        {/* --- Renderização Condicional dos Campos --- */}

                                        {/* Exemplo para Professor */}
                                        {formType === "professor" && (
                                            <>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="profName"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Nome
                                                    </label>
                                                    <input
                                                        id="profName"
                                                        type="text"
                                                        value={profName}
                                                        onChange={(e) =>
                                                            setProfName(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="profEmail"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        id="profEmail"
                                                        type="email"
                                                        value={profEmail}
                                                        onChange={(e) =>
                                                            setProfEmail(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                                {!selectedItem && ( // Só mostra senha ao criar
                                                    <div className="mb-4">
                                                        <label
                                                            htmlFor="profPassword"
                                                            className="block text-sm font-medium mb-1"
                                                        >
                                                            Senha
                                                        </label>
                                                        <input
                                                            id="profPassword"
                                                            type="password"
                                                            value={profPassword}
                                                            onChange={(e) =>
                                                                setProfPassword(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full p-2 border rounded"
                                                            required
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* Exemplo para Responsável (similar ao professor) */}
                                        {formType === "responsavel" && (
                                            <>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="responsavelName"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Nome do Responsável
                                                    </label>
                                                    <input
                                                        id="responsavelName" // Pode usar um ID diferente se preferir
                                                        type="text"
                                                        value={profName} // Ainda usa o estado profName
                                                        onChange={(e) =>
                                                            setProfName(
                                                                e.target.value,
                                                            )
                                                        } // Ainda usa setProfName
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="responsavelEmail"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Email do Responsável
                                                    </label>
                                                    <input
                                                        id="responsavelEmail"
                                                        type="email"
                                                        value={profEmail} // Ainda usa o estado profEmail
                                                        onChange={(e) =>
                                                            setProfEmail(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                                {!selectedItem && ( // Só mostra senha ao criar
                                                    <div className="mb-4">
                                                        <label
                                                            htmlFor="responsavelPassword"
                                                            className="block text-sm font-medium mb-1"
                                                        >
                                                            Senha do Responsável
                                                        </label>
                                                        <input
                                                            id="responsavelPassword"
                                                            type="password"
                                                            value={profPassword} // Ainda usa o estado profPassword
                                                            onChange={(e) =>
                                                                setProfPassword(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full p-2 border rounded"
                                                            required={
                                                                !selectedItem
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                {/* Se o responsável tiver campos ÚNICOS que o professor não tem,
                                                    adicione-os aqui. Por exemplo:
                                                <div className="mb-4">
                                                    <label htmlFor="responsavelTelefone">Telefone do Responsável</label>
                                                    <input id="responsavelTelefone" type="tel" ... />
                                                </div>
                                                Nesse caso, você precisaria de um useState para o telefone.
                                                */}
                                            </>
                                        )}

                                        {/* Exemplo para Aluno */}
                                        {formType === "aluno" && (
                                            <>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="alunoNome"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Nome do Aluno
                                                    </label>
                                                    <input
                                                        id="alunoNome"
                                                        type="text"
                                                        value={alunoNome}
                                                        onChange={(e) =>
                                                            setAlunoNome(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="alunoEmail"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Email do Aluno (para
                                                        login)
                                                    </label>
                                                    <input
                                                        id="alunoEmail"
                                                        type="email"
                                                        value={alunoEmail}
                                                        onChange={(e) =>
                                                            setAlunoEmail(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                                {!selectedItem && ( // Só mostra e exige senha ao criar
                                                    <div className="mb-4">
                                                        <label
                                                            htmlFor="alunoSenha"
                                                            className="block text-sm font-medium mb-1"
                                                        >
                                                            Senha Inicial para o
                                                            Aluno
                                                        </label>
                                                        <input
                                                            id="alunoSenha"
                                                            type="password"
                                                            value={alunoSenha}
                                                            onChange={(e) =>
                                                                setAlunoSenha(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full p-2 border rounded"
                                                            required={
                                                                !selectedItem
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="alunoAnoEscolar"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Ano Escolar
                                                    </label>
                                                    <select
                                                        id="alunoAnoEscolar"
                                                        value={alunoAnoEscolar}
                                                        onChange={(e) =>
                                                            setAlunoAnoEscolar(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    >
                                                        <option value="">
                                                            Selecione...
                                                        </option>
                                                        <option value="1">
                                                            1º ano
                                                        </option>
                                                        <option value="2">
                                                            2º ano
                                                        </option>
                                                        <option value="3">
                                                            3º ano
                                                        </option>
                                                        <option value="4">
                                                            4º ano
                                                        </option>
                                                        <option value="5">
                                                            5º ano
                                                        </option>
                                                        <option value="5">
                                                            6º ano
                                                        </option>
                                                        <option value="5">
                                                            7º ano
                                                        </option>
                                                        <option value="5">
                                                            8º ano
                                                        </option>
                                                        <option value="5">
                                                            9º ano
                                                        </option>

                                                        {/* Adicione mais anos conforme necessário */}
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="alunoResponsavelId"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Responsável
                                                    </label>
                                                    <select
                                                        id="alunoResponsavelId"
                                                        className="w-full p-2 border rounded"
                                                        value={
                                                            alunoResponsavelId
                                                        }
                                                        onChange={(e) =>
                                                            setAlunoResponsavelId(
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option value="">
                                                            Selecione...
                                                        </option>
                                                        {parentsLoading && (
                                                            <option disabled>
                                                                Carregando...
                                                            </option>
                                                        )}
                                                        {parents &&
                                                            parents.map(
                                                                (parent) => (
                                                                    <option
                                                                        key={
                                                                            parent.id
                                                                        }
                                                                        value={
                                                                            parent.id
                                                                        }
                                                                    >
                                                                        {
                                                                            parent.nome
                                                                        }{" "}
                                                                        (
                                                                        {
                                                                            parent.email
                                                                        }
                                                                        )
                                                                    </option>
                                                                ),
                                                            )}
                                                    </select>
                                                </div>
                                            </>
                                        )}

                                        {/* Adicione os formulários para Trilha e Plano */}
                                        {formType === "trilha" && (
                                            <p>Formulário de Trilha aqui...</p>
                                        )}
                                        {/* --- Formulário para Plano --- */}
                                        {formType === "plano" && (
                                            <>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="planoNome"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Nome do Plano
                                                    </label>
                                                    <input
                                                        id="planoNome"
                                                        type="text"
                                                        value={planoNome}
                                                        onChange={(e) =>
                                                            setPlanoNome(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="planoDescricao"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Descrição
                                                    </label>
                                                    <textarea
                                                        id="planoDescricao"
                                                        value={planoDescricao}
                                                        onChange={(e) =>
                                                            setPlanoDescricao(
                                                                e.target.value,
                                                            )
                                                        }
                                                        rows={3}
                                                        className="w-full p-2 border rounded"
                                                    ></textarea>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label
                                                            htmlFor="planoValorMensal"
                                                            className="block text-sm font-medium mb-1"
                                                        >
                                                            Valor Mensal (R$)
                                                        </label>
                                                        <input
                                                            id="planoValorMensal"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            value={
                                                                planoValorMensal
                                                            }
                                                            onChange={(e) =>
                                                                setPlanoValorMensal(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full p-2 border rounded"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="planoValorAnual"
                                                            className="block text-sm font-medium mb-1"
                                                        >
                                                            Valor Anual (R$)
                                                        </label>
                                                        <input
                                                            id="planoValorAnual"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            value={
                                                                planoValorAnual
                                                            }
                                                            onChange={(e) =>
                                                                setPlanoValorAnual(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full p-2 border rounded"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="planoDuracaoDias"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Duração do Plano (dias)
                                                    </label>
                                                    <input
                                                        id="planoDuracaoDias"
                                                        type="number"
                                                        step="1"
                                                        min="1"
                                                        value={planoDuracaoDias}
                                                        onChange={(e) =>
                                                            setPlanoDuracaoDias(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="planoAtivo"
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            id="planoAtivo"
                                                            type="checkbox"
                                                            checked={planoAtivo}
                                                            onChange={(e) =>
                                                                setPlanoAtivo(
                                                                    e.target
                                                                        .checked,
                                                                )
                                                            }
                                                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm font-medium">
                                                            Plano Ativo
                                                        </span>
                                                    </label>
                                                </div>
                                            </>
                                        )}

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
