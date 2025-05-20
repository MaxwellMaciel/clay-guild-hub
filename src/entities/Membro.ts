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
    return [
      {
        id: "10",
        nome: "Raquel Matos",
        foto: "/Raquel.jpeg",
        cargo: "Tesoureira",
        comissao: "Diretoria",
        descricao: "A melhor atleta do if 😜"
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
