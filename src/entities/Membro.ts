
export interface MembroData {
  id: string;
  nome: string;
  foto?: string;
  cargo: string;
  comissao?: string;
  descricao?: string;
}

export class Membro {
  static async list(): Promise<MembroData[]> {
    // In a real app, this would fetch from an API
    // For now, we'll return mock data
    return [
      {
        id: "1",
        nome: "Ana Silva",
        cargo: "Presidente",
        comissao: "Diretoria",
        descricao: "Estudante do 3º ano com experiência em liderança estudantil e grande capacidade de organização."
      },
      {
        id: "2",
        nome: "Pedro Santos",
        cargo: "Vice-Presidente",
        comissao: "Diretoria",
        descricao: "Cursando o 2º ano, é apaixonado por debate e defesa dos direitos estudantis."
      },
      {
        id: "3",
        nome: "Lucas Oliveira",
        cargo: "Tesoureiro",
        comissao: "Diretoria",
        descricao: "Estudante do 2º ano com habilidades em matemática e organização financeira."
      },
      {
        id: "4",
        nome: "Mariana Costa",
        cargo: "Secretário",
        comissao: "Diretoria",
        descricao: "Aluna do 3º ano com grande habilidade em organização e comunicação."
      },
      {
        id: "5",
        nome: "Juliana Ferreira",
        cargo: "Coordenadora",
        comissao: "Comunicação",
        descricao: "Aluna do 1º ano responsável pela divulgação das atividades do grêmio."
      },
      {
        id: "6",
        nome: "Gabriel Rocha",
        cargo: "Coordenador",
        comissao: "Eventos",
        descricao: "Estudante do 3º ano com experiência em organização de eventos."
      },
      {
        id: "7",
        nome: "Isabela Lima",
        cargo: "Coordenadora",
        comissao: "Cultura",
        descricao: "Aluna do 2º ano apaixonada por artes visuais e literatura."
      },
      {
        id: "8",
        nome: "Rafael Martins",
        cargo: "Coordenador",
        comissao: "Esportes",
        descricao: "Estudante do 2º ano e atleta que coordena todas as atividades esportivas."
      }
    ];
  }
}
