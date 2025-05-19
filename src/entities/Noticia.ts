export interface NoticiaData {
  id: number;
  titulo: string;
  conteudo: string;
  data: string;
  autor?: string;
  imagem?: string;
  destaque: boolean;
  destacado?: boolean;
}

export class Noticia {
  static async list(ordem?: string): Promise<NoticiaData[]> {
    // TODO: Implementar integração com Vercel KV
    // Por enquanto, retornando dados de exemplo
    const noticias: NoticiaData[] = [
      {
        id: 1,
        titulo: "Início do Projeto Horta Comunitária",
        data: "2023-05-14",
        conteudo: "É com grande alegria que anunciamos o início do Projeto Horta Comunitária da nossa escola! As atividades começaram com a preparação do terreno no espaço entre os blocos A e B. Nesta primeira fase, contaremos com o plantio de alface, cenoura, tomate e ervas aromáticas.\n\nAlunos de todas as séries podem participar do projeto, que terá atividades às terças e quintas-feiras durante o intervalo. O projeto visa promover a educação ambiental, alimentação saudável e o trabalho em equipe.\n\nOs alimentos produzidos serão utilizados na merenda escolar e o excedente será doado para a comunidade local. Agradecemos à direção pelo apoio e aos voluntários que já se inscreveram!",
        destaque: false,
        destacado: true,
        imagem: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=2874&auto=format&fit=crop"
      },
      {
        id: 2,
        titulo: "Arrecadação de Agasalhos - Campanha Solidária",
        data: "2023-05-09",
        conteudo: "O Grêmio Estudantil está organizando uma campanha de arrecadação de agasalhos para ajudar pessoas em situação de vulnerabilidade durante o inverno. Estamos coletando casacos, blusas, cobertores, meias e outros itens que possam aquecer quem precisa.\n\nPontos de coleta foram distribuídos em cada sala de aula e na entrada da escola. A campanha vai até 09 de junho e todos podem participar doando itens em bom estado de conservação.\n\nOs agasalhos arrecadados serão entregues para duas instituições de caridade da nossa região. Sua solidariedade pode fazer a diferença na vida de muitas pessoas neste inverno. Participe!",
        destaque: true,
        destacado: true,
        imagem: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?q=80&w=2940&auto=format&fit=crop"
      },
      {
        id: 3,
        titulo: "Resultado do Campeonato Interclasses",
        data: "2023-05-01",
        conteudo: "O Campeonato Interclasses 2023 foi um sucesso! Após semanas de competições acirradas, temos os vencedores: Futsal: 3º ano A; Vôlei: 2º ano C; Basquete: 3º ano B; Xadrez: 1º ano D.\n\nParabéns a todos os participantes pelo espírito esportivo e dedicação! Agradecemos aos professores de educação física pelo apoio e arbitragem, e a todos que torceram e prestigiaram os jogos.\n\nO prêmio para as turmas vencedoras será um passeio ao parque aquático, a ser realizado no final do semestre. Fiquem atentos para mais informações sobre as fotos oficiais e a cerimônia de premiação que acontecerá na próxima semana.",
        destaque: false,
        destacado: false,
        imagem: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=2787&auto=format&fit=crop"
      },
      {
        id: 4,
        titulo: "Eleições para o Grêmio Estudantil 2023",
        data: "2023-01-24",
        conteudo: "As inscrições para as chapas que concorrerão ao Grêmio Estudantil 2023 estão abertas! Todos os alunos regularmente matriculados podem participar formando chapas com pelo menos 8 integrantes, incluindo: presidente, vice-presidente, secretário geral, tesoureiro e coordenadores de departamentos.\n\nPara se inscrever, as chapas devem apresentar um plano de ação com propostas para o ano letivo e a ficha de inscrição completa até o dia 10 de fevereiro. A campanha eleitoral ocorrerá entre 13 e 24 de fevereiro, com o debate entre as chapas no dia 22/02.\n\nA votação será realizada no dia 28 de fevereiro, com urnas eletrônicas cedidas pelo TRE. Participe deste importante processo democrático na nossa escola!",
        destaque: true,
        destacado: false
      },
      {
        id: 5,
        titulo: "Workshop de Orientação Profissional",
        data: "2023-04-15",
        conteudo: "Na próxima quinta-feira, dia 20 de abril, o Grêmio Estudantil em parceria com a coordenação pedagógica realizará um Workshop de Orientação Profissional direcionado aos alunos do ensino médio.\n\nO evento acontecerá no auditório da escola, das 14h às 17h, e contará com a participação de profissionais de diversas áreas que compartilharão suas experiências e trajetórias. Haverá também a aplicação de testes vocacionais e orientações sobre universidades, vestibulares e ENEM.\n\nAs inscrições podem ser feitas pelo formulário online disponível nas redes sociais do grêmio ou diretamente com os representantes de classe. Vagas limitadas!",
        destaque: false,
        destacado: false
      }
    ];

    // Ordenar conforme solicitado (- para ordem decrescente)
    if (ordem) {
      const campo = ordem.startsWith("-") ? ordem.substring(1) : ordem;
      const reverso = ordem.startsWith("-");
      
      noticias.sort((a, b) => {
        let valueA = a[campo as keyof NoticiaData];
        let valueB = b[campo as keyof NoticiaData];
        
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return reverso 
            ? valueB.localeCompare(valueA) 
            : valueA.localeCompare(valueB);
        }
        
        return reverso 
          ? (valueB > valueA ? 1 : -1) 
          : (valueA > valueB ? 1 : -1);
      });
    }

    return noticias;
  }

  static async create(data: Omit<NoticiaData, 'id'>): Promise<NoticiaData> {
    // TODO: Implementar integração com Vercel KV
    // Por enquanto, simulando criação
    const novaNoticia: NoticiaData = {
      id: Math.floor(Math.random() * 1000), // Simulando ID
      ...data
    };
    return novaNoticia;
  }

  static async update(id: number, data: Partial<NoticiaData>): Promise<NoticiaData> {
    // TODO: Implementar integração com Vercel KV
    // Por enquanto, simulando atualização
    const noticiaAtualizada: NoticiaData = {
      id,
      titulo: data.titulo || "",
      conteudo: data.conteudo || "",
      data: data.data || new Date().toISOString().split('T')[0],
      autor: data.autor,
      imagem: data.imagem,
      destaque: data.destaque || false
    };
    return noticiaAtualizada;
  }

  static async delete(id: number): Promise<void> {
    // TODO: Implementar integração com Vercel KV
    // Por enquanto, simulando exclusão
    console.log(`Notícia ${id} excluída`);
  }
}
