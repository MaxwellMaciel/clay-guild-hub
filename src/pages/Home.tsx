import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Handshake, Target } from "lucide-react";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="clay-card p-12 lg:p-16 mt-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8" 
            style={{ color: 'var(--text-headings)' }}
          >
            Bem-vindo ao Grêmio Estudantil do IFCE - Campus Marangupe!
          </h1>
          <p 
            className="text-lg md:text-xl" 
            style={{ color: 'var(--text-default)' }}
          >
            Somos a sua voz na escola, trabalhando juntos para criar uma experiência escolar mais 
            <span style={{ color: 'var(--primary-color)', fontWeight: '500' }}> dinâmica</span>, 
            <span style={{ color: 'var(--secondary-color)', fontWeight: '500' }}> inclusiva</span> e 
            <span style={{ color: 'var(--accent-color)', fontWeight: '500' }}> divertida</span> para todos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
            <Link 
              to="/projetos" 
              className="clay-button px-8 py-3.5 font-medium flex items-center justify-center gap-2"
              style={{ 
                color: 'var(--text-on-primary-bg)',
                background: 'var(--primary-color)'
              }}
            >
              Nossos Projetos <ArrowRight size={18} />
            </Link>
            <Link 
              to="/contato" 
              className="clay-button px-8 py-3.5 font-medium flex items-center justify-center gap-2"
            >
              Envie sua Ideia <span className="inline-block">💡</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="my-16">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-6"
          style={{ color: 'var(--text-headings)' }}
        >
          Nossa Missão
        </h2>
        <p 
          className="text-lg text-center max-w-4xl mx-auto mb-16"
          style={{ color: 'var(--text-muted)' }}
        >
          O Grêmio Estudantil da Escola Modelo existe para construir pontes, inspirar ações e
          transformar o ambiente escolar em um lugar onde cada estudante se sinta ouvido,
          valorizado e engajado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="clay-card p-8">
            <div className="flex justify-center mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent-bg)' }}
              >
                <Megaphone 
                  className="w-8 h-8" 
                  style={{ color: 'var(--primary-color)' }}
                />
              </div>
            </div>
            <h3 
              className="text-xl font-semibold text-center mb-4"
              style={{ color: 'var(--text-headings)' }}
            >
              Representar e Amplificar
            </h3>
            <p 
              className="text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              Ser a voz ativa dos estudantes, levando suas ideias, 
              necessidades e preocupações para construir uma escola mais 
              democrática e participativa.
            </p>
          </div>

          {/* Card 2 */}
          <div className="clay-card p-8">
            <div className="flex justify-center mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent-bg)' }}
              >
                <Handshake 
                  className="w-8 h-8" 
                  style={{ color: 'var(--primary-color)' }} 
                />
              </div>
            </div>
            <h3 
              className="text-xl font-semibold text-center mb-4"
              style={{ color: 'var(--text-headings)' }}
            >
              Promover e Integrar
            </h3>
            <p 
              className="text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              Organizar eventos e projetos que incentivem a cultura, o 
              esporte, o lazer e a integração, fortalecendo os laços e o 
              sentimento de comunidade.
            </p>
          </div>

          {/* Card 3 */}
          <div className="clay-card p-8">
            <div className="flex justify-center mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent-bg)' }}
              >
                <Target 
                  className="w-8 h-8" 
                  style={{ color: 'var(--primary-color)' }}
                />
              </div>
            </div>
            <h3 
              className="text-xl font-semibold text-center mb-4"
              style={{ color: 'var(--text-headings)' }}
            >
              Inovar e Transformar
            </h3>
            <p 
              className="text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              Buscar soluções criativas e sustentáveis para os desafios da 
              vida escolar, incentivando o protagonismo juvenil e o 
              desenvolvimento de habilidades.
            </p>
          </div>
        </div>
      </section>

      {/* Fique por Dentro Section - no background container */}
      <section className="my-16">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <h2 
            className="text-3xl md:text-4xl font-bold"
            style={{ color: 'var(--text-headings)' }}
          >
            Fique por Dentro
          </h2>
          <Link 
            to="/noticias" 
            className="clay-button px-5 py-2 rounded-full flex items-center gap-2 font-medium"
            style={{ color: 'var(--primary-color)' }}
          >
            Todas as Notícias
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* News Card 1 */}
          <div className="clay-card p-6">
            <div 
              className="flex justify-center items-center h-40 mb-6 rounded-2xl"
              style={{ background: 'var(--accent-bg)' }}
            >
              <Megaphone 
                className="w-16 h-16 opacity-50"
                style={{ color: 'var(--primary-color)' }} 
              />
            </div>
            <h3 
              className="text-xl font-bold mt-4"
              style={{ color: 'var(--text-headings)' }}
            >
              Início do Projeto Horta Comunitária
            </h3>
            <div className="flex items-center gap-2 my-3">
              <svg className="w-4 h-4" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>14/05/2023</span>
            </div>
            <p style={{ color: 'var(--text-default)', marginBottom: '1rem' }} className="line-clamp-3">
              É com grande alegria que anunciamos o início do Projeto Horta Comunitária da nossa escola! As atividades começaram...
            </p>
            <Link 
              to="/noticias" 
              className="flex items-center gap-1 hover:underline text-sm"
              style={{ color: 'var(--primary-color)' }}
            >
              Ler mais <ArrowRight size={14} />
            </Link>
          </div>

          {/* News Card 2 */}
          <div className="clay-card p-6">
            <div 
              className="flex justify-center items-center h-40 mb-6 rounded-2xl"
              style={{ background: 'var(--accent-bg)' }}
            >
              <Megaphone 
                className="w-16 h-16 opacity-50"
                style={{ color: 'var(--primary-color)' }} 
              />
            </div>
            <h3 
              className="text-xl font-bold mt-4"
              style={{ color: 'var(--text-headings)' }}
            >
              Arrecadação de Agasalhos - Campanha Solidária
            </h3>
            <div className="flex items-center gap-2 my-3">
              <svg className="w-4 h-4" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>09/05/2023</span>
            </div>
            <p style={{ color: 'var(--text-default)', marginBottom: '1rem' }} className="line-clamp-3">
              O Grêmio Estudantil está organizando uma campanha de arrecadação de agasalhos para ajudar pessoas em situação de vulnerabilidade...
            </p>
            <Link 
              to="/noticias" 
              className="flex items-center gap-1 hover:underline text-sm"
              style={{ color: 'var(--primary-color)' }}
            >
              Ler mais <ArrowRight size={14} />
            </Link>
          </div>

          {/* News Card 3 */}
          <div className="clay-card p-6">
            <div 
              className="flex justify-center items-center h-40 mb-6 rounded-2xl"
              style={{ background: 'var(--accent-bg)' }}
            >
              <Megaphone 
                className="w-16 h-16 opacity-50"
                style={{ color: 'var(--primary-color)' }} 
              />
            </div>
            <h3 
              className="text-xl font-bold mt-4"
              style={{ color: 'var(--text-headings)' }}
            >
              Resultado do Campeonato Interclasses
            </h3>
            <div className="flex items-center gap-2 my-3">
              <svg className="w-4 h-4" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>01/05/2023</span>
            </div>
            <p style={{ color: 'var(--text-default)', marginBottom: '1rem' }} className="line-clamp-3">
              O Campeonato Interclasses 2023 foi um sucesso! Após semanas de competições acirradas, temos os vencedores: Futsal: 3º ano A...
            </p>
            <Link 
              to="/noticias" 
              className="flex items-center gap-1 hover:underline text-sm"
              style={{ color: 'var(--primary-color)' }}
            >
              Ler mais <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Nossas Iniciativas Section */}
      <section className="my-16">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <h2 
            className="text-3xl md:text-4xl font-bold"
            style={{ color: 'var(--text-headings)' }}
          >
            Nossas Iniciativas
          </h2>
          <Link 
            to="/projetos" 
            className="clay-button px-5 py-2 rounded-full flex items-center gap-2 font-medium"
            style={{ color: 'var(--primary-color)' }}
          >
            Todos os Projetos
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Initiative Card */}
          <div 
            className="rounded-3xl overflow-hidden"
            style={{ background: 'var(--accent-bg)' }}
          >
            <div className="flex justify-center items-center h-64 relative">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'var(--primary-color)', opacity: '0.2' }}
              >
                <Target 
                  className="w-10 h-10 opacity-60"
                  style={{ color: 'var(--primary-color)' }}
                />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span 
                  className="px-4 py-1 rounded-full text-sm flex items-center gap-1"
                  style={{ 
                    background: 'var(--accent-color)', 
                    opacity: '0.5', 
                    color: 'var(--primary-color)' 
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  Em Andamento
                </span>
              </div>
              <h3 
                className="text-2xl font-bold mt-2"
                style={{ color: 'var(--text-headings)' }}
              >
                Horta Comunitária Escolar
              </h3>
              <p style={{ color: 'var(--text-default)', margin: '1rem 0' }}>
                Projeto para criar e manter uma horta nos espaços da escola,
                envolvendo alunos de todas as séries. A iniciativa busca promover
                a educação ambiental, alimentação saudável e trabalho em equipe.
              </p>
              <Link 
                to="/projetos" 
                className="flex items-center gap-1 hover:underline mt-2"
                style={{ color: 'var(--primary-color)' }}
              >
                Ver detalhes <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
