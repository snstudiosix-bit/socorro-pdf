import { useState } from 'react';

export function ServicosAdministrativos() {
  const [descricao, setDescricao] = useState('');
  const [tipoServico, setTipoServico] = useState('Planilhas Excel');

  const whatsappNumber = '5566999856584';

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de solicitar um serviço administrativo:\n\n*Tipo:* ${tipoServico}\n*Detalhes:* ${descricao}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${mensagem}`, '_blank');
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      padding: '32px',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow)',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
        Suporte & Serviços Administrativos
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>
        Precisa de ajuda com tarefas de escritório, digitação ou organização de dados? Solicite um orçamento rápido.
      </p>

      <form onSubmit={handleEnviar} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Tipo de Serviço:</label>
          <select
            value={tipoServico}
            onChange={(e) => setTipoServico(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          >
            <option value="Planilhas Excel / Relatórios">Criação / Ajuste de Planilhas Excel</option>
            <option value="Digitação e Formatação">Digitação e Formatação de Textos</option>
            <option value="Emissão de Notas Fiscais">Emissão de Notas Fiscais</option>
            <option value="Elaboração de Documentos">Elaboração de Contratos ou Recibos</option>
            <option value="Outros">Outros Serviços Operacionais</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Descreva o que precisa:</label>
          <textarea
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Preciso formatar uma planilha com histórico de vendas e gerar relatórios..."
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🚀 Solicitar Orçamento via WhatsApp
        </button>
      </form>
    </div>
  );
}
