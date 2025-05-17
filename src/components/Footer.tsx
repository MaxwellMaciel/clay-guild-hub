
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gremio-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Grêmio Estudantil</h3>
            <p className="text-sm opacity-90">
              Representando os estudantes e promovendo atividades que enriquecem a vida escolar.
            </p>
            <p className="text-sm mt-4">
              <strong>Horário de atendimento:</strong><br />Segunda a Sexta, 10h às 15h
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Escola Modelo</h3>
            <address className="not-italic text-sm opacity-90">
              <p className="mb-2">Av. Educação, 1000</p>
              <p className="mb-2">Bairro Conhecimento</p>
              <p>CEP: 00000-000</p>
            </address>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Conecte-se</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-sm opacity-90">
              <a href="mailto:gremio@escolamodelo.edu" className="hover:underline">gremio@escolamodelo.edu</a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm opacity-80">© 2025 Grêmio Estudantil - Escola Modelo. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link to="/politica-privacidade" className="text-sm opacity-80 hover:opacity-100">Política de Privacidade</Link>
            <Link to="/termos-uso" className="text-sm opacity-80 hover:opacity-100">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
