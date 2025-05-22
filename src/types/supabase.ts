
export type UserType = 'admin' | 'professor' | 'responsavel' | 'aluno';
export type ModuleType = 'video' | 'pdf' | 'activity' | 'quiz';
export type SubscriptionStatus = 'ativo' | 'inativo' | 'pendente' | 'cancelado';

export interface User {
  id: string;
  email: string;
  nome: string;
  tipo_usuario: UserType;
  ano_escolar?: number;
  responsavel_id?: string;
  criado_em: string;
}

export interface Module {
  id: string;
  track_id: string;
  titulo: string;
  conteudo: string;
  video_url?: string;
  pdf_url?: string;
  atividade_url?: string;
  tipo: ModuleType;
  duracao?: string;
  pontos: number;
  free: boolean;
  ordem: number;
  criado_em: string;
}
