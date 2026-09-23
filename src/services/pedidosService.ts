import { supabase } from '../lib/supabase';
import type { Pedido } from '../types/database';

export interface NovoPedidoData {
  nome_cliente: string;
  whatsapp: string;
  tipo_servico: string;
  urgencia: string;
  descricao: string;
  arquivo?: File | null;
}

export async function uploadArquivoPedido(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `originais/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('arquivos-pedidos')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Falha no upload do arquivo: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from('arquivos-pedidos')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function criarPedidoComArquivo(dados: NovoPedidoData): Promise<Pedido> {
  let arquivoUrl: string | null = null;

  if (dados.arquivo) {
    arquivoUrl = await uploadArquivoPedido(dados.arquivo);
  }

  const { data, error } = await supabase
    .from('pedidos')
    .insert([
      {
        nome_cliente: dados.nome_cliente,
        whatsapp: dados.whatsapp,
        tipo_servico: dados.tipo_servico,
        urgencia: dados.urgencia,
        descricao: dados.descricao,
        arquivo_original_url: arquivoUrl,
        status: 'pendente',
        pago: false,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao salvar pedido: ${error.message}`);
  }

  return data;
}