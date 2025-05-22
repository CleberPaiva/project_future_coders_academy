import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { TRACK_1 } from '../../data/modules';
import { Lock, Play, FileText, CheckSquare } from 'lucide-react';

const Track1AnoPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModules() {
      try {
        // Assuming getModulesByTrack is defined elsewhere and retrieves data from Supabase
        // and Module type is also defined.  Since these are not provided I am commenting this out to prevent errors.
        //const data = await getModulesByTrack('track-1');
        //setModules(data);
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
          {TRACK_1.modules.map((module) => {
            const isAvailable = isModuleAvailable(module.free || false);

            return (
              <div 
                key={module.id}
                className={`rounded-lg border border-gray-200 bg-white p-6 transition-all
                  ${isAvailable ? 'hover:shadow-lg' : 'opacity-75'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`rounded-full p-2 ${
                    isAvailable ? 'bg-primary-50 text-primary-500' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {getModuleIcon(module.type)}
                  </div>
                  {!isAvailable && <Lock className="w-5 h-5 text-gray-400" />}
                </div>

                <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                <div className="flex items-center justify-between mb-4">
                  {module.duration && (
                    <span className="text-sm text-gray-500">{module.duration}</span>
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
                    ${isAvailable 
                      ? 'bg-primary-500 text-white hover:bg-primary-600' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  disabled={!isAvailable}
                >
                  {isAvailable ? 'Acessar' : 'Módulo Bloqueado'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Track1AnoPage;