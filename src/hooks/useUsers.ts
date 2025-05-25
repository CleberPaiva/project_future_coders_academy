import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase"; // Sua importação do cliente Supabase
import { User } from "../types/supabase"; // Seu tipo User

// Se a interface User não estiver definida em ../types/supabase, você pode definir aqui:
// interface User {
//   id: string;
//   nome: string;
//   email: string;
//   tipo_usuario: string;
//   ano_escolar?: number; // Adicione outros campos conforme sua tabela 'users'
//   responsavel_id?: string;
//   criado_em: string;
// }

export function useUsers(userType?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    console.log(
      `[useUsers] fetchUsers: Iniciando busca para tipo "${userType || "todos"}"`,
    );
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from("users").select("*");
      if (userType) {
        console.log(
          `[useUsers] fetchUsers: Aplicando filtro tipo_usuario = ${userType}`,
        );
        query = query.eq("tipo_usuario", userType);
      }
      console.log("[useUsers] fetchUsers: Executando query...");
      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error(
          "[useUsers] fetchUsers: Erro da query Supabase:",
          fetchError,
        );
        throw fetchError;
      }
      console.log("[useUsers] fetchUsers: Dados recebidos:", data);
      setUsers(data || []);
    } catch (err: any) {
      console.error("[useUsers] fetchUsers: Erro capturado no catch:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log("[useUsers] fetchUsers: Finalizado.");
    }
  }, [userType]);

  useEffect(() => {
    console.log(
      "[useUsers] useEffect: Chamando fetchUsers devido à mudança em fetchUsers (ou no mount).",
    );
    fetchUsers();
  }, [fetchUsers]);

  /**
   * Registra um novo usuário usando Supabase Auth.
   * @param {string} email - O email do novo usuário.
   * @param {string} password - A senha do novo usuário.
   * @param {object} additionalData - Dados extras como nome, tipo_usuario.
   * @returns {Promise<object|null>} O objeto de usuário do Supabase Auth ou null em caso de erro.
   */
  const signUpUser = async (
    email: string,
    password: string,
    additionalData: { nome: string; tipo_usuario: string; [key: string]: any },
  ) => {
    console.log(
      "[useUsers] signUpUser: Iniciando para email:",
      email,
      "Dados adicionais:",
      additionalData,
    );
    setLoading(true);
    setError(null);
    try {
      console.log("[useUsers] signUpUser: Chamando supabase.auth.signUp...");
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: additionalData,
        },
      });

      if (signUpError) {
        console.error(
          "[useUsers] signUpUser: Erro DETALHADO do Supabase Auth:",
          "\nMensagem:",
          signUpError.message, // Tenta pegar a mensagem
          "\nObjeto Completo:",
          JSON.stringify(signUpError, null, 2), // Converte todo o objeto para string
        );
        throw signUpError;
      }

      console.log("[useUsers] signUpUser: Usuário criado no Auth:", data.user);
      console.log(
        "[useUsers] signUpUser: Chamando fetchUsers para atualizar a lista...",
      );
      await fetchUsers();
      console.log("[useUsers] signUpUser: Finalizado com sucesso.");
      return data.user;
    } catch (err: any) {
        console.error(
          "[useUsers] signUpUser: Erro DETALHADO capturado no catch:",
          "\nMensagem:", err.message, // Tenta pegar a mensagem
          "\nObjeto Completo:", JSON.stringify(err, null, 2) // Converte todo o objeto para string
        );
        setError(err.message || 'Erro desconhecido no signUp');
        throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    console.log(
      `[useUsers] updateUser: Iniciando para ID "${id}" com atualizações:`,
      updates,
    );
    setLoading(true);
    setError(null);
    try {
      console.log(
        "[useUsers] updateUser: Chamando supabase.from('users').update...",
      );
      const { data, error: updateError } = await supabase
        .from("users")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        console.error(
          "[useUsers] updateUser: Erro da query Supabase:",
          updateError,
        );
        throw updateError;
      }
      console.log("[useUsers] updateUser: Usuário atualizado:", data);
      setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
      console.log("[useUsers] updateUser: Finalizado com sucesso.");
      return data;
    } catch (err: any) {
      console.error("[useUsers] updateUser: Erro capturado no catch:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    console.log(`[useUsers] deleteUser: Iniciando para ID "${id}"`);
    setLoading(true);
    setError(null);
    try {
      console.log(
        "[useUsers] deleteUser: Chamando supabase.from('users').delete...",
      );
      const { error: deleteError } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error(
          "[useUsers] deleteUser: Erro da query Supabase:",
          deleteError,
        );
        throw deleteError;
      }
      console.log(
        "[useUsers] deleteUser: Usuário deletado com sucesso da tabela.",
      );
      setUsers((prev) => prev.filter((u) => u.id !== id));
      console.log("[useUsers] deleteUser: Finalizado.");
    } catch (err: any) {
      console.error("[useUsers] deleteUser: Erro capturado no catch:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    signUpUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
}
