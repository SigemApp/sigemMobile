// Definições de tipos para máquinas

export interface Machine {
    id: string;           // Identificador único da máquina
    nome: string;        // Nome da máquina
    status: 'ativo' | 'inativo' | 'em manutenção'; // Status da máquina
    tipo: string;        // Tipo da máquina (ex: "escavadeira", "retroescavadeira")
    dataCompra: string;  // Data de aquisição da máquina no formato ISO
    localizacao?: string; // Localização atual da máquina (opcional)
    descricao?: string;   // Descrição adicional da máquina (opcional)
    fabricante: string;   // Nome do fabricante da máquina
    modelo: string;       // Modelo da máquina
    anoFabricacao: number; // Ano de fabricação da máquina
  }
  
  // Exemplo de uso
  export const exemploMaquina: Machine = {
    id: '1',
    nome: 'Escavadeira XYZ',
    status: 'ativo',
    tipo: 'escavadeira',
    dataCompra: '2023-01-15',
    localizacao: 'Canteiro 1',
    descricao: 'Escavadeira de grande porte para terraplanagem',
    fabricante: 'Fabricante A',
    modelo: 'Modelo 1234',
    anoFabricacao: 2020,
  };
  