import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Code, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Code size={36} className="text-primary-500" />
          </motion.div>
          <span className="font-bold text-xl md:text-2xl text-gray-800">
            Future Coders <span className="text-primary-500">Academy</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-semibold transition-colors duration-200 ${
                isActive ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`
            }
          >
            Início
          </NavLink>
          <NavLink 
            to="/how-it-works" 
            className={({ isActive }) => 
              `text-sm font-semibold transition-colors duration-200 ${
                isActive ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`
            }
          >
            Como Funciona
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-sm font-semibold transition-colors duration-200 ${
                isActive ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`
            }
          >
            Contato
          </NavLink>
          
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-primary-500">
                <User size={20} />
                <span>{user?.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <Link to={`/student-area/${user?.grade}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 rounded-md">
                    Área do Aluno
                  </Link>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 rounded-md flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              <LogIn size={18} className="mr-1" />
              Entrar
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container-custom py-4 flex flex-col space-y-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `py-2 px-4 rounded-md ${isActive ? 'bg-primary-50 text-primary-500' : 'text-gray-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </NavLink>
            <NavLink 
              to="/how-it-works" 
              className={({ isActive }) => 
                `py-2 px-4 rounded-md ${isActive ? 'bg-primary-50 text-primary-500' : 'text-gray-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `py-2 px-4 rounded-md ${isActive ? 'bg-primary-50 text-primary-500' : 'text-gray-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </NavLink>
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="px-4 py-2">
                    <p className="font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link 
                    to={`/student-area/${user?.grade}`}
                    className="block py-2 px-4 text-gray-700 hover:bg-primary-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Área do Aluno
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-4 text-gray-700 hover:bg-primary-50 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="py-2 px-4 text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors duration-200 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} className="mr-1" />
                Entrar
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;