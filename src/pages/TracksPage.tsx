import React from 'react';
import { motion } from 'framer-motion';
import TrackCard from '../components/TrackCard';
import { Code, Brain, Lightbulb, Notebook as Robot, Terminal, Database, Cloud, Server, Cpu } from 'lucide-react';

const TracksPage: React.FC = () => {
  const tracks = [
    {
      grade: 1,
      title: 'Trilha do 1º Ano',
      description: 'Primeiros passos na lógica e pensamento computacional através de atividades lúdicas.',
      icon: <Code className="w-6 h-6" />,
      color: 'from-blue-400 to-green-400'
    },
    {
      grade: 2,
      title: 'Trilha do 2º Ano',
      description: 'Atividades desplugadas e jogos educativos para desenvolver algoritmos simples.',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-green-400 to-teal-400'
    },
    {
      grade: 3,
      title: 'Trilha do 3º Ano',
      description: 'Introdução ao Scratch Jr e criação de histórias interativas digitais.',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-400'
    },
    {
      grade: 4,
      title: 'Trilha do 4º Ano',
      description: 'Projetos com Scratch e desenvolvimento de pequenos jogos e animações.',
      icon: <Robot className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-400'
    },
    {
      grade: 5,
      title: 'Trilha do 5º Ano',
      description: 'Aprofundamento em Scratch e introdução à robótica educacional.',
      icon: <Terminal className="w-6 h-6" />,
      color: 'from-red-400 to-pink-400'
    },
    {
      grade: 6,
      title: 'Trilha do 6º Ano',
      description: 'Introdução ao Python com foco em jogos e aplicações simples.',
      icon: <Database className="w-6 h-6" />,
      color: 'from-indigo-400 to-purple-400'
    },
    {
      grade: 7,
      title: 'Trilha do 7º Ano',
      description: 'Desenvolvimento web básico com HTML, CSS e JavaScript.',
      icon: <Cloud className="w-6 h-6" />,
      color: 'from-blue-400 to-indigo-400'
    },
    {
      grade: 8,
      title: 'Trilha do 8º Ano',
      description: 'Programação orientada a objetos e desenvolvimento de aplicativos.',
      icon: <Server className="w-6 h-6" />,
      color: 'from-green-400 to-blue-400'
    },
    {
      grade: 9,
      title: 'Trilha do 9º Ano',
      description: 'Projetos avançados incluindo IoT e inteligência artificial básica.',
      icon: <Cpu className="w-6 h-6" />,
      color: 'from-purple-400 to-indigo-400'
    }
  ];

  return (
    <div className="pt-20 pb-16">
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container-custom text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trilhas de <span className="text-primary-500">Aprendizado</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Escolha a trilha ideal para seu filho com base na série escolar atual.
            Cada trilha foi desenvolvida para proporcionar um aprendizado progressivo
            e adequado à idade.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track, index) => (
              <TrackCard 
                key={track.grade}
                track={track}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TracksPage;