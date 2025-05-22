import { FileText, Play, Code, Book, CheckSquare } from 'lucide-react';

export interface Module {
  id: string;
  title: string;
  description: string;
  content?: string;
  video_url?: string;
  pdf_url?: string;
  atividade_url?: string;
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
      id: '1',
      title: 'O Que É Informática?',
      description: 'Vamos descobrir juntos o que é informática e como ela faz parte do nosso dia a dia de muitas pessoas, no estudo, no trabalho e na diversão.',
      content: 'Vamos descobrir juntos o que é informática e como ela faz parte do nosso dia a dia de muitas pessoas, no estudo, no trabalho e na diversão.',
      type: 'video',
      duration: '45 min',
      free: true
    },
    {
      id: 'module-2',
      title: 'O Computador no Dia a Dia',
      description: 'Você sabia que podemos usar o computador para estudar, fazer trabalhos e até nos divertir? Vamos ver onde mais a informática aparece!',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-3',
      title: 'Vamos Ligar o Computador?',
      description: 'Aprender a ligar o computador é o primeiro passo para usar a informática. Vamos conhecer como fazer isso.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-4',
      title: 'Conhecendo o Teclado',
      description: 'Hoje, vamos aprender para que serve cada parte do teclado, esse objeto cheio de letrinhas e símbolos.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-5',
      title: 'Onde Clicar?',
      description: 'A setinha que se move na tela se chama cursor. Com ela, podemos clicar e escolher o que fazer no computador.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-6',
      title: 'Usando o Mouse',
      description: 'Vamos aprender a segurar e movimentar o mouse para controlar o cursor e clicar nas coisas.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-7',
      title: 'Desenhando com o Mouse',
      description: 'Que tal usar o mouse para desenhar e criar coisas legais na tela do computador?',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-8',
      title: 'O Que É a Internet?',
      description: 'A internet é como uma grande rede que liga computadores do mundo todo. Vamos descobrir o que podemos fazer nela.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-9',
      title: 'Explorando a Internet',
      description: 'Vamos navegar na internet e ver como ela pode nos ajudar a aprender, brincar e descobrir coisas novas.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-10',
      title: 'Primeiros Passos na Programação',
      description: 'A programação é como dar ordens para o computador. Vamos aprender a criar nossos próprios programas simples.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-11',
      title: 'Criando Histórias Animadas',
      description: 'Com a programação, podemos criar histórias com personagens que se movem e falam. Vamos experimentar!',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-12',
      title: 'O Que É um Robô?',
      description: 'Os robôs são máquinas que podem fazer muitas coisas. Vamos conhecer alguns robôs e como eles funcionam.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-13',
      title: 'Construindo um Robô de Sucata',
      description: 'Que tal construir um robô usando materiais reciclados? Vamos usar a criatividade e criar um robô divertido.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-14',
      title: 'Para Que Servem os Aplicativos?',
      description: 'Os aplicativos são programas que fazem coisas específicas. Vamos ver alguns aplicativos que usamos no dia a dia.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-15',
      title: 'Criando um Aplicativo Simples',
      description: 'Vamos criar um aplicativo bem simples para aprender como eles funcionam. É mais fácil do que parece!',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-16',
      title: 'O Que É um Jogo Digital?',
      description: 'Os jogos digitais são uma forma divertida de usar a informática. Vamos conhecer alguns jogos e como eles são feitos.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-17',
      title: 'Criando um Jogo de Labirinto',
      description: 'Vamos criar um jogo de labirinto simples para aprender como os jogos são programados.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-18',
      title: 'A Informática e a Música',
      description: 'A informática também pode ser usada para criar e tocar música. Vamos descobrir como isso é possível.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-19',
      title: 'Criando uma Música Digital',
      description: 'Vamos usar um programa para criar uma música digital simples e aprender como a informática pode ser musical.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-20',
      title: 'O Que É Realidade Virtual?',
      description: 'A realidade virtual nos leva para outros mundos. Vamos descobrir como ela funciona e para que serve.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-21',
      title: 'Explorando um Mundo Virtual',
      description: 'Vamos usar óculos de realidade virtual para explorar um mundo virtual e ver como é essa experiência.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-22',
      title: 'O Que É Inteligência Artificial?',
      description: 'A inteligência artificial faz com que os computadores pensem. Vamos conhecer alguns exemplos de IA.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-23',
      title: 'Brincando com a Inteligência Artificial',
      description: 'Vamos interagir com um programa de IA e ver como ele aprende e responde às nossas perguntas.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-24',
      title: 'A Informática e a Arte',
      description: 'A informática pode ser usada para criar arte digital. Vamos ver como os artistas usam a tecnologia.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-25',
      title: 'Criando Arte Digital',
      description: 'Vamos usar um programa de desenho para criar uma obra de arte digital e expressar nossa criatividade.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-26',
      title: 'O Que É a Robótica Educacional?',
      description: 'A robótica educacional usa robôs para ensinar. Vamos conhecer alguns robôs educativos e como eles funcionam.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-27',
      title: 'Montando um Robô Educacional',
      description: 'Vamos montar um robô educativo simples e aprender como ele se move e interage com o ambiente.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-28',
      title: 'A Informática e a Saúde',
      description: 'A informática ajuda os médicos a cuidarem da nossa saúde. Vamos ver como a tecnologia é usada na medicina.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-29',
      title: 'Simulando uma Consulta Médica',
      description: 'Vamos usar um programa para simular uma consulta médica e aprender como os médicos usam a informática.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-30',
      title: 'Revisão: O Que Aprendemos?',
      description: 'Vamos relembrar tudo o que aprendemos sobre informática e como ela está presente em nossas vidas.',
      type: 'video',
      duration: '45 min'
    },
    {
      id: 'module-31',
      title: 'Escrevendo os Nomes das Partes do Computador',
      description: 'Agora, vamos escrever os nomes das partes do computador para fixar o que aprendemos.',
      type: 'activity',
      points: 100
    },
    {
      id: 'module-32',
      title: 'Revisão: Escrevendo Nomes e Praticando',
      description: 'Para terminar, vamos praticar a escrita dos nomes das partes do computador e fazer algumas atividades de revisão divertidas.',
      type: 'quiz',
      points: 200
    }
  ]
};