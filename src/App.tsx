import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { LandingContador } from './components/LandingContador';
import { FormularioPedido } from './components/FormularioPedido';
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      {/* Header / Navbar Glassmorphism */}
      <header style={{
        backgroundColor: 'rgba(10, 10, 12, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 20px',
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
              fontSize: '1.25rem', 
              fontWeight: 700, 
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
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
                color: '#ffffff',
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
                background: pagina === 'pdf' ? 'var(--primary-gradient)' : 'transparent',
                color: '#ffffff',
                border: pagina === 'pdf' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Conversão de PDF
            </button>

            <button
              onClick={() => setPagina('admin_servicos')}
              style={{
                padding: '8px 14px',
                background: pagina === 'admin_servicos' ? 'var(--primary-gradient)' : 'transparent',
                color: '#ffffff',
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
                  color: '#ffffff',
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
      <main style={{ flex: 1, maxWidth: '1100px', margin: '20px auto', padding: '0 16px', width: '100%' }}>
        {pagina === 'contabilidade' && <LandingContador onIrParaPDF={() => setPagina('pdf')} />}
        {pagina === 'pdf' && <FormularioPedido />}
        {pagina === 'admin_servicos' && <ServicosAdministrativos />}
        {pagina === 'admin' && isAdmin && <PainelAdmin />}
      </main>
    </div>
  );
}

export default App;
