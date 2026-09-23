interface LandingContadorProps {
  onIrParaPDF: () => void;
}

export function LandingContador({ onIrParaPDF }: LandingContadorProps) {
  const whatsappNumber = '5566999856584';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de consultar os seus serviços de contabilidade.')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '20px 0 60px' }}>
      {/* Hero Section Principal */}
      <section style={{
        position: 'relative',
        backgroundColor: '#0d0d12',
        padding: '64px 32px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '24px'
      }}>
        {/* Elemento Gráfico de Fundo (Glow / Efeito Neon) */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(59,130,246,0.1) 60%, rgba(0,0,0,0) 100%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <span style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#a855f7'
        }}>
          M.A. Contabilidade
        </span>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          margin: 0,
          background: 'linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          maxWidth: '800px'
        }}>
          Soluções Contábeis & Gestão Financeira.
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-muted)',
          maxWidth: '600px',
          lineHeight: 1.6,
          margin: 0
        }}>
          Organização fiscal completa, assessoria especializada para MEI, IRPF e consultoria administrativa estratégica para o seu negócio.
        </p>

        {/* Botões de Ação com Estilo Neon */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '14px 28px',
              background: 'var(--primary-gradient)',
              color: '#ffffff',
              borderRadius: '30px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)',
              transition: 'transform 0.2s, boxShadow 0.2s'
            }}
          >
            Falar no WhatsApp
          </a>

          <button
            onClick={onIrParaPDF}
            style={{
              padding: '14px 28px',
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)'
            }}
          >
            Serviços de PDF
          </button>
        </div>
      </section>

      {/* Grade de Cards de Serviços */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
          Serviços Prestados
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          <div style={cardStyle}>
            <div style={iconBadgeStyle}>💼</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '12px 0 8px' }}>Assessoria MEI & Empresas</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
              Abertura, regularização, emissão de guias DAS e alteração cadastral com acompanhamento contínuo.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={iconBadgeStyle}>📋</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '12px 0 8px' }}>Imposto de Renda (IRPF)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
              Elaboração rigorosa da declaração de ajuste anual, cruzamento de dados e consulta de malha fina.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={iconBadgeStyle}>📊</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '12px 0 8px' }}>Gestão & Consultoria</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
              Conciliação bancária, relatórios de fluxo de caixa e suporte na tomada de decisões estratégicas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  padding: '32px 24px',
  borderRadius: '20px',
  border: '1px solid var(--border-color)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  boxShadow: 'var(--shadow)'
};

const iconBadgeStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
  border: '1px solid rgba(255, 255, 255, 0.1)'
};
