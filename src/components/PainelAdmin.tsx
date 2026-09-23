import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Pedido } from '../types/database';

export function PainelAdmin() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Painel de Administração - Pedidos</h2>
        <button onClick={buscarPedidos} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Atualizar Lista
        </button>
      </div>

      {erro && <div style={{ color: 'red', marginBottom: '15px' }}>{erro}</div>}

      {loading ? (
        <p>A carregar pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} border={1} cellPadding={8}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th>Cliente</th>
              <th>WhatsApp</th>
              <th>Serviço</th>
              <th>Urgência</th>
              <th>Arquivo</th>
              <th>Status</th>
              <th>Pago</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              const idValido = pedido.id ?? '';
              const whatsappTratado = pedido.whatsapp ?? '';
              const whatsappNumero = whatsappTratado.replace(/\D/g, '');
              const estaPago = Boolean(pedido.pago);

              return (
                <tr key={idValido || Math.random()}>
                  <td>{pedido.nome_cliente}</td>
                  <td>
                    <a
                      href={`https://wa.me/55${whatsappNumero}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {pedido.whatsapp || 'N/A'}
                    </a>
                  </td>
                  <td>{pedido.tipo_servico}</td>
                  <td>{pedido.urgencia}</td>
                  <td>
                    {pedido.arquivo_original_url ? (
                      <a href={pedido.arquivo_original_url} target="_blank" rel="noreferrer">
                        Ver Ficheiro
                      </a>
                    ) : (
                      'Sem ficheiro'
                    )}
                  </td>
                  <td>
                    <select
                      value={pedido.status}
                      onChange={(e) => idValido && atualizarStatus(idValido, e.target.value)}
                    >
                      <option value="pendente">Pendente</option>
                      <option value="em_andamento">Em Andamento</option>
                      <option value="concluido">Concluído</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => idValido && alternarPago(idValido, estaPago)}
                      style={{
                        backgroundColor: estaPago ? '#d4edda' : '#f8d7da',
                        color: estaPago ? '#155724' : '#721c24',
                        border: '1px solid',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      {estaPago ? 'Pago' : 'Pendente'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
