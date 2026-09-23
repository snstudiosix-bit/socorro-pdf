interface LandingContadorProps {
  onIrParaPDF: () => void;
}

export function LandingContador({ onIrParaPDF }: LandingContadorProps) {
  const whatsappNumber = '5566999856584'; // Insira seu número de atendimento
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de consultar seus serviços de contabilidade.')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px 0 60px' }}>
      
      {/* Hero Section Institucional */}
      <section style={{
        backgroundColor: 'var(--bg-card)',
        padding: '56px 32px',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow)',
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%'
      }}>
        <span style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: 'var(--primary)',
          display: 'block',
          marginBottom: '12px'
        }}>
          Assessoria & Consultoria Contábil
        </span>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: 'var(--text-main)',
          lineHeight: 1.25,
          margin: '0 0 16px 0'
        }}>
          Soluções Contábeis & Gestão Financeira
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto 32px',
          lineHeight: 1.6
        }}>
          Acompanhamento fiscal especializado, regularização de empresas, declaração de IRPF e suporte administrativo estratégico para o crescimento seguro do seu negócio.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 28px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Falar com Contador
          </a>

          <button
            onClick={onIrParaPDF}
            style={{
              padding: '12px 28px',
              backgroundColor: 'transparent',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            Ferramentas de PDF
          </button>
        </div>
      </section>

      {/* Serviços Oferecidos */}
      <section style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', color: 'var(--text-main)' }}>
          Especialidades Contábeis
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)' }}>
              💼 Assessoria para MEI & Empresas
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.5, margin: 0 }}>
              Abertura, regularização, emissão de guias DAS e alteração cadastral com acompanhamento contínuo.
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)' }}>
              📋 Imposto de Renda (IRPF)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.5, margin: 0 }}>
              Elaboração rigorosa da declaração de ajuste anual, análise de deduções e consulta de pendências.
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)' }}>
              📊 Gestão Financeira & Relatórios
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.5, margin: 0 }}>
              Organização do fluxo de caixa, conciliação bancária e demonstrativos organizados para tomada de decisão.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  padding: '28px 24px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--border-color)',
  boxShadow: 'var(--shadow)'
};