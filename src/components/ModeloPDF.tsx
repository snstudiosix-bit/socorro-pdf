import { useState } from 'react';
import type { FerramentaPDF } from '../types/pdf';
import { FERRAMENTAS_PDF } from '../data/ferramentas';
import { 
  Combine, Split, Trash2, FileOutput, ArrowUpDown, Minimize2, Wrench, ScanText, 
  Image, FileText, Presentation, Code, FileImage, Table, RotateCw, Hash, 
  Stamp, Edit3, Unlock, Lock, PenTool, Sparkles, Languages
} from 'lucide-react';

const iconeMap: Record<string, any> = {
  Combine, Split, Trash2, FileOutput, ArrowUpDown, Minimize2, Wrench, ScanText,
  Image, FileText, Presentation, Code, FileImage, Table, RotateCw, Hash,
  Stamp, Edit3, Unlock, Lock, PenTool, Sparkles, Languages
};

interface ModuloPDFProps {
  onSelecionarFerramenta?: (idFerramenta: string) => void;
}

export function ModuloPDF({ onSelecionarFerramenta }: ModuloPDFProps) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todas');
  const [ferramentaSelecionada, setFerramentaSelecionada] = useState<FerramentaPDF | null>(null);

  const ferramentasFiltradas = categoriaAtiva === 'todas' 
    ? FERRAMENTAS_PDF 
    : FERRAMENTAS_PDF.filter(f => f.categoria === categoriaAtiva);

  const renderIcone = (nome: string) => {
    const IconeComponente = iconeMap[nome] || FileText;
    return <IconeComponente size={22} color="var(--primary)" />;
  };

  const handleEscolherFerramenta = (ferramenta: FerramentaPDF) => {
    setFerramentaSelecionada(ferramenta);
    if (onSelecionarFerramenta) {
      onSelecionarFerramenta(ferramenta.id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '60px' }}>
      
      {/* Título Neutro e Direto */}
      <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
          Ferramentas de Documentos & PDF
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Selecione o procedimento desejado para organizar, converter ou editar seus arquivos.
        </p>
      </div>

      {/* Categorias Neutras */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {[
          { id: 'todas', label: 'Todas' },
          { id: 'organizar', label: 'Organizar' },
          { id: 'otimizar', label: 'Otimizar' },
          { id: 'converter_para', label: 'Converter para PDF' },
          { id: 'converter_de', label: 'Converter de PDF' },
          { id: 'editar', label: 'Editar' },
          { id: 'seguranca', label: 'Segurança' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaAtiva(cat.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: categoriaAtiva === cat.id ? 'var(--primary)' : 'var(--bg-card)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards de Ferramentas com Visual Sobrio */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '16px' 
      }}>
        {ferramentasFiltradas.map(ferramenta => (
          <div
            key={ferramenta.id}
            onClick={() => handleEscolherFerramenta(ferramenta)}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius)',
              padding: '20px',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--shadow)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-color)'
            }}>
              {renderIcone(ferramenta.icone)}
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                {ferramenta.titulo}
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                {ferramenta.descricao}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Ação Neutro */}
      {ferramentaSelecionada && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(15, 23, 42, 0.8)', 
          backdropFilter: 'blur(4px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 100 
        }}>
          <div style={{ 
            backgroundColor: 'var(--bg-card)', 
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius)', 
            padding: '32px', 
            maxWidth: '450px', 
            width: '90%', 
            textAlign: 'center',
            boxShadow: 'var(--shadow)'
          }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
              {ferramentaSelecionada.titulo}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
              {ferramentaSelecionada.descricao}
            </p>
            
            <label style={{ 
              display: 'inline-block', 
              backgroundColor: 'var(--primary)', 
              color: '#ffffff', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              cursor: 'pointer', 
              fontSize: '0.9rem',
              marginBottom: '16px'
            }}>
              Selecionar Arquivo
              <input 
                type="file" 
                multiple 
                style={{ display: 'none' }} 
                onChange={() => {
                  alert(`Arquivo selecionado para: ${ferramentaSelecionada.titulo}`);
                  setFerramentaSelecionada(null);
                }} 
              />
            </label>

            <div>
              <button 
                onClick={() => setFerramentaSelecionada(null)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}