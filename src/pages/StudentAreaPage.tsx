import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, FileText, CheckCircle, Trophy, BarChart3, 
  Clock, ArrowRight, Users, ArrowLeft, BookOpen
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Mock data for student progress
const studentProgress = [
  {
    grade: 3,
    modules: [
      {
        id: 'module-3-1',
        title: 'Introdução ao Scratch Jr',
        progress: 100,
        completed: true,
      },
      {
        id: 'module-3-2',
        title: 'Histórias Interativas',
        progress: 60,
        completed: false,
      },
      {
        id: 'module-3-3',
        title: 'Personagens e Ações',
        progress: 0,
        completed: false,
      },
      {
        id: 'module-3-4',
        title: 'Criando Mini Jogos',
        progress: 0,
        completed: false,
      },
    ],
    points: 450,
    ranking: 8,
    badges: [
      {
        id: 'badge-1',
        title: 'Primeiro Código',
        icon: <Code className="w-full h-full p-1" />,
        description: 'Completou o primeiro projeto de programação',
      },
      {
        id: 'badge-2',
        title: 'Explorador',
        icon: <Compass className="w-full h-full p-1" />,
        description: 'Concluiu 3 lições consecutivas',
      },
    ],
    nextLessons: [
      {
        id: 'lesson-3-2-3',
        title: 'Criando diálogos interativos',
        type: 'video',
        duration: '15 min',
        icon: <Play size={16} />,
        module: 'Histórias Interativas',
      },
      {
        id: 'lesson-3-2-4',
        title: 'Projeto: Minha Primeira História',
        type: 'pdf',
        icon: <FileText size={16} />,
        module: 'Histórias Interativas',
      },
    ],
  },
];

// Import the lucide icons used in the badges
import { Code, Compass } from 'lucide-react';

