
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <main className="relative px-4 pb-12 pt-6">      
      {/* Hero Section */}
      <section className="hero-section max-w-6xl">
        <div className="hero-text">
          <h1 className="text-5xl md:text-6xl font-bold text-gremio-primary mb-8">
            Bem-vindo ao Grêmio Estudantil!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-12">
            Somos a sua voz na escola, trabalhando juntos para criar uma experiência escolar mais 
            <span className="text-gremio-primary font-medium"> dinâmica</span>, 
            <span className="text-blue-400 font-medium"> inclusiva</span> e 
            <span className="text-gremio-light font-medium"> divertida</span> para todos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-14">
            <Link to="/projetos" className="primary-button">
              Nossos Projetos <ArrowRight size={20} />
            </Link>
            <Link to="/contato" className="secondary-button">
              Envie sua Ideia <span className="inline-block">💡</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
