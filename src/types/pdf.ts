export interface FerramentaPDF {
  id: string;
  titulo: string;
  descricao: string;
  categoria: 'organizar' | 'otimizar' | 'converter_para' | 'converter_de' | 'editar' | 'seguranca' | 'ia';
  icone: string;
  corIcone: string;
}