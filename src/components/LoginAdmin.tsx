import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';

interface LoginAdminProps {
  onLoginSucesso: () => void;
}

export function LoginAdmin({ onLoginSucesso }: LoginAdminProps) {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setLoading(true);

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      if (modo === 'cadastro') {
        // Corrigido 'senha' para 'password'
        const { error } = await supabase.auth.signUp({
          email,
          password: senha,
        });

        if (error) throw error;

        setMensagem('Conta criada com sucesso! Verifique o seu e-mail para confirmar.');
        setModo('login');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });

        if (error) throw error;

        onLoginSucesso();
      }
    } catch (err: any) {
      setErro(err.message || 'Ocorreu um erro no acesso.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErro('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErro(err.message || 'Erro ao conectar com Google.');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '40px auto',
      padding: '28px',
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--border-color)',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '8px', fontSize: '1.25rem', fontWeight: 700 }}>
        {modo === 'login' ? 'Acessar Conta' : 'Criar Conta'}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>
        {modo === 'login' ? 'Entre para continuar no Socorro PDF' : 'Crie sua conta para enviar pedidos'}
      </p>

      <button
        type="button"
        onClick={handleGoogleLogin}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#ffffff',
          color: '#333',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}
      >
        <span>🌐</span> Continuar com Google
      </button>

      <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
        <div style={{ flex: 1, borderBottom: '1px solid var(--border-color)' }}></div>
        <span style={{ padding: '0 8px' }}>OU</span>
        <div style={{ flex: 1, borderBottom: '1px solid var(--border-color)' }}></div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
        />

        {erro && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{erro}</p>}
        {mensagem && <p style={{ color: '#16a34a', fontSize: '0.875rem' }}>{mensagem}</p>}

        <button
          type="submit"
          disabled={loading}
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
          {loading ? 'Aguarde...' : modo === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <div style={{ marginTop: '20px', fontSize: '0.875rem' }}>
        {modo === 'login' ? (
          <p>
            Não tem uma conta?{' '}
            <button
              onClick={() => { setModo('cadastro'); setErro(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
            >
              Criar conta
            </button>
          </p>
        ) : (
          <p>
            Já possui conta?{' '}
            <button
              onClick={() => { setModo('login'); setErro(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
            >
              Fazer login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
