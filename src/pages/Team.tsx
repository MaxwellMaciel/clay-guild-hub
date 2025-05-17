import { useState } from "react";

const Team = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  return (
    <main className="py-12 px-4 bg-gremio-gray">
      <div className="container mx-auto">
        {/* Team Header */}
        <div className="clay-card mb-12 bg-white">
          <h1 className="text-3xl md:text-4xl font-bold text-gremio-primary text-center mb-6">
            Nossa Equipe
          </h1>
          <p className="text-center text-lg max-w-3xl mx-auto">
            Conheça os estudantes que compõem nosso Grêmio Estudantil, trabalhando juntos para
            representar os interesses de todos os alunos e promover atividades que enriquecem nossa vida
            escolar.
          </p>
        </div>

        {/* Team Filters */}
        <div className="mb-12 flex justify-center">
          <div className="clay-card inline-flex p-2 bg-white">
            <FilterButton
              active={activeFilter === "Todos"}
              onClick={() => setActiveFilter("Todos")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a3 3 0 0 0 6 0 3 3 0 0 0-6 0" />
                <path d="M12 8a3 3 0 0 0 6 0 3 3 0 0 0-6 0" />
                <path d="M7 11.5a7 7 0 0 0 10 0" />
              </svg>
              Todas as comissões
            </FilterButton>
          </div>
        </div>

        {/* Directors Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gremio-primary mb-8">
            Diretoria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMemberCard
              initial="A"
              name="Ana Silva"
              role="Presidente"
              department="Diretoria"
              description="Estudante do 3º ano com experiência em liderança estudantil e grande capacidade de organização."
            />
            <TeamMemberCard
              initial="P"
              name="Pedro Santos"
              role="Vice-Presidente"
              department="Diretoria"
              description="Cursando o 2º ano, é apaixonado por debate e defesa dos direitos estudantis."
            />
            <TeamMemberCard
              initial="L"
              name="Lucas Oliveira"
              role="Tesoureiro"
              department="Diretoria"
              description="Estudante do 2º ano com habilidades em matemática e organização financeira."
            />
            <TeamMemberCard
              initial="M"
              name="Mariana Costa"
              role="Secretária"
              department="Diretoria"
              description="Aluna do 3º ano com grande habilidade em organização e comunicação."
            />
          </div>
        </section>

        {/* Other Members Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gremio-primary mb-8">
            Outros Membros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMemberCard
              initial="J"
              name="Juliana Ferreira"
              role="Coordenadora"
              department="Comunicação"
              description="Aluna do 1º ano responsável pela divulgação das atividades do grêmio."
            />
            <TeamMemberCard
              initial="G"
              name="Gabriel Rocha"
              role="Coordenador"
              department="Eventos"
              description="Estudante do 3º ano com experiência em organização de eventos."
            />
            <TeamMemberCard
              initial="I"
              name="Isabela Lima"
              role="Coordenadora"
              department="Cultura"
              description="Aluna do 2º ano apaixonada por artes visuais e literatura."
            />
            <TeamMemberCard
              initial="R"
              name="Rafael Martins"
              role="Coordenador"
              department="Esportes"
              description="Estudante do 2º ano e atleta que coordena todas as atividades esportivas."
            />
          </div>
        </section>
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
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
      active
        ? "bg-gremio-primary text-white shadow-clay-inner"
        : "bg-transparent text-foreground hover:bg-gremio-soft"
    }`}
  >
    {children}
  </button>
);

type TeamMemberCardProps = {
  initial: string;
  name: string;
  role: string;
  department: string;
  description: string;
};

const TeamMemberCard = ({ initial, name, role, department, description }: TeamMemberCardProps) => (
  <div className="clay-card hover:shadow-clay-lg hover:-translate-y-1 transition-all duration-300 text-center">
    <div className="rounded-full h-28 w-28 mx-auto mb-4 bg-gradient-to-br from-gremio-soft to-gremio-primary flex items-center justify-center text-4xl font-bold text-white">
      {initial}
    </div>
    <div className="px-3 py-1 rounded-full text-xs font-medium mb-2 bg-gremio-soft text-gremio-primary inline-block">
      {department}
    </div>
    <h3 className="text-xl font-bold text-gremio-primary mb-1">{name}</h3>
    <p className="text-gremio-secondary font-medium mb-4">{role}</p>
    <p className="text-foreground/80 text-sm">{description}</p>
  </div>
);

export default Team;
