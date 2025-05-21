import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Brain, Lightbulb, Notebook as Robot, ArrowRight, Cpu, Shield, Award, BookOpen } from 'lucide-react';
import TrackCard from '../components/TrackCard';
import ContactForm from '../components/ContactForm';

const HomePage: React.FC = () => {
  const benefitItems = [
    {
      icon: <Brain className="w-8 h-8 text-primary-500" />,
      title: 'Lógica de Programação',
      description: 'Desenvolve o raciocínio lógico desde cedo, estimulando a resolução de problemas de forma criativa.'
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-accent-500" />,
      title: 'Criatividade',
      description: 'Projetos que incentivam a expressão criativa através da criação de jogos, animações e aplicativos.'
    },
    {
      icon: <Robot className="w-8 h-8 text-secondary-500" />,
      title: 'Robótica',
      description: 'Experiências práticas com robótica educacional, combinando programação com construção de dispositivos.'
    },
    {
      icon: <Cpu className="w-8 h-8 text-primary-500" />,
      title: 'Tecnologia Atual',
      description: 'Conteúdo constantemente atualizado com as mais recentes tendências tecnológicas e ferramentas.'
    },
  ];
  
  const tracks = [
    {
      grade: 1,
      title: 'Trilha do 1º Ano',
      description: 'Primeiros passos na lógica e pensamento computacional através de atividades lúdicas.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-400 to-green-400'
    },
    {
      grade: 2,
      title: 'Trilha do 2º Ano',
      description: 'Atividades desplugadas e jogos educativos para desenvolver algoritmos simples.',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'from-green-400 to-teal-400'
    },
    {
      grade: 3,
      title: 'Trilha do 3º Ano',
      description: 'Introdução ao Scratch Jr e criação de histórias interativas digitais.',
      icon: <Code className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-400'
    },
    {
      grade: 4,
      title: 'Trilha do 4º Ano',
      description: 'Projetos com Scratch e desenvolvimento de pequenos jogos e animações.',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-400'
    },
  ];
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Transforme seu filho em um 
                <span className="gradient-text block"> criador de tecnologia</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ensine programação para crianças do 1º ao 9º ano de forma divertida, engajadora 
                e educativa, desenvolvendo habilidades essenciais para o futuro.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/how-it-works" className="btn-primary">
                  Como Funciona
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link to="/tracks" className="btn-outline">
                  Ver Trilhas
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-accent-500 rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-20 animate-pulse-slow"></div>
                <img 
                  src="https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Crianças aprendendo programação" 
                  className="rounded-xl shadow-lg relative z-10 animate-float"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher a <span className="text-primary-500">Future Coders Academy</span>?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Nossa metodologia desenvolve habilidades essenciais para o século XXI através de uma 
              abordagem prática e divertida.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitItems.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <Link to="/how-it-works" className="btn-outline">
              Saiba mais sobre nossa metodologia
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Tracks Section */}
      <section id="tracks" className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trilhas de Aprendizado
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Cada trilha foi desenvolvida para atender às necessidades específicas de cada faixa etária,
              com conteúdo adequado e desafios progressivos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, index) => (
              <TrackCard 
                key={index}
                track={track}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/tracks" className="btn-primary">
              Ver todas as trilhas
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Why Code Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0 md:pr-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Por que ensinar programação para crianças?
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Preparo para o futuro</h3>
                    <p className="text-gray-700">
                      Desenvolve habilidades essenciais para o mercado de trabalho do futuro, 
                      onde a tecnologia será cada vez mais presente.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Brain className="w-6 h-6 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Desenvolvimento cognitivo</h3>
                    <p className="text-gray-700">
                      Estimula o raciocínio lógico, resolução de problemas e pensamento 
                      computacional de forma natural e progressiva.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Award className="w-6 h-6 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Diferencial acadêmico</h3>
                    <p className="text-gray-700">
                      Proporciona uma vantagem competitiva em vestibulares e na carreira, com habilidades 
                      valorizadas por instituições de ensino e empresas.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary-500 rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent-500 rounded-full opacity-20 animate-pulse-slow"></div>
                <img 
                  src="https://images.pexels.com/photos/4050319/pexels-photo-4050319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Criança desenvolvedora" 
                  className="rounded-xl shadow-lg relative z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Entre em Contato
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Tem dúvidas sobre nossos cursos ou quer saber qual trilha é mais adequada para seu filho?
              Preencha o formulário abaixo que entraremos em contato.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;