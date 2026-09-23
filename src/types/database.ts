export interface Pedido {
  id?: string;
  created_at?: string;
  nome_cliente: string;
  whatsapp: string;
  tipo_servico: string;
  descricao?: string;
  urgencia?: string;
  pago?: boolean;
  status?: string;
  arquivo_original_url?: string;
  arquivo_final_url?: string;
}
