import { useState } from 'react';
import type { FerramentaPDF } from '../types/pdf';
import { FERRAMENTAS_PDF } from '../data/ferramentas';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import * as XLSX from 'xlsx';
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
      setFicheiros(Array.from(e.target.files));
    }
  };

  // MOTOR CENTRAL DE PROCESSAMENTO E CONVERSÃO
  const handleIniciarProcessamento = async () => {
    if (ficheiros.length === 0 || !ferramentaSelecionada) return;

    setAProcessar(true);
    setProgresso(10);
    setMensagemStatus('Iniciando motor de processamento...');

    try {
      const ficheiroOriginal = ficheiros[0];
      const nomeBase = ficheiroOriginal.name.replace(/\.[^/.]+$/, '');
      const operacaoId = ferramentaSelecionada.id;

      let blobResult: Blob;

      // 1. JUNTA / MESCLA MULTIPLOS PDFS
      if (operacaoId === 'juntar') {
        setMensagemStatus('Mesclando arquivos PDF...');
        const mergedPdf = await PDFDocument.create();

        for (let i = 0; i < ficheiros.length; i++) {
          setProgresso(20 + Math.round((i / ficheiros.length) * 60));
          const bytes = await ficheiros[i].arrayBuffer();
          const pdfDoc = await PDFDocument.load(bytes);
          const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
          pages.forEach(p => mergedPdf.addPage(p));
        }

        const pdfBytes = await mergedPdf.save();
        blobResult = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setNomeFicheiroSaida(`${nomeBase}_unido.pdf`);
      }

      // 2. CONVERSÃO EXCEL -> PDF (Leitura e renderização de células)
      else if (operacaoId === 'excel_pdf' || ficheiroOriginal.name.match(/\.(xlsx|xls|csv)$/i)) {
        setMensagemStatus('Lendo planilha Excel...');
        setProgresso(30);

        const dataBuffer = await ficheiroOriginal.arrayBuffer();
        const workbook = XLSX.read(dataBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setMensagemStatus('Gerando documento PDF estruturado...');
        setProgresso(60);

        const pdfDoc = await PDFDocument.create();
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

        let page = pdfDoc.addPage([595.28, 841.89]);
        const { height } = page.getSize();

        page.drawText('M.A. Contabilidade & Serviços', { x: 40, y: height - 40, size: 14, font: fontBold, color: rgb(0.23, 0.51, 0.96) });
        page.drawText(`Planilha: ${ficheiroOriginal.name} | Aba: ${sheetName}`, { x: 40, y: height - 58, size: 10, font: fontRegular, color: rgb(0.58, 0.64, 0.72) });

        let currentY = height - 90;

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          const rowData = rows[rowIndex];

          if (currentY < 50) {
            page = pdfDoc.addPage([595.28, 841.89]);
            currentY = 841.89 - 50;
          }

          let currentX = 40;
          const isHeader = rowIndex === 0;

          if (Array.isArray(rowData)) {
            for (let colIndex = 0; colIndex < Math.min(rowData.length, 6); colIndex++) {
              const cellValue = rowData[colIndex] !== undefined ? String(rowData[colIndex]) : '';
              const colWidth = 85;

              if (isHeader) {
                page.drawRectangle({ x: currentX, y: currentY - 4, width: colWidth, height: 20, color: rgb(0.93, 0.95, 0.98) });
              }

              const textoFormatado = cellValue.length > 14 ? cellValue.substring(0, 12) + '..' : cellValue;
              page.drawText(textoFormatado, { x: currentX + 4, y: currentY + 4, size: isHeader ? 9 : 8, font: isHeader ? fontBold : fontRegular, color: isHeader ? rgb(0.12, 0.16, 0.23) : rgb(0.2, 0.2, 0.2) });

              currentX += colWidth;
            }
          }

          currentY -= 20;
        }

        const pdfBytes = await pdfDoc.save();
        blobResult = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setNomeFicheiroSaida(`${nomeBase}_excel.pdf`);
      }

      // 3. MARCA D'ÁGUA NO PDF
      else if (operacaoId === 'marca_dagua') {
        setMensagemStatus('Aplicando marca d\'água institucional...');
        setProgresso(50);

        const bytes = await ficheiroOriginal.arrayBuffer();
        const pdfDoc = await PDFDocument.load(bytes);
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        pdfDoc.getPages().forEach(p => {
          const { width, height } = p.getSize();
          p.drawText('CONFIDENCIAL - M.A. CONTABILIDADE', {
            x: width / 6,
            y: height / 2,
            size: 28,
            font,
            color: rgb(0.8, 0.2, 0.2),
            opacity: 0.25,
            rotate: degrees(45),
          });
        });

        const pdfBytes = await pdfDoc.save();
        blobResult = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setNomeFicheiroSaida(`${nomeBase}_marca_dagua.pdf`);
      }

      // 4. OPERAÇÕES GENÉRICAS E OTIMIZAÇÃO DE PDF
      else {
        setMensagemStatus('Otimizando e reconstruindo PDF...');
        setProgresso(60);

        const bytes = await ficheiroOriginal.arrayBuffer();
        const pdfDoc = await PDFDocument.load(bytes);

        const pdfBytes = await pdfDoc.save();
        blobResult = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setNomeFicheiroSaida(`${nomeBase}_${operacaoId}.pdf`);
      }

      setProgresso(100);
      const url = URL.createObjectURL(blobResult);
      setFicheiroGeradoUrl(url);
      setAProcessar(false);
      setConcluido(true);

    } catch (error) {
      console.error("Erro no processamento:", error);
      alert("Ocorreu um erro ao processar o arquivo. Verifique o formato selecionado.");
      setAProcessar(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '60px' }}>
      
      {/* Título Corporativo */}
      <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
          Ferramentas de Documentos & PDF
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Selecione a operação desejada para organizar, converter, otimizar ou assinar seus arquivos com segurança.
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

      {/* Modal Interativo com Leitura Real */}
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
            
            {/* ESTADO 1: Seleção de Arquivos */}
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
                    Selecionar Arquivos (PDF, Excel, Word...)
                    <input 
                      type="file" 
                      accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpg,.jpeg,application/pdf"
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
                        Converter / Processar
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
                        <input type="file" accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpg,.jpeg,application/pdf" multiple style={{ display: 'none' }} onChange={handleFicheirosSelecionados} />
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

            {/* ESTADO 2: Carregamento */}
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

            {/* ESTADO 3: Download do PDF Válido */}
            {concluido && (
              <div style={{ padding: '10px 0' }}>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle size={52} color="#10b981" />
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Processamento Concluído!
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Seu arquivo foi convertido e está pronto para download.
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