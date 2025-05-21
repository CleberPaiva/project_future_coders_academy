import React from 'react';
import { motion } from 'framer-motion';
import { Mail, PhoneCall, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container-custom text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Entre em <span className="text-primary-500">Contato</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Estamos aqui para responder suas dúvidas e ajudar seu filho a iniciar 
            sua jornada na programação. Entre em contato conosco!
          </motion.p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-10">
            <motion.div 
              className="lg:w-5/12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Fale Conosco</h2>
              <p className="text-gray-600 mb-8">
                Tem dúvidas sobre nossas trilhas de aprendizado ou precisa de ajuda para escolher 
                a melhor opção para seu filho? Nossa equipe está pronta para ajudar.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <a 
                      href="mailto:contato@futurecoders.com.br" 
                      className="text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      contato@futurecoders.com.br
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mr-4 flex-shrink-0">
                    <PhoneCall className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Telefone</h3>
                    <a 
                      href="tel:+551112345678" 
                      className="text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      (11) 1234-5678
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      Av. Tecnologia, 1234<br />
                      São Paulo, SP<br />
                      01000-000
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Horário de Atendimento</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Segunda - Sexta:</span>
                    <span>8:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábado:</span>
                    <span>9:00 - 14:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Domingo:</span>
                    <span>Fechado</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-7/12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="aspect-w-16 aspect-h-9 w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* In a real project, you would embed a Google Maps iframe here */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <p className="text-center">
                  Mapa interativo seria incorporado aqui<br />
                  <span className="text-sm">(Google Maps ou outra plataforma de mapas)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;