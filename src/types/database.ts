export interface Pedido {
  id?: string;
  created_at?: string;
  nome_cliente: string;
  whatsapp: string;
  tipo_servico: string;
  urgencia: string;
  descricao: string;
  arquivo_original_url?: string | null;
  arquivo_pronto_url?: string | null;
  status?: string;
  valor?: number;
  pago?: boolean;
}