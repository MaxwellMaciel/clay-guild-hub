
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gremio-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Grêmio Estudantil</h3>
            <p className="text-sm opacity-80">
              Representando os estudantes e promovendo atividades que enriquecem a vida escolar.
            </p>
            <p className="text-sm mt-4">
              <strong>Horário de atendimento:</strong> Segunda a Sexta, 10h às 15h
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Escola Modelo</h3>
            <address className="not-italic text-sm opacity-80">
              <p>Av. Educação, 1000</p>
              <p>Bairro Conhecimento</p>
              <p>CEP: 00000-000</p>
            </address>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Conecte-se</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1.5" />
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
            <p className="text-sm opacity-80">
              <a href="mailto:gremio@escolamodelo.edu" className="hover:underline">gremio@escolamodelo.edu</a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm opacity-70">© 2025 Grêmio Estudantil - Escola Modelo. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link to="/politica-privacidade" className="text-sm opacity-70 hover:opacity-100">Política de Privacidade</Link>
            <Link to="/termos-uso" className="text-sm opacity-70 hover:opacity-100">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
