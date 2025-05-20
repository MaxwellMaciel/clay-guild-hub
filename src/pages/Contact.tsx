import React, { useState } from "react";
import { Instagram, Facebook, Twitter, Send, MessageSquare, Mail, MapPin, User, HelpCircle, ThumbsUp, AlertTriangle, Menu, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "../components/ui/use-toast";
import emailjs from '@emailjs/browser';

// Inicialize o EmailJS com sua chave pública
emailjs.init("tEwA71O80woPdRKmD");

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
    messageType: 'sugestao',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const messageTypes = [
    { value: "sugestao", label: "Sugestão", icon: <ThumbsUp size={16} />, color: "text-blue-500" },
    { value: "duvida", label: "Dúvida", icon: <HelpCircle size={16} />, color: "text-purple-500" },
    { value: "elogio", label: "Elogio", icon: <ThumbsUp size={16} />, color: "text-green-500" },
    { value: "reclamacao", label: "Reclamação", icon: <AlertTriangle size={16} />, color: "text-orange-500" },
    { value: "outro", label: "Outro", icon: <Menu size={16} />, color: "text-gray-500" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Preencha todos os campos obrigatórios.");
      }
      
      // Configuração do template do EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        class: formData.class || "Não informado",
        message_type: messageTypes.find(t => t.value === formData.messageType)?.label || formData.messageType,
        message: formData.message,
      };

      // Enviar e-mail usando EmailJS
      await emailjs.send(
        "service_cjfiz48",
        "template_ax5cu0m",
        templateParams
      );

      setIsSubmitting(false);
      setSuccess(true);
      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos seu contato. Retornaremos em breve.",
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        class: '',
        messageType: 'sugestao',
        message: ''
      });
      
      // Reset success after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error: any) {
      console.error("Erro ao enviar e-mail:", error);
      setError("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="clay-card p-8 md:p-12 bg-gradient-to-br from-[var(--accent-bg)] to-[var(--page-bg-end)] text-center mb-12 relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary-color)] opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[var(--secondary-color)] opacity-10 rounded-full filter blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-headings)' }}>
            Entre em Contato
          </h1>
          <p className="text-lg text-[var(--text-default)] max-w-3xl mx-auto">
            Envie suas dúvidas, sugestões ou feedback para o Grêmio Estudantil.
            Queremos ouvir sua voz e trabalhar juntos para melhorar nossa escola.
          </p>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Form */}
        <motion.div 
          className="clay-card p-6 md:p-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--text-headings)'}}>
            <MessageSquare className="mr-2" style={{ color: 'var(--primary-color)'}} />
            Envie sua Mensagem
          </h2>
          
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-6 p-4 rounded-lg flex items-center"
                style={{ background: 'var(--accent-bg)' }}
              >
                <CheckCircle className="mr-2 flex-shrink-0" style={{ color: 'var(--primary-color)'}} />
                <p style={{ color: 'var(--text-default)'}}>Mensagem enviada com sucesso! Agradecemos seu contato.</p>
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-6 p-4 rounded-lg flex items-center bg-red-100 dark:bg-red-900/20"
              >
                <AlertCircle className="mr-2 flex-shrink-0 text-red-600 dark:text-red-400" />
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-default)' }}>
                Nome Completo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-[var(--text-muted)]" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="clay-input w-full px-10 py-2.5"
                  style={{ color: 'var(--text-default)' }}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-default)' }}>
                E-mail *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-[var(--text-muted)]" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="clay-input w-full px-10 py-2.5"
                  style={{ color: 'var(--text-default)' }}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="class" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-default)' }}>
                Turma/Classe
              </label>
              <input
                type="text"
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="clay-input w-full px-4 py-2.5"
                style={{ color: 'var(--text-default)' }}
                placeholder="Ex: 2º ano B"
              />
            </div>
            
            <div>
              <label htmlFor="messageType" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-default)' }}>
                Tipo de Mensagem
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2">
                {messageTypes.map(tipo => (
                  <label 
                    key={tipo.value} 
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      formData.messageType === tipo.value 
                        ? "clay-pressed font-medium" 
                        : "hover:bg-[var(--accent-bg)]/50"
                    }`}
                    style={{ color: formData.messageType === tipo.value ? 'var(--primary-color)' : 'var(--text-muted)' }}
                  >
                    <input 
                      type="radio"
                      name="messageType"
                      value={tipo.value}
                      checked={formData.messageType === tipo.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className={tipo.color}>{tipo.icon}</span>
                    {tipo.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-default)' }}>
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="clay-input w-full px-4 py-2.5"
                style={{ color: 'var(--text-default)' }}
                required
              ></textarea>
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="clay-button w-full py-3 font-medium flex items-center justify-center gap-2 mt-6"
              style={{ 
                backgroundColor: 'var(--primary-color)', 
                color: 'var(--text-on-primary-bg)' 
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Enviar Mensagem
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
        
        {/* Contact Information */}
        <div className="space-y-6 text-left">
          <motion.div 
            className="clay-card p-6 md:p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--text-headings)'}}>
              <Mail className="mr-2" style={{ color: 'var(--primary-color)'}} />
              Informações de Contato
            </h2>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl" style={{ background: 'var(--accent-bg)' }}>
                  <MapPin style={{ color: 'var(--primary-color)'}} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-headings)'}}>Localização</h3>
                  <p style={{ color: 'var(--text-muted)'}}>
                    Sala do Grêmio Estudantil<br />
                    Sala 106, segundo andar<br />
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl" style={{ background: 'var(--accent-bg)' }}>
                  <Mail style={{ color: 'var(--primary-color)'}} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-headings)'}}>E-mail</h3>
                  <p style={{ color: 'var(--text-muted)'}}>
                    <a 
                      href="mailto:gremio@escolamodelo.edu" 
                      className="hover:text-[var(--primary-color)] transition-colors"
                    >
                      gremio@escolamodelo.edu
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Horário de Atendimento */}
          <motion.div
            className="clay-card p-6 md:p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }} // Adjusted delay
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--text-headings)'}}>
              <Clock className="mr-2" style={{ color: 'var(--primary-color)'}} />
              Horário de Atendimento
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)'}}>
              <strong style={{ color: 'var(--text-headings)'}}>Horário de atendimento:</strong><br />
              Segunda a Sexta: 10h às 15h<br />
              Intervalo: Todos os dias
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
