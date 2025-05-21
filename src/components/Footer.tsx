import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Mail, PhoneCall, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Code size={28} className="text-primary-400" />
              <span className="font-bold text-xl text-white">
                Future Coders <span className="text-primary-400">Academy</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Transformando crianças em criadores de tecnologia através do ensino de programação de forma divertida e educativa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
          
          {/* Trilhas */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Trilhas</h3>
            <ul className="space-y-2">
              {[1, 2, 3, 4, 5].map((grade) => (
                <li key={grade}>
                  <Link 
                    to={`/track/${grade}`} 
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    Trilha do {grade}º Ano
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/tracks" className="text-primary-400 hover:underline">
                  Ver todas as trilhas →
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Av. Tecnologia, 1234<br />
                  São Paulo, SP, 01000-000
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={20} className="text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">(11) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-400 mr-2 flex-shrink-0" />
                <a href="mailto:contato@futurecoders.com.br" className="text-gray-400 hover:text-primary-400 transition-colors">
                  contato@futurecoders.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Future Coders Academy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;