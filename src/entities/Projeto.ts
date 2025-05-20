
import { supabase } from "@/integrations/supabase/client";

export interface ProjetoData {
  id: string;
  titulo: string;
  descricao: string;
  status: 'planejado' | 'em_andamento' | 'concluido';
  data_inicio: string;
  data_conclusao?: string;
  responsaveis: string[];
  imagem?: string;
  created_at?: string;
}

export class Projeto {
  static async list(): Promise<ProjetoData[]> {
    try {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .order('data_inicio', { ascending: false });
      
      if (error) throw error;
      return data as ProjetoData[];
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }

  static async get(id: string): Promise<ProjetoData | null> {
    try {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as ProjetoData;
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      return null;
    }
  }

  static async create(projeto: Omit<ProjetoData, 'id'>): Promise<ProjetoData | null> {
    try {
      const { data, error } = await supabase
        .from('projetos')
        .insert([projeto])
        .select()
        .single();
      
      if (error) throw error;
      return data as ProjetoData;
    } catch (error) {
      console.error("Error creating project:", error);
      return null;
    }
  }

  static async update(id: string, projeto: Partial<ProjetoData>): Promise<ProjetoData | null> {
    try {
      const { data, error } = await supabase
        .from('projetos')
        .update(projeto)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ProjetoData;
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projetos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      return false;
    }
  }
}
