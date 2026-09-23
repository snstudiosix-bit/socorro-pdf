import { useState, type FormEvent } from 'react';

interface LoginAdminProps {
  onLoginSucesso: () => void;
}

export function LoginAdmin({ onLoginSucesso }: LoginAdminProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && senha) {
      // Por enquanto faz validação simples ou chama o Supabase
      onLoginSucesso();
    } else {
      setErro('Preencha e-mail e senha.');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '40px auto',
      padding: '24px',
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--border-color)',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '16px', fontSize: '1.25rem', fontWeight: 700 }}>Entrar no Sistema</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
        />
        {erro && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{erro}</p>}
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
