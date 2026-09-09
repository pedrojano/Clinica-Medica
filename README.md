# Sistema de Gestão de Clínica Médica

Sistema interativo via terminal para gerenciamento de clínicas médicas, desenvolvido em JavaScript (Nodejs ES Modules) com armazenamento de dados em vetores em memória.

---

## Sobre o Projeto

Este projeto foi construído para simular o fluxo completo de uma clínica médica, abrangendo o cadastro e controle de **Pacientes**, **Médicos** e **Agendamento de Consultas**, além de fornecer **Filtros Avançados por Múltiplos Parâmetros** e **Dashboards Analíticos** para gestão financeira e operacional.

---

## Atendimento aos Requisitos Técnicos

| Requisito | Implementação no Código |
| :--- | :--- |
| **Modelagem em Vetores de Objetos em Memória** | Armazenamento centralizado em `src/dados/memoria.js` com registros pré-carregados (*mock data*). |
| **Menu Interativo (Switch/Case)** | Interface de terminal em loop contínuo tratada via `switch/case` em `index.js`. |
| **Código Modularizado (CRUD Isolado)** | Operações CRUD divididas estritamente por módulos em `src/modulos/` (`paciente.js`, `medico.js`, `consulta.js`). |
| **Validação Estrita** | Funções utilitárias em `src/utils/validacoes.js` que impedem entradas em branco, tipos inválidos e IDs inexistentes. |
| **Processamento Analítico Avançado** | Relatório com agregadores estatísticos (faturamento total, ticket médio e contagem de status) em `src/relatorios/analitico.js`. |
| **Busca por Múltiplos Parâmetros** | Filtro combinatório em `buscarConsultasAvancadas()` que permite buscas por médico, paciente, status e data. |

---

## Estrutura do Projeto

```text
clinica-medica/
├── src/
│   ├── utils/
│   │   └── validacoes.js      # Validações estritas reutilizáveis (texto, número, data)
│   ├── dados/
│   │   └── memoria.js         # Base de dados centralizada em memória
│   ├── modulos/
│   │   ├── paciente.js        # CRUD completo de Pacientes
│   │   ├── medico.js          # CRUD completo de Médicos
│   │   └── consulta.js        # CRUD de Consultas e integridade relacional
│   └── relatorios/
│       └── analitico.js       # Filtros avançados combinatórios e Dashboard Analítico
├── app.js                   # Ponto de entrada e menu interativo com switch/case
├── package.json               # Configuração do projeto (ES Modules)
└── README.md                  # Documentação completa do projeto
```

---

## Pré-requisitos e Como Rodar

### Pré-requisitos
- **Node.js** (versão 18 ou superior instalada).

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd clinica-medica
   ```

2. **Instalar Dependências:**
   ```bash
   npm install
   ```

3. **Executar a Aplicação:**
   ```bash
   npm start
   ```
   *ou diretamente:*
   ```bash
   node app.js
   ```

---

## Funcionalidades e Módulos

### 1. Pacientes (`src/modulos/paciente.js`)
- `cadastrarPaciente(nome, cpf, idade)`: Adiciona novo paciente e previne CPFs duplicados.
- `listarPacientes()`: Exibe tabela formatada dos pacientes.
- `atualizarPaciente(id, novoNome, novaIdade)`: Atualiza dados cadastrais.
- `deletarPaciente(id)`: Remove paciente por ID.

### 2. Médicos (`src/modulos/medico.js`)
- `cadastrarMedico(nome, crm, especialidade)`: Cadastra médicos com validação de CRM.
- `listarMedicos()`: Exibe lista formatada de médicos.
- `atualizarMedico(id, novoNome, novaEspecialidade)`: Atualiza cadastro do profissional.
- `deletarMedico(id)`: Remove médico do sistema.

### 3. Consultas (`src/modulos/consulta.js`)
- `agendarConsulta(idPaciente, idMedico, data, valor)`: Valida existência do paciente e do médico antes de agendar.
- `listarConsultas()`: Exibe histórico cruzando informações de paciente e médico.
- `atualizarStatusConsulta(id, novoStatus)`: Atualiza status para *Agendada*, *Realizada* ou *Cancelada*.

### 4. Relatórios Analíticos (`src/relatorios/analitico.js`)
- `buscarConsultasAvancadas(filtros)`: Permite filtrar consultas por qualquer combinação de `idMedico`, `idPaciente`, `status` e `data`.
- `gerarResumoAnalitico()`: Exibe o **Dashboard Analítico** calculando faturamento total, ticket médio e distribuição de status.

---
