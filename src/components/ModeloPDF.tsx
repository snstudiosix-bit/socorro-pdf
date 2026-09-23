import { useState } from 'react';
import { FERRAMENTAS_PDF } from '../data/ferramentas';
import { 
  Combine, Split, Trash2, FileOutput, ArrowUpDown, Minimize2, Wrench, ScanText, 
  Image, FileText, Presentation, Code, FileImage, Table, RotateCw, Hash, 
  Stamp, Edit3, Unlock, Lock, PenTool, Sparkles, Languages, ChevronDown
} from 'lucide-react';

const iconeMap: Record<string, any> = {
  Combine, Split, Trash2, FileOutput, ArrowUpDown, Minimize2, Wrench, ScanText,
  Image, FileText, Presentation, Code, FileImage, Table, RotateCw, Hash,
  Stamp, Edit3, Unlock, Lock, PenTool, Sparkles, Languages
};

export function ModuloPDF() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todas');
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const [ferramentaSelecionada, setFerramentaSelecionada] = useState<string | null>(null);

  const ferramentasFiltradas = categoriaAtiva === 'todas' 
    ? FERRAMENTAS_PDF 
    : FERRAMENTAS_PDF.filter(f => f.categoria === categoriaAtiva);

  const renderIcone = (nome: string, cor: string) => {
    const IconeComponente = iconeMap[nome] || FileText;
    return <IconeComponente size={28} color={cor} />;
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Barra Superior / Header estilo iLovePDF */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {/* Logótipo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '1.4rem' }}>
              <span style={{ color: '#e53e3e' }}>i❤️</span>
              <span style={{ color: '#1a202c' }}>PDF</span>
            </div>

            {/* Menu de Navegação Superior */}
            <nav style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', fontWeight: '600' }}>
              <button onClick={() => setCategoriaAtiva('organizar')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a5568' }}>JUNTAR PDF</button>
              <button onClick={() => setCategoriaAtiva('organizar')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a5568' }}>DIVIDIR PDF</button>
              <button onClick={() => setCategoriaAtiva('otimizar')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a5568' }}>COMPRIMIR PDF</button>
              
              {/* Botão Menu Suspenso (Todas as ferramentas) */}
              <button 
                onClick={() => setMenuAberto(!menuAberto)} 
                style={{ 
                  background: menuAberto ? '#f7fafc' : 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#e53e3e', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontWeight: '700'
                }}
              >
                TODAS AS FERRAMENTAS PDF <ChevronDown size={16} />
              </button>
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer', color: '#4a5568' }}>Entrar</button>
            <button style={{ backgroundColor: '#e53e3e', color: '#fff', padding: '8px 18px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
              Registar-se
            </button>
          </div>
        </div>

        {/* Menu Suspenso Expandido (Mega Menu da Imagem) */}
        {menuAberto && (
          <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '24px 0' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }}>
              
              {/* Coluna 1: Organizar */}
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#718096', textTransform: 'uppercase', marginBottom: '12px' }}>Organizar PDF</h4>
                {FERRAMENTAS_PDF.filter(f => f.categoria === 'organizar').map(item => (
                  <div key={item.id} onClick={() => { setFerramentaSelecionada(item.id); setMenuAberto(false); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', cursor: 'pointer' }}>
                    {renderIcone(item.icone, item.corIcone)}
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{item.titulo}</span>
                  </div>
                ))}
              </div>

              {/* Coluna 2: Otimizar */}
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#718096', textTransform: 'uppercase', marginBottom: '12px' }}>Otimizar PDF</h4>
                {FERRAMENTAS_PDF.filter(f => f.categoria === 'otimizar').map(item => (
                  <div key={item.id} onClick={() => { setFerramentaSelecionada(item.id); setMenuAberto(false); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', cursor: 'pointer' }}>
                    {renderIcone(item.icone, item.corIcone)}
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{item.titulo}</span>
                  </div>
                ))}
              </div>

              {/* Coluna 3: Converter para PDF */}
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#718096', textTransform: 'uppercase', marginBottom: '12px' }}>Converter em PDF</h4>
                {FERRAMENTAS_PDF.filter(f => f.categoria === 'converter_para').map(item => (
                  <div key={item.id} onClick={() => { setFerramentaSelecionada(item.id); setMenuAberto(false); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', cursor: 'pointer' }}>
                    {renderIcone(item.icone, item.corIcone)}
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{item.titulo}</span>
                  </div>
                ))}
              </div>

              {/* Coluna 4: Converter de PDF */}
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#718096', textTransform: 'uppercase', marginBottom: '12px' }}>Converter de PDF</h4>
                {FERRAMENTAS_PDF.filter(f => f.categoria === 'converter_de').map(item => (
                  <div key={item.id} onClick={() => { setFerramentaSelecionada(item.id); setMenuAberto(false); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', cursor: 'pointer' }}>
                    {renderIcone(item.icone, item.corIcone)}
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{item.titulo}</span>
                  </div>
                ))}
              </div>

              {/* Coluna 5: Editar e Segurança */}
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#718096', textTransform: 'uppercase', marginBottom: '12px' }}>Editar & Segurança</h4>
                {FERRAMENTAS_PDF.filter(f => f.categoria === 'editar' || f.categoria === 'seguranca').map(item => (
                  <div key={item.id} onClick={() => { setFerramentaSelecionada(item.id); setMenuAberto(false); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', cursor: 'pointer' }}>
                    {renderIcone(item.icone, item.corIcone)}
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{item.titulo}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Conteúdo Principal / Hero Section */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Título Principal */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a202c', marginBottom: '12px' }}>
            Ferramentas de PDF online e totalmente gratuitas
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#718096', maxWidth: '700px', margin: '0 auto' }}>
            Ferramentas para juntar PDF, dividir PDF, comprimir PDF, converter documentos Office para PDF, PDF para JPG e muito mais!
          </p>
        </div>

        {/* Filtro Rápido */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { id: 'todas', label: 'Todas' },
            { id: 'organizar', label: 'Organizar PDF' },
            { id: 'otimizar', label: 'Otimizar PDF' },
            { id: 'converter_para', label: 'Converter em PDF' },
            { id: 'converter_de', label: 'Converter de PDF' },
            { id: 'editar', label: 'Editar PDF' },
            { id: 'seguranca', label: 'Segurança' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: categoriaAtiva === cat.id ? '#2d3748' : '#edf2f7',
                color: categoriaAtiva === cat.id ? '#ffffff' : '#4a5568',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grelha de Cards de Ferramentas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {ferramentasFiltradas.map(ferramenta => (
            <div
              key={ferramenta.id}
              onClick={() => setFerramentaSelecionada(ferramenta.id)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                border: '1px solid #edf2f7',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 20px -5px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
              }}
            >
              <div>
                <div style={{ marginBottom: '16px' }}>
                  {renderIcone(ferramenta.icone, ferramenta.corIcone)}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
                  {ferramenta.titulo}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#718096', lineHeight: '1.5' }}>
                  {ferramenta.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal/Ecrã de Carregamento de Ficheiro ao Clicar na Ferramenta */}
        {ferramentaSelecionada && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '40px', maxWidth: '500px', width: '90%', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>
                {FERRAMENTAS_PDF.find(f => f.id === ferramentaSelecionada)?.titulo}
              </h2>
              <p style={{ color: '#718096', marginBottom: '24px' }}>
                {FERRAMENTAS_PDF.find(f => f.id === ferramentaSelecionada)?.descricao}
              </p>
              
              <label style={{ display: 'inline-block', backgroundColor: '#e53e3e', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem', marginBottom: '16px' }}>
                Selecionar arquivos PDF
                <input type="file" multiple style={{ display: 'none' }} onChange={() => alert(`Ficheiros selecionados para ${ferramentaSelecionada}`)} />
              </label>

              <div>
                <button onClick={() => setFerramentaSelecionada(null)} style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontWeight: '600' }}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}