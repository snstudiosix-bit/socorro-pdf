import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { LandingContador } from './components/LandingContador';
import { ModeloPDF } from './components/ModeloPDF'; // <-- Novo componente iLovePDF
import { ServicosAdministrativos } from './components/ServicosAdministrativos';
import { PainelAdmin } from './components/PainelAdmin';
import { LoginAdmin } from './components/LoginAdmin';

export function App() {
  const [pagina, setPagina] = useState<'contabilidade' | 'pdf' | 'admin_servicos' | 'admin'>('contabilidade');
  const [usuario, setUsuario] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(true);

  const EMAIL_ADMIN = 'snstudiosix@gmail.com';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      setUsuario(user);
      setIsAdmin(user?.email?.toLowerCase() === EMAIL_ADMIN.toLowerCase());
      setCarregando(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setUsuario(user);
      setIsAdmin(user?.email?.toLowerCase() === EMAIL_ADMIN.toLowerCase());
      setCarregando(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSair = async () => {
    await supabase.auth.signOut();
    setPagina('contabilidade');
  };

  if (carregando) {
    return <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>A carregar...</p>;
  }

  if (!usuario) {
    return <LoginAdmin onLoginSucesso={() => setPagina('contabilidade')} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: pagina === 'pdf' ? '#f8fafc' : 'var(--bg-main)' }}>
      {/* Header / Navbar */}
      <header style={{
        backgroundColor: pagina === 'pdf' ? '#ffffff' : 'rgba(10, 10, 12, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${pagina === 'pdf' ? '#e2e8f0' : 'var(--border-color)'}`,
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <h1 
            onClick={() => setPagina('contabilidade')}
            style={{ 
              fontSize: '1.25rem', 
              fontWeight: 700, 
              color: pagina === 'pdf' ? '#1e293b' : 'transparent',
              background: pagina === 'pdf' ? 'none' : 'var(--primary-gradient)',
              WebkitBackgroundClip: pagina === 'pdf' ? 'unset' : 'text',
              WebkitTextFillColor: pagina === 'pdf' ? '#1e293b' : 'transparent',
              cursor: 'pointer' 
            }}
          >
            📊 M.A. Contabilidade & Serviços
          </h1>

          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPagina('contabilidade')}
              style={{
                padding: '8px 14px',
                background: pagina === 'contabilidade' ? 'var(--primary-gradient)' : 'transparent',
                color: pagina === 'pdf' ? (pagina === 'contabilidade' ? '#ffffff' : '#4a5568') : '#ffffff',
                border: pagina === 'contabilidade' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Contabilidade
            </button>

            <button
              onClick={() => setPagina('pdf')}
              style={{
                padding: '8px 14px',
                backgroundColor: pagina === 'pdf' ? '#e53e3e' : 'transparent',
                color: '#ffffff',
                border: pagina === 'pdf' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Ferramentas PDF
            </button>

            <button
              onClick={() => setPagina('admin_servicos')}
              style={{
                padding: '8px 14px',
                background: pagina === 'admin_servicos' ? 'var(--primary-gradient)' : 'transparent',
                color: pagina === 'pdf' ? (pagina === 'admin_servicos' ? '#ffffff' : '#4a5568') : '#ffffff',
                border: pagina === 'admin_servicos' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Serviços Administrativos
            </button>

            {isAdmin && (
              <button
                onClick={() => setPagina('admin')}
                style={{
                  padding: '8px 14px',
                  backgroundColor: pagina === 'admin' ? '#23232e' : 'transparent',
                  color: pagina === 'pdf' ? '#4a5568' : '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Painel Admin
              </button>
            )}

            <button
              onClick={handleSair}
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, width: '100%' }}>
        {pagina === 'contabilidade' && (
          <div style={{ maxWidth: '1100px', margin: '20px auto', padding: '0 16px' }}>
            <LandingContador onIrParaPDF={() => setPagina('pdf')} />
          </div>
        )}
        
        {/* Renderiza o novo ModuloPDF tipo iLovePDF */}
        {pagina === 'pdf' && <ModeloPDF />}

        {pagina === 'admin_servicos' && (
          <div style={{ maxWidth: '1100px', margin: '20px auto', padding: '0 16px' }}>
            <ServicosAdministrativos />
          </div>
        )}

        {pagina === 'admin' && isAdmin && (
          <div style={{ maxWidth: '1100px', margin: '20px auto', padding: '0 16px' }}>
            <PainelAdmin />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;