import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Code } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-100 mb-6">
            <Code size={40} className="text-primary-500" />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Página não encontrada</h2>
          
          <p className="text-xl text-gray-600 max-w-xl mx-auto mb-8">
            Ops! Parece que o código desta página teve um bug. 
            A página que você está procurando não existe ou foi movida.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Home size={20} className="mr-2" />
            Voltar para a Página Inicial
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;