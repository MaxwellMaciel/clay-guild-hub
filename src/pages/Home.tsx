
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Handshake, Target } from "lucide-react";

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

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gremio-primary text-center mb-6">
          Nossa Missão
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-16 px-4">
          O Grêmio Estudantil da Escola Modelo existe para construir pontes, inspirar ações e
          transformar o ambiente escolar em um lugar onde cada estudante se sinta ouvido,
          valorizado e engajado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* Card 1 */}
          <div className="clay-card bg-white">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Megaphone className="text-gremio-primary w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gremio-primary text-center mb-4">
              Representar e Amplificar
            </h3>
            <p className="text-gray-600 text-center">
              Ser a voz ativa dos estudantes, levando suas ideias, 
              necessidades e preocupações para construir uma escola mais 
              democrática e participativa.
            </p>
          </div>

          {/* Card 2 */}
          <div className="clay-card bg-white">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Handshake className="text-gremio-primary w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gremio-primary text-center mb-4">
              Promover e Integrar
            </h3>
            <p className="text-gray-600 text-center">
              Organizar eventos e projetos que incentivem a cultura, o 
              esporte, o lazer e a integração, fortalecendo os laços e o 
              sentimento de comunidade.
            </p>
          </div>

          {/* Card 3 */}
          <div className="clay-card bg-white">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Target className="text-gremio-primary w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gremio-primary text-center mb-4">
              Inovar e Transformar
            </h3>
            <p className="text-gray-600 text-center">
              Buscar soluções criativas e sustentáveis para os desafios da 
              vida escolar, incentivando o protagonismo juvenil e o 
              desenvolvimento de habilidades.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
