
import { useState } from "react";
import { toast } from "../components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
    messageType: 'Sugestão',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos seu contato. Retornaremos em breve.",
      });
      setFormData({
        name: '',
        email: '',
        class: '',
        messageType: 'Sugestão',
        message: ''
      });
    }, 1500);
  };

  return (
    <main className="py-12 px-4 bg-gremio-gray">
      <div className="container mx-auto">
        {/* Contact Header */}
        <div className="clay-card mb-12 bg-white">
          <h1 className="text-3xl md:text-4xl font-bold text-gremio-primary text-center mb-6">
            Entre em Contato
          </h1>
          <p className="text-center text-lg max-w-3xl mx-auto">
            Envie suas dúvidas, sugestões ou feedback para o Grêmio Estudantil. Queremos ouvir sua voz e trabalhar juntos para melhorar nossa escola.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="clay-card bg-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-gremio-primary flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 18h2a2 2 0 0 0 2-2v-2" />
                  <rect width="16" height="16" x="2" y="4" rx="2" />
                  <path d="M12 12h.01" />
                  <path d="M7 12h.01" />
                  <path d="M17 12h.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gremio-primary">Envie sua Mensagem</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="clay-input"
                  placeholder="Digite seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="clay-input"
                  placeholder="seuemail@exemplo.com"
                />
              </div>
              
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-foreground/80 mb-1">
                  Turma/Classe
                </label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="clay-input"
                  placeholder="Ex: 2º ano B"
                />
              </div>
              
              <div>
                <label htmlFor="messageType" className="block text-sm font-medium text-foreground/80 mb-1">
                  Tipo de Mensagem
                </label>
                <select
                  id="messageType"
                  name="messageType"
                  value={formData.messageType}
                  onChange={handleChange}
                  className="clay-input"
                >
                  <option>Sugestão</option>
                  <option>Dúvida</option>
                  <option>Problema</option>
                  <option>Elogio</option>
                  <option>Outros</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1">
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="clay-input !rounded-2xl resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>
              
              <button 
                type="submit" 
                className="clay-button w-full flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar Mensagem'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="clay-card bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gremio-soft flex items-center justify-center text-gremio-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gremio-primary">Localização</h2>
              </div>
              <div className="pl-2 border-l-2 border-gremio-soft">
                <p className="font-medium">Sala do Grêmio Estudantil</p>
                <p className="text-foreground/70">Bloco B, próximo à cantina</p>
                <p className="text-foreground/70">Escola Modelo</p>
              </div>
            </div>
            
            <div className="clay-card bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gremio-soft flex items-center justify-center text-gremio-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gremio-primary">E-mail</h2>
              </div>
              <a href="mailto:gremio@escolamodelo.edu" className="text-gremio-primary hover:underline">
                gremio@escolamodelo.edu
              </a>
            </div>
            
            <div className="clay-card bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gremio-soft flex items-center justify-center text-gremio-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gremio-primary">Telefone</h2>
              </div>
              <p>(00) 1234-5678 <span className="text-foreground/60">(Ramal 123)</span></p>
            </div>
            
            <div className="clay-card bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gremio-soft flex items-center justify-center text-gremio-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3v16h16" />
                    <path d="m5 19 6-6" />
                    <path d="m2 6 3-3 3 3" />
                    <path d="m18 16 3 3-3 3" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gremio-primary">Siga-nos nas Redes Sociais</h2>
              </div>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-gremio-soft hover:bg-gremio-primary hover:text-white transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="18" cy="6" r="1.5" />
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-gremio-soft hover:bg-gremio-primary hover:text-white transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-gremio-soft hover:bg-gremio-primary hover:text-white transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="clay-card bg-gradient-to-r from-gremio-primary to-purple-600 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M20.4 14.5 16 10 4 20" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">Junte-se ao Grêmio</h2>
              </div>
              <p className="mb-4">Quer participar ativamente das atividades do Grêmio? Estamos sempre em busca de alunos engajados para nos ajudar em projetos!</p>
              <button className="bg-white text-gremio-primary font-medium px-5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all">
                Saiba como participar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
