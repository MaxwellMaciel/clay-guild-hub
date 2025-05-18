
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

      {/* Fique por Dentro Section */}
      <section className="max-w-6xl mx-auto py-12 bg-gradient-to-br from-[#f8f6ff] to-[#eaecff] rounded-3xl px-4 md:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-[#8464fb]">Fique por Dentro</h2>
          <Link to="/noticias" className="flex items-center gap-2 text-[#8464fb] hover:underline font-medium bg-white px-5 py-2 rounded-full shadow-clay-sm">
            Todas as Notícias
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* News Card 1 */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-sm p-6 shadow-clay hover:shadow-clay-lg transition-all duration-300">
            <div className="flex justify-center items-center h-40 mb-6 rounded-2xl bg-[#f0e9ff]">
              <Megaphone className="text-[#9b87f5] w-16 h-16 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-[#8464fb] mt-4">Início do Projeto Horta Comunitária</h3>
            <div className="flex items-center gap-2 my-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-sm text-gray-500">14/05/2023</span>
            </div>
            <p className="text-gray-600 line-clamp-3 mb-4">
              É com grande alegria que anunciamos o início do Projeto Horta Comunitária da nossa escola! As atividades começaram...
            </p>
            <Link to="/noticias" className="text-[#8464fb] flex items-center gap-1 hover:underline text-sm">
              Ler mais <ArrowRight size={14} />
            </Link>
          </div>

          {/* News Card 2 */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-sm p-6 shadow-clay hover:shadow-clay-lg transition-all duration-300">
            <div className="flex justify-center items-center h-40 mb-6 rounded-2xl bg-[#f0e9ff]">
              <Megaphone className="text-[#9b87f5] w-16 h-16 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-[#8464fb] mt-4">Arrecadação de Agasalhos - Campanha Solidária</h3>
            <div className="flex items-center gap-2 my-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-sm text-gray-500">09/05/2023</span>
            </div>
            <p className="text-gray-600 line-clamp-3 mb-4">
              O Grêmio Estudantil está organizando uma campanha de arrecadação de agasalhos para ajudar pessoas em situação de vulnerabilidade...
            </p>
            <Link to="/noticias" className="text-[#8464fb] flex items-center gap-1 hover:underline text-sm">
              Ler mais <ArrowRight size={14} />
            </Link>
          </div>

          {/* News Card 3 */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-sm p-6 shadow-clay hover:shadow-clay-lg transition-all duration-300">
            <div className="flex justify-center items-center h-40 mb-6 rounded-2xl bg-[#f0e9ff]">
              <Megaphone className="text-[#9b87f5] w-16 h-16 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-[#8464fb] mt-4">Resultado do Campeonato Interclasses</h3>
            <div className="flex items-center gap-2 my-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-sm text-gray-500">01/05/2023</span>
            </div>
            <p className="text-gray-600 line-clamp-3 mb-4">
              O Campeonato Interclasses 2023 foi um sucesso! Após semanas de competições acirradas, temos os vencedores: Futsal: 3º ano A...
            </p>
            <Link to="/noticias" className="text-[#8464fb] flex items-center gap-1 hover:underline text-sm">
              Ler mais <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

