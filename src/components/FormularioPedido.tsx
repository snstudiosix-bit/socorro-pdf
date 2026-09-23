import React, { useState } from 'react';
import { criarPedidoComArquivo } from '../services/pedidosService';
import type { NovoPedidoData } from '../services/pedidosService';

export function FormularioPedido() {
  const [loading, setLoading] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const [formData, setFormData] = useState<NovoPedidoData>({
    nome_cliente: '',
    whatsapp: '',
    tipo_servico: 'Formatacao ABNT',
    urgencia: 'Normal',
    descricao: '',
    arquivo: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, arquivo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagemSucesso('');
    setMensagemErro('');

    try {
      const novoPedido = await criarPedidoComArquivo(formData);
      setMensagemSucesso(`Pedido enviado com sucesso! ID: ${novoPedido.id?.slice(0, 8)}`);

      setFormData({
        nome_cliente: '',
        whatsapp: '',
        tipo_servico: 'Formatacao ABNT',
        urgencia: 'Normal',
        descricao: '',
        arquivo: null,
      });

      const fileInput = document.getElementById('arquivo-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      setMensagemErro(err.message || 'Ocorreu um erro ao enviar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Enviar Pedido de Serviço</h2>

      {mensagemSucesso && (
        <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '15px', borderRadius: '4px' }}>
          {mensagemSucesso}
        </div>
      )}

      {mensagemErro && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '15px', borderRadius: '4px' }}>
          {mensagemErro}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nome Completo *</label>
          <input
            type="text"
            name="nome_cliente"
            value={formData.nome_cliente}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>WhatsApp *</label>
          <input
            type="text"
            name="whatsapp"
            placeholder="(66) 99999-9999"
            value={formData.whatsapp}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Tipo de Serviço *</label>
          <select
            name="tipo_servico"
            value={formData.tipo_servico}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="Formatacao ABNT">Formatação ABNT</option>
            <option value="Revisao Textual">Revisão Textual</option>
            <option value="Conversao PDF">Conversão de PDF/Word</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Urgência *</label>
          <select
            name="urgencia"
            value={formData.urgencia}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="Normal">Normal (2 a 3 dias)</option>
            <option value="Urgente">Urgente (24 horas)</option>
            <option value="Muito Urgente">Muito Urgente (Mesmo dia)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Descrição / Instruções *</label>
          <textarea
            name="descricao"
            rows={4}
            value={formData.descricao}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Anexar Arquivo (PDF, DOCX, TXT)</label>
          <input
            id="arquivo-input"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
            style={{ width: '100%' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          {loading ? 'Enviando...' : 'Enviar Pedido'}
        </button>
      </form>
    </div>
  );
}