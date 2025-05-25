import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Play, FileText, CheckSquare } from "lucide-react";

import { supabase } from "../../lib/supabase";

const Track1AnoPage: React.FC = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-5 h-5" />;
      case "pdf":
        return <FileText className="w-5 h-5" />;
      case "quiz":
        return <CheckSquare className="w-5 h-5" />;
      default:
        return <Play className="w-5 h-5" />;
    }
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data: track, error: trackError } = await supabase
          .from("tracks")
          .select("id")
          .eq("grade", 1)
          .single();

        if (trackError) throw trackError;

        const { data, error: modulesError } = await supabase
          .from("modules")
          .select("*")
          .eq("track_id", track.id)
          .order("ordem", { ascending: true });

        if (modulesError) throw modulesError;

        setModules(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Carregando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Trilha do 1º Ano – Introdução à Informática Educacional
          </h1>
          <p className="text-xl opacity-90">
            Aprenda os fundamentos da informática de forma divertida e
            interativa
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`rounded-lg border border-gray-200 bg-white p-6 transition-all ${module.free ? "hover:shadow-lg" : "opacity-75"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`rounded-full p-2 ${module.free ? "bg-primary-50 text-primary-500" : "bg-gray-100 text-gray-400"}`}
                >
                  {getModuleIcon(module.tipo)}
                </div>
                {!module.free && <Lock className="w-5 h-5 text-gray-400" />}
              </div>

              <h3 className="text-lg font-semibold mb-2">{module.titulo}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {module.conteudo?.substring(0, 150)}...
              </p>

              <div className="flex items-center justify-between mb-4">
                {module.duracao && (
                  <span className="text-sm text-gray-500">
                    {module.duracao}
                  </span>
                )}
                {module.free && (
                  <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Gratuito
                  </span>
                )}
              </div>

              <button
                onClick={() => navigate(`/track/1ano/module/${module.ordem}`)}
                className={`w-full py-2 px-4 rounded-lg text-center transition-colors ${module.free ? "bg-primary-500 text-white hover:bg-primary-600" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                disabled={!module.free}
              >
                {module.free ? "Acessar" : "Módulo Bloqueado"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Track1AnoPage;
