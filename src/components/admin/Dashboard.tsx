
import React from 'react';
import { Users, BookOpen, CreditCard, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <Users className="text-primary-500" size={24} />
            <div>
              <h3 className="font-semibold">Usuários</h3>
              <p className="text-2xl font-bold">127</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <BookOpen className="text-secondary-500" size={24} />
            <div>
              <h3 className="font-semibold">Trilhas</h3>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <CreditCard className="text-success-500" size={24} />
            <div>
              <h3 className="font-semibold">Assinaturas Ativas</h3>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <Settings className="text-warning-500" size={24} />
            <div>
              <h3 className="font-semibold">Configurações</h3>
              <p className="text-sm text-gray-500">Gerenciar sistema</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add more admin functionality here */}
    </div>
  );
};

export default AdminDashboard;
