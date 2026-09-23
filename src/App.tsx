import { useState } from 'react';
import { FormularioPedido } from './components/FormularioPedido';
import { PainelAdmin } from './components/PainelAdmin';

export function App() {
  const [pagina, setPagina] = useState<'formulario' | 'admin'>('formulario');

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header / Navbar */}
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

          <nav style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setPagina('formulario')}
              style={{
                padding: '8px 16px',
                backgroundColor: pagina === 'formulario' ? 'var(--primary)' : 'transparent',
                color: pagina === 'formulario' ? '#ffffff' : 'var(--text-muted)',
                border: pagina === 'formulario' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              Novo Pedido
            </button>
            <button
              onClick={() => setPagina('admin')}
              style={{
                padding: '8px 16px',
                backgroundColor: pagina === 'admin' ? 'var(--primary)' : 'transparent',
                color: pagina === 'admin' ? '#ffffff' : 'var(--text-muted)',
                border: pagina === 'admin' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              Painel Admin
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 16px' }}>
        {pagina === 'formulario' ? <FormularioPedido /> : <PainelAdmin />}
      </main>
    </div>
  );
}

export default App;
