import { useEffect, useState, ChangeEvent } from 'react';
import { supabase } from '../lib/supabase';
import type { Pedido } from '../types/database';

export function PainelAdmin() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [erro, setErro] = useState<string>('');

  const buscarPedidos = async () => {
    setLoading(true);
    setErro('');

    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setErro(`Erro ao carregar pedidos: ${error.message}`);
    } else {
      setPedidos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    buscarPedidos();
  }, []);

  const atualizarStatus = async (id: string, novoStatus: string) => {
    const { error } = await supabase
      .from('pedidos')
      .update({ status: novoStatus })
      .eq('id', id);

    if (error) {
      alert(`Erro ao atualizar status: ${error.message}`);
    } else {
      setPedidos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: novoStatus } : p))
      );
    }
  };

  const alternarPago = async (id: string, pagoAtual: boolean) => {
    const { error } = await supabase
      .from('pedidos')
      .update({ pago: !pagoAtual })
      .eq('id', id);

    if (error) {
      alert(`Erro ao atualizar pagamento: ${error.message}`);
    } else {
      setPedidos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, pago: !pagoAtual } : p))
      );
    }
  };

  // Função para fazer upload do trabalho finalizado e gerar o link
  const enviarTrabalhoFinal = async (e: ChangeEvent<HTMLInputElement>, pedido: Pedido) => {
    const file = e.target.files?.[0];
    if (!file || !pedido.id) return;

    setUploadingId(pedido.id);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `finalizado_${pedido.id}_${Date.now()}.${fileExt}`;
      const filePath = `trabalhos_prontos/${fileName}`;

      // Upload para o bucket
      const { error: uploadError } = await supabase.storage
        .from('arquivos_pedidos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Pega URL pública
      const { data: publicUrlData } = supabase.storage
        .from('arquivos_pedidos')
        .getPublicUrl(filePath);

      const finalUrl = publicUrlData.publicUrl;

      // Atualiza o pedido no banco: salva URL final, marca como concluído e pago
      const { error: updateError } = await supabase
        .from('pedidos')
        .update({
          arquivo_final_url: finalUrl,
          status: 'concluido',
          pago: true
        })
        .eq('id', pedido.id);

      if (updateError) throw updateError;

      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedido.id
            ? { ...p, arquivo_final_url: finalUrl, status: 'concluido', pago: true }
            : p
        )
      );

      alert('Trabalho final enviado com sucesso! O status foi atualizado para Concluído e Pago.');
    } catch (err: any) {
      alert(`Erro ao enviar arquivo final: ${err.message || err}`);
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      padding: '24px',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Painel de Gestão</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Acompanhe, finalize e entregue os pedidos</p>
        </div>
        <button
          onClick={buscarPedidos}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          🔄 Atualizar
        </button>
      </div>

      {erro && (
        <div style={{ padding: '12px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px', marginBottom: '16px', fontSize: '0.875rem' }}>
          {erro}
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>A carregar pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>Nenhum pedido encontrado.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 8px' }}>Cliente</th>
                <th style={{ padding: '12px 8px' }}>Serviço</th>
                <th style={{ padding: '12px 8px' }}>Original</th>
                <th style={{ padding: '12px 8px' }}>Entrega Final</th>
                <th style={{ padding: '12px 8px' }}>Status</th>
                <th style={{ padding: '12px 8px' }}>Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => {
                const idValido = pedido.id ?? '';
                const whatsappTratado = (pedido.whatsapp ?? '').replace(/\D/g, '');
                const estaPago = Boolean(pedido.pago);

                // Mensagem pronta para o WhatsApp
                const mensagemWhats = encodeURIComponent(
                  `Olá ${pedido.nome_cliente}! Seu serviço de PDF (${pedido.tipo_servico}) está pronto! 📄✨\n\nVocê pode baixar seu arquivo final no link:\n${pedido.arquivo_final_url}\n\nObrigado por utilizar o Socorro PDF!`
                );
                const linkWhatsApp = `https://wa.me/55${whatsappTratado}?text=${mensagemWhats}`;

                return (
                  <tr key={idValido || Math.random()} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ fontWeight: 600 }}>{pedido.nome_cliente}</div>
                      <a href={`https://wa.me/55${whatsappTratado}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#16a34a' }}>
                        💬 WhatsApp
                      </a>
                    </td>

                    <td style={{ padding: '12px 8px' }}>
                      <div>{pedido.tipo_servico}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pedido.urgencia}</span>
                    </td>

                    <td style={{ padding: '12px 8px' }}>
                      {pedido.arquivo_original_url ? (
                        <a href={pedido.arquivo_original_url} target="_blank" rel="noreferrer" style={{ fontWeight: 500 }}>
                          📎 Original
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Sem arquivo</span>
                      )}
                    </td>

                    {/* Coluna de Entrega do Trabalho Final */}
                    <td style={{ padding: '12px 8px' }}>
                      {pedido.arquivo_final_url ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <a href={pedido.arquivo_final_url} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>
                            ✅ Baixar Final
                          </a>
                          <a
                            href={linkWhatsApp}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              backgroundColor: '#25d366',
                              color: '#ffffff',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              textAlign: 'center',
                              fontWeight: 600,
                              display: 'inline-block'
                            }}
                          >
                            🚀 Entregar via Zap
                          </a>
                        </div>
                      ) : (
                        <div>
                          <label style={{
                            backgroundColor: 'var(--primary)',
                            color: '#fff',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'inline-block',
                            fontWeight: 500
                          }}>
                            {uploadingId === idValido ? 'A carregar...' : '📤 Enviar Pronto'}
                            <input
                              type="file"
                              onChange={(e) => enviarTrabalhoFinal(e, pedido)}
                              style={{ display: 'none' }}
                              disabled={uploadingId === idValido}
                            />
                          </label>
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '12px 8px' }}>
                      <select
                        value={pedido.status}
                        onChange={(e) => idValido && atualizarStatus(idValido, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: '#f8fafc',
                          fontWeight: 500
                        }}
                      >
                        <option value="pendente">Pendente</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="concluido">Concluído</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>

                    <td style={{ padding: '12px 8px' }}>
                      <button
                        onClick={() => idValido && alternarPago(idValido, estaPago)}
                        style={{
                          backgroundColor: estaPago ? '#dcfce7' : '#fee2e2',
                          color: estaPago ? '#166534' : '#991b1b',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        {estaPago ? '✓ Pago' : '⏳ Pendente'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
