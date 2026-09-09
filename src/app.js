import readline from "readline-sync";

import {
  cadastrarPaciente,
  listarPacientes,
  atualizarPaciente,
  deletarPaciente,
} from "./models/Paciente.js";
import {
  buscarConultasAvancadas,
  gerarResumoAnalitico,
} from "./relatorios/analitico.js";

let executandoSistema = true;

function exibirMenu() {
  console.log("\n ================================== \n");
  console.log(" -------- Clínica Médica --------");
  console.log("\n ================================== \n");
  console.log(" [1] Cadastrar Paciente");
  console.log(" [2] Listar Pacientes");
  console.log(" [3] Atualizar Paciente");
  console.log(" [4] Remover Paciente");
  console.log("\n ----------------------------------- \n");
  console.log(" [5] Buscar Consultas (Filtros Múltiplos");
  console.log(" [6] Gerar Relatório Analítico");
  console.log("\n ----------------------------------- \n");
  console.log(" [0] Sair do Sistema");
  console.log("\n ================================== \n");
}

while (executandoSistema) {
  exibirMenu();
  const opcao = readline.question("Escolha uma opcao: ");

  switch (opcao.trim()) {
    case "1": {
      console.log("\n === Cadastrar Paciente ===");
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
      console.log("\n === Atualizar Paciente ===");
      const id = readline.question("Id do paciente: ");
      const novoNome = readline.question("Novo nome: ");
      const novaIdade = readline.question("Nova Idade: ");
      atualizarPaciente(id, novoNome, novaIdade);
      break;
    }

    case "4": {
      console.log("\n === Remover Paciente ===");
      const id = readline.question("Id do paciente a ser removido: ");
      deletarPaciente(id);
      break;
    }

    case "5": {
      console.log("\n === Busca Avançada de Consultas ===");
      console.log(
        "(Aperte ENTER sem digitar nada para ignorar qualquer filtro)",
      );

      const idMedico = readline.question("Id do medico: ");
      const idPaciente = readline.question("Id do paciente: ");
      const status = readline.question(
        "Status (agendada/realizada/cancelada): ",
      );
      const data = readline.question("Data (AAAA-MM-DD): ");

      buscarConultasAvancadas({
        idMedico: idMedico ? Number(idMedico) : null,
        idPaciente: idPaciente ? Number(idPaciente) : null,
        status: status || null,
        data: data || null,
      });
      break;
    }

    case "6": {
      gerarResumoAnalitico();
      break;
    }

    case "0": {
      console.log("\n Encerrando o sistema da clinica, Até mais! \n");
      executandoSistema = false;
      break;
    }

    default: {
      console.log("\n Opção inválida!");
      break;
    }
  }
}
