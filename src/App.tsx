import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { FormularioPedido } from './components/FormularioPedido';
import { PainelAdmin } from './components/PainelAdmin';
import { LoginAdmin } from './components/LoginAdmin';

export function App() {
  const [pagina, setPagina] = useState<'formulario' | 'admin'>('formulario');
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
    setPagina('formulario');
  };

  if (carregando) {
    return <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>A carregar...</p>;
  }

  if (!usuario) {
    return <LoginAdmin onLoginSucesso={() => setPagina('formulario')} />;
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
            📄 Socorro PDF
          </h1>

          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => setPagina('formulario')}
              style={{
                padding: '8px 16px',
                backgroundColor: pagina === 'formulario' ? 'var(--primary)' : 'transparent',
                color: pagina === 'formulario' ? '#ffffff' : 'var(--text-muted)',
                border: pagina === 'formulario' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Novo Pedido
            </button>

            {isAdmin && (
              <button
                onClick={() => setPagina('admin')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: pagina === 'admin' ? 'var(--primary)' : 'transparent',
                  color: pagina === 'admin' ? '#ffffff' : 'var(--text-muted)',
                  border: pagina === 'admin' ? 'none' : '1px solid var(--border-color)',
                  borderRadius: '8px',
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
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                border: 'none',
                borderRadius: '8px',
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

      <main style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 16px' }}>
        {pagina === 'admin' && isAdmin ? (
          <PainelAdmin />
        ) : (
          <FormularioPedido />
        )}
      </main>
    </div>
  );
}

export default App;