const StudentAreaPage: React.FC = () => {
  const { grade } = useParams();
  const [studentData, setStudentData] = useState<any>(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate(`/track/${grade}`);
      return;
    }
    
    // Find student data for the current grade
    const gradeNumber = Number(grade);
    const currentStudentData = studentProgress.find(s => s.grade === gradeNumber);
    
    if (currentStudentData) {
      setStudentData(currentStudentData);
    } else {
      // If no data exists for this grade, create default data
      const defaultData = {
        grade: gradeNumber,
        modules: [
          {
            id: `module-${gradeNumber}-1`,
            title: `Introdução à Trilha do ${gradeNumber}º Ano`,
            progress: 0,
            completed: false,
          },
        ],
        points: 0,
        ranking: 0,
        badges: [],
        nextLessons: [
          {
            id: `lesson-${gradeNumber}-1-1`,
            title: 'Começando sua jornada',
            type: 'video',
            duration: '10 min',
            icon: <Play size={16} />,
            module: `Introdução à Trilha do ${gradeNumber}º Ano`,
          },
        ],
      };
      setStudentData(defaultData);
    }
  }, [grade, isAuthenticated, navigate, user]);
  
  if (!studentData || !isAuthenticated) {
    return (
      <div className="container-custom py-24 text-center">
        <h2>Carregando área do aluno...</h2>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-10">
        <div className="container-custom">
          <Link to={`/track/${grade}`} className="inline-flex items-center text-white mb-6 hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Voltar para a trilha
          </Link>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Área do Aluno - {grade}º Ano
              </h1>
              <p className="text-white/90">
                Bem-vindo de volta, {user?.name.split(' ')[0]}! Continue seu aprendizado.
              </p>
            </div>
            
            <div className="mt-6 md:mt-0 flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <p className="text-sm text-white/80">Pontos</p>
                <p className="text-2xl font-bold">{studentData.points}</p>
              </div>
              
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <p className="text-sm text-white/80">Ranking</p>
                <p className="text-2xl font-bold">#{studentData.ranking}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="lg:w-8/12">
              {/* Continue Learning Section */}
              <motion.section 
                className="bg-white rounded-xl shadow-md p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <BookOpen size={24} className="text-primary-500 mr-2" />
                  Continue Aprendendo
                </h2>
                
                {studentData.nextLessons.map((lesson: any, index: number) => (
                  <div 
                    key={lesson.id}
                    className="border-b border-gray-100 last:border-0 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          lesson.type === 'video' ? 'bg-accent-50 text-accent-500' : 'bg-primary-50 text-primary-500'
                        }`}>
                          {lesson.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">{lesson.title}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{lesson.module}</span>
                            {lesson.duration && (
                              <>
                                <span className="mx-2">•</span>
                                <Clock size={14} className="mr-1" />
                                <span>{lesson.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        lesson.type === 'video' ? 'bg-accent-500 text-white' : 'bg-primary-500 text-white'
                      }`}>
                        {lesson.type === 'video' ? <Play size={18} /> : <FileText size={18} />}
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4 text-right">
                  <Link 
                    to="#" 
                    className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600 transition-colors"
                  >
                    Ver todas as lições
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.section>
              
              {/* Modules Progress */}
              <motion.section 
                className="bg-white rounded-xl shadow-md p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <BarChart3 size={24} className="text-primary-500 mr-2" />
                  Seu Progresso
                </h2>
                
                <div className="space-y-6">
                  {studentData.modules.map((module: any, index: number) => (
                    <div key={module.id} className="bg-gray-50 p-5 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold flex items-center">
                          {module.completed && (
                            <CheckCircle size={18} className="text-success-500 mr-2" />
                          )}
                          {module.title}
                        </h3>
                        <span className="font-bold text-primary-500">{module.progress}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            module.completed ? 'bg-success-500' : 'bg-primary-500'
                          }`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                      
                      {module.progress > 0 && module.progress < 100 && (
                        <div className="mt-3 text-right">
                          <Link 
                            to="#" 
                            className="text-sm font-medium text-primary-500 hover:text-primary-600"
                          >
                            Continuar
                          </Link>
                        </div>
                      )}
                      
                      {module.progress === 0 && (
                        <div className="mt-3 text-right">
                          <Link 
                            to="#" 
                            className="text-sm font-medium text-primary-500 hover:text-primary-600"
                          >
                            Começar
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
            
            {/* Right Column */}
            <div className="lg:w-4/12">
              {/* Achievements */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Trophy size={20} className="text-warning-500 mr-2" />
                  Suas Conquistas
                </h2>
                
                {studentData.badges && studentData.badges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {studentData.badges.map((badge: any) => (
                      <div key={badge.id} className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="w-14 h-14 bg-primary-500 text-white rounded-full mx-auto mb-2 flex items-center justify-center">
                          {badge.icon}
                        </div>
                        <h3 className="font-semibold text-primary-700 mb-1">{badge.title}</h3>
                        <p className="text-xs text-gray-500">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">
                      Complete lições para ganhar conquistas!
                    </p>
                  </div>
                )}
                
                <div className="mt-4 text-center">
                  <Link 
                    to="#" 
                    className="text-primary-500 text-sm font-semibold hover:text-primary-600"
                  >
                    Ver todas as conquistas
                  </Link>
                </div>
              </motion.div>
              
              {/* Leaderboard */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Users size={20} className="text-secondary-500 mr-2" />
                  Top 5 da Turma
                </h2>
                
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Gabriel Silva', points: 780 },
                    { rank: 2, name: 'Julia Oliveira', points: 720 },
                    { rank: 3, name: 'Pedro Santos', points: 685 },
                    { rank: 4, name: 'Laura Martins', points: 620 },
                    { rank: 5, name: 'Rafael Souza', points: 590 },
                  ].map((student, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        student.name === 'Julia Oliveira' ? 'bg-primary-50 border border-primary-100' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          student.rank === 1 ? 'bg-yellow-500' : 
                          student.rank === 2 ? 'bg-gray-300' : 
                          student.rank === 3 ? 'bg-amber-600' : 'bg-gray-200'
                        } text-white font-bold`}>
                          {student.rank}
                        </div>
                        <span className={`${student.name === 'Julia Oliveira' ? 'font-semibold' : ''}`}>
                          {student.name}
                        </span>
                      </div>
                      <span className="font-semibold">{student.points} pts</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500 mb-2">Sua posição</p>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-3 font-bold">
                        {studentData.ranking}
                      </div>
                      <span className="font-semibold">{user?.name}</span>
                    </div>
                    <span className="font-semibold">{studentData.points} pts</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Help Box */}
              <motion.div 
                className="bg-primary-50 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Precisa de ajuda?</h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Está com dificuldade em alguma lição ou atividade? Nossa equipe está disponível para ajudar.
                    </p>
                    <a 
                      href="mailto:suporte@futurecoders.com.br" 
                      className="inline-flex items-center text-primary-500 font-semibold text-sm hover:underline"
                    >
                      Entrar em contato
                      <ArrowRight size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAreaPage;