import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, FileText, CheckCircle, Trophy, BarChart3, 
  Clock, ArrowRight, Users, ArrowLeft, BookOpen
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Mock data for tracks
const tracksData = [
  {
    grade: 1,
    title: 'Trilha do 1º Ano',
    description: 'Introdução ao pensamento computacional e lógica através de atividades lúdicas e jogos educativos.',
    content: [
      {
        id: 'module-1-1',
        title: 'Primeiros Passos',
        description: 'Atividades desplugadas para desenvolver o pensamento computacional.',
        free: true,
        lessons: [
          {
            id: 'algorithm-intro',
            title: 'O que é um algoritmo?',
            type: 'video',
            duration: '10 min',
            icon: <Play size={16} />
          },
          {
            id: 'directions-game',
            title: 'Atividade: Seguindo direções',
            type: 'interactive',
            icon: <FileText size={16} />
          }
        ]
      }
    ],
    skills: ['Pensamento Lógico', 'Sequenciamento', 'Direções Básicas', 'Reconhecimento de Padrões'],
    image: 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    grade: 2,
    title: 'Trilha do 2º Ano',
    description: 'Desenvolvimento do raciocínio computacional através de atividades mais avançadas e introdução a jogos digitais.',
    content: [
      {
        id: 'module-2-1',
        title: 'Algoritmos do Dia-a-Dia',
        description: 'Reconhecendo algoritmos em atividades cotidianas.',
        free: true,
        lessons: [
          {
            id: 'algorithm-routine',
            title: 'Algoritmos na nossa rotina',
            type: 'video',
            duration: '15 min',
            icon: <Play size={16} />
          },
          {
            id: 'routine-builder',
            title: 'Atividade: Criando rotinas',
            type: 'interactive',
            icon: <FileText size={16} />
          }
        ]
      }
    ],
    skills: ['Algoritmos Básicos', 'Estrutura de Decisão', 'Blocos Visuais', 'Resolução de Problemas'],
    image: 'https://images.pexels.com/photos/8611930/pexels-photo-8611930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const TrackPage: React.FC = () => {
  const { grade } = useParams();
  const [track, setTrack] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { isAuthenticated, login, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const gradeNumber = Number(grade);
    const currentTrack = tracksData.find(t => t.grade === gradeNumber);
    
    if (currentTrack) {
      setTrack(currentTrack);
    }
  }, [grade]);
  
  const handleSubscribe = () => {
    setShowSuccessModal(true);
    
    setTimeout(() => {
      setShowSuccessModal(false);
      login("demo@example.com", "password").then(() => {
        navigate(`/student-area/${grade}`);
      });
    }, 3000);
  };
  
  if (!track) {
    return (
      <div className="container-custom py-24 text-center">
        <h2>Trilha não encontrada</h2>
        <p className="mb-6">A trilha solicitada não está disponível.</p>
        <Link to="/" className="btn-primary">
          Voltar para o início
        </Link>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-16">
      <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16">
        <div className="container-custom">
          <Link to="/tracks" className="inline-flex items-center text-white mb-6 hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Voltar para trilhas
          </Link>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-7/12 mb-8 md:mb-0 md:pr-12">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {track.title}
              </motion.h1>
              
              <motion.p 
                className="text-lg text-white/90 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {track.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {track.skills.map((skill: string, index: number) => (
                  <span 
                    key={index} 
                    className="bg-white/20 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
              
              <motion.button
                className="btn bg-white text-primary-600 hover:bg-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={handleSubscribe}
              >
                Assinar Trilha
              </motion.button>
            </div>
            
            <motion.div 
              className="md:w-5/12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src={track.image} 
                alt={track.title}
                className="rounded-xl shadow-lg border-4 border-white/20"
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-8/12">
              {track.content.map((module: any, moduleIndex: number) => (
                <motion.div 
                  key={module.id}
                  className="card mb-6 overflow-visible"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: moduleIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center">
                          {module.title}
                          {module.free && (
                            <span className="ml-2 text-xs bg-success-500 text-white px-2 py-0.5 rounded-full">
                              Gratuito
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600">{module.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {module.lessons.map((lesson: any, lessonIndex: number) => (
                      <div 
                        key={lesson.id}
                        className={`p-2 rounded-lg ${lessonIndex !== module.lessons.length - 1 ? 'border-b border-gray-100 mb-2' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              lesson.type === 'video' ? 'bg-accent-50 text-accent-500' : 'bg-primary-50 text-primary-500'
                            }`}>
                              {lesson.icon}
                            </div>
                            <div>
                              <Link 
                                to={`/track/${grade}/lessons/${lesson.id}`}
                                className="font-medium hover:text-primary-500 transition-colors"
                              >
                                {lesson.title}
                              </Link>
                              {lesson.duration && (
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Clock size={12} className="mr-1" />
                                  {lesson.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="lg:w-4/12">
              <div className="sticky top-24">
                <div className="card p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Trophy size={20} className="text-warning-500 mr-2" />
                    Destaques da Trilha
                  </h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Conteúdo adequado para crianças do {track.grade}º ano</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Atividades práticas e projetos divertidos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Certificado de conclusão</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Suporte de instrutores especializados</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <button 
                      className="btn-primary w-full"
                      onClick={handleSubscribe}
                    >
                      Assinar por R$ 49,90/mês
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Cancele a qualquer momento
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-xl p-6">
                  <div className="flex items-start">
                    <BookOpen size={24} className="text-primary-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Precisa de ajuda?</h3>
                      <p className="text-gray-700 text-sm mb-4">
                        Tem dúvidas sobre qual trilha é mais adequada para seu filho?
                        Nossa equipe está pronta para ajudar.
                      </p>
                      <Link 
                        to="/contact" 
                        className="text-primary-500 font-semibold text-sm hover:underline"
                      >
                        Fale com um especialista
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success-500 text-white rounded-full mb-4">
                <CheckCircle size={30} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pagamento Confirmado!</h3>
              <p className="text-gray-600 mb-6">
                Parabéns! Você agora tem acesso a todo o conteúdo da trilha do {grade}º ano.
              </p>
              <p className="text-sm text-gray-500">
                Redirecionando para a área do aluno...
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TrackPage;