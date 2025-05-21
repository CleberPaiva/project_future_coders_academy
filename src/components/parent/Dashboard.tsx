
import React from 'react';
import { Users, CreditCard, Award, Calendar } from 'lucide-react';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Área dos Responsáveis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <Users className="text-primary-500" size={24} />
            <div>
              <h3 className="font-semibold">Alunos Vinculados</h3>
              <p className="text-2xl font-bold">{user?.linkedStudents?.length || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <CreditCard className="text-secondary-500" size={24} />
            <div>
              <h3 className="font-semibold">Plano Atual</h3>
              <p className="text-lg font-medium">{user?.subscription?.plan || 'Nenhum'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <Award className="text-success-500" size={24} />
            <div>
              <h3 className="font-semibold">Conquistas</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <Calendar className="text-warning-500" size={24} />
            <div>
              <h3 className="font-semibold">Próxima Aula</h3>
              <p className="text-sm">Hoje, 15:00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Progresso dos Alunos</h2>
        {/* Student progress cards would go here */}
      </div>
    </div>
  );
};

export default ParentDashboard;
