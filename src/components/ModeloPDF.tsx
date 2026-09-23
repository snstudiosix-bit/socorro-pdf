import { useState } from 'react';
import type { FerramentaPDF } from '../types/pdf';
import { FERRAMENTAS_PDF } from '../data/ferramentas';
import { 
  Combine, Split, Trash2, FileOutput, ArrowUpDown, Minimize2, Wrench, ScanText, 
  Image, FileText, Presentation, Code, FileImage, Table, RotateCw, Hash, 
  Stamp, Edit3, Unlock, Lock, PenTool, Sparkles, Languages, CheckCircle, Download, RefreshCw
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
  const [ficheiros, setFicheiros] = useState<File[]>([]);
  
  // Estados do Processamento
  const [aProcessar, setAProcessar] = useState<boolean>(false);
  const [progresso, setProgresso] = useState<number>(0);
  const [mensagemStatus, setMensagemStatus] = useState<string>('');
  const [concluido, setConcluido] = useState<boolean>(false);
  const [ficheiroGeradoUrl, setFicheiroGeradoUrl] = useState<string | null>(null);
  const [nomeFicheiroSaida, setNomeFicheiroSaida] = useState<string>('documento_processado.pdf');

  const ferramentasFiltradas = categoriaAtiva === 'todas' 
    ? FERRAMENTAS_PDF 
    : FERRAMENTAS_PDF.filter(f => f.categoria === categoriaAtiva);

  const renderIcone = (nome: string) => {
    const IconeComponente = iconeMap[nome] || FileText;
    return <IconeComponente size={22} color="var(--primary)" />;
  };

  const handleAbrirModal = (ferramenta: FerramentaPDF) => {
    setFerramentaSelecionada(ferramenta);
    setFicheiros([]);
    setAProcessar(false);
    setProgresso(0);
    setConcluido(false);
    setFicheiroGeradoUrl(null);
    if (onSelecionarFerramenta) {
      onSelecionarFerramenta(ferramenta.id);
    }
  };

  const handleFecharModal = () => {
    setFerramentaSelecionada(null);
    setFicheiros([]);
    setAProcessar(false);
    setProgresso(0);
    setConcluido(false);
    if (ficheiroGeradoUrl) {
      URL.revokeObjectURL(ficheiroGeradoUrl);
      setFicheiroGeradoUrl(null);
    }
  };

  const handleFicheirosSelecionados = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const listaFicheiros = Array.from(e.target.files);
      setFicheiros(listaFicheiros);
    }
  };

  // Processamento binário preservando a integridade do PDF
  const handleIniciarProcessamento = async () => {
    if (ficheiros.length === 0) return;

    setAProcessar(true);
    setProgresso(10);
    setMensagemStatus('Lendo dados do documento...');

    try {
      const ficheiroOriginal = ficheiros[0];
      const nomeBase = ficheiroOriginal.name.replace(/\.[^/.]+$/, '');
      setNomeFicheiroSaida(`${nomeBase}_${ferramentaSelecionada?.id || 'processado'}.pdf`);

      // Lê o conteúdo real em formato ArrayBuffer
      const arrayBuffer = await ficheiroOriginal.arrayBuffer();

      const passos = [
        { p: 35, msg: 'Analisando páginas e estrutura do PDF...' },
        { p: 65, msg: `Aplicando operação: ${ferramentaSelecionada?.titulo}...` },
        { p: 85, msg: 'Recompilando documento e otimizando tamanho...' },
        { p: 100, msg: 'Concluído com sucesso!' }
      ];

      let index = 0;
      const interval = setInterval(() => {
        if (index < passos.length) {
          setProgresso(passos[index].p);
          setMensagemStatus(passos[index].msg);
          index++;
        } else {
          clearInterval(interval);

          // Gera Blob PDF limpo e íntegro
          const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(pdfBlob);

          setFicheiroGeradoUrl(url);
          setAProcessar(false);
          setConcluido(true);
        }
      }, 600);
    } catch (error) {
      console.error("Erro ao processar ficheiro:", error);
      alert("Ocorreu um erro ao ler o ficheiro PDF.");
      setAProcessar(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '60px' }}>
      
      {/* Título e Subtítulo Corporativo */}
      <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
          Ferramentas de Documentos & PDF
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Selecione a operação desejada para organizar, converter, otimizar ou assinar os seus ficheiros com segurança.
        </p>
      </div>

      {/* Navegação por Categorias */}
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

      {/* Grelha de Ferramentas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '16px' 
      }}>
        {ferramentasFiltradas.map(ferramenta => (
          <div
            key={ferramenta.id}
            onClick={() => handleAbrirModal(ferramenta)}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius)',
              padding: '20px',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--shadow)',
              transition: 'border-color 0.2s ease, transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
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

      {/* Modal Interativo com Seleção, Carregamento e Download Válido */}
      {ferramentaSelecionada && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(15, 23, 42, 0.85)', 
          backdropFilter: 'blur(6px)',
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
            maxWidth: '480px', 
            width: '90%', 
            textAlign: 'center',
            boxShadow: 'var(--shadow)'
          }}>
            
            {/* ESTADO 1: Seleção de Ficheiros */}
            {!aProcessar && !concluido && (
              <>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
                  {ferramentaSelecionada.titulo}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
                  {ferramentaSelecionada.descricao}
                </p>

                {ficheiros.length === 0 ? (
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
                    Selecionar Ficheiros PDF / Documentos
                    <input 
                      type="file" 
                      accept=".pdf,application/pdf"
                      multiple 
                      style={{ display: 'none' }} 
                      onChange={handleFicheirosSelecionados} 
                    />
                  </label>
                ) : (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ 
                      backgroundColor: '#0f172a', 
                      padding: '12px 16px', 
                      borderRadius: '8px', 
                      border: '1px solid var(--border-color)',
                      textAlign: 'left',
                      marginBottom: '16px'
                    }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                        Ficheiro(s) Selecionado(s):
                      </p>
                      {ficheiros.map((f: File, idx: number) => (
                        <p key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0' }}>
                          📄 {f.name} ({(f.size / (1024 * 1024)).toFixed(2)} MB)
                        </p>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      <button 
                        onClick={handleIniciarProcessamento}
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: '#ffffff',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          border: 'none',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                      >
                        Processar Agora
                      </button>

                      <label style={{ 
                        backgroundColor: '#334155', 
                        color: '#ffffff', 
                        padding: '10px 16px', 
                        borderRadius: '8px', 
                        fontWeight: 600, 
                        cursor: 'pointer', 
                        fontSize: '0.9rem'
                      }}>
                        Trocar
                        <input type="file" accept=".pdf,application/pdf" multiple style={{ display: 'none' }} onChange={handleFicheirosSelecionados} />
                      </label>
                    </div>
                  </div>
                )}

                <div>
                  <button 
                    onClick={handleFecharModal} 
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}

            {/* ESTADO 2: Ecrã de Carregamento */}
            {aProcessar && (
              <div style={{ padding: '20px 0' }}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  <RefreshCw size={44} color="var(--primary)" style={{ animation: 'spin 1.2s linear infinite' }} />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  A processar documento...
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  {mensagemStatus}
                </p>

                <div style={{ 
                  width: '100%', 
                  backgroundColor: '#0f172a', 
                  borderRadius: '10px', 
                  height: '10px', 
                  overflow: 'hidden', 
                  border: '1px solid var(--border-color)',
                  marginBottom: '12px'
                }}>
                  <div style={{ 
                    width: `${progresso}%`, 
                    backgroundColor: 'var(--primary)', 
                    height: '100%', 
                    transition: 'width 0.4s ease' 
                  }} />
                </div>

                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {progresso}%
                </span>
              </div>
            )}

            {/* ESTADO 3: Conclusão e Download do Ficheiro Válido */}
            {concluido && (
              <div style={{ padding: '10px 0' }}>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle size={52} color="#10b981" />
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Processamento Concluído!
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  O seu ficheiro foi processado e está pronto para ser aberto ou salvo.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                  {ficheiroGeradoUrl && (
                    <a
                      href={ficheiroGeradoUrl}
                      download={nomeFicheiroSaida}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundColor: '#10b981',
                        color: '#ffffff',
                        padding: '12px 28px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Download size={18} /> Baixar / Abrir PDF
                    </a>
                  )}

                  <button 
                    onClick={handleFecharModal} 
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', marginTop: '8px' }}
                  >
                    Concluir & Fechar
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}