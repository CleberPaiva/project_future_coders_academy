
import React, { useState } from 'react';
import { useTracks } from '../../hooks/useTracks';
import { Track } from '../../types/supabase';

type TrackFormProps = {
  track?: Track;
  onSuccess?: () => void;
};

const TrackForm: React.FC<TrackFormProps> = ({ track, onSuccess }) => {
  const { createTrack, updateTrack } = useTracks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titulo: track?.titulo || '',
    descricao: track?.descricao || '',
    nivel: track?.nivel || '',
    grade: track?.grade || 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (track) {
        await updateTrack(track.id, formData);
      } else {
        await createTrack(formData);
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
          Descrição
        </label>
        <textarea
          value={formData.descricao}
          onChange={e => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nível
        </label>
        <input
          type="text"
          value={formData.nivel}
          onChange={e => setFormData(prev => ({ ...prev, nivel: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ano Escolar
        </label>
        <input
          type="number"
          value={formData.grade}
          onChange={e => setFormData(prev => ({ ...prev, grade: parseInt(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          min={1}
          max={9}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 disabled:opacity-50"
      >
        {loading ? 'Salvando...' : track ? 'Atualizar Trilha' : 'Criar Trilha'}
      </button>
    </form>
  );
};

export default TrackForm;
