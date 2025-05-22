import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, CheckSquare } from 'lucide-react';
import { TRACK_1 } from '../../data/modules';

const Module1AnoPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const module = TRACK_1.modules.find((m) => m.id === id);

  if (!module) {
    return (
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Módulo não encontrado</h2>
            <p className="text-red-600 mb-4">O módulo que você está procurando não existe.</p>
            <button
              onClick={() => navigate('/track/1ano')}
              className="inline-flex items-center text-red-600 hover:text-red-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para a trilha
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/track/1ano')}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para a trilha
        </button>

        <h1 className="text-3xl font-bold mb-6">{module.title}</h1>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Conteúdo</h2>
          <p className="text-gray-600 whitespace-pre-wrap">{module.description || module.content}</p>
        </div>

        {module.video_url && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Vídeo</h2>
            {module.video_url.includes('youtube.com') ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={module.video_url.replace('watch?v=', 'embed/')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
            ) : (
              <video
                src={module.video_url}
                controls
                className="w-full rounded-lg"
              />
            )}
          </div>
        )}

        {module.pdf_url && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Material Complementar</h2>
            <a
              href={module.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-500 hover:text-primary-600"
            >
              <FileText className="w-4 h-4 mr-2" />
              Baixar PDF
            </a>
          </div>
        )}

        {module.atividade_url && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Atividade</h2>
            <a
              href={module.atividade_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-500 hover:text-primary-600"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Acessar Atividade
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Module1AnoPage;
