
import React, { useState } from 'react';
import { useModules } from '../../hooks/useModules';
import { Module } from '../../types/supabase';

type ModuleFormProps = {
  trackId: string;
  module?: Module;
  onSuccess?: () => void;
};

const ModuleForm: React.FC<ModuleFormProps> = ({ trackId, module, onSuccess }) => {
  const { createModule, updateModule } = useModules(trackId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    track_id: trackId,
    titulo: module?.titulo || '',
    conteudo: module?.conteudo || '',
    video_url: module?.video_url || '',
    pdf_url: module?.pdf_url || '',
    atividade_url: module?.atividade_url || '',
    tipo: module?.tipo || 'video',
    duracao: module?.duracao || '',
    pontos: module?.pontos || 0,
    free: module?.free || false,
    ordem: module?.ordem || 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (module) {
        await updateModule(module.id, formData);
      } else {
        await createModule(formData);
      }
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          value={formData.titulo}
          onChange={e => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Conteúdo
        </label>
        <textarea
          value={formData.conteudo}
          onChange={e => setFormData(prev => ({ ...prev, conteudo: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          rows={5}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL do Vídeo
        </label>
        <input
          type="url"
          value={formData.video_url}
          onChange={e => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL do PDF
        </label>
        <input
          type="url"
          value={formData.pdf_url}
          onChange={e => setFormData(prev => ({ ...prev, pdf_url: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL da Atividade
        </label>
        <input
          type="url"
          value={formData.atividade_url}
          onChange={e => setFormData(prev => ({ ...prev, atividade_url: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo
        </label>
        <select
          value={formData.tipo}
          onChange={e => setFormData(prev => ({ ...prev, tipo: e.target.value as Module['tipo'] }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        >
          <option value="video">Vídeo</option>
          <option value="pdf">PDF</option>
          <option value="activity">Atividade</option>
          <option value="quiz">Quiz</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duração
        </label>
        <input
          type="text"
          value={formData.duracao}
          onChange={e => setFormData(prev => ({ ...prev, duracao: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Ex: 10 min"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pontos
        </label>
        <input
          type="number"
          value={formData.pontos}
          onChange={e => setFormData(prev => ({ ...prev, pontos: parseInt(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          min={0}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ordem
        </label>
        <input
          type="number"
          value={formData.ordem}
          onChange={e => setFormData(prev => ({ ...prev, ordem: parseInt(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          min={0}
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.free}
          onChange={e => setFormData(prev => ({ ...prev, free: e.target.checked }))}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Módulo Gratuito
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 disabled:opacity-50"
      >
        {loading ? 'Salvando...' : module ? 'Atualizar Módulo' : 'Criar Módulo'}
      </button>
    </form>
  );
};

export default ModuleForm;
