
import React from 'react';
import { Users, BookOpen, Activity, CalendarCheck } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel do Professor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <Users className="text-primary-500" size={24} />
            <div>
              <h3 className="font-semibold">Alunos Ativos</h3>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <BookOpen className="text-secondary-500" size={24} />
            <div>
              <h3 className="font-semibold">Módulos</h3>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <Activity className="text-success-500" size={24} />
            <div>
              <h3 className="font-semibold">Progresso Médio</h3>
              <p className="text-2xl font-bold">67%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <CalendarCheck className="text-warning-500" size={24} />
            <div>
              <h3 className="font-semibold">Aulas Agendadas</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Últimas Atividades</h2>
          <div className="space-y-4">
            {/* Activity list would go here */}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Próximas Aulas</h2>
          <div className="space-y-4">
            {/* Class schedule would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
