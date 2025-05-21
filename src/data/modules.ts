
import { FileText, Play, Code, Book, CheckSquare } from 'lucide-react';

export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'activity' | 'quiz';
  duration?: string;
  points?: number;
  free?: boolean;
}

export interface Track {
  id: string;
  grade: number;
  modules: Module[];
}

export const TRACK_1: Track = {
  id: 'track-1',
  grade: 1,
  modules: [
    {
      id: 'intro',
      title: 'Boas-vindas à Informática Educacional',
      description: 'Conheça nossa metodologia e como será sua jornada',
      type: 'video',
      duration: '10 min',
      free: true
    },
    {
      id: 'module-1',
      title: 'O que é um Computador?',
      description: 'Introdução aos componentes básicos do computador',
      type: 'video',
      duration: '15 min',
      free: true
    },
    {
      id: 'module-2',
      title: 'Atividade: Identificando Partes do Computador',
      description: 'Exercício interativo sobre hardware',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-3',
      title: 'Usando o Mouse e Teclado',
      description: 'Aprenda a usar os dispositivos de entrada',
      type: 'video',
      duration: '20 min'
    },
    {
      id: 'module-4',
      title: 'Jogo: Labirinto do Mouse',
      description: 'Pratique o controle do mouse de forma divertida',
      type: 'activity',
      points: 150
    },
    {
      id: 'module-5',
      title: 'Internet Segura',
      description: 'Guia básico de segurança online para crianças',
      type: 'pdf',
      free: true
    },
    {
      id: 'module-6',
      title: 'Quiz: Segurança na Internet',
      description: 'Teste seus conhecimentos sobre segurança online',
      type: 'quiz',
      points: 100
    },
    {
      id: 'module-7',
      title: 'Introdução à Lógica',
      description: 'Primeiros passos no pensamento lógico',
      type: 'video',
      duration: '25 min'
    },
    {
      id: 'module-8',
      title: 'Atividade: Sequência Lógica',
      description: 'Monte a sequência correta de ações',
      type: 'activity',
      points: 120
    },
    {
      id: 'module-9',
      title: 'Cores e Formas no Computador',
      description: 'Aprenda sobre elementos visuais básicos',
      type: 'video',
      duration: '15 min'
    },
    {
      id: 'module-10',
      title: 'Desenhando no Computador',
      description: 'Atividade prática de desenho digital',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-11',
      title: 'Sons e Música Digital',
      description: 'Explore os sons no computador',
      type: 'video',
      duration: '20 min'
    },
    {
      id: 'module-12',
      title: 'Criando uma Melodia',
      description: 'Atividade musical interativa',
      type: 'activity',
      points: 130
    },
    {
      id: 'module-13',
      title: 'Avaliação Final',
      description: 'Teste seus conhecimentos gerais',
      type: 'quiz',
      points: 200
    },
    {
      id: 'module-14',
      title: 'Certificado de Conclusão',
      description: 'Parabéns por completar o curso!',
      type: 'pdf'
    }
  ]
};
