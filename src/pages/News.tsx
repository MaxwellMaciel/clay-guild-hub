
import { useState } from "react";

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Início do Projeto Horta Comunitária",
    date: "14 de maio de 2023",
    content: "É com grande alegria que anunciamos o início do Projeto Horta Comunitária da nossa escola! As atividades começaram com a preparação do terreno no espaço entre os blocos A e B. Nesta primeira fase, contaremos com o plantio de alface, cenoura, tomate e ervas aromáticas. Alunos de todas as séries podem participar do projeto, que terá atividades às terças e quintas-feiras durante o intervalo. O projeto visa promover a educação ambiental, alimentação saudável e o trabalho em equipe. Os alimentos produzidos serão utilizados na merenda escolar e o excedente será doado para a comunidade local. Agradecemos à direção pelo apoio e aos voluntários que já se inscreveram!",
    featured: false,
    highlighted: true,
  },
  {
    id: 2,
    title: "Arrecadação de Agasalhos - Campanha Solidária",
    date: "09 de maio de 2023",
    content: "O Grêmio Estudantil está organizando uma campanha de arrecadação de agasalhos para ajudar pessoas em situação de vulnerabilidade durante o inverno. Estamos coletando casacos, blusas, cobertores, meias e outros itens que possam aquecer quem precisa. Pontos de coleta foram distribuídos em cada sala de aula e na entrada da escola. A campanha vai até 09 de junho e todos podem participar doando itens em bom estado de conservação. Os agasalhos arrecadados serão entregues para duas instituições de caridade da nossa região. Sua solidariedade pode fazer a diferença na vida de muitas pessoas neste inverno. Participe!",
    featured: true,
    highlighted: true,
  },
  {
    id: 3,
    title: "Resultado do Campeonato Interclasses",
    date: "01 de maio de 2023",
    content: "O Campeonato Interclasses 2023 foi um sucesso! Após semanas de competições acirradas, temos os vencedores: Futsal: 3º ano A; Vôlei: 2º ano C; Basquete: 3º ano B; Xadrez: 1º ano D. Parabéns a todos os participantes pelo espírito esportivo e dedicação! Agradecemos aos professores de educação física pelo apoio e arbitragem, e a todos que torceram e prestigiaram os jogos. O prêmio para as turmas vencedoras será um passeio ao parque aquático, a ser realizado no final do semestre. Fiquem atentos para mais informações sobre as fotos oficiais e a cerimônia de premiação que acontecerá na próxima semana.",
    featured: false,
    highlighted: false,
  },
  {
    id: 4,
    title: "Eleições para o Grêmio Estudantil 2023",
    date: "24 de janeiro de 2023",
    content: "As inscrições para as chapas que concorrerão ao Grêmio Estudantil 2023 estão abertas! Todos os alunos regularmente matriculados podem participar formando chapas com pelo menos 8 integrantes, incluindo: presidente, vice-presidente, secretário geral, tesoureiro e coordenadores de departamentos. Para se inscrever, as chapas devem apresentar um plano de ação com propostas para o ano letivo e a ficha de inscrição completa até o dia 10 de fevereiro. A campanha eleitoral ocorrerá entre 13 e 24 de fevereiro, com o debate entre as chapas no dia 22/02. A votação será realizada no dia 28 de fevereiro, com urnas eletrônicas cedidas pelo TRE. Participe deste importante processo democrático na nossa escola!",
    featured: true,
    highlighted: false,
  },
  {
    id: 5,
    title: "Workshop de Orientação Profissional",
    date: "15 de abril de 2023",
    content: "Na próxima quinta-feira, dia 20 de abril, o Grêmio Estudantil em parceria com a coordenação pedagógica realizará um Workshop de Orientação Profissional direcionado aos alunos do ensino médio. O evento acontecerá no auditório da escola, das 14h às 17h, e contará com a participação de profissionais de diversas áreas que compartilharão suas experiências e trajetórias. Haverá também a aplicação de testes vocacionais e orientações sobre universidades, vestibulares e ENEM. As inscrições podem ser feitas pelo formulário online disponível nas redes sociais do grêmio ou diretamente com os representantes de classe. Vagas limitadas!",
    featured: false,
    highlighted: false,
  }
];

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyHighlights, setOnlyHighlights] = useState(false);

  const filteredNews = newsData
    .filter(news => 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      news.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(news => !onlyHighlights || news.highlighted);

  const featuredNews = filteredNews.filter(news => news.featured);
  const regularNews = filteredNews.filter(news => !news.featured);

  return (
    <main className="py-12 px-4 bg-gremio-gray">
      <div className="container mx-auto">
        {/* News Header */}
        <div className="clay-card mb-12 bg-white">
          <h1 className="text-3xl md:text-4xl font-bold text-gremio-primary text-center mb-6">
            Notícias e Avisos
          </h1>
          <p className="text-center text-lg max-w-3xl mx-auto">
            Acompanhe as últimas novidades, eventos e comunicados do Grêmio Estudantil e fique por dentro de tudo que acontece em nossa escola.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="clay-card mb-10 bg-white">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                className="clay-input pl-10"
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`rounded-full p-2 ${onlyHighlights ? 'bg-gremio-primary text-white' : 'bg-white text-foreground/60'}`}
                onClick={() => setOnlyHighlights(!onlyHighlights)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
              <span className="text-sm text-foreground/60">
                Apenas Destaques
              </span>
            </div>
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredNews.map((news) => (
              <FeaturedNewsCard
                key={news.id}
                title={news.title}
                date={news.date}
                content={news.content}
                isHighlighted={news.highlighted}
              />
            ))}
          </div>
        )}

        {/* Regular News */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regularNews.map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              date={news.date}
              content={news.content}
              isHighlighted={news.highlighted}
            />
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="clay-card bg-white text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4 text-foreground/30"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <h3 className="text-xl font-medium text-foreground/70 mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-foreground/60">
              Tente ajustar sua busca ou filtros para encontrar o que procura.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

type NewsCardProps = {
  title: string;
  date: string;
  content: string;
  isHighlighted?: boolean;
};

const NewsCard = ({ title, date, content, isHighlighted = false }: NewsCardProps) => {
  // Create a shortened version of the content
  const shortContent = content.length > 120 ? content.substring(0, 120) + "..." : content;

  return (
    <div className={`clay-card hover:shadow-clay-lg hover:-translate-y-1 transition-all duration-300 ${isHighlighted ? 'border-l-4 border-yellow-400' : ''}`}>
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
      {isHighlighted && (
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Destaque
        </div>
      )}
      <h3 className="text-xl font-bold text-gremio-primary mb-2">{title}</h3>
      <time className="text-sm text-foreground/60 mb-3 block">{date}</time>
      <p className="text-foreground/80 mb-4">{shortContent}</p>
      <button className="text-gremio-primary hover:underline flex items-center gap-1 text-sm font-medium">
        Ler mais
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const FeaturedNewsCard = ({ title, date, content, isHighlighted = false }: NewsCardProps) => {
  // Create a shortened version of the content but longer for featured cards
  const shortContent = content.length > 180 ? content.substring(0, 180) + "..." : content;

  return (
    <div className={`clay-card hover:shadow-clay-lg transition-all duration-300 ${isHighlighted ? 'border-l-4 border-yellow-400' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-12 w-12 rounded-full bg-gremio-primary flex items-center justify-center text-white">
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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gremio-primary/10 text-gremio-primary text-sm font-medium">
          Notícia em Destaque
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gremio-primary mb-2">{title}</h3>
      <time className="text-sm text-foreground/60 mb-4 block">{date}</time>
      <p className="text-foreground/80 mb-4">{shortContent}</p>
      <button className="clay-button text-sm">
        Ler notícia completa
      </button>
    </div>
  );
};

export default News;
