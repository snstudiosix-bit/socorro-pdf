import type { FerramentaPDF } from '../types/pdf';

export const FERRAMENTAS_PDF: FerramentaPDF[] = [
  // ORGANIZAR PDF
  { id: 'juntar', titulo: 'Juntar PDF', descricao: 'Mesclar e juntar PDFs na ordem que desejar. É tudo muito fácil e rápido!', categoria: 'organizar', icone: 'Combine', corIcone: '#E53E3E' },
  { id: 'dividir', titulo: 'Dividir PDF', descricao: 'Separe uma página ou converta cada página do documento em arquivo PDF independente.', categoria: 'organizar', icone: 'Split', corIcone: '#E53E3E' },
  { id: 'remover', titulo: 'Remover páginas', descricao: 'Elimine páginas desnecessárias do seu ficheiro PDF.', categoria: 'organizar', icone: 'Trash2', corIcone: '#E53E3E' },
  { id: 'extrair', titulo: 'Extrair páginas', descricao: 'Extraia páginas específicas do seu arquivo PDF com facilidade.', categoria: 'organizar', icone: 'FileOutput', corIcone: '#E53E3E' },
  { id: 'organizar', titulo: 'Organizar PDF', descricao: 'Ordene, adicione ou remova páginas do seu PDF.', categoria: 'organizar', icone: 'ArrowUpDown', corIcone: '#E53E3E' },

  // OTIMIZAR PDF
  { id: 'comprimir', titulo: 'Comprimir PDF', descricao: 'Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível.', categoria: 'otimizar', icone: 'Minimize2', corIcone: '#38A169' },
  { id: 'reparar', titulo: 'Reparar PDF', descricao: 'Recupere dados de ficheiros PDF corrompidos ou danificados.', categoria: 'otimizar', icone: 'Wrench', corIcone: '#38A169' },
  { id: 'ocr', titulo: 'OCR PDF', descricao: 'Transforme PDFs digitalizados e imagens em texto pesquisável.', categoria: 'otimizar', icone: 'ScanText', corIcone: '#38A169' },

  // CONVERTER EM PDF
  { id: 'jpg-para-pdf', titulo: 'JPG para PDF', descricao: 'Converta imagens JPG, PNG ou BMP para PDF em segundos.', categoria: 'converter_para', icone: 'Image', corIcone: '#D69E2E' },
  { id: 'word-para-pdf', titulo: 'WORD para PDF', descricao: 'Converta os seus documentos WORD em PDF com facilidade.', categoria: 'converter_para', icone: 'FileText', corIcone: '#2B6CB0' },
  { id: 'powerpoint-para-pdf', titulo: 'POWERPOINT para PDF', descricao: 'Converta as suas apresentações PPT para PDF.', categoria: 'converter_para', icone: 'Presentation', corIcone: '#DD6B20' },
  { id: 'excel-para-pdf', titulo: 'EXCEL para PDF', descricao: 'Converta as suas tabelas EXCEL para PDF.', categoria: 'converter_para', icone: 'Spreadsheet', corIcone: '#2F855A' },
  { id: 'html-para-pdf', titulo: 'HTML para PDF', descricao: 'Converta páginas da Web em formato PDF.', categoria: 'converter_para', icone: 'Code', corIcone: '#D69E2E' },

  // CONVERTER DE PDF
  { id: 'pdf-para-jpg', titulo: 'PDF para JPG', descricao: 'Extraia todas as imagens ou converta cada página em JPG.', categoria: 'converter_de', icone: 'FileImage', corIcone: '#DD6B20' },
  { id: 'pdf-para-word', titulo: 'PDF para WORD', descricao: 'Converta facilmente os seus ficheiros PDF para documentos WORD (DOCX).', categoria: 'converter_de', icone: 'FileText', corIcone: '#2B6CB0' },
  { id: 'pdf-para-powerpoint', titulo: 'PDF para POWERPOINT', descricao: 'Converta os seus ficheiros PDF para apresentações POWERPOINT.', categoria: 'converter_de', icone: 'Presentation', corIcone: '#DD6B20' },
  { id: 'pdf-para-excel', titulo: 'PDF para EXCEL', descricao: 'Retire dados direto de PDFs para planilhas EXCEL em segundos.', categoria: 'converter_de', icone: 'Table', corIcone: '#2F855A' },

  // EDITAR PDF
  { id: 'rodar', titulo: 'Rodar PDF', descricao: 'Rode as páginas do seu PDF como preferir.', categoria: 'editar', icone: 'RotateCw', corIcone: '#805AD5' },
  { id: 'numeros-pagina', titulo: 'Inserir números de página', descricao: 'Adicione numeração de páginas ao seu documento PDF.', categoria: 'editar', icone: 'Hash', corIcone: '#805AD5' },
  { id: 'marca-dagua', titulo: 'Inserir marca d\'água', descricao: 'Adicione uma imagem ou texto como marca d\'água no PDF.', categoria: 'editar', icone: 'Stamp', corIcone: '#805AD5' },
  { id: 'editar-pdf', titulo: 'Editar PDF', descricao: 'Adicione texto, imagens, formas e anotações num documento PDF.', categoria: 'editar', icone: 'Edit3', corIcone: '#805AD5' },

  // SEGURANÇA DO PDF
  { id: 'desbloquear', titulo: 'Desbloquear PDF', descricao: 'Remova a palavra-passe do PDF para o utilizar livremente.', categoria: 'seguranca', icone: 'Unlock', corIcone: '#3182CE' },
  { id: 'proteger', titulo: 'Proteger PDF', descricao: 'Proteja ficheiros PDF com uma palavra-passe e encriptação.', categoria: 'seguranca', icone: 'Lock', corIcone: '#3182CE' },
  { id: 'assinar', titulo: 'Assinar PDF', descricao: 'Assine documentos e solicite assinaturas eletrónicas.', categoria: 'seguranca', icone: 'PenTool', corIcone: '#3182CE' },

  // PDF INTELLIGENCE (IA)
  { id: 'resumir-ia', titulo: 'Resumir com IA', descricao: 'Gere resumos inteligentes do conteúdo do seu PDF usando IA.', categoria: 'ia', icone: 'Sparkles', corIcone: '#6B46C1' },
  { id: 'traduzir-pdf', titulo: 'Traduzir PDF', descricao: 'Traduza o seu documento PDF mantendo o layout original.', categoria: 'ia', icone: 'Languages', corIcone: '#6B46C1' }
];