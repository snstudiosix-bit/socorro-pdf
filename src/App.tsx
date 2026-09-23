import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { LandingContador } from './components/LandingContador';
import { ModuloPDF } from './components/ModeloPDF';
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
    return <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Carregando...</p>;
  }

  if (!usuario) {
    return <LoginAdmin onLoginSucesso={() => setPagina('contabilidade')} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      {/* Header Corporativo Sóbrio */}
      <header style={{
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)',
        padding: '14px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <h1 
            onClick={() => setPagina('contabilidade')}
            style={{ 
              fontSize: '1.15rem', 
              fontWeight: 700, 
              color: 'var(--text-main)',
              cursor: 'pointer',
              margin: 0
            }}
          >
            GRUPO SNX & SOLUÇÕES ADMINISTRATIVAS
          </h1>

          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPagina('contabilidade')}
              style={{
                padding: '8px 16px',
                backgroundColor: pagina === 'contabilidade' ? 'var(--primary)' : 'transparent',
                color: '#ffffff',
                border: pagina === 'contabilidade' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              Contabilidade
            </button>

            <button
              onClick={() => setPagina('pdf')}
              style={{
                padding: '8px 16px',
                backgroundColor: pagina === 'pdf' ? 'var(--primary)' : 'transparent',
                color: '#ffffff',
                border: pagina === 'pdf' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              Ferramentas PDF
            </button>

            <button
              onClick={() => setPagina('admin_servicos')}
              style={{
                padding: '8px 16px',
                backgroundColor: pagina === 'admin_servicos' ? 'var(--primary)' : 'transparent',
                color: '#ffffff',
                border: pagina === 'admin_servicos' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              Serviços Administrativos
            </button>

            {isAdmin && (
              <button
                onClick={() => setPagina('admin')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: pagina === 'admin' ? '#334155' : 'transparent',
                  color: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                Painel Admin
              </button>
            )}

            <button
              onClick={handleSair}
              style={{
                padding: '8px 14px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, maxWidth: '1100px', margin: '24px auto', padding: '0 16px', width: '100%' }}>
        {pagina === 'contabilidade' && <LandingContador onIrParaPDF={() => setPagina('pdf')} />}
        {pagina === 'pdf' && <ModuloPDF />}
        {pagina === 'admin_servicos' && <ServicosAdministrativos />}
        {pagina === 'admin' && isAdmin && <PainelAdmin />}
      </main>
    </div>
  );
}

export default App;