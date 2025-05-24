import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, FileText, CheckSquare, ArrowLeft } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ModulePage: React.FC = () => {
  const { grade, id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState<any>(null);
  const [trackTitle, setTrackTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      const numericGrade = parseInt((grade || "").replace(/\D/g, ""), 10);
      if (!numericGrade || isNaN(numericGrade) || !id) {
        setError("Parâmetro de grade inválido.");
        return;
      }

      try {
        const { data: track, error: trackError } = await supabase
          .from("tracks")
          .select("*")
          .eq("grade", numericGrade)
          .single();

        if (trackError) throw trackError;
        setTrackTitle(track.titulo);

        const { data, error: moduleError } = await supabase
          .from("modules")
          .select("*")
          .eq("track_id", track.id)
          .eq("ordem", Number(id))
          .single();

        if (moduleError) throw moduleError;

        setModule(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchModule();
  }, [grade, id]);

  if (error) {
    return (
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="pt-20 pb-16 text-center">
        <div className="animate-pulse">Carregando módulo...</div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(`/track/${grade}`)}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para a trilha
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-6 border border-gray-200 bg-white rounded-lg shadow mb-10"
        >
          <h2 className="text-2xl font-bold mb-4">{module.titulo}</h2>
          <p className="text-gray-600 whitespace-pre-wrap">{module.conteudo}</p>
        </motion.div>

        {module.video_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-6 border border-gray-200 bg-white rounded-lg shadow mb-6"
          >
            <h3 className="text-xl font-semibold mb-4">Vídeo</h3>
            {module.video_url.includes("youtube.com") ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={module.video_url.replace("watch?v=", "embed/")}
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
          </motion.div>
        )}

        {module.pdf_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6 border border-gray-200 bg-white rounded-lg shadow mb-6"
          >
            <h3 className="text-xl font-semibold mb-4">
              Material Complementar
            </h3>
            <a
              href={module.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-500 hover:text-primary-600"
            >
              <FileText className="w-4 h-4 mr-2" />
              Baixar PDF
            </a>
          </motion.div>
        )}

        {module.atividade_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6 border border-gray-200 bg-white rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold mb-4">Atividade</h3>
            <a
              href={module.atividade_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-500 hover:text-primary-600"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Acessar Atividade
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
