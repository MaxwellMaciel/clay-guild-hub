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
        id: "4",
        nome: "Mariana Costa",
        cargo: "Secretário",
        comissao: "Diretoria",
        descricao: "Aluna do 3º ano com grande habilidade em organização e comunicação."
      },
      {
        id: "9",
        nome: "Willame Silva",
        foto: "/Willame.jpeg",
        cargo: "Coordenador",
        comissao: "Infraestrutura",
        descricao: "Estudante do Técnico em Informática no IFCE, com interesse em tecnologia, inovação e soluções eficientes."
      }
    ];
  }
}
