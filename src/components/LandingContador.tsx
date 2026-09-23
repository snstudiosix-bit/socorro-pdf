interface LandingContadorProps {
  onIrParaPDF: () => void;
}

export function LandingContador({ onIrParaPDF }: LandingContadorProps) {
  const whatsappNumber = '5566856584';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de consultar os seus serviços de contabilidade.')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px' }}>
      {/* Banner Principal */}
      <section style={{
        backgroundColor: 'var(--bg-card)',
        padding: '48px 24px',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow)',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary)' }}>
          Soluções Contábeis & Gestão Financeira
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 28px' }}>
          Organização fiscal, assessoria para MEI, declaração de Imposto de Renda e suporte administrativo completo para si e para a sua empresa.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            💬 Falar no WhatsApp
          </a>
          <button
            onClick={onIrParaPDF}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            📄 Serviços de PDF & Documentos
          </button>
        </div>
      </section>

      {/* Grade de Serviços Contábeis */}
      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>
          Como posso ajudar o seu negócio:
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          <div style={cardStyle}>
            <h3>💼 Assessoria para MEI & Empresas</h3>
            <p>Abertura de empresas, alteração cadastral, emissão de DAS, regularização e emissão de notas fiscais.</p>
          </div>

          <div style={cardStyle}>
            <h3>📋 Imposto de Renda (IRPF)</h3>
            <p>Elaboração e entrega da Declaração de Ajuste Anual, análise de malha fina e consultoria fiscal.</p>
          </div>

          <div style={cardStyle}>
            <h3>📊 Conciliação & Gestão Financeira</h3>
            <p>Organização do fluxo de caixa, relatórios de receitas e despesas para tomada de decisão.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const cardStyle = {
  backgroundColor: 'var(--bg-card)',
  padding: '24px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border-color)',
  boxShadow: 'var(--shadow)'
};
