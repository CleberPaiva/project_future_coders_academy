import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckSquare, ListChecks, CreditCard, Lock, 
  BarChart, Users, Calendar, Award, ArrowRight
} from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      icon: <ListChecks className="w-10 h-10 text-primary-500" />,
      title: 'Escolha uma Trilha',
      description: 'Selecione a trilha correspondente à série escolar do seu filho (1º ao 9º ano).',
    },
    {
      icon: <CreditCard className="w-10 h-10 text-primary-500" />,
      title: 'Realize o Pagamento',
      description: 'Faça a assinatura mensal ou anual para liberar acesso a todo conteúdo premium.',
    },
    {
      icon: <Lock className="w-10 h-10 text-primary-500" />,
      title: 'Receba o Acesso',
      description: 'Após o pagamento, você receberá por e-mail as credenciais de acesso à área do aluno.',
    },
    {
      icon: <CheckSquare className="w-10 h-10 text-primary-500" />,
      title: 'Acompanhe o Progresso',
      description: 'Monitore o desenvolvimento do aprendizado através do painel de controle dos pais.',
    },
  ];
  
  const features = [
    {
      icon: <Calendar className="w-10 h-10 text-accent-500" />,
      title: 'Trilhas por Ano Escolar',
      description: 'Conteúdo adequado para cada faixa etária, com progressão gradual de conhecimentos.',
    },
    {
      icon: <BarChart className="w-10 h-10 text-secondary-500" />,
      title: 'Sistema de Gamificação',
      description: 'Pontos, medalhas e ranking para manter a motivação e engajamento das crianças.',
    },
    {
      icon: <Users className="w-10 h-10 text-primary-500" />,
      title: 'Acompanhamento dos Pais',
      description: 'Painel exclusivo para pais visualizarem o progresso e as conquistas dos filhos.',
    },
    {
      icon: <Award className="w-10 h-10 text-warning-500" />,
      title: 'Certificados',
      description: 'Ao final de cada módulo, a criança recebe um certificado digital de conclusão.',
    },
  ];
  
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
            Como Funciona a <span className="text-primary-500">Future Coders Academy</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nossa plataforma educacional foi desenvolvida para tornar o aprendizado de programação 
            acessível, divertido e eficaz para crianças de todas as idades.
          </motion.p>
        </div>
      </section>
      
      {/* How it Works Steps */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Processo Simplificado
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Em apenas 4 passos simples, seu filho estará aprendendo programação de forma divertida e educativa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    Passo {index + 1}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Principais Recursos
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Conheça as características que tornam nossa plataforma única e eficaz no ensino de programação.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Model Details */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Modelo Freemium
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Oferecemos um modelo de acesso flexível para que você possa experimentar nossa plataforma antes de se comprometer:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-success-100 flex items-center justify-center">
                      <CheckSquare size={14} className="text-success-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Lições Gratuitas</h3>
                    <p className="text-gray-600">
                      O primeiro módulo de cada trilha é totalmente gratuito, permitindo que você experimente 
                      nossa metodologia sem compromisso.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                      <CheckSquare size={14} className="text-primary-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Assinatura Premium</h3>
                    <p className="text-gray-600">
                      Acesso completo a todas as trilhas, materiais e recursos exclusivos, atualização 
                      constante de conteúdo e suporte técnico prioritário.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-secondary-100 flex items-center justify-center">
                      <CheckSquare size={14} className="text-secondary-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Plano Familiar</h3>
                    <p className="text-gray-600">
                      Descontos especiais para famílias com mais de um filho, permitindo que todos 
                      aprendam juntos com um valor mais acessível.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-primary-500">
                  <h3 className="text-xl font-bold mb-4">Plano Mensal</h3>
                  <p className="text-gray-600 mb-4">Acesso a uma trilha específica de seu interesse.</p>
                  <p className="text-3xl font-bold mb-2">R$ 49,90<span className="text-gray-500 text-sm font-normal">/mês</span></p>
                  <p className="text-sm text-gray-500 mb-6">Por trilha individual</p>
                  <button className="btn-primary w-full">
                    Assinar Agora
                  </button>
                </div>
                
                <div className="bg-primary-500 text-white rounded-xl shadow-md p-6 border-t-4 border-primary-700 transform scale-105">
                  <div className="absolute top-0 right-0 bg-warning-500 text-white text-xs font-bold px-3 py-1 -mt-2 mr-2 rounded-full">
                    Mais Popular
                  </div>
                  <h3 className="text-xl font-bold mb-4">Plano Familiar</h3>
                  <p className="text-white/80 mb-4">Acesso ilimitado para até 3 crianças em qualquer trilha.</p>
                  <p className="text-3xl font-bold mb-2">R$ 99,90<span className="text-white/80 text-sm font-normal">/mês</span></p>
                  <p className="text-sm text-white/80 mb-6">Economia de 33% por criança</p>
                  <button className="btn bg-white text-primary-500 hover:bg-white/90 w-full">
                    Escolher Plano Familiar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre nossa plataforma.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: 'A plataforma funciona em qualquer dispositivo?',
                answer: 'Sim, a Future Coders Academy é totalmente responsiva e funciona em computadores, tablets e smartphones. Recomendamos o uso de computadores ou tablets para uma melhor experiência de aprendizado, especialmente para as atividades práticas de programação.'
              },
              {
                question: 'Meu filho precisa ter conhecimento prévio de programação?',
                answer: 'Não é necessário nenhum conhecimento prévio. Nossas trilhas foram desenvolvidas para iniciantes absolutos, começando com conceitos básicos e avançando gradualmente de acordo com a idade e o nível da criança.'
              },
              {
                question: 'Como posso acompanhar o progresso do meu filho?',
                answer: 'Os pais têm acesso a um painel exclusivo onde podem visualizar o progresso, as atividades concluídas, pontuações e conquistas. Também enviamos relatórios mensais por e-mail com um resumo das atividades e evolução.'
              },
              {
                question: 'Posso cancelar a assinatura a qualquer momento?',
                answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. O acesso permanecerá disponível até o final do período pago.'
              },
              {
                question: 'Como funciona o suporte aos alunos?',
                answer: 'Oferecemos suporte por chat e e-mail para dúvidas técnicas e sobre o conteúdo. Os assinantes premium têm acesso a sessões de tutoria agendadas com instrutores especializados.'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <ArrowRight size={16} className="transform rotate-90" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-500 to-primary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar a jornada na programação?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Inicie hoje mesmo e dê ao seu filho habilidades que farão a diferença no futuro.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/#tracks" className="btn bg-white text-primary-600 hover:bg-white/90">
              Ver Trilhas
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10">
              Falar com um Especialista
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;