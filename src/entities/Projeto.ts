
export interface ProjetoData {
  id: string;
  titulo: string;
  descricao: string;
  status: 'planejado' | 'em_andamento' | 'concluido';
  data_inicio: string;
  data_conclusao: string;
  responsaveis: string[];
  imagem?: string;
  created_date?: string;
}

export class Projeto {
  static async list(): Promise<ProjetoData[]> {
    // In a real app, this would fetch from an API
    // For now, we'll return mock data
    return [
      {
        id: "1",
        titulo: "Semana Cultural",
        descricao: "Uma semana dedicada a apresentações artísticas, exposições, debates e workshops organizados pelos alunos. O evento visa promover a expressão cultural e artística dos estudantes, oferecendo um espaço para compartilhar talentos e aprender novas habilidades.",
        status: "planejado",
        data_inicio: "2023-10-14",
        data_conclusao: "2023-10-20",
        responsaveis: ["Isabela Lima", "Gabriel Rocha"],
        created_date: "2023-09-01"
      },
      {
        id: "2",
        titulo: "Jornal Estudantil",
        descricao: "Publicação mensal com notícias, entrevistas, dicas de estudo e cultura, produzida pelos alunos para os alunos. O jornal circula em formato digital e impresso, com tiragem de 200 exemplares por edição. Conta com uma equipe de 10 estudantes entre repórteres, fotógrafos e diagramadores.",
        status: "em_andamento",
        data_inicio: "2023-03-01",
        data_conclusao: "2023-12-01",
        responsaveis: ["Juliana Ferreira", "Pedro Santos"],
        created_date: "2023-02-15"
      },
      {
        id: "3",
        titulo: "Campeonato Interclasses",
        descricao: "Competição esportiva entre as turmas da escola em diversas modalidades como futsal, vôlei, basquete e xadrez. O evento promoveu integração, trabalho em equipe e espírito esportivo entre os alunos, com premiação para as equipes vencedoras.",
        status: "concluido",
        data_inicio: "2023-04-03",
        data_conclusao: "2023-04-28",
        responsaveis: ["Rafael Martins", "Ana Silva"],
        created_date: "2023-03-10"
      },
      {
        id: "4",
        titulo: "Horta Comunitária",
        descricao: "Implementação e manutenção de uma horta no espaço escolar, com cultivo de hortaliças e ervas. O projeto envolve alunos de todas as séries e tem como objetivos a educação ambiental, alimentação saudável e trabalho colaborativo.",
        status: "em_andamento",
        data_inicio: "2023-05-14",
        data_conclusao: "2023-12-15",
        responsaveis: ["Lucas Oliveira", "Mariana Costa"],
        created_date: "2023-05-01"
      },
      {
        id: "5",
        titulo: "Festival de Talentos",
        descricao: "Evento para que os estudantes possam mostrar seus talentos em áreas como música, dança, poesia e artes visuais. O festival ocorrerá no auditório da escola e contará com um júri formado por professores e alunos convidados.",
        status: "planejado",
        data_inicio: "2023-11-25",
        data_conclusao: "2023-11-25",
        responsaveis: ["Gabriel Rocha", "Isabela Lima"],
        created_date: "2023-10-05"
      },
      {
        id: "6",
        titulo: "Campanha de Agasalhos",
        descricao: "Arrecadação de roupas de inverno e cobertores para doação a instituições de caridade. A campanha mobilizou toda a escola e conseguiu arrecadar mais de 300 peças que foram doadas para dois abrigos da região.",
        status: "concluido",
        data_inicio: "2023-05-09",
        data_conclusao: "2023-06-09",
        responsaveis: ["Ana Silva", "Pedro Santos"],
        created_date: "2023-04-20"
      }
    ];
  }
}
