
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Play, FileText, CheckSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getModulesByTrack } from '../../lib/supabase';
import { Module } from '../../types/supabase';

const Track1AnoPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModules() {
      try {
        const data = await getModulesByTrack('track-1');
        setModules(data);
      } catch (error) {
        console.error('Error loading modules:', error);
      } finally {
        setLoading(false);
      }
    }

    loadModules();
  }, []);

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'quiz':
        return <CheckSquare className="w-5 h-5" />;
      default:
        return <Play className="w-5 h-5" />;
    }
  };

  const isModuleAvailable = (free: boolean) => {
    if (free) return true;
    return isAuthenticated && user?.subscription?.status === 'active';
  };

  if (loading) {
    return <div className="pt-20 pb-16 text-center">Carregando...</div>;
  }

  return (
    <div className="pt-20 pb-16">
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Trilha do 1º Ano – Introdução à Informática Educacional
          </h1>
          <p className="text-xl opacity-90">
            Aprenda os fundamentos da informática de forma divertida e interativa
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div 
              key={module.id}
              className={`rounded-lg border border-gray-200 bg-white p-6 transition-all
                ${isModuleAvailable(module.free) ? 'hover:shadow-lg' : 'opacity-75'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`rounded-full p-2 ${
                  isModuleAvailable(module.free) ? 'bg-primary-50 text-primary-500' : 'bg-gray-100 text-gray-400'
                }`}>
                  {getModuleIcon(module.tipo)}
                </div>
                {!isModuleAvailable(module.free) && <Lock className="w-5 h-5 text-gray-400" />}
              </div>

              <h3 className="text-lg font-semibold mb-2">{module.titulo}</h3>
              <p className="text-gray-600 text-sm mb-4">{module.conteudo}</p>

              <div className="flex items-center justify-between mb-4">
                {module.duracao && (
                  <span className="text-sm text-gray-500">{module.duracao}</span>
                )}
                {module.free && (
                  <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Gratuito
                  </span>
                )}
              </div>

              <button
                onClick={() => navigate(`/track/1ano/module/${module.id}`)}
                className={`w-full py-2 px-4 rounded-lg text-center transition-colors
                  ${isModuleAvailable(module.free)
                    ? 'bg-primary-500 text-white hover:bg-primary-600' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                disabled={!isModuleAvailable(module.free)}
              >
                {isModuleAvailable(module.free) ? 'Acessar' : 'Módulo Bloqueado'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Track1AnoPage;
