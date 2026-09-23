import React, { useState } from 'react';
import { FormularioPedido } from './components/FormularioPedido';
import { PainelAdmin } from './components/PainelAdmin';

export function App() {
  const [pagina, setPagina] = useState<'formulario' | 'admin'>('formulario');

  return (
    <div>
      <nav style={{ display: 'flex', gap: '10px', padding: '15px', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <button
          onClick={() => setPagina('formulario')}
          style={{
            padding: '8px 16px',
            backgroundColor: pagina === 'formulario' ? '#0070f3' : '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Novo Pedido
        </button>
        <button
          onClick={() => setPagina('admin')}
          style={{
            padding: '8px 16px',
            backgroundColor: pagina === 'admin' ? '#0070f3' : '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Painel Admin
        </button>
      </nav>

      <main style={{ padding: '20px' }}>
        {pagina === 'formulario' ? <FormularioPedido /> : <PainelAdmin />}
      </main>
    </div>
  );
}

export default App;