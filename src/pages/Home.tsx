
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-hero-gradient py-20 px-4">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto py-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gremio-primary mb-6 animate-float">
              Bem-vindo ao Grêmio Estudantil!
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-6">
              Somos a sua voz na escola, trabalhando juntos para criar uma experiência escolar mais 
              <span className="text-gremio-primary font-medium"> dinâmica</span>, 
              <span className="text-blue-400 font-medium"> inclusiva</span> e 
              <span className="text-gremio-light font-medium"> divertida</span> para todos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link to="/projetos" className="clay-button flex items-center justify-center gap-2">
                Nossos Projetos <ArrowRight size={18} />
              </Link>
              <Link to="/contato" className="bg-white rounded-full px-6 py-3 shadow-clay hover:shadow-clay-sm text-gremio-primary flex items-center justify-center gap-2 transition-all duration-300 hover:translate-y-[1px]">
                Envie sua Ideia <span className="inline-block">💡</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gremio-primary mb-12">
            Nossa Missão
          </h2>
          <p className="text-lg text-center max-w-4xl mx-auto mb-12 text-foreground/80">
            O Grêmio Estudantil da Escola Modelo existe para construir pontes, inspirar ações e transformar o ambiente escolar em um lugar onde cada estudante se sinta ouvido, valorizado e engajado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MissionCard 
              icon="📣"
              title="Representar e Amplificar"
              description="Ser a voz ativa dos estudantes, levando suas ideias, necessidades e preocupações para construir uma escola mais democrática e participativa."
            />
            <MissionCard 
              icon="🤝"
              title="Promover e Integrar"
              description="Organizar eventos e projetos que incentivem a cultura, o esporte, o lazer e a integração, fortalecendo os laços e o sentimento de comunidade."
            />
            <MissionCard 
              icon="🎯"
              title="Inovar e Transformar"
              description="Buscar soluções criativas e sustentáveis para os desafios da vida escolar, incentivando o protagonismo juvenil e o desenvolvimento de habilidades."
            />
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section className="py-16 px-4 bg-gremio-gray">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gremio-primary">Fique por Dentro</h2>
            <Link to="/noticias" className="text-gremio-primary hover:underline flex items-center gap-1">
              Todas as Notícias <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NewsCard 
              title="Início do Projeto Horta Comunitária"
              date="14/05/2023"
              excerpt="É com grande alegria que anunciamos o início do Projeto Horta Comunitária da nossa escola! As atividades começaram..."
            />
            <NewsCard 
              title="Arrecadação de Agasalhos - Campanha Solidária"
              date="09/05/2023"
              excerpt="O Grêmio Estudantil está organizando uma campanha de arrecadação de agasalhos para ajudar pessoas em..."
            />
            <NewsCard 
              title="Resultado do Campeonato Interclasses"
              date="01/05/2023"
              excerpt="O Campeonato Interclasses 2023 foi um sucesso! Após semanas de competições acirradas, temos os vencedores: Futsal: 3º ano A..."
            />
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gremio-primary">Nossas Iniciativas</h2>
            <Link to="/projetos" className="text-gremio-primary hover:underline flex items-center gap-1">
              Todos os Projetos <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              tag="Planejado"
              title="Semana Cultural"
              description="Uma semana dedicada a apresentações artísticas, exposições, debates e workshops organizados pelos alunos."
              startDate="14/10/2023"
              endDate="20/10/2023"
              people={["Isabela Lima", "Gabriel Rocha"]}
            />
            <ProjectCard
              tag="Em Andamento"
              title="Jornal Estudantil"
              description="Publicação mensal com notícias, entrevistas, dicas de estudo e cultura, produzida pelos alunos para os alunos."
              startDate="01/03/2023"
              endDate="01/12/2023"
              people={["Juliana Ferreira", "Pedro Santos"]}
            />
            <ProjectCard
              tag="Concluído"
              title="Campeonato Interclasses"
              description="Competição esportiva entre as turmas da escola em diversas modalidades."
              startDate="03/04/2023"
              endDate="28/04/2023"
              people={["Rafael Martins", "Ana Silva"]}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

type MissionCardProps = {
  icon: string;
  title: string;
  description: string;
};

const MissionCard = ({ icon, title, description }: MissionCardProps) => (
  <div className="clay-card card-gradient">
    <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gremio-soft shadow-clay flex items-center justify-center text-3xl">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-center text-gremio-primary mb-4">{title}</h3>
    <p className="text-center text-foreground/80">{description}</p>
  </div>
);

type NewsCardProps = {
  title: string;
  date: string;
  excerpt: string;
};

const NewsCard = ({ title, date, excerpt }: NewsCardProps) => (
  <div className="clay-card hover:shadow-clay-lg hover:-translate-y-1 transition-all duration-300">
    <div className="h-12 w-12 mb-6 rounded-full bg-gremio-soft flex items-center justify-center text-gremio-primary">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="m3 15 5.12-5.12A3 3 0 0 1 10.24 9H13a2 2 0 1 1 0 4h-2.5m4-.68 4.17-4.89a1.88 1.88 0 0 1 2.92 2.36l-4.2 4.6a2.13 2.13 0 0 1-3 .29L7 10" />
        <path d="m2 12 8 8 2-2-6-6Z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gremio-primary mb-2">{title}</h3>
    <time className="text-sm text-foreground/60 mb-3 block">{date}</time>
    <p className="text-foreground/80 mb-4">{excerpt}</p>
    <Link to="/noticias" className="text-gremio-primary hover:underline flex items-center gap-1 text-sm font-medium">
      Ler mais <ArrowRight size={14} />
    </Link>
  </div>
);

type ProjectCardProps = {
  tag: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  people: string[];
};

const ProjectCard = ({ tag, title, description, startDate, endDate, people }: ProjectCardProps) => {
  let tagColor = "";
  
  switch(tag) {
    case "Planejado":
      tagColor = "bg-yellow-100 text-yellow-800";
      break;
    case "Em Andamento":
      tagColor = "bg-green-100 text-green-800";
      break;
    case "Concluído":
      tagColor = "bg-blue-100 text-blue-800";
      break;
    default:
      tagColor = "bg-gray-100 text-gray-800";
  }

  return (
    <div className="clay-card hover:shadow-clay-lg hover:-translate-y-1 transition-all duration-300">
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${tagColor}`}>
        {tag}
      </div>
      <h3 className="text-xl font-bold text-gremio-primary mb-3">{title}</h3>
      <p className="text-foreground/80 mb-4">{description}</p>
      
      <div className="flex gap-4 mb-4 text-sm">
        <div>
          <span className="text-foreground/60 block mb-1">Início:</span>
          <time className="font-medium">{startDate}</time>
        </div>
        <div>
          <span className="text-foreground/60 block mb-1">Conclusão:</span>
          <time className="font-medium">{endDate}</time>
        </div>
      </div>
      
      <div className="border-t border-gremio-gray pt-3">
        <span className="text-foreground/60 text-sm block mb-2">Responsáveis:</span>
        <div className="flex flex-wrap gap-2">
          {people.map((person, i) => (
            <span key={i} className="bg-gremio-soft px-3 py-1 rounded-full text-sm">
              {person}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
