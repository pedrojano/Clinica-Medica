import readline from "readline-sync";

import {
  cadastrarPaciente,
  listarPacientes,
  atualizarPaciente,
  deletarPaciente,
} from "./models/Paciente.js";

import {
  buscarConsultasAvancada,
  gerarResumoAnalitico,
} from "./relatorios/analitico.js";

import {
  agendarConsulta,
  cancelarConsulta,
  listarConsultas,
  atualizarConsulta,
} from "./models/Consulta.js";

import { listar, cadastrar, atualizar, remover } from "./models/Medico.js";

let executandoSistema = true;

function exibirMenu() {
  console.log("\n==================================");
  console.log(" -------- Clínica Médica --------");
  console.log("==================================");
  console.log(" [1]  Cadastrar Paciente");
  console.log(" [2]  Listar Pacientes");
  console.log(" [3]  Atualizar Paciente");
  console.log(" [4]  Remover Paciente");
  console.log(" ----------------------------------- ");
  console.log(" [5]  Cadastrar Medico");
  console.log(" [6]  Listar Medico");
  console.log(" [7]  Atualizar Medico");
  console.log(" [8]  Remover Medico");
  console.log(" ----------------------------------- ");
  console.log(" [9]  Criar Consulta");
  console.log(" [10] Listar Consultas");
  console.log(" [11] Atualizar Consulta");
  console.log(" [12] Deletar Consulta");
  console.log(" [13] Buscar Consultas (Filtros Múltiplos)");
  console.log(" [14] Gerar Relatório Analítico");
  console.log(" ----------------------------------- ");
  console.log(" [0]  Sair do Sistema");
  console.log("==================================\n");
}

while (executandoSistema) {
  exibirMenu();
  const opcao = readline.question("Escolha uma opcao: ");

  try {
    switch (opcao.trim()) {
      case "1": {
        console.log("\n=== Cadastrar Paciente ===");
        const nome = readline.question("Nome Completo: ");
        const cpf = readline.question("CPF (apenas numeros): ");
        const idade = readline.question("Idade: ");
        cadastrarPaciente(nome, cpf, idade);
        break;
      }

      case "2": {
        listarPacientes();
        break;
      }

      case "3": {
        console.log("\n=== Atualizar Paciente ===");
        const id = readline.question("Id do paciente: ");
        const novoNome = readline.question("Novo nome: ");
        const novaIdade = readline.question("Nova Idade: ");
        atualizarPaciente(id, novoNome, novaIdade);
        break;
      }

      case "4": {
        console.log("\n=== Remover Paciente ===");
        const id = readline.question("Id do paciente a ser removido: ");
        deletarPaciente(id);
        break;
      }

      case "5": {
        console.log("\n=== Cadastrar Medico ===");
        const nome = readline.question("Nome Completo: ");
        const crm = readline.question("CRM: ");
        const especialidade = readline.question("Especialidade: ");
        const telefone = readline.question("Telefone: ");
        cadastrar({ nome, crm, especialidade, telefone });
        console.log("Medico cadastrado com sucesso!");
        break;
      }

      case "6": {
        console.log("\n=== Medicos Cadastrados ===");
        const medicos = listar();
        console.table(medicos);
        break;
      }

      case "7": {
        console.log("\n=== Atualizar Medico ===");
        const id = readline.question("Id do Medico: ");
        const nome = readline.question("Novo Nome: ");
        const crm = readline.question("Novo CRM: ");
        const especialidade = readline.question("Nova Especialidade: ");
        const telefone = readline.question("Novo Telefone: ");
        atualizar(id, { nome, crm, especialidade, telefone });
        console.log("Medico atualizado com sucesso!");
        break;
      }

      case "8": {
        console.log("\n=== Remover Medico ===");
        const id = readline.question("Id do medico: ");
        remover(id);
        console.log("Medico removido com sucesso!");
        break;
      }

      case "9": {
        console.log("\n=== Agendar Consulta ===");
        const idPaciente = readline.question("Id do Paciente: ");
        const idMedico = readline.question("Id do Medico: ");
        const data = readline.question("Data (AAAA-MM-DD): ");
        const valor = readline.question("Valor da consulta: ");
        agendarConsulta(idPaciente, idMedico, data, valor);
        break;
      }

      case "10": {
        console.log("\n=== Listar Consultas ===");
        listarConsultas();
        break;
      }

      case "11": {
        console.log("\n=== Atualizar Consulta ===");
        const id = readline.question("Id da Consulta: ");
        const status = readline.question(
          "Novo Status (Agendada/Realizada/Cancelada): ",
        );
        atualizarConsulta(id, status);
        break;
      }

      case "12": {
        console.log("\n=== Deletar/Cancelar Consulta ===");
        const id = readline.question("Id da Consulta: ");
        cancelarConsulta(id);
        break;
      }

      case "13": {
        console.log("\n=== Busca Avançada de Consultas ===");
        console.log(
          "(Aperte ENTER sem digitar nada para ignorar qualquer filtro)",
        );

        const idMedico = readline.question("Id do Medico: ");
        const idPaciente = readline.question("Id do Paciente: ");
        const status = readline.question(
          "Status (agendada/realizada/cancelada): ",
        );
        const data = readline.question("Data: ");

        buscarConsultasAvancada({
          idMedico: idMedico ? Number(idMedico) : null,
          idPaciente: idPaciente ? Number(idPaciente) : null,
          status: status || null,
          data: data || null,
        });
        break;
      }

      case "14": {
        gerarResumoAnalitico();
        break;
      }

      case "0": {
        console.log("\n Encerrando o sistema da clínica, até mais!\n");
        executandoSistema = false;
        break;
      }

      default: {
        console.log("\n Opção inválida!");
        break;
      }
    }
  } catch (error) {
    console.log(`\n${error.message}`);
  }
}
