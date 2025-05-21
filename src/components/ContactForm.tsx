import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  childGrade: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    // In a real application, this would send the data to your backend
    console.log('Form data:', data);
    
    // Simulate a successful submission
    setTimeout(() => {
      setIsSubmitted(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      {isSubmitted ? (
        <div className="text-center py-8">
          <CheckCircle size={64} className="text-success-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
          <p className="text-gray-600">
            Obrigado pelo seu contato. Nossa equipe responderá em breve.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="form-label">Nome Completo</label>
              <input
                id="name"
                type="text"
                className="form-input"
                {...register('name', { required: 'Nome é obrigatório' })}
              />
              {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                id="email"
                type="email"
                className="form-input"
                {...register('email', { 
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'E-mail inválido'
                  }
                })}
              />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="form-label">Telefone</label>
              <input
                id="phone"
                type="tel"
                className="form-input"
                placeholder="(00) 00000-0000"
                {...register('phone', { 
                  required: 'Telefone é obrigatório',
                  pattern: {
                    value: /^(\(\d{2}\)|\d{2}) ?\d{4,5}-?\d{4}$/,
                    message: 'Telefone inválido'
                  }
                })}
              />
              {errors.phone && <p className="form-error">{errors.phone.message}</p>}
            </div>
            
            <div>
              <label htmlFor="childGrade" className="form-label">Série da Criança</label>
              <select
                id="childGrade"
                className="form-input"
                {...register('childGrade', { required: 'Série é obrigatória' })}
              >
                <option value="">Selecione a série</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((grade) => (
                  <option key={grade} value={grade}>{grade}º Ano</option>
                ))}
              </select>
              {errors.childGrade && <p className="form-error">{errors.childGrade.message}</p>}
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="message" className="form-label">Mensagem</label>
            <textarea
              id="message"
              rows={4}
              className="form-input"
              placeholder="Conte-nos sobre seu interesse ou dúvidas..."
              {...register('message', { required: 'Mensagem é obrigatória' })}
            ></textarea>
            {errors.message && <p className="form-error">{errors.message.message}</p>}
          </div>
          
          <div className="mt-8">
            <button 
              type="submit" 
              className="btn-primary w-full"
            >
              Enviar Mensagem
              <Send size={16} className="ml-2" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;