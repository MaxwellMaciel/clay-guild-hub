
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState("Todos");
  const [sort, setSort] = useState("recentes");

  return (
    <main className="py-12 px-4 bg-gremio-gray">
      <div className="container mx-auto">
        {/* Projects Header */}
        <div className="clay-card mb-12 bg-white">
          <h1 className="text-3xl md:text-4xl font-bold text-gremio-primary text-center mb-6">
            Nossos Projetos
          </h1>
          <p className="text-center text-lg max-w-3xl mx-auto">
            Conheça as iniciativas e projetos desenvolvidos pelo Grêmio Estudantil para melhorar nossa escola e enriquecer a experiência de todos os alunos.
          </p>
        </div>

        {/* Projects Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              active={filter === "Todos"} 
              onClick={() => setFilter("Todos")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 7 9 6.5" />
                <path d="m16 18-9-9" />
                <path d="M17 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                <path d="M17 10.055v-2.019l-9-4.012" />
                <path d="M12 8.055v-2.019l-9-4.012" />
                <path d="M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                <path d="M7 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
              </svg>
              Todos
            </FilterButton>
            <FilterButton 
              active={filter === "Planejados"} 
              onClick={() => setFilter("Planejados")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-2-2" />
              </svg>
              Planejados
            </FilterButton>
            <FilterButton 
              active={filter === "Em Andamento"} 
              onClick={() => setFilter("Em Andamento")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
              </svg>
              Em Andamento
            </FilterButton>
            <FilterButton 
              active={filter === "Concluídos"} 
              onClick={() => setFilter("Concluídos")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
              </svg>
              Concluídos
            </FilterButton>
          </div>

          <div className="flex gap-4">
            <SortButton 
              active={sort === "recentes"} 
              onClick={() => setSort("recentes")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 16 4 4 4-4" />
                <path d="M7 20V4" />
                <path d="M11 4h10" />
                <path d="M11 8h7" />
                <path d="M11 12h4" />
              </svg>
              Mais recentes
            </SortButton>
            <SortButton 
              active={sort === "antigos"} 
              onClick={() => setSort("antigos")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 8 4-4 4 4" />
                <path d="M7 4v16" />
                <path d="M11 12h4" />
                <path d="M11 16h7" />
                <path d="M11 20h10" />
              </svg>
              Mais antigos
            </SortButton>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-8">
          <ProjectCard
            tag="Planejado"
            title="Semana Cultural"
            description="Uma semana dedicada a apresentações artísticas, exposições, debates e workshops organizados pelos alunos. O evento visa promover a expressão cultural e artística dos estudantes, oferecendo um espaço para compartilhar talentos e aprender novas habilidades."
            startDate="14/10/2023"
            endDate="20/10/2023"
            people={["Isabela Lima", "Gabriel Rocha"]}
          />
          
          <ProjectCard
            tag="Em Andamento"
            title="Jornal Estudantil"
            description="Publicação mensal com notícias, entrevistas, dicas de estudo e cultura, produzida pelos alunos para os alunos. O jornal circula em formato digital e impresso, com tiragem de 200 exemplares por edição. Conta com uma equipe de 10 estudantes entre repórteres, fotógrafos e diagramadores."
            startDate="01/03/2023"
            endDate="01/12/2023"
            people={["Juliana Ferreira", "Pedro Santos"]}
          />
          
          <ProjectCard
            tag="Concluído"
            title="Campeonato Interclasses"
            description="Competição esportiva entre as turmas da escola em diversas modalidades como futsal, vôlei, basquete e xadrez. O evento promoveu integração, trabalho em equipe e espírito esportivo entre os alunos, com premiação para as equipes vencedoras."
            startDate="03/04/2023"
            endDate="28/04/2023"
            people={["Rafael Martins", "Ana Silva"]}
          />
          
          <ProjectCard
            tag="Em Andamento"
            title="Horta Comunitária"
            description="Implementação e manutenção de uma horta no espaço escolar, com cultivo de hortaliças e ervas. O projeto envolve alunos de todas as séries e tem como objetivos a educação ambiental, alimentação saudável e trabalho colaborativo."
            startDate="14/05/2023"
            endDate="15/12/2023"
            people={["Lucas Oliveira", "Mariana Costa"]}
          />
          
          <ProjectCard
            tag="Planejado"
            title="Festival de Talentos"
            description="Evento para que os estudantes possam mostrar seus talentos em áreas como música, dança, poesia e artes visuais. O festival ocorrerá no auditório da escola e contará com um júri formado por professores e alunos convidados."
            startDate="25/11/2023"
            endDate="25/11/2023"
            people={["Gabriel Rocha", "Isabela Lima"]}
          />
          
          <ProjectCard
            tag="Concluído"
            title="Campanha de Agasalhos"
            description="Arrecadação de roupas de inverno e cobertores para doação a instituições de caridade. A campanha mobilizou toda a escola e conseguiu arrecadar mais de 300 peças que foram doadas para dois abrigos da região."
            startDate="09/05/2023"
            endDate="09/06/2023"
            people={["Ana Silva", "Pedro Santos"]}
          />
        </div>
      </div>
    </main>
  );
};

type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const FilterButton = ({ active, onClick, children }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all shadow-clay ${
      active
        ? "bg-gremio-primary text-white"
        : "bg-white text-foreground hover:bg-gremio-soft"
    }`}
  >
    {children}
  </button>
);

const SortButton = ({ active, onClick, children }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
      active
        ? "bg-gremio-soft text-gremio-primary shadow-clay-inner"
        : "bg-white text-foreground hover:bg-gremio-soft shadow-clay"
    }`}
  >
    {children}
  </button>
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
  let tagIcon = null;
  
  switch(tag) {
    case "Planejado":
      tagColor = "bg-yellow-100 text-yellow-800 border border-yellow-200";
      tagIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      );
      break;
    case "Em Andamento":
      tagColor = "bg-green-100 text-green-800 border border-green-200";
      tagIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <path d="M4.93 19.07l2.83-2.83" />
          <path d="M16.24 7.76l2.83-2.83" />
        </svg>
      );
      break;
    case "Concluído":
      tagColor = "bg-blue-100 text-blue-800 border border-blue-200";
      tagIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
      break;
    default:
      tagColor = "bg-gray-100 text-gray-800 border border-gray-200";
  }

  return (
    <div className="clay-card hover:shadow-clay-lg transition-all duration-300 bg-white">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-1">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium mb-4 ${tagColor}`}>
            {tagIcon}
            {tag}
          </div>
          <h2 className="text-2xl font-bold text-gremio-primary mb-3">{title}</h2>
          <p className="text-foreground/80 mb-6">{description}</p>
          
          <div className="flex flex-wrap gap-6 mb-4">
            <div>
              <span className="text-foreground/60 text-sm block mb-1">Data de Início:</span>
              <time className="font-medium flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                {startDate}
              </time>
            </div>
            <div>
              <span className="text-foreground/60 text-sm block mb-1">Conclusão:</span>
              <time className="font-medium flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                {endDate}
              </time>
            </div>
          </div>
          
          <div>
            <span className="text-foreground/60 text-sm block mb-2">Responsáveis:</span>
            <div className="flex flex-wrap gap-2 mb-4">
              {people.map((person, i) => (
                <span key={i} className="bg-gremio-soft px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {person}
                </span>
              ))}
            </div>
          </div>
          
          <button className="text-gremio-primary hover:underline flex items-center gap-1 font-medium">
            Ver detalhes <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
